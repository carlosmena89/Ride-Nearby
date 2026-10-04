(() => {
  const seedRoutes = window.RIDE_ROUTES || [];
  const config = window.RIDE_CONFIG || {};
  const supabaseUrl = typeof config.supabaseUrl === 'string' ? config.supabaseUrl.replace(/\/$/, '') : '';
  const supabaseAnonKey = typeof config.supabaseAnonKey === 'string' ? config.supabaseAnonKey : '';
  const turnstileSiteKey = typeof config.turnstileSiteKey === 'string' ? config.turnstileSiteKey : '';
  const databaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
  const translations = {
    en: {
      pageTitle: 'Ride Nearby — Curated motorcycle routes',
       metaDescription: 'Discover original, nearby motorcycle routes in Spain and open them in Google Maps.',
      languageGroupLabel: 'Select language', switchToEnglish: 'Switch language to English', switchToSpanish: 'Switch language to Spanish',
      brandHomeLabel: 'Ride Nearby home', brandSubtitle: 'CURATED RIDES',
      topLocationDefault: 'Spain · hand-picked routes', topLocationFound: 'Location found · Spain routes',
      heroEyebrow: 'THE LONG WAY IS THE RIGHT WAY', heroTitleLead: 'Good roads are', heroTitleEm: 'closer than you think.',
       heroDescription: 'Find a ride worth taking. We bring together original route notes and useful external links.',
      useLocation: 'Use my location', refreshLocation: 'Refresh my location', findingLocation: 'Finding your location…', tryLocationAgain: 'Try location again',
       privacyNote: 'Your location is sent to Supabase only to find nearby routes. See our privacy notice.', privacyLink: 'Privacy notice', artStartLabel: 'START HERE', artStartText: 'Somewhere nearby', artEndLabel: 'TAKE THE SCENIC WAY', artEndText: 'Make a day of it.',
      artStampTop: 'BUILT FOR', artStampLine1: 'THE', artStampLine2: 'RIDE', artStampBottom: 'NOT THE RUSH',
      finderEyebrow: 'PICK YOUR PACE', finderTitle: 'Find your kind of ride', statusNeedLocation: 'Share your location to see nearby routes',
      statusWaiting: 'Waiting for your location permission…', statusFound: 'Location found · sorted by nearest start point', statusUnsupported: 'Location is not supported by this browser', statusFailed: 'Could not get your location',
      filtersLabel: 'Route filters', radiusLabel: 'NEAR ME WITHIN', radiusAriaLabel: 'Maximum distance from my location',
      distanceLabel: 'ROUTE DISTANCE UP TO', distanceAriaLabel: 'Maximum route distance', timeLabel: 'RIDE TIME UP TO', timeAriaLabel: 'Maximum ride time',
      oneHour: '1 hour', tenHours: '10 hours', resultsEyebrow: 'THE GOOD STUFF', resultsTitle: 'Routes worth the detour',
       sortNoteDefault: 'A few good roads, described in-house.', sortNoteSorted: 'Sorted by distance from you. Your location is sent to Supabase only for this search.',
       emptyNeedLocationTitle: 'First, tell us where you are.', emptyNeedLocationMessage: 'We’ll find the closest routes from our collection. Your location is sent to Supabase only to calculate nearby routes.',
      locationUnavailableTitle: 'Location unavailable.', noRoutesTitle: 'No routes match those filters.',
      noRoutesMessage: 'Try widening the nearby radius or allowing a longer distance and ride time.', showNearbyRoutes: 'Show nearby routes', tryAgain: 'Try again',
      errorUnsupported: 'This browser does not support location. Try opening the app in Safari or Chrome.',
      errorPermission: 'Location permission was blocked. Allow location access in your browser settings, then try again.',
      errorPosition: 'We could not determine your location. Check your device settings and try again.',
      errorTimeout: 'Location lookup took too long. Please try again.', errorGeneric: 'We could not access your location. Please try again.',
       sourceTitle: 'Original route notes, useful links.',
       sourceDescription: 'Route descriptions and illustrations are original. External links are provided as further reading; distances and times are estimates, and Google Maps calculates live directions.',
      sourceLink: 'OUR SOURCES', footerNote: 'Made for the ride. · Ride safe, check road conditions.', footerCountry: 'SPAIN, FOR NOW', editorPick: 'EDITOR’S PICK',
      factDistance: 'DISTANCE', factRideTime: 'RIDE TIME', factStart: 'START', sourceGuide: 'Source guide', openMaps: 'Open in Google Maps',
      nearbyAway: '{distance} km away', readSourceGuide: 'Read source guide: {source}', openRouteMaps: 'Open {route} in Google Maps',
      hoursOne: 'hour', hoursMany: 'hours', durationHourShort: 'hr', durationMinute: 'min',
      difficultyEasy: 'Easy-going', difficultyTwisty: 'Twisty', difficultyMountain: 'Mountain ride',
      databaseDemo: 'Demo mode: showing 5 sample routes. Configure Supabase to load the live catalogue and accept rider suggestions.',
      databaseConnectionIssue: 'Could not load the live route catalogue. Check the Supabase settings and try again.',
      databaseRetryMessage: 'Check that the Supabase migration is installed and the project settings are correct.',
      suggestEyebrow: 'COMMUNITY ROADS', suggestTitle: 'Know a road worth sharing?',
      suggestDescription: 'Suggest a route for other riders. We’ll review it before it joins the catalogue.', suggestAction: 'Suggest a route',
      submissionNotConfigured: 'Suggestions are not enabled yet. Connect Supabase and anti-spam protection to accept them.',
      submissionCaptchaLoading: 'Loading the anti-spam check…', submissionCaptchaReady: 'Complete the anti-spam check to send your suggestion.',
      submissionCaptchaError: 'The anti-spam check could not load. Please try again later.', submissionNoCaptcha: 'Complete the anti-spam check before sending.',
      submissionSending: 'Sending your suggestion for review…', submissionSuccess: 'Thanks! Your suggestion is in the review queue. It will not appear publicly until approved.',
      submissionFailure: 'We could not send your suggestion. Please try again later.', proposalPrivacy: 'No account or email needed. Suggestions stay private until approved.',
      formNameLabel: 'Route name', formNamePlaceholder: 'e.g. The old mountain road',
      formStartLabel: 'Starting town', formStartPlaceholder: 'e.g. Ronda',
      formStopsLabel: 'Stops, in order', formStopsPlaceholder: 'One place per line. Repeat the start at the end for a loop.',
      formRouteLinkLabel: 'Route link', formRouteLinkPlaceholder: 'Google Maps, Kurviger or another route link', formRoadsLabel: 'Main roads or mountain passes', formRoadsPlaceholder: 'e.g. N-260 · Port del Cantó · Coll de la Creueta',
      formDistanceLabel: 'Approx. distance (km)', formDistancePlaceholder: '120',
      formDurationLabel: 'Approx. ride time (hours)', formDurationPlaceholder: '3',
      formReasonLabel: 'Why do you recommend it?', formReasonPlaceholder: 'Tell us what makes this ride special…',
      formSourceLabel: 'Source link (optional)', formSourcePlaceholder: 'https://…', formSubmit: 'Send for review'
    },
    es: {
      pageTitle: 'Ride Nearby — Rutas moteras seleccionadas',
       metaDescription: 'Descubre rutas moteras originales cerca de ti en España y ábrelas en Google Maps.',
      languageGroupLabel: 'Seleccionar idioma', switchToEnglish: 'Cambiar idioma a inglés', switchToSpanish: 'Cambiar idioma a español',
      brandHomeLabel: 'Inicio de Ride Nearby', brandSubtitle: 'RUTAS SELECCIONADAS',
      topLocationDefault: 'España · rutas seleccionadas', topLocationFound: 'Ubicación lista · rutas de España',
      heroEyebrow: 'EL CAMINO LARGO ES EL BUENO', heroTitleLead: 'Buenas carreteras,', heroTitleEm: 'más cerca de lo que crees.',
       heroDescription: 'Encuentra una ruta que merezca la pena. Reunimos notas originales y enlaces externos útiles.',
      useLocation: 'Usar mi ubicación', refreshLocation: 'Actualizar ubicación', findingLocation: 'Buscando tu ubicación…', tryLocationAgain: 'Volver a intentarlo',
       privacyNote: 'Tu ubicación se envía a Supabase solo para buscar rutas cercanas. Consulta el aviso de privacidad.', privacyLink: 'Aviso de privacidad', artStartLabel: 'EMPIEZA AQUÍ', artStartText: 'En algún lugar cercano', artEndLabel: 'ELIGE EL CAMINO BONITO', artEndText: 'Haz que el día cuente.',
      artStampTop: 'DISEÑADA', artStampLine1: 'PARA', artStampLine2: 'RODAR', artStampBottom: 'SIN PRISAS',
      finderEyebrow: 'ELIGE TU RITMO', finderTitle: 'Encuentra tu próxima ruta', statusNeedLocation: 'Comparte tu ubicación para ver rutas cercanas',
      statusWaiting: 'Esperando permiso para usar tu ubicación…', statusFound: 'Ubicación lista · ordenadas por cercanía', statusUnsupported: 'Este navegador no admite la ubicación', statusFailed: 'No se pudo obtener tu ubicación',
      filtersLabel: 'Filtros de rutas', radiusLabel: 'CERCA DE MÍ, HASTA', radiusAriaLabel: 'Distancia máxima desde mi ubicación',
      distanceLabel: 'DISTANCIA MÁXIMA DE RUTA', distanceAriaLabel: 'Distancia máxima de la ruta', timeLabel: 'DURACIÓN MÁXIMA', timeAriaLabel: 'Duración máxima de la ruta',
      oneHour: '1 hora', tenHours: '10 horas', resultsEyebrow: 'RUTAS CON ENCANTO', resultsTitle: 'Rutas que merecen el desvío',
       sortNoteDefault: 'Buenas carreteras, descritas por nosotros.', sortNoteSorted: 'Ordenadas por cercanía. Tu ubicación se envía a Supabase solo para esta búsqueda.',
       emptyNeedLocationTitle: 'Primero, dinos dónde estás.', emptyNeedLocationMessage: 'Buscaremos las rutas más cercanas de nuestra colección. Tu ubicación se envía a Supabase solo para calcularlas.',
      locationUnavailableTitle: 'Ubicación no disponible.', noRoutesTitle: 'No hay rutas con esos filtros.',
      noRoutesMessage: 'Amplía el radio de búsqueda o permite más kilómetros y tiempo de ruta.', showNearbyRoutes: 'Ver rutas cercanas', tryAgain: 'Volver a intentarlo',
      errorUnsupported: 'Este navegador no admite la ubicación. Prueba a abrir la app en Safari o Chrome.',
      errorPermission: 'No se ha permitido el acceso a la ubicación. Actívalo en los ajustes del navegador e inténtalo de nuevo.',
      errorPosition: 'No hemos podido determinar tu ubicación. Revisa los ajustes del dispositivo e inténtalo de nuevo.',
      errorTimeout: 'La búsqueda de ubicación ha tardado demasiado. Inténtalo de nuevo.', errorGeneric: 'No hemos podido acceder a tu ubicación. Inténtalo de nuevo.',
       sourceTitle: 'Notas originales y enlaces útiles.',
       sourceDescription: 'Las descripciones y las ilustraciones son originales. Los enlaces externos se ofrecen como lecturas adicionales; la distancia y la duración son aproximadas y Google Maps calcula el recorrido.',
      sourceLink: 'FUENTES', footerNote: 'Hecha para disfrutar. · Conduce con cuidado y revisa el estado de las carreteras.', footerCountry: 'POR AHORA, ESPAÑA', editorPick: 'RUTA RECOMENDADA',
      factDistance: 'DISTANCIA', factRideTime: 'DURACIÓN', factStart: 'SALIDA', sourceGuide: 'Guía de origen', openMaps: 'Abrir en Google Maps',
      nearbyAway: 'a {distance} km', readSourceGuide: 'Leer la guía de origen: {source}', openRouteMaps: 'Abrir {route} en Google Maps',
      hoursOne: 'hora', hoursMany: 'horas', durationHourShort: 'h', durationMinute: 'min',
      difficultyEasy: 'Tranquila', difficultyTwisty: 'Con curvas', difficultyMountain: 'De montaña',
      databaseDemo: 'Modo de prueba: mostramos 5 rutas de ejemplo. Conecta Supabase para cargar el catálogo y recibir propuestas.',
      databaseConnectionIssue: 'No se pudo cargar el catálogo. Revisa la configuración de Supabase e inténtalo de nuevo.',
      databaseRetryMessage: 'Comprueba que la migración está instalada y que los datos del proyecto son correctos.',
      suggestEyebrow: 'RUTAS DE LA COMUNIDAD', suggestTitle: '¿Conoces una ruta que merezca la pena?',
      suggestDescription: 'Propón una ruta para otros motoristas. La revisaremos antes de añadirla al catálogo.', suggestAction: 'Proponer una ruta',
      submissionNotConfigured: 'Aún no se pueden enviar propuestas. Hay que conectar Supabase y activar la protección antispam.',
      submissionCaptchaLoading: 'Cargando la comprobación antispam…', submissionCaptchaReady: 'Completa la comprobación antispam para enviar la propuesta.',
      submissionCaptchaError: 'No se pudo cargar la comprobación antispam. Inténtalo más tarde.', submissionNoCaptcha: 'Completa la comprobación antispam antes de enviar.',
      submissionSending: 'Enviando la propuesta para revisión…', submissionSuccess: '¡Gracias! La propuesta queda pendiente de revisión y no será pública hasta que se apruebe.',
      submissionFailure: 'No se pudo enviar la propuesta. Inténtalo de nuevo más tarde.', proposalPrivacy: 'No necesitas cuenta ni correo. Las propuestas son privadas hasta que se aprueban.',
      formNameLabel: 'Nombre de la ruta', formNamePlaceholder: 'p. ej., La carretera antigua de montaña',
      formStartLabel: 'Localidad de salida', formStartPlaceholder: 'p. ej., Ronda',
      formStopsLabel: 'Paradas, en orden', formStopsPlaceholder: 'Una localidad por línea. Repite la salida al final para indicar que es circular.',
      formRouteLinkLabel: 'Enlace de la ruta', formRouteLinkPlaceholder: 'Google Maps, Kurviger u otro enlace de ruta', formRoadsLabel: 'Carreteras o puertos principales', formRoadsPlaceholder: 'p. ej., N-260 · Port del Cantó · Coll de la Creueta',
      formDistanceLabel: 'Distancia aprox. (km)', formDistancePlaceholder: '120',
      formDurationLabel: 'Duración aprox. (horas)', formDurationPlaceholder: '3',
      formReasonLabel: '¿Por qué la recomiendas?', formReasonPlaceholder: 'Cuéntanos qué tiene de especial esta ruta…',
      formSourceLabel: 'Enlace a la fuente (opcional)', formSourcePlaceholder: 'https://…', formSubmit: 'Enviar para revisión'
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
    time: document.querySelector('#time-filter'),
    backendNote: document.querySelector('#backend-note'),
    backendNoteCopy: document.querySelector('#backend-note-copy'),
    submissionForm: document.querySelector('#route-submission-form'),
    submissionStatus: document.querySelector('#submit-status'),
    submissionButton: document.querySelector('#submit-route-button'),
    turnstileWidget: document.querySelector('#turnstile-widget')
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
  let routeRequestId = 0;
  let turnstileWidgetId = null;
  let turnstileToken = '';
  let submissionStatusKey = databaseConfigured && turnstileSiteKey ? 'submissionCaptchaLoading' : 'submissionNotConfigured';
  let submissionStatusState = '';
  let submissionStatusMessage = '';
  let backendNoteKey = databaseConfigured ? '' : 'databaseDemo';
  const t = (key) => translations[language][key] || translations.en[key] || key;

  const formatHours = (hours) => {
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    if (!wholeHours) return `${minutes} ${t('durationMinute')}`;
    if (!minutes) return `${wholeHours} ${language === 'es' ? t(wholeHours === 1 ? 'hoursOne' : 'hoursMany') : `${t('durationHourShort')}${wholeHours === 1 ? '' : 's'}`}`;
    return `${wholeHours} ${t('durationHourShort')} ${minutes} ${t('durationMinute')}`;
  };

  const themeForRoute = (routeId) => {
    const palette = [
      ['#e5eadb', '#c5d1b8', '#d7e0ce', '#91aa80'],
      ['#e8e2d3', '#cfc3a8', '#ddd4c1', '#ad9062'],
      ['#e4e9e0', '#bdceb9', '#d4decf', '#78976e'],
      ['#e7e4d9', '#c7c4b2', '#dcd9c8', '#9f966e'],
      ['#e2e9e8', '#b8ced0', '#d1dfdf', '#71999a'],
      ['#e9e1d8', '#d1bca8', '#dfd0c1', '#aa8063']
    ];
    const hash = [...String(routeId || 'route')].reduce((total, character) => total + character.charCodeAt(0), 0);
    const [sky, back, front, shadow] = palette[hash % palette.length];
    return { sky, back, front, shadow };
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

  const updateBackendNote = () => {
    elements.backendNote.hidden = !backendNoteKey;
    elements.backendNoteCopy.textContent = backendNoteKey ? t(backendNoteKey) : '';
  };

  const updateSubmissionStatus = () => {
    elements.submissionStatus.textContent = submissionStatusMessage || t(submissionStatusKey);
    elements.submissionStatus.hidden = !submissionStatusState;
    elements.submissionStatus.classList.toggle('is-success', submissionStatusState === 'success');
    elements.submissionStatus.classList.toggle('is-error', submissionStatusState === 'error');
  };

  const setSubmissionStatus = (key, state = '', message = '') => {
    submissionStatusKey = key;
    submissionStatusState = state;
    submissionStatusMessage = message;
    updateSubmissionStatus();
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
    document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
      element.setAttribute('placeholder', t(element.dataset.i18nPlaceholder));
    });
    document.querySelectorAll('[data-language]').forEach((button) => {
      const active = button.dataset.language === language;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    updateFilterLabels();
    updateLocationText();
    updateBackendNote();
    updateSubmissionStatus();
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
    card.querySelector('.route-number').textContent = route.number || String(index + 1).padStart(2, '0');
    card.querySelector('.route-title').textContent = language === 'es' ? route.titleEs : route.title;
    card.querySelector('.difficulty').textContent = t(route.difficultyKey);
    card.querySelector('.route-description').textContent = language === 'es' ? route.descriptionEs : route.description;
    card.querySelector('.stops-text').textContent = route.stops.join('  →  ');
    card.querySelector('.route-distance').textContent = `~${route.distanceKm} km`;
    card.querySelector('.route-duration').textContent = `~${formatHours(route.durationHours)}`;
    card.querySelector('.route-start').textContent = route.start;
    const illustration = card.querySelector('.route-illustration');
    const theme = themeForRoute(route.id);
    illustration.style.setProperty('--route-sky', theme.sky);
    illustration.style.setProperty('--route-back', theme.back);
    illustration.style.setProperty('--route-front', theme.front);
    illustration.style.setProperty('--route-road-shadow', theme.shadow);
    const source = card.querySelector('.source-link');
    source.href = route.sourceUrl;
    source.setAttribute('aria-label', t('readSourceGuide').replace('{source}', language === 'es' ? route.sourceNameEs : route.sourceName));
    const mapsLink = card.querySelector('.maps-link');
    mapsLink.href = mapsUrl(route);
    mapsLink.setAttribute('aria-label', t('openRouteMaps').replace('{route}', language === 'es' ? route.titleEs : route.title));
    card.style.animationDelay = `${Math.min(index, 7) * 55}ms`;
    return card;
  };

  const showEmpty = (title, message, action, isError = false, onAction = locate) => {
    elements.routeList.replaceChildren();
    const empty = elements.emptyState.cloneNode(true);
    empty.classList.toggle('is-error', isError);
    empty.querySelector('h3').textContent = title;
    empty.querySelector('p').textContent = message;
    const button = empty.querySelector('[data-locate]');
    button.innerHTML = `${action} <span aria-hidden="true">→</span>`;
    button.addEventListener('click', onAction);
    elements.routeList.append(empty);
    elements.routeCount.textContent = '0';
  };

  const showRoutes = (nearbyRoutes, requestId) => {
    if (requestId !== routeRequestId) return;
    elements.routeCount.textContent = String(nearbyRoutes.length);
    elements.routeList.replaceChildren();
    if (!nearbyRoutes.length) {
      showEmpty(
        t('noRoutesTitle'),
        t('noRoutesMessage'),
        t('showNearbyRoutes'),
        false,
        () => {
          elements.radius.value = elements.radius.max;
          elements.distance.value = elements.distance.max;
          elements.time.value = elements.time.max;
          updateFilterLabels();
          renderRoutes();
        }
      );
      return;
    }
    nearbyRoutes.forEach(({ route, awayKm }, index) => elements.routeList.append(makeCard(route, index, awayKm)));
  };

  const mapDatabaseRoute = (row) => ({
    id: row.slug,
    number: '',
    title: row.name_en,
    titleEs: row.name_es,
    region: row.region_en,
    regionEs: row.region_es,
    start: row.start_name,
    coordinates: [Number(row.start_latitude), Number(row.start_longitude)],
    stops: row.stops,
    distanceKm: Number(row.distance_km),
    durationHours: Number(row.duration_minutes) / 60,
    difficultyKey: row.difficulty_key,
    description: row.description_en,
    descriptionEs: row.description_es,
    sourceName: row.source_name_en,
    sourceNameEs: row.source_name_es,
    sourceUrl: row.source_url,
    awayKm: Number(row.distance_from_user_km)
  });

  const loadDatabaseRoutes = async () => {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/find_nearby_motorcycle_routes`, {
      method: 'POST',
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        p_latitude: riderLocation[0],
        p_longitude: riderLocation[1],
        p_radius_km: Number(elements.radius.value),
        p_max_distance_km: Number(elements.distance.value),
        p_max_duration_minutes: Number(elements.time.value) * 60,
        p_limit: 50
      })
    });
    if (!response.ok) throw new Error(`Supabase route query failed (${response.status}).`);
    const rows = await response.json();
    return rows.map(mapDatabaseRoute).map((route) => ({ route, awayKm: route.awayKm }));
  };

  const renderRoutes = async () => {
    const requestId = ++routeRequestId;
    if (!riderLocation) {
      showEmpty(
        currentError ? t('locationUnavailableTitle') : t('emptyNeedLocationTitle'),
        currentError ? t(`error${currentError[0].toUpperCase()}${currentError.slice(1)}`) : t('emptyNeedLocationMessage'),
        currentError ? t('tryAgain') : t('useLocation'),
        Boolean(currentError)
      );
      return;
    }

    if (databaseConfigured) {
      try {
        const databaseRoutes = await loadDatabaseRoutes();
        if (requestId !== routeRequestId) return;
        backendNoteKey = '';
        updateBackendNote();
        showRoutes(databaseRoutes, requestId);
      } catch (error) {
        if (requestId !== routeRequestId) return;
        console.warn(error);
        backendNoteKey = 'databaseConnectionIssue';
        updateBackendNote();
        showEmpty(t('databaseConnectionIssue'), t('databaseRetryMessage'), t('tryAgain'), true, renderRoutes);
      }
      return;
    }

    const radiusKm = Number(elements.radius.value);
    const maxDistanceKm = Number(elements.distance.value);
    const maxHours = Number(elements.time.value);
    const nearbyRoutes = seedRoutes
      .map((route) => ({ route, awayKm: distanceBetween(riderLocation, route.coordinates) }))
      .filter(({ route, awayKm }) => awayKm <= radiusKm && route.distanceKm <= maxDistanceKm && route.durationHours <= maxHours)
      .sort((first, second) => first.awayKm - second.awayKm);

    showRoutes(nearbyRoutes, requestId);
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

  const initializeTurnstile = () => {
    if (!databaseConfigured || !turnstileSiteKey) return;

    const renderWidget = () => {
      if (!window.turnstile) {
        setSubmissionStatus('submissionCaptchaError', 'error');
        return;
      }
      turnstileWidgetId = window.turnstile.render(elements.turnstileWidget, {
         sitekey: turnstileSiteKey,
         theme: 'light',
         appearance: 'interaction-only',
         action: 'submit-route',
        callback: (token) => {
          turnstileToken = token;
          elements.submissionButton.disabled = false;
          setSubmissionStatus('submissionCaptchaReady');
        },
        'expired-callback': () => {
          turnstileToken = '';
          elements.submissionButton.disabled = true;
          setSubmissionStatus('submissionNoCaptcha', 'error');
        },
        'error-callback': () => {
          turnstileToken = '';
          elements.submissionButton.disabled = true;
          setSubmissionStatus('submissionCaptchaError', 'error');
        }
      });
    };

    setSubmissionStatus('submissionCaptchaLoading');
    if (window.turnstile) {
      renderWidget();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = renderWidget;
    script.onerror = () => setSubmissionStatus('submissionCaptchaError', 'error');
    document.head.append(script);
  };

  const submitRouteSuggestion = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!databaseConfigured || !turnstileSiteKey) {
      setSubmissionStatus('submissionNotConfigured', 'error');
      return;
    }
    if (!turnstileToken) {
      setSubmissionStatus('submissionNoCaptcha', 'error');
      return;
    }

    const formData = new FormData(elements.submissionForm);
    const stops = String(formData.get('stops') || '').split(/\r?\n/).map((stop) => stop.trim()).filter(Boolean);
    elements.submissionButton.disabled = true;
    setSubmissionStatus('submissionSending');

    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/submit-route`, {
        method: 'POST',
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          proposedName: formData.get('proposedName'),
          startName: formData.get('startName'),
          stops,
          distanceKm: Number(formData.get('distanceKm')),
          durationMinutes: Math.round(Number(formData.get('durationHours')) * 60),
          recommendationReason: formData.get('recommendationReason'),
          routeUrl: formData.get('routeUrl'),
          mainRoads: formData.get('mainRoads'),
          sourceUrl: formData.get('sourceUrl'),
          turnstileToken
        })
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || `Suggestion request failed (${response.status}).`);
      }

      elements.submissionForm.reset();
      turnstileToken = '';
      window.turnstile.reset(turnstileWidgetId);
      setSubmissionStatus('submissionSuccess', 'success');
    } catch (error) {
      console.warn(error);
      turnstileToken = '';
      elements.submissionButton.disabled = true;
      if (window.turnstile && turnstileWidgetId !== null) window.turnstile.reset(turnstileWidgetId);
      setSubmissionStatus('submissionFailure', 'error', error instanceof Error ? error.message : t('submissionFailure'));
    }
  };

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
  elements.submissionForm.addEventListener('submit', submitRouteSuggestion);
  applyTranslations();
  initializeTurnstile();

  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
  }
})();
