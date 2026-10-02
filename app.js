(() => {
  const routes = window.RIDE_ROUTES || [];
  const translations = {
    en: {
      pageTitle: 'Ride Nearby — Curated motorcycle routes',
      metaDescription: 'Discover trusted, nearby motorcycle routes in Spain and open them in Google Maps.',
      languageGroupLabel: 'Select language', switchToEnglish: 'Switch language to English', switchToSpanish: 'Switch language to Spanish',
      brandHomeLabel: 'Ride Nearby home', brandSubtitle: 'CURATED RIDES',
      topLocationDefault: 'Spain · hand-picked routes', topLocationFound: 'Location found · Spain routes',
      heroEyebrow: 'THE LONG WAY IS THE RIGHT WAY', heroTitleLead: 'Good roads are', heroTitleEm: 'closer than you think.',
      heroDescription: 'Find a ride worth taking. We bring together trusted motorcycle route guides and the roads they love.',
      useLocation: 'Use my location', refreshLocation: 'Refresh my location', findingLocation: 'Finding your location…', tryLocationAgain: 'Try location again',
      privacyNote: 'Your location stays on this device.', artStartLabel: 'START HERE', artStartText: 'Somewhere nearby', artEndLabel: 'TAKE THE SCENIC WAY', artEndText: 'Make a day of it.',
      artStampTop: 'BUILT FOR', artStampLine1: 'THE', artStampLine2: 'RIDE', artStampBottom: 'NOT THE RUSH',
      finderEyebrow: 'PICK YOUR PACE', finderTitle: 'Find your kind of ride', statusNeedLocation: 'Share your location to see nearby routes',
      statusWaiting: 'Waiting for your location permission…', statusFound: 'Location found · sorted by nearest start point', statusUnsupported: 'Location is not supported by this browser', statusFailed: 'Could not get your location',
      filtersLabel: 'Route filters', radiusLabel: 'NEAR ME WITHIN', radiusAriaLabel: 'Maximum distance from my location',
      distanceLabel: 'ROUTE DISTANCE UP TO', distanceAriaLabel: 'Maximum route distance', timeLabel: 'RIDE TIME UP TO', timeAriaLabel: 'Maximum ride time',
      oneHour: '1 hour', tenHours: '10 hours', resultsEyebrow: 'THE GOOD STUFF', resultsTitle: 'Routes worth the detour',
      sortNoteDefault: 'A few good roads, picked by people who ride.', sortNoteSorted: 'Sorted by distance from you. Your location stays on this device.',
      emptyNeedLocationTitle: 'First, tell us where you are.', emptyNeedLocationMessage: 'We’ll find the closest routes from our hand-picked collection. Your exact location never leaves your browser.',
      locationUnavailableTitle: 'Location unavailable.', noRoutesTitle: 'No routes match those filters.',
      noRoutesMessage: 'Try widening the nearby radius or allowing a longer distance and ride time.', showNearbyRoutes: 'Show nearby routes', tryAgain: 'Try again',
      errorUnsupported: 'This browser does not support location. Try opening the app in Safari or Chrome.',
      errorPermission: 'Location permission was blocked. Allow location access in your browser settings, then try again.',
      errorPosition: 'We could not determine your location. Check your device settings and try again.',
      errorTimeout: 'Location lookup took too long. Please try again.', errorGeneric: 'We could not access your location. Please try again.',
      sourceTitle: 'Picked from trusted ride guides.',
      sourceDescription: 'Our routes are based on published recommendations from established motorcycle and travel guides. Route distances and times are estimates; Google Maps calculates the live directions.',
      sourceLink: 'OUR SOURCES', footerNote: 'Made for the ride. · Ride safe, check road conditions.', footerCountry: 'SPAIN, FOR NOW', editorPick: 'EDITOR’S PICK',
      factDistance: 'DISTANCE', factRideTime: 'RIDE TIME', factStart: 'START', sourceGuide: 'Source guide', openMaps: 'Open in Google Maps',
      nearbyAway: '{distance} km away', readSourceGuide: 'Read source guide: {source}', openRouteMaps: 'Open {route} in Google Maps',
      hoursOne: 'hour', hoursMany: 'hours', durationHourShort: 'hr', durationMinute: 'min',
      difficultyEasy: 'Easy-going', difficultyTwisty: 'Twisty', difficultyMountain: 'Mountain ride'
    },
    es: {
      pageTitle: 'Ride Nearby — Rutas moteras seleccionadas',
      metaDescription: 'Descubre rutas moteras recomendadas cerca de ti en España y ábrelas en Google Maps.',
      languageGroupLabel: 'Seleccionar idioma', switchToEnglish: 'Cambiar idioma a inglés', switchToSpanish: 'Cambiar idioma a español',
      brandHomeLabel: 'Inicio de Ride Nearby', brandSubtitle: 'RUTAS SELECCIONADAS',
      topLocationDefault: 'España · rutas seleccionadas', topLocationFound: 'Ubicación lista · rutas de España',
      heroEyebrow: 'EL CAMINO LARGO ES EL BUENO', heroTitleLead: 'Buenas carreteras,', heroTitleEm: 'más cerca de lo que crees.',
      heroDescription: 'Encuentra una ruta que merezca la pena. Reunimos recomendaciones fiables y carreteras que gustan a quienes disfrutan de la moto.',
      useLocation: 'Usar mi ubicación', refreshLocation: 'Actualizar ubicación', findingLocation: 'Buscando tu ubicación…', tryLocationAgain: 'Volver a intentarlo',
      privacyNote: 'Tu ubicación se queda en este dispositivo.', artStartLabel: 'EMPIEZA AQUÍ', artStartText: 'En algún lugar cercano', artEndLabel: 'ELIGE EL CAMINO BONITO', artEndText: 'Haz que el día cuente.',
      artStampTop: 'DISEÑADA', artStampLine1: 'PARA', artStampLine2: 'RODAR', artStampBottom: 'SIN PRISAS',
      finderEyebrow: 'ELIGE TU RITMO', finderTitle: 'Encuentra tu próxima ruta', statusNeedLocation: 'Comparte tu ubicación para ver rutas cercanas',
      statusWaiting: 'Esperando permiso para usar tu ubicación…', statusFound: 'Ubicación lista · ordenadas por cercanía', statusUnsupported: 'Este navegador no admite la ubicación', statusFailed: 'No se pudo obtener tu ubicación',
      filtersLabel: 'Filtros de rutas', radiusLabel: 'CERCA DE MÍ, HASTA', radiusAriaLabel: 'Distancia máxima desde mi ubicación',
      distanceLabel: 'DISTANCIA MÁXIMA DE RUTA', distanceAriaLabel: 'Distancia máxima de la ruta', timeLabel: 'DURACIÓN MÁXIMA', timeAriaLabel: 'Duración máxima de la ruta',
      oneHour: '1 hora', tenHours: '10 horas', resultsEyebrow: 'RUTAS CON ENCANTO', resultsTitle: 'Rutas que merecen el desvío',
      sortNoteDefault: 'Buenas carreteras, seleccionadas por gente motera.', sortNoteSorted: 'Ordenadas por cercanía. Tu ubicación no sale de este dispositivo.',
      emptyNeedLocationTitle: 'Primero, dinos dónde estás.', emptyNeedLocationMessage: 'Buscaremos las rutas más cercanas de nuestra selección. Tu ubicación exacta no sale del navegador.',
      locationUnavailableTitle: 'Ubicación no disponible.', noRoutesTitle: 'No hay rutas con esos filtros.',
      noRoutesMessage: 'Amplía el radio de búsqueda o permite más kilómetros y tiempo de ruta.', showNearbyRoutes: 'Ver rutas cercanas', tryAgain: 'Volver a intentarlo',
      errorUnsupported: 'Este navegador no admite la ubicación. Prueba a abrir la app en Safari o Chrome.',
      errorPermission: 'No se ha permitido el acceso a la ubicación. Actívalo en los ajustes del navegador e inténtalo de nuevo.',
      errorPosition: 'No hemos podido determinar tu ubicación. Revisa los ajustes del dispositivo e inténtalo de nuevo.',
      errorTimeout: 'La búsqueda de ubicación ha tardado demasiado. Inténtalo de nuevo.', errorGeneric: 'No hemos podido acceder a tu ubicación. Inténtalo de nuevo.',
      sourceTitle: 'Rutas seleccionadas de guías fiables.',
      sourceDescription: 'Nos basamos en recomendaciones publicadas por medios moteros y guías de viaje reconocidas. La distancia y la duración son aproximadas; Google Maps calcula el recorrido al abrirlo.',
      sourceLink: 'FUENTES', footerNote: 'Hecha para disfrutar. · Conduce con cuidado y revisa el estado de las carreteras.', footerCountry: 'POR AHORA, ESPAÑA', editorPick: 'RUTA RECOMENDADA',
      factDistance: 'DISTANCIA', factRideTime: 'DURACIÓN', factStart: 'SALIDA', sourceGuide: 'Guía de origen', openMaps: 'Abrir en Google Maps',
      nearbyAway: 'a {distance} km', readSourceGuide: 'Leer la guía de origen: {source}', openRouteMaps: 'Abrir {route} en Google Maps',
      hoursOne: 'hora', hoursMany: 'horas', durationHourShort: 'h', durationMinute: 'min',
      difficultyEasy: 'Tranquila', difficultyTwisty: 'Con curvas', difficultyMountain: 'De montaña'
    }
  };

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

  const readSavedLanguage = () => {
    try {
      const savedLanguage = localStorage.getItem('ride-nearby-language');
      return savedLanguage === 'es' || savedLanguage === 'en' ? savedLanguage : 'en';
    } catch {
      return 'en';
    }
  };

  let language = readSavedLanguage();
  let riderLocation = null;
  let currentError = '';
  let isLocating = false;
  const t = (key) => translations[language][key] || translations.en[key] || key;

  const formatHours = (hours) => {
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    if (!wholeHours) return `${minutes} ${t('durationMinute')}`;
    if (!minutes) return `${wholeHours} ${language === 'es' ? t(wholeHours === 1 ? 'hoursOne' : 'hoursMany') : `${t('durationHourShort')}${wholeHours === 1 ? '' : 's'}`}`;
    return `${wholeHours} ${t('durationHourShort')} ${minutes} ${t('durationMinute')}`;
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
    const hourWord = elements.time.value === '1' ? t('hoursOne') : t('hoursMany');
    document.querySelector('#time-output').value = `${elements.time.value} ${hourWord}`;
    [elements.radius, elements.distance, elements.time].forEach(setSliderProgress);
  };

  const updateLocationText = () => {
    elements.locateButton.disabled = isLocating;
    elements.locateButton.classList.toggle('is-loading', isLocating);
    elements.locateLabel.textContent = isLocating ? t('findingLocation') : riderLocation ? t('refreshLocation') : currentError ? t('tryLocationAgain') : t('useLocation');
    elements.locationStatus.className = `location-status${riderLocation ? ' is-ready' : currentError ? ' is-error' : ''}`;
    elements.statusCopy.textContent = riderLocation ? t('statusFound') : currentError ? (currentError === 'unsupported' ? t('statusUnsupported') : t('statusFailed')) : isLocating ? t('statusWaiting') : t('statusNeedLocation');
    document.querySelector('#top-location').textContent = t(riderLocation ? 'topLocationFound' : 'topLocationDefault');
    document.querySelector('#sort-note').textContent = t(riderLocation ? 'sortNoteSorted' : 'sortNoteDefault');
  };

  const applyTranslations = () => {
    document.documentElement.lang = language;
    document.title = t('pageTitle');
    document.querySelector('meta[name="description"]').content = t('metaDescription');
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      element.textContent = t(element.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
      element.setAttribute('aria-label', t(element.dataset.i18nAriaLabel));
    });
    document.querySelectorAll('[data-language]').forEach((button) => {
      const active = button.dataset.language === language;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    updateFilterLabels();
    updateLocationText();
  };

  const setLanguage = (nextLanguage) => {
    if (nextLanguage !== 'en' && nextLanguage !== 'es') return;
    language = nextLanguage;
    try {
      localStorage.setItem('ride-nearby-language', language);
    } catch {
      // Keep the selection for this session if browser storage is unavailable.
    }
    applyTranslations();
    renderRoutes();
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
    card.querySelector('.route-region').textContent = language === 'es' ? route.regionEs : route.region;
    card.querySelector('.route-nearby').textContent = t('nearbyAway').replace('{distance}', Math.round(awayKm));
    card.querySelector('.route-number').textContent = route.number;
    card.querySelector('.route-title').textContent = language === 'es' ? route.titleEs : route.title;
    card.querySelector('.difficulty').textContent = t(route.difficultyKey);
    card.querySelector('.route-description').textContent = language === 'es' ? route.descriptionEs : route.description;
    card.querySelector('.stops-text').textContent = route.stops.join('  →  ');
    card.querySelector('.route-distance').textContent = `~${route.distanceKm} km`;
    card.querySelector('.route-duration').textContent = `~${formatHours(route.durationHours)}`;
    card.querySelector('.route-start').textContent = route.start;
    const source = card.querySelector('.source-link');
    source.href = route.sourceUrl;
    source.setAttribute('aria-label', t('readSourceGuide').replace('{source}', language === 'es' ? route.sourceNameEs : route.sourceName));
    const mapsLink = card.querySelector('.maps-link');
    mapsLink.href = mapsUrl(route);
    mapsLink.setAttribute('aria-label', t('openRouteMaps').replace('{route}', language === 'es' ? route.titleEs : route.title));
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
        currentError ? t('locationUnavailableTitle') : t('emptyNeedLocationTitle'),
        currentError ? t(`error${currentError[0].toUpperCase()}${currentError.slice(1)}`) : t('emptyNeedLocationMessage'),
        currentError ? t('tryAgain') : t('useLocation'),
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
        t('noRoutesTitle'),
        t('noRoutesMessage'),
        t('showNearbyRoutes')
      );
      elements.routeCount.textContent = '0';
      return;
    }
    nearbyRoutes.forEach(({ route, awayKm }, index) => elements.routeList.append(makeCard(route, index, awayKm)));
  };

  function locate() {
    if (!navigator.geolocation) {
      currentError = 'unsupported';
      updateLocationText();
      renderRoutes();
      return;
    }

    currentError = '';
    isLocating = true;
    updateLocationText();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        riderLocation = [position.coords.latitude, position.coords.longitude];
        isLocating = false;
        updateLocationText();
        renderRoutes();
      },
      (error) => {
        const errorKeys = { 1: 'permission', 2: 'position', 3: 'timeout' };
        currentError = errorKeys[error.code] || 'generic';
        isLocating = false;
        updateLocationText();
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
  document.querySelectorAll('[data-language]').forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.language));
  });
  document.querySelectorAll('[data-locate]').forEach((button) => button.addEventListener('click', locate));
  applyTranslations();

  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
  }
})();
