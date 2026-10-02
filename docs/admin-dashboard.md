# Private admin dashboard

The dashboard is `admin.html` and is not linked from the public app. It uses Supabase Auth magic links and accepts only `cjmena89@gmail.com` at the database function level.

## Supabase setup

1. Run `supabase/migrations/20261002030000_admin_dashboard.sql` in the linked Supabase project.
2. In **Authentication → Providers**, make sure **Email** is enabled.
3. In **Authentication → URL Configuration**, add the URL where `admin.html` will run, for example:

   ```text
   http://localhost:8000/admin.html
   ```

4. Serve the project locally:

   ```sh
   python3 -m http.server 8000
   ```

5. Open <http://localhost:8000/admin.html> and request a magic link using `cjmena89@gmail.com`.

The Supabase RPCs enforce the email allowlist server-side. Hiding the page URL is not a security measure.

## Reviewing a route

- **Reject** marks the private suggestion as `rejected`.
- **Approve and publish** requires the editor to complete the bilingual title/region/description, difficulty, slug, HTTPS source, and starting coordinates.
- The RPC copies the reviewed route into `motorcycle_routes` and marks the submission `approved` in one transaction.
- Public users can read published routes but cannot read pending submissions or call the moderation functions.

Latitude and longitude are used to sort routes by proximity. In the dashboard, latitude is north/south and longitude is east/west; the database converts them to the correct PostGIS point.

## Production redirect

When the site has a stable HTTPS URL, add that exact `/admin.html` URL to Supabase Auth redirect URLs. Do not use a wildcard in production.
