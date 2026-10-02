(() => {
  const routes = window.RIDE_ROUTES || [];
  const elements = {
    locateButton: document.querySelector('#locate-button'),
    locateLabel: document.querySelector('#locate-label'),
    locationStatus: document.querySelector('#location-status'),
    statusCopy: document.querySelector('#status-copy'),
    routeList: document.querySelector('#route-list'),
    routeCount: document.querySelector('#route-count'),
    emptyState: document.querySelector('#empty-state'),
    radius: document.querySelector('#radius-filter'),
    distance: document.querySelector('#distance-filter'),
    time: document.querySelector('#time-filter')
  };

  let riderLocation = null;
  let currentError = '';

  const formatHours = (hours) => {
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    if (!wholeHours) return `${minutes} min`;
    if (!minutes) return `${wholeHours} hr${wholeHours === 1 ? '' : 's'}`;
    return `${wholeHours} hr ${minutes} min`;
  };

  const distanceBetween = (first, second) => {
    const radians = (degrees) => degrees * Math.PI / 180;
    const [lat1, lon1] = first;
    const [lat2, lon2] = second;
    const latDelta = radians(lat2 - lat1);
    const lonDelta = radians(lon2 - lon1);
    const a = Math.sin(latDelta / 2) ** 2 + Math.cos(radians(lat1)) * Math.cos(radians(lat2)) * Math.sin(lonDelta / 2) ** 2;
    return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const setSliderProgress = (slider) => {
    const progress = ((Number(slider.value) - Number(slider.min)) / (Number(slider.max) - Number(slider.min))) * 100;
    slider.style.setProperty('--range-progress', `${progress}%`);
  };

  const updateFilterLabels = () => {
    document.querySelector('#radius-output').value = `${elements.radius.value} km`;
    document.querySelector('#distance-output').value = `${elements.distance.value} km`;
    document.querySelector('#time-output').value = `${elements.time.value} ${elements.time.value === '1' ? 'hour' : 'hours'}`;
    [elements.radius, elements.distance, elements.time].forEach(setSliderProgress);
  };

  const mapsUrl = (route) => {
    const params = new URLSearchParams({
      api: '1',
      origin: `${route.start}, Spain`,
      destination: `${route.start}, Spain`,
      waypoints: route.stops.slice(1, -1).map((stop) => `${stop}, Spain`).join('|'),
      travelmode: 'driving'
    });
    return `https://www.google.com/maps/dir/?${params.toString()}`;
  };

  const makeCard = (route, index, awayKm) => {
    const template = document.querySelector('#route-card-template');
    const card = template.content.firstElementChild.cloneNode(true);
    card.querySelector('.route-region').textContent = route.region;
    card.querySelector('.route-nearby').textContent = awayKm === null ? 'LOCATION NEEDED' : `${Math.round(awayKm)} KM AWAY`;
    card.querySelector('.route-number').textContent = route.number;
    card.querySelector('.route-title').textContent = route.title;
    card.querySelector('.difficulty').textContent = route.difficulty;
    card.querySelector('.route-description').textContent = route.description;
    card.querySelector('.stops-text').textContent = route.stops.join('  →  ');
    card.querySelector('.route-distance').textContent = `~${route.distanceKm} km`;
    card.querySelector('.route-duration').textContent = `~${formatHours(route.durationHours)}`;
    card.querySelector('.route-start').textContent = route.start;
    const source = card.querySelector('.source-link');
    source.href = route.sourceUrl;
    source.setAttribute('aria-label', `Read source guide: ${route.sourceName}`);
    card.querySelector('.maps-link').href = mapsUrl(route);
    card.style.animationDelay = `${Math.min(index, 7) * 55}ms`;
    return card;
  };

  const showEmpty = (title, message, action, isError = false) => {
    elements.routeList.replaceChildren();
    const empty = elements.emptyState.cloneNode(true);
    empty.classList.toggle('is-error', isError);
    empty.querySelector('h3').textContent = title;
    empty.querySelector('p').textContent = message;
    const button = empty.querySelector('[data-locate]');
    button.innerHTML = `${action} <span aria-hidden="true">→</span>`;
    button.addEventListener('click', locate);
    elements.routeList.append(empty);
    elements.routeCount.textContent = '0';
  };

  const renderRoutes = () => {
    if (!riderLocation) {
      showEmpty(
        currentError ? 'Location unavailable.' : 'First, tell us where you are.',
        currentError || 'We’ll find the closest routes from our hand-picked collection. Your exact location never leaves your browser.',
        currentError ? 'Try again' : 'Use my location',
        Boolean(currentError)
      );
      return;
    }

    const radiusKm = Number(elements.radius.value);
    const maxDistanceKm = Number(elements.distance.value);
    const maxHours = Number(elements.time.value);
    const nearbyRoutes = routes
      .map((route) => ({ route, awayKm: distanceBetween(riderLocation, route.coordinates) }))
      .filter(({ route, awayKm }) => awayKm <= radiusKm && route.distanceKm <= maxDistanceKm && route.durationHours <= maxHours)
      .sort((first, second) => first.awayKm - second.awayKm);

    elements.routeCount.textContent = String(nearbyRoutes.length);
    elements.routeList.replaceChildren();
    if (!nearbyRoutes.length) {
      showEmpty(
        'No routes match those filters.',
        'Try widening the nearby radius or allowing a longer distance and ride time.',
        'Show nearby routes'
      );
      elements.routeCount.textContent = '0';
      return;
    }
    nearbyRoutes.forEach(({ route, awayKm }, index) => elements.routeList.append(makeCard(route, index, awayKm)));
  };

  function locate() {
    if (!navigator.geolocation) {
      currentError = 'This browser does not support location. Try opening the app in Safari or Chrome.';
      elements.statusCopy.textContent = 'Location is not supported by this browser';
      elements.locationStatus.className = 'location-status is-error';
      renderRoutes();
      return;
    }

    currentError = '';
    elements.locateButton.disabled = true;
    elements.locateButton.classList.add('is-loading');
    elements.locateLabel.textContent = 'Finding your location…';
    elements.statusCopy.textContent = 'Waiting for your location permission…';
    elements.locationStatus.className = 'location-status';

    navigator.geolocation.getCurrentPosition(
      (position) => {
        riderLocation = [position.coords.latitude, position.coords.longitude];
        elements.locateButton.disabled = false;
        elements.locateButton.classList.remove('is-loading');
        elements.locateLabel.textContent = 'Refresh my location';
        elements.statusCopy.textContent = 'Location found · sorted by nearest start point';
        elements.locationStatus.className = 'location-status is-ready';
        document.querySelector('#top-location').textContent = 'Location found · Spain routes';
        document.querySelector('#sort-note').textContent = 'Sorted by distance from you. Your location stays on this device.';
        renderRoutes();
      },
      (error) => {
        const messages = {
          1: 'Location permission was blocked. Allow location access in your browser settings, then try again.',
          2: 'We could not determine your location. Check your device settings and try again.',
          3: 'Location lookup took too long. Please try again.'
        };
        currentError = messages[error.code] || 'We could not access your location. Please try again.';
        elements.locateButton.disabled = false;
        elements.locateButton.classList.remove('is-loading');
        elements.locateLabel.textContent = 'Try location again';
        elements.statusCopy.textContent = 'Could not get your location';
        elements.locationStatus.className = 'location-status is-error';
        renderRoutes();
      },
      { enableHighAccuracy: false, timeout: 12000, maximumAge: 300000 }
    );
  }

  [elements.radius, elements.distance, elements.time].forEach((slider) => {
    slider.addEventListener('input', () => {
      updateFilterLabels();
      renderRoutes();
    });
  });
  elements.locateButton.addEventListener('click', locate);
  document.querySelectorAll('[data-locate]').forEach((button) => button.addEventListener('click', locate));
  updateFilterLabels();

  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
  }
})();
