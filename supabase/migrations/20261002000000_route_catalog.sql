create extension if not exists postgis with schema extensions;
grant usage on schema extensions to anon, authenticated, service_role;

create table public.motorcycle_routes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_en text not null,
  name_es text not null,
  region_en text not null,
  region_es text not null,
  start_name text not null,
  start_location extensions.geography(point, 4326) not null,
  stops text[] not null check (cardinality(stops) between 2 and 20),
  distance_km numeric(7, 1) not null check (distance_km between 1 and 2000),
  duration_minutes integer not null check (duration_minutes between 1 and 2880),
  difficulty_key text not null check (difficulty_key in ('difficultyEasy', 'difficultyTwisty', 'difficultyMountain')),
  description_en text not null,
  description_es text not null,
  source_name_en text not null,
  source_name_es text not null,
  source_url text not null check (source_url ~ '^https://'),
  validated_at date,
  created_at timestamptz not null default now()
);

create index motorcycle_routes_start_location_gix
  on public.motorcycle_routes using gist (start_location);
create index motorcycle_routes_distance_idx
  on public.motorcycle_routes (distance_km, duration_minutes);

alter table public.motorcycle_routes enable row level security;
create policy "Published routes are readable by everyone"
  on public.motorcycle_routes for select to anon, authenticated using (true);
grant select on public.motorcycle_routes to anon, authenticated;

