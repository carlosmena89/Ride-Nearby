-- Additional curated routes. Distances and durations are planning estimates.
-- Sources are editorial guides; validate current road access before riding.
insert into public.motorcycle_routes (
  slug, name_en, name_es, region_en, region_es, start_name, start_location,
  stops, distance_km, duration_minutes, difficulty_key, description_en,
  description_es, source_name_en, source_name_es, source_url, validated_at
) values
  (
    'alpujarra-granadina', 'Granada Alpujarra circuit', 'Circuito por la Alpujarra granadina',
    'GRANADA · ANDALUSIA', 'GRANADA · ANDALUCÍA', 'Granada',
    extensions.st_setsrid(extensions.st_makepoint(-3.5986, 37.1773), 4326)::extensions.geography,
    array['Granada', 'Lanjarón', 'Pampaneira', 'Trevélez', 'Ugíjar', 'Guadix', 'Granada'],
    235, 360, 'difficultyMountain',
    'Sierra Nevada foothills, white villages and a long day of mountain bends.',
    'Laderas de Sierra Nevada, pueblos blancos y una gran jornada de curvas.',
    'Motociclismo · Alpujarra', 'Motociclismo · Alpujarra granadina',
    'https://www.motociclismo.es/rutas/turismo-moto-alpujarra-granadina_180503_102.html', current_date
  ),
  (
    'sierra-de-cazorla', 'Sierra de Cazorla loop', 'Vuelta por la Sierra de Cazorla',
    'JAÉN · ANDALUSIA', 'JAÉN · ANDALUCÍA', 'Cazorla',
    extensions.st_setsrid(extensions.st_makepoint(-3.0022, 37.9149), 4326)::extensions.geography,
    array['Cazorla', 'Coto Ríos', 'Embalse del Tranco', 'Hornos', 'Segura de la Sierra', 'Santiago-Pontones', 'Cazorla'],
    190, 300, 'difficultyMountain',
    'Forest roads and reservoir views through one of Andalusia’s great mountain parks.',
    'Carreteras de bosque y vistas al embalse por uno de los grandes parques de Andalucía.',
    'Motociclismo · Guadalquivir route', 'Motociclismo · ruta del Guadalquivir',
    'https://www.motociclismo.es/rutas/turismo-rutas-moto-rio-guadalquivir_178420_102.html', current_date
  ),
  (
    'cabo-de-creus-loop', 'Cabo de Creus coastal loop', 'Vuelta costera por el Cabo de Creus',
    'GIRONA · CATALONIA', 'GIRONA · CATALUÑA', 'Cadaqués',
    extensions.st_setsrid(extensions.st_makepoint(3.2770, 42.2880), 4326)::extensions.geography,
    array['Cadaqués', 'Cabo de Creus', 'Port de la Selva', 'Llançà', 'Roses', 'Cadaqués'],
    155, 240, 'difficultyTwisty',
    'A narrow coastal ride around the Cap de Creus landscape and fishing villages.',
    'Una ruta costera de carreteras estrechas por el paisaje del Cabo de Creus y sus pueblos pesqueros.',
    'Motociclismo · Costa Brava routes', 'Motociclismo · rutas por la Costa Brava',
    'https://www.motociclismo.es/rutas/rutas-moto-dia-enamorados_180632_102.html', current_date
  ),
  (
    'hoces-cabriel-jucar', 'Cabriel and Júcar gorges', 'Hoces del Cabriel y del Júcar',
    'VALENCIA · CASTILLA-LA MANCHA', 'VALENCIA · CASTILLA-LA MANCHA', 'Requena',
    extensions.st_setsrid(extensions.st_makepoint(-1.1004, 39.4883), 4326)::extensions.geography,
    array['Requena', 'Venta del Moro', 'Cofrentes', 'Cortes de Pallás', 'Jalance', 'Utiel', 'Requena'],
    191, 270, 'difficultyTwisty',
    'A varied inland route through river gorges, reservoirs and quiet Levante roads.',
    'Una ruta interior variada entre hoces, embalses y carreteras tranquilas del Levante.',
    'Motociclismo · Cabriel and Júcar', 'Motociclismo · Hoces del Cabriel y Júcar',
    'https://www.motociclismo.es/rutas/turismo-hoces-del-cabriel-y-jucar-en-kawasaki-1400gtr_175523_102.html', current_date
  ),
  (
    'rias-baixas-coast', 'Rías Baixas coast loop', 'Vuelta por las Rías Baixas',
    'PONTEVEDRA · GALICIA', 'PONTEVEDRA · GALICIA', 'Pontevedra',
    extensions.st_setsrid(extensions.st_makepoint(-8.6446, 42.4310), 4326)::extensions.geography,
    array['Pontevedra', 'Combarro', 'Bueu', 'Cangas', 'A Guarda', 'Tui', 'Pontevedra'],
    180, 270, 'difficultyEasy',
    'Atlantic estuaries, seafood towns and green roads along Galicia’s southern coast.',
    'Rías atlánticas, pueblos marineros y carreteras verdes por la costa sur de Galicia.',
    'Motociclismo · Rías Baixas', 'Motociclismo · Rías Baixas',
    'https://www.motociclismo.es/rutas/en-moto-por-rias-baixas_228896_102.html', current_date
  ),
  (
    'rias-altas-coast', 'Rías Altas coastal circuit', 'Circuito costero por las Rías Altas',
    'A CORUÑA · LUGO · GALICIA', 'A CORUÑA · LUGO · GALICIA', 'A Coruña',
    extensions.st_setsrid(extensions.st_makepoint(-8.4115, 43.3623), 4326)::extensions.geography,
    array['A Coruña', 'Ferrol', 'Cedeira', 'Ortigueira', 'Viveiro', 'Ribadeo', 'A Coruña'],
    310, 450, 'difficultyTwisty',
    'Cliffs, fishing villages and Atlantic weather on Galicia’s wilder northern coast.',
    'Acantilados, pueblos pesqueros y clima atlántico por la costa norte más salvaje de Galicia.',
    'Motociclismo · Rías Altas', 'Motociclismo · Rías Altas',
    'https://www.motociclismo.es/rutas/ruta-en-moto-por-rias-altas_236603_102.html', current_date
  ),
  (
    'sierra-de-gata', 'Sierra de Gata loop', 'Vuelta por la Sierra de Gata',
    'CÁCERES · EXTREMADURA', 'CÁCERES · EXTREMADURA', 'Plasencia',
    extensions.st_setsrid(extensions.st_makepoint(-6.0885, 40.0294), 4326)::extensions.geography,
    array['Plasencia', 'Coria', 'Hoyos', 'San Martín de Trevejo', 'Robledillo de Gata', 'Plasencia'],
    190, 285, 'difficultyTwisty',
    'Quiet border-country roads, historic villages and a relaxed mountain rhythm.',
    'Carreteras tranquilas de frontera, pueblos históricos y ritmo de montaña relajado.',
    'Motociclismo · Sierra de Gata', 'Motociclismo · Sierra de Gata',
    'https://www.motociclismo.es/rutas/ruta-moto-sierra-gata-ruralka_186237_102.html', current_date
  ),
  (
    'miño-to-atlantic', 'Following the Miño to the Atlantic', 'Siguiendo el Miño hasta el Atlántico',
    'LUGO · OURENSE · GALICIA', 'LUGO · OURENSE · GALICIA', 'Lugo',
    extensions.st_setsrid(extensions.st_makepoint(-7.5560, 43.0121), 4326)::extensions.geography,
    array['Lugo', 'Chantada', 'Ourense', 'Ribadavia', 'Tui', 'A Guarda', 'Lugo'],
    310, 450, 'difficultyEasy',
    'A river-to-coast day linking inland Galicia with the Atlantic at A Guarda.',
    'Una jornada de río y costa que une el interior de Galicia con el Atlántico en A Guarda.',
    'Motociclismo · Miño route', 'Motociclismo · ruta del Miño',
    'https://www.motociclismo.es/rutas/ruta-en-moto-siguiendo-rio-mino_238203_102.html', current_date
  ),
  (
    'mallorca-tramuntana', 'Mallorca Tramuntana loop', 'Vuelta por la Tramuntana de Mallorca',
    'MALLORCA · BALEARIC ISLANDS', 'MALLORCA · ISLAS BALEARES', 'Palma',
    extensions.st_setsrid(extensions.st_makepoint(2.6502, 39.5696), 4326)::extensions.geography,
    array['Palma', 'Sóller', 'Sa Calobra', 'Pollença', 'Alcúdia', 'Artà', 'Palma'],
    270, 420, 'difficultyTwisty',
    'Mountain switchbacks, coves and island villages on a full Mallorca day.',
    'Curvas de montaña, calas y pueblos de la isla en una jornada completa por Mallorca.',
    'Motociclismo · Mallorca routes', 'Motociclismo · rutas por Mallorca',
    'https://www.motociclismo.es/rutas/calas-playas-mallorca-4-rutas-moto-isla_182013_102.html', current_date
  ),
  (
    'ribeira-sacra', 'Ribeira Sacra viewpoints', 'Miradores de la Ribeira Sacra',
    'LUGO · OURENSE · GALICIA', 'LUGO · OURENSE · GALICIA', 'Monforte de Lemos',
    extensions.st_setsrid(extensions.st_makepoint(-7.5146, 42.5216), 4326)::extensions.geography,
    array['Monforte de Lemos', 'Sober', 'Castro Caldelas', 'Parada de Sil', 'Chantada', 'Monforte de Lemos'],
    175, 270, 'difficultyTwisty',
    'A scenic loop through the valleys and viewpoints of the Sil, Cabe and Miño rivers.',
    'Una vuelta panorámica por los valles y miradores de los ríos Sil, Cabe y Miño.',
    'RACC · summer motorcycle routes', 'RACC · rutas moteras de verano',
    'https://www.racc.es/blog/moto/5-rutas-para-viajar-en-moto-en-verano/', current_date
  )
on conflict (slug) do nothing;
