# Private admin dashboard

The dashboard is `admin.html` and is not linked from the public app. It uses Supabase Auth email/password login and accepts only `cjmena89@gmail.com` at the database function level. Supabase stores the password securely; it is never stored in this repository.

## Supabase setup

1. Run `supabase/migrations/20261002030000_admin_dashboard.sql` in the linked Supabase project.
2. In **Authentication → Providers**, make sure **Email** is enabled and password sign-in is allowed.
3. In **Authentication → Users**, create or edit `cjmena89@gmail.com` and set a strong password.
4. In **Authentication → URL Configuration**, set the local **Site URL** to the port you are using, for example:

   ```text
   http://localhost:8000/reset-password.html
   ```

   Add both URLs to **Redirect URLs**:

   ```text
   http://localhost:8000/admin.html
   http://localhost:8000/reset-password.html
   ```

5. Serve the project locally:

   ```sh
   python3 -m http.server 8000
   ```

6. Open <http://localhost:8000/admin.html> and sign in with `cjmena89@gmail.com` and the password created in Supabase. Password recovery links open `reset-password.html`, where a new password can be saved.

The Supabase RPCs enforce the email allowlist server-side. Hiding the page URL is not a security measure.

## Reviewing a route

- **Reject** marks the private suggestion as `rejected`.
- **Approve and publish** requires the editor to complete the bilingual title/region/description, difficulty, slug, HTTPS source, and starting coordinates.
- The RPC copies the reviewed route into `motorcycle_routes` and marks the submission `approved` in one transaction.
- Public users can read published routes but cannot read pending submissions or call the moderation functions.

Latitude and longitude are used to sort routes by proximity. In the dashboard, latitude is north/south and longitude is east/west; the database converts them to the correct PostGIS point.

## Production redirect

When the site has a stable HTTPS URL, add that exact `/admin.html` URL to Supabase Auth redirect URLs. Do not use a wildcard in production.
