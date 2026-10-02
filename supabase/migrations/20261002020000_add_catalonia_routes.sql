-- Additional Catalonia routes. These do not duplicate Montserrat or Cabo de Creus.
insert into public.motorcycle_routes (
  slug, name_en, name_es, region_en, region_es, start_name, start_location,
  stops, distance_km, duration_minutes, difficulty_key, description_en,
  description_es, source_name_en, source_name_es, source_url, validated_at
) values
  (
    'alt-emporda-inland', 'Inland Alt Empordà loop', 'Vuelta por el interior del Alt Empordà',
    'GIRONA · CATALONIA', 'GIRONA · CATALUÑA', 'Figueres',
    extensions.st_setsrid(extensions.st_makepoint(2.9616, 42.2665), 4326)::extensions.geography,
    array['Figueres', 'Garriguella', 'Espolla', 'Capmany', 'Peralada', 'Figueres'],
    115, 180, 'difficultyEasy',
    'Vineyards, small villages and quiet inland roads away from the main Costa Brava loop.',
    'Viñedos, pueblos pequeños y carreteras interiores tranquilas lejos del circuito principal de la Costa Brava.',
    'Motociclismo · Catalonia routes', 'Motociclismo · rutas por Cataluña',
    'https://www.motociclismo.es/rutas/rutas-moto-cataluna-nzm_247884_102.html', current_date
  ),
  (
    'garrotxa-volcanic-loop', 'La Garrotxa volcanic loop', 'Vuelta volcánica por La Garrotxa',
    'GIRONA · CATALONIA', 'GIRONA · CATALUÑA', 'Besalú',
    extensions.st_setsrid(extensions.st_makepoint(2.6997, 42.1980), 4326)::extensions.geography,
    array['Besalú', 'Banyoles', 'Olot', 'Santa Pau', 'Castellfollit de la Roca', 'Besalú'],
    125, 210, 'difficultyTwisty',
    'Medieval villages, volcanic country and the green backroads of La Garrotxa.',
    'Pueblos medievales, paisaje volcánico y carreteras verdes por La Garrotxa.',
    'Motociclismo · Catalonia routes', 'Motociclismo · rutas por Cataluña',
    'https://www.motociclismo.es/rutas/rutas-moto-cataluna-nzm_247884_102.html', current_date
  ),
  (
    'priorat-montsant', 'Priorat and Montsant bends', 'Curvas del Priorat y Montsant',
    'TARRAGONA · CATALONIA', 'TARRAGONA · CATALUÑA', 'Prades',
    extensions.st_setsrid(extensions.st_makepoint(0.9883, 41.3454), 4326)::extensions.geography,
    array['Prades', 'Siurana', 'Cornudella de Montsant', 'Falset', 'Porrera', 'Prades'],
    145, 225, 'difficultyTwisty',
    'A wine-country ride through the Prades mountains and Montsant’s sweeping bends.',
    'Una ruta entre viñedos por las montañas de Prades y las curvas abiertas del Montsant.',
    'Motociclismo · Catalonia routes', 'Motociclismo · rutas por Cataluña',
    'https://www.motociclismo.es/rutas/rutas-moto-cataluna-nzm_247884_102.html', current_date
  ),
  (
    'mont-caro-terres-de-lebre', 'Mont Caro and Terres de l’Ebre', 'Mont Caro y Terres de l’Ebre',
    'TARRAGONA · CATALONIA', 'TARRAGONA · CATALUÑA', 'Tortosa',
    extensions.st_setsrid(extensions.st_makepoint(0.5216, 40.8125), 4326)::extensions.geography,
    array['Tortosa', 'Miravet', 'Gandesa', 'Horta de Sant Joan', 'Mont Caro', 'Tortosa'],
    165, 255, 'difficultyMountain',
    'Riverside roads, the Terra Alta hills and the narrow climb to the Mont Caro viewpoint.',
    'Carreteras junto al río, las sierras de Terra Alta y la subida estrecha al mirador del Mont Caro.',
    'Motociclismo · Catalonia routes', 'Motociclismo · rutas por Cataluña',
    'https://www.motociclismo.es/rutas/rutas-moto-cataluna-nzm_247884_102.html', current_date
  ),
  (
    'vall-aran-cerdanya', 'Vall d’Aran to Cerdanya circuit', 'Circuito de la Vall d’Aran a la Cerdanya',
    'LLEIDA · CATALONIA', 'LLEIDA · CATALUÑA', 'Vielha',
    extensions.st_setsrid(extensions.st_makepoint(0.7954, 42.7016), 4326)::extensions.geography,
    array['Vielha', 'Sort', 'La Seu d’Urgell', 'Puigcerdà', 'Bellver de Cerdanya', 'Vielha'],
    285, 450, 'difficultyMountain',
    'A high-country circuit linking two of Lleida’s great valleys and their mountain passes.',
    'Un circuito de alta montaña que enlaza dos de los grandes valles de Lleida y sus puertos.',
    'Motociclismo · Lleida Mototurisme', 'Motociclismo · Lleida Mototurisme',
    'https://www.motociclismo.es/rutas/lleida-mototurisme-2020-ii-vall-aran-cerdanya-entre-valles-puertos_208210_102.html', current_date
  )
on conflict (slug) do nothing;
