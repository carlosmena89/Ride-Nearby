# Ride Nearby

A lightweight, mobile-first web app for discovering curated motorcycle loops near your current location in Spain. All UI and project documentation are in English.

## What it does

- Asks for location only when you tap **Use my location**.
- Ranks hand-picked routes by distance to their starting point and filters by nearby radius, route distance, and estimated ride time.
- Opens the route stops in Google Maps for live directions.
- Works as an installable PWA and caches its app shell for offline access.
- Keeps location in memory in your browser; it is not stored or sent to a server.

## Run locally

Geolocation works on HTTPS sites and on `localhost`. Python 3 is enough to serve the static files; no package install or API key is needed.

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000> on your computer or phone. To test from another device on your Wi-Fi, use an HTTPS tunnel or deploy the site; browsers normally block location access over plain HTTP on a network address.

## Route data and sources

Route ideas and stops are attributed to the linked editorial guides from **Motociclismo** and **RACC**. Starting-point coordinates are used only to sort nearby routes. Route distances and ride times are clearly marked as estimates; Google Maps calculates the live driving directions from the listed stops. The app does not claim that Google Maps provides a motorcycle-specific routing mode.

Current seed routes:

- Sierra de Aracena, Guadarrama mountain passes, and Sierra de Grazalema — [Motociclismo: motorcycle routes in Spain's mountains](https://www.motociclismo.es/rutas/rutas-moto-sierra-espana_181789_102.html)
- Picos de Europa classic loop — [RACC: discover the Picos de Europa by motorcycle](https://www.racc.es/blog/moto/picos-de-europa-ruta-en-moto/)
- Montserrat backroads — [Motociclismo: motorcycle routes in Catalonia](https://www.motociclismo.es/rutas/rutas-moto-cataluna-nzm_247884_102.html)

Always check current road conditions, access restrictions, weather, and fuel availability before riding. Route access can change seasonally.

## Deploy to GitHub Pages

The included GitHub Actions workflow deploys the repository root to GitHub Pages whenever changes are pushed to `main`. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions** if it is not selected automatically.

## Tech

Plain HTML, CSS, and JavaScript. No framework, tracking, backend, API key, or build step.
