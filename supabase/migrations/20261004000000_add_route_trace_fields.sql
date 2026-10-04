alter table public.route_submissions
  add column if not exists route_url text,
  add column if not exists main_roads text;

alter table public.motorcycle_routes
  add column if not exists route_url text;

alter table public.motorcycle_routes
  drop constraint if exists motorcycle_routes_route_url_check;

alter table public.motorcycle_routes
  add constraint motorcycle_routes_route_url_check
  check (route_url is null or route_url ~ '^https://');

alter table public.route_submissions
  drop constraint if exists route_submissions_route_url_check;

alter table public.route_submissions
  add constraint route_submissions_route_url_check
  check (route_url is null or route_url ~ '^https://');

create or replace function public.moderate_route_submission(
  p_submission_id uuid,
  p_action text,
  p_route jsonb default null
)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions, auth
as $$
declare
  submission public.route_submissions;
  published_id uuid;
begin
  if not public.is_route_admin() then raise exception 'Not authorized'; end if;

  select * into submission from public.route_submissions
  where id = p_submission_id and status = 'pending' for update;
  if not found then raise exception 'Pending submission not found'; end if;

  if p_action = 'reject' then
    update public.route_submissions set status = 'rejected', reviewed_at = now() where id = p_submission_id;
    return jsonb_build_object('status', 'rejected');
  end if;
  if p_action <> 'approve' or p_route is null then raise exception 'Invalid moderation action'; end if;
  if nullif(trim(p_route->>'slug'), '') is null
    or nullif(trim(p_route->>'name_en'), '') is null
    or nullif(trim(p_route->>'name_es'), '') is null
    or nullif(trim(p_route->>'region_en'), '') is null
    or nullif(trim(p_route->>'region_es'), '') is null
    or nullif(trim(p_route->>'description_en'), '') is null
    or nullif(trim(p_route->>'description_es'), '') is null
    or nullif(trim(p_route->>'source_url'), '') is null
  then raise exception 'Complete all publication fields'; end if;

  insert into public.motorcycle_routes (
    slug, name_en, name_es, region_en, region_es, start_name, start_location,
    stops, distance_km, duration_minutes, difficulty_key, description_en,
    description_es, source_name_en, source_name_es, source_url, route_url, validated_at
  ) values (
    lower(trim(p_route->>'slug')), trim(p_route->>'name_en'), trim(p_route->>'name_es'),
    trim(p_route->>'region_en'), trim(p_route->>'region_es'), submission.start_name,
    extensions.st_setsrid(extensions.st_makepoint(
      (p_route->>'longitude')::double precision, (p_route->>'latitude')::double precision
    ), 4326)::extensions.geography,
    submission.stops, submission.distance_km, submission.duration_minutes,
    coalesce(nullif(p_route->>'difficulty_key', ''), 'difficultyTwisty'),
    trim(p_route->>'description_en'), trim(p_route->>'description_es'),
    coalesce(nullif(trim(p_route->>'source_name_en'), ''), 'Community suggestion'),
    coalesce(nullif(trim(p_route->>'source_name_es'), ''), 'Propuesta de la comunidad'),
    trim(p_route->>'source_url'), nullif(trim(p_route->>'route_url'), ''), current_date
  ) returning id into published_id;

  update public.route_submissions set status = 'approved', reviewed_at = now() where id = p_submission_id;
  return jsonb_build_object('status', 'approved', 'route_id', published_id);
exception
  when unique_violation then raise exception 'A route with this slug already exists';
  when invalid_text_representation or numeric_value_out_of_range then raise exception 'Coordinates or publication values are invalid';
end;
$$;