create table public.route_submissions (
  id uuid primary key default gen_random_uuid(),
  proposed_name text not null check (char_length(proposed_name) between 3 and 100),
  start_name text not null check (char_length(start_name) between 2 and 120),
  stops text[] not null check (cardinality(stops) between 2 and 20),
  distance_km numeric(7, 1) not null check (distance_km between 1 and 2000),
  duration_minutes integer not null check (duration_minutes between 1 and 2880),
  recommendation_reason text not null check (char_length(recommendation_reason) between 20 and 1500),
  source_url text check (source_url is null or source_url ~ '^https://'),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create index route_submissions_pending_idx
  on public.route_submissions (created_at desc) where status = 'pending';

-- Submissions are private and can only be created by the CAPTCHA-checked Edge Function.
alter table public.route_submissions enable row level security;
revoke all on public.route_submissions from anon, authenticated;
grant insert on public.route_submissions to service_role;

create or replace function public.find_nearby_motorcycle_routes(
  p_latitude double precision,
  p_longitude double precision,
  p_radius_km double precision default 250,
  p_max_distance_km double precision default 300,
  p_max_duration_minutes integer default 420,
  p_limit integer default 50
)
returns table (
  id uuid,
  slug text,
  name_en text,
  name_es text,
  region_en text,
  region_es text,
  start_name text,
  start_latitude double precision,
  start_longitude double precision,
  stops text[],
  distance_km numeric,
  duration_minutes integer,
  difficulty_key text,
  description_en text,
  description_es text,
  source_name_en text,
  source_name_es text,
  source_url text,
  distance_from_user_km double precision
)
language sql
stable
security invoker
set search_path = ''
as $$
  select
    r.id,
    r.slug,
    r.name_en,
    r.name_es,
    r.region_en,
    r.region_es,
    r.start_name,
    extensions.st_y(r.start_location::extensions.geometry),
    extensions.st_x(r.start_location::extensions.geometry),
    r.stops,
    r.distance_km,
    r.duration_minutes,
    r.difficulty_key,
    r.description_en,
    r.description_es,
    r.source_name_en,
    r.source_name_es,
    r.source_url,
    extensions.st_distance(
      r.start_location,
      extensions.st_setsrid(extensions.st_makepoint(p_longitude, p_latitude), 4326)::extensions.geography
    ) / 1000.0
  from public.motorcycle_routes as r
  where p_latitude between -90 and 90
    and p_longitude between -180 and 180
    and p_radius_km between 1 and 1000
    and p_max_distance_km between 1 and 2000
    and p_max_duration_minutes between 1 and 2880
    and extensions.st_dwithin(
      r.start_location,
      extensions.st_setsrid(extensions.st_makepoint(p_longitude, p_latitude), 4326)::extensions.geography,
      p_radius_km * 1000.0
    )
    and r.distance_km <= p_max_distance_km
    and r.duration_minutes <= p_max_duration_minutes
  order by extensions.st_distance(
    r.start_location,
    extensions.st_setsrid(extensions.st_makepoint(p_longitude, p_latitude), 4326)::extensions.geography
  )
  limit least(greatest(coalesce(p_limit, 50), 1), 100);
$$;

grant execute on function public.find_nearby_motorcycle_routes(
  double precision, double precision, double precision, double precision, integer, integer
) to anon, authenticated;

insert into public.motorcycle_routes (
  slug, name_en, name_es, region_en, region_es, start_name, start_location,
  stops, distance_km, duration_minutes, difficulty_key, description_en,
  description_es, source_name_en, source_name_es, source_url, validated_at
) values
  (
    'sierra-de-aracena', 'Sierra de Aracena loop', 'Vuelta por la Sierra de Aracena',
    'HUELVA · ANDALUSIA', 'HUELVA · ANDALUCÍA', 'Aracena',
    extensions.st_setsrid(extensions.st_makepoint(-6.5612, 37.8938), 4326)::extensions.geography,
    array['Aracena', 'Linares de la Sierra', 'Alájar', 'Almonaster la Real', 'Cortegana', 'Jabugo', 'Aracena'],
    95, 150, 'difficultyEasy',
    'Green hills, flowing bends and whitewashed villages in the Sierra de Huelva.',
    'Colinas verdes, curvas fluidas y pueblos blancos por la sierra de Huelva.',
    'Motociclismo · Sierra routes', 'Motociclismo · rutas por la sierra',
    'https://www.motociclismo.es/rutas/rutas-moto-sierra-espana_181789_102.html', current_date
  ),
  (
    'guadarrama-mountain-passes', 'Guadarrama mountain passes', 'Puertos de montaña de Guadarrama',
    'MADRID · CENTRAL SPAIN', 'MADRID · CENTRO DE ESPAÑA', 'Madrid',
    extensions.st_setsrid(extensions.st_makepoint(-3.7038, 40.4168), 4326)::extensions.geography,
    array['Madrid', 'Guadalix de la Sierra', 'Miraflores de la Sierra', 'Rascafría', 'Puerto de Cotos', 'Navacerrada', 'Cercedilla', 'Puerto de la Cruz Verde', 'San Lorenzo de El Escorial', 'Madrid'],
    230, 330, 'difficultyTwisty',
    'A classic pass-hopping loop over Morcuera, Cotos, Navacerrada and Cruz Verde.',
    'Una vuelta clásica enlazando Morcuera, Cotos, Navacerrada y Cruz Verde.',
    'Motociclismo · Sierra routes', 'Motociclismo · rutas por la sierra',
    'https://www.motociclismo.es/rutas/rutas-moto-sierra-espana_181789_102.html', current_date
  ),
  (
    'sierra-de-grazalema', 'Sierra de Grazalema loop', 'Vuelta por la Sierra de Grazalema',
    'CÁDIZ · ANDALUSIA', 'CÁDIZ · ANDALUCÍA', 'Arcos de la Frontera',
    extensions.st_setsrid(extensions.st_makepoint(-5.8078, 36.7484), 4326)::extensions.geography,
    array['Arcos de la Frontera', 'El Bosque', 'Benamahoma', 'Grazalema', 'Zahara de la Sierra', 'Arcos de la Frontera'],
    115, 180, 'difficultyTwisty',
    'A mountain-road favourite through Benamahoma, Grazalema and Zahara.',
    'Una favorita de montaña por Benamahoma, Grazalema y Zahara.',
    'Motociclismo · Sierra routes', 'Motociclismo · rutas por la sierra',
    'https://www.motociclismo.es/rutas/rutas-moto-sierra-espana_181789_102.html', current_date
  ),
  (
    'picos-classic-loop', 'The Picos classic loop', 'Vuelta clásica por Picos de Europa',
    'ASTURIAS · CANTABRIA · LEÓN', 'ASTURIAS · CANTABRIA · LEÓN', 'Cangas de Onís',
    extensions.st_setsrid(extensions.st_makepoint(-5.1292, 43.3514), 4326)::extensions.geography,
    array['Cangas de Onís', 'Potes', 'Puerto de San Glorio', 'Riaño', 'Cangas de Onís'],
    250, 360, 'difficultyMountain',
    'A big mountain day across three regions, with high passes and wide-open views.',
    'Una gran jornada de montaña por tres regiones, con puertos y vistas abiertas.',
    'RACC · Picos de Europa', 'RACC · Picos de Europa',
    'https://www.racc.es/blog/moto/picos-de-europa-ruta-en-moto/', current_date
  ),
  (
    'montserrat-backroads', 'Montserrat backroads', 'Carreteras secundarias de Montserrat',
    'BARCELONA · CATALONIA', 'BARCELONA · CATALUÑA', 'Barcelona',
    extensions.st_setsrid(extensions.st_makepoint(2.1686, 41.3874), 4326)::extensions.geography,
    array['Barcelona', 'Olesa de Montserrat', 'Esparreguera', 'Collbató', 'El Bruc', 'Montserrat', 'Barcelona'],
    125, 180, 'difficultyEasy',
    'A short escape from the city, with a curvy climb and big monastery views.',
    'Una escapada corta desde la ciudad, con una subida de curvas y vistas al monasterio.',
    'Motociclismo · Catalonia routes', 'Motociclismo · rutas por Cataluña',
    'https://www.motociclismo.es/rutas/rutas-moto-cataluna-nzm_247884_102.html', current_date
  )
on conflict (slug) do nothing;
