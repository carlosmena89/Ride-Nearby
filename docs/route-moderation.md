# Route moderation

Route suggestions are intentionally private until they are reviewed. They are stored in `public.route_submissions` with `status = 'pending'` and are never read by the public route search.

## Find pending suggestions

In Supabase, open **Table Editor → route_submissions** and filter `status` to `pending`.

You can also use **SQL Editor**:

```sql
select *
from public.route_submissions
where status = 'pending'
order by created_at desc;
```

Copy the submission `id`, inspect the stops and source, and verify the route in Google Maps. Before publishing, obtain the starting point's latitude and longitude. `ST_MakePoint` takes **longitude first, latitude second**.

## Approve and publish

Fill in both language versions, choose a difficulty, and replace the placeholder values in this transaction:

```sql
begin;

insert into public.motorcycle_routes (
  slug,
  name_en,
  name_es,
  region_en,
  region_es,
  start_name,
  start_location,
  stops,
  distance_km,
  duration_minutes,
  difficulty_key,
  description_en,
  description_es,
  source_name_en,
  source_name_es,
  source_url,
  validated_at
)
values (
  'my-new-route',
  'My new route',
  'Mi nueva ruta',
  'MADRID · SPAIN',
  'MADRID · ESPAÑA',
  'Madrid',
  extensions.st_setsrid(
    extensions.st_makepoint(-3.7038, 40.4168),
    4326
  )::extensions.geography,
  array['Madrid', 'Segovia', 'Puerto de Navacerrada', 'Madrid'],
  140,
  210,
  'difficultyTwisty',
  'A scenic motorcycle route through mountain roads.',
  'Una ruta motera panorámica por carreteras de montaña.',
  'Community suggestion',
  'Propuesta de la comunidad',
  'https://example.com',
  current_date
);

update public.route_submissions
set status = 'approved', reviewed_at = now()
where id = 'SUBMISSION_UUID_HERE';

commit;
```

Use a real HTTPS source URL. The `difficulty_key` must be one of:

- `difficultyEasy`
- `difficultyTwisty`
- `difficultyMountain`

The route becomes searchable after the transaction commits. The app will calculate its distance from each rider's location using the stored starting point.

## Reject a suggestion

```sql
update public.route_submissions
set status = 'rejected', reviewed_at = now()
where id = 'SUBMISSION_UUID_HERE';
```

Rejected suggestions remain available for audit but are not shown publicly.

## Important checks before approval

- Confirm the route is paved and suitable for the intended motorcycle type.
- Check current road closures, seasonal access restrictions, weather and fuel availability.
- Verify the stops and return point in Google Maps.
- Treat user-provided distance and time as estimates; update them if the verified route differs.
- Do not put a private API key or personal information into the public route record.

This is a manual moderation workflow for the MVP. An admin screen with **Approve** and **Reject** buttons can be added later without changing the public search API.
