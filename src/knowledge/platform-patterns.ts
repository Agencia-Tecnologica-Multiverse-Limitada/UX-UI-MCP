/**
 * Patrones de código específicos por plataforma para cada ley de UX
 * Este archivo contiene los ejemplos de buenas y malas prácticas adaptados a cada plataforma
 */

import { PlatformId } from './platforms.js';

export interface PlatformCodePatterns {
  good: string[];
  bad: string[];
  guidelines: string[];
}

type LawPlatformPatterns = Partial<Record<PlatformId, PlatformCodePatterns>>;

export const PLATFORM_PATTERNS: Record<string, LawPlatformPatterns> = {
  // ============================================
  // LEY DE FITTS
  // ============================================
  fitts_law: {
    'web-html': {
      good: [
        'min-width: 44px; min-height: 44px;',
        'padding: 12px 24px;',
        'gap: 16px;',
        'touch-action: manipulation;',
      ],
      bad: [
        'width: 20px; height: 20px;',
        'padding: 2px;',
        'font-size: 10px;',
      ],
      guidelines: [
        'Mínimo 44x44px para touch targets',
        'Espaciado mínimo de 8px entre elementos interactivos',
        'Botones primarios más grandes que secundarios',
      ],
    },
    'web-react': {
      good: [
        '<Button size="lg" className="min-h-[44px] min-w-[44px]">',
        '<TouchableArea minSize={44}>',
        'className="p-3 md:p-4"',
        '<IconButton size={44} />',
      ],
      bad: [
        '<Button size="xs">',
        'className="p-1"',
        '<IconButton size={16} />',
      ],
      guidelines: [
        'Usar props de tamaño consistentes',
        'Tailwind: min-h-11 min-w-11 (44px)',
        'Componentes táctiles con área mínima de 44px',
      ],
    },
    'web-vue': {
      good: [
        '<v-btn size="large" min-width="44" min-height="44">',
        ':class="{ \'pa-3\': true }"',
        '<q-btn padding="md">',
      ],
      bad: [
        '<v-btn size="x-small">',
        ':class="{ \'pa-0\': true }"',
      ],
      guidelines: [
        'Vuetify: usar size="large" o personalizar min-width/min-height',
        'Quasar: usar padding="md" o mayor',
      ],
    },
    'ios-swiftui': {
      good: [
        '.frame(minWidth: 44, minHeight: 44)',
        '.padding()',
        'Button { } .buttonStyle(.borderedProminent)',
        '.contentShape(Rectangle())',
      ],
      bad: [
        '.frame(width: 20, height: 20)',
        '.padding(0)',
        'Image(systemName: "icon").onTapGesture { }',
      ],
      guidelines: [
        'Apple HIG: mínimo 44x44 puntos',
        'Usar .contentShape() para expandir área táctil',
        'Preferir Button sobre .onTapGesture para accesibilidad',
      ],
    },
    'ios-uikit': {
      good: [
        'button.frame = CGRect(x: 0, y: 0, width: 44, height: 44)',
        'button.contentEdgeInsets = UIEdgeInsets(top: 12, left: 24, bottom: 12, right: 24)',
        'NSLayoutConstraint.activate([button.heightAnchor.constraint(greaterThanOrEqualToConstant: 44)])',
      ],
      bad: [
        'button.frame = CGRect(x: 0, y: 0, width: 20, height: 20)',
        'button.contentEdgeInsets = .zero',
      ],
      guidelines: [
        'Mínimo 44x44 puntos según Apple HIG',
        'Usar Auto Layout con constraints mínimos',
      ],
    },
    'android-compose': {
      good: [
        'Modifier.size(48.dp) // Material Design mínimo',
        'Modifier.padding(12.dp)',
        'Button(modifier = Modifier.defaultMinSize(minWidth = 48.dp, minHeight = 48.dp))',
        'IconButton(modifier = Modifier.size(48.dp))',
      ],
      bad: [
        'Modifier.size(24.dp)',
        'Modifier.padding(2.dp)',
        'IconButton(modifier = Modifier.size(20.dp))',
      ],
      guidelines: [
        'Material Design: mínimo 48x48dp para touch targets',
        'Usar defaultMinSize() para garantizar tamaño mínimo',
      ],
    },
    'android-xml': {
      good: [
        'android:minWidth="48dp" android:minHeight="48dp"',
        'android:padding="12dp"',
        'style="@style/Widget.MaterialComponents.Button"',
      ],
      bad: [
        'android:layout_width="24dp" android:layout_height="24dp"',
        'android:padding="2dp"',
      ],
      guidelines: [
        'Material Design: 48dp mínimo para áreas táctiles',
        'Usar estilos Material Components',
      ],
    },
    'flutter': {
      good: [
        'SizedBox(width: 48, height: 48, child: IconButton(...))',
        'ElevatedButton(style: ElevatedButton.styleFrom(minimumSize: Size(48, 48)))',
        'InkWell(child: Padding(padding: EdgeInsets.all(12), ...))',
        'MaterialTapTargetSize.padded',
      ],
      bad: [
        'IconButton(iconSize: 16)',
        'SizedBox(width: 20, height: 20)',
        'MaterialTapTargetSize.shrinkWrap',
      ],
      guidelines: [
        'Material Design en Flutter: 48x48 mínimo',
        'Usar minimumSize en ButtonStyle',
        'materialTapTargetSize: MaterialTapTargetSize.padded',
      ],
    },
    'react-native': {
      good: [
        '<TouchableOpacity style={{minWidth: 44, minHeight: 44, padding: 12}}>',
        '<Pressable hitSlop={8}>',
        'hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}',
      ],
      bad: [
        '<TouchableOpacity style={{width: 20, height: 20}}>',
        '<Pressable> con área muy pequeña',
      ],
      guidelines: [
        'Usar hitSlop para expandir área táctil sin cambiar visual',
        'Mínimo 44x44 para iOS, 48x48 para Android',
      ],
    },
    'cli': {
      good: [
        '// Comandos cortos y memorables',
        'program.command("init").alias("i")',
        '// Opciones con shortcuts: -v, --verbose',
      ],
      bad: [
        '// Comandos excesivamente largos sin alias',
        'program.command("initialize-new-project-with-defaults")',
      ],
      guidelines: [
        'Comandos cortos = menos "distancia" para escribir',
        'Alias de una letra para comandos frecuentes',
        'Tab completion reduce "distancia" cognitiva',
      ],
    },
    'voice-alexa': {
      good: [
        '// Utterances cortos y naturales',
        '"Alexa, enciende la luz"',
        '// Slots con pocas opciones claras',
      ],
      bad: [
        '// Utterances largos y complicados',
        '"Alexa, me gustaría que procedieras a encender..."',
      ],
      guidelines: [
        'Comandos de voz cortos = menor esfuerzo',
        'Confirmaciones simples (sí/no)',
        'Reducir pasos de interacción',
      ],
    },
    'game-unity': {
      good: [
        '// Botones grandes en UI',
        'button.GetComponent<RectTransform>().sizeDelta = new Vector2(100, 50);',
        '// Hit boxes generosos',
        'GetComponent<BoxCollider2D>().size = new Vector2(2f, 2f);',
      ],
      bad: [
        '// UI elements muy pequeños',
        'rectTransform.sizeDelta = new Vector2(20, 20);',
      ],
      guidelines: [
        'UI móvil: botones mínimo 44-48 unidades',
        'Hitboxes ligeramente más grandes que el sprite',
        'Considerar distancia del jugador a la pantalla',
      ],
    },
    'ar-vr': {
      good: [
        '// Objetivos grandes para selección por mirada/mano',
        'interactable.minInteractionDistance = 0.5f;',
        '// Feedback visual en hover',
      ],
      bad: [
        '// Botones pequeños difíciles de seleccionar',
        '// Sin feedback de proximidad',
      ],
      guidelines: [
        'Objetivos mínimo 2-3cm en VR',
        'Considerar precisión reducida en XR',
        'Feedback háptico/visual en proximidad',
      ],
    },
  },

  // ============================================
  // LEY DE HICK
  // ============================================
  hicks_law: {
    'web-html': {
      good: [
        '<nav> con máximo 7 elementos',
        '<select> con optgroup para categorizar',
        'Progressive disclosure con details/summary',
      ],
      bad: [
        '<nav> con 15+ enlaces',
        '<select> con 50 opciones sin agrupar',
        'Todos los campos del formulario visibles a la vez',
      ],
      guidelines: [
        'Máximo 7±2 opciones principales visibles',
        'Agrupar opciones en categorías',
        'Mostrar opciones recomendadas primero',
      ],
    },
    'web-react': {
      good: [
        '<Wizard steps={steps} currentStep={step} />',
        '<Combobox options={options} recommended={top3} />',
        '{showAdvanced && <AdvancedOptions />}',
        '<Stepper steps={3} />',
      ],
      bad: [
        '<Form>{allFieldsAtOnce}</Form>',
        '<Select options={hundredOptions} />',
        '<Menu items={everyPossibleAction} />',
      ],
      guidelines: [
        'Dividir formularios largos en pasos',
        'Componentes de autocompletado para listas largas',
        'Progressive disclosure para opciones avanzadas',
      ],
    },
    'ios-swiftui': {
      good: [
        'TabView con máximo 5 tabs',
        'List con sections',
        'NavigationSplitView para jerarquías',
        '.searchable(text: $search)',
      ],
      bad: [
        'TabView con 8+ tabs',
        'Menu con 20 opciones',
        'Picker sin búsqueda para muchos items',
      ],
      guidelines: [
        'Apple HIG: máximo 5 tabs',
        'Usar secciones para agrupar',
        'Searchable para listas largas',
      ],
    },
    'android-compose': {
      good: [
        'BottomNavigation con 3-5 items',
        'LazyColumn con stickyHeader para categorías',
        'DropdownMenu con items limitados',
        'SearchBar para filtrar',
      ],
      bad: [
        'BottomNavigation con 6+ items',
        'AlertDialog con muchas opciones',
      ],
      guidelines: [
        'Material: 3-5 destinos en navegación',
        'Chips para filtros rápidos',
        'Búsqueda para contenido extenso',
      ],
    },
    'flutter': {
      good: [
        'BottomNavigationBar(items: [/* 3-5 items */])',
        'Stepper(steps: steps)',
        'ExpansionPanelList para disclosure progresivo',
        'showSearch(context: context, delegate: delegate)',
      ],
      bad: [
        'BottomNavigationBar con 6+ items',
        'PopupMenuButton con 15 items',
      ],
      guidelines: [
        'Máximo 5 items en BottomNavigationBar',
        'Usar Stepper para procesos multi-paso',
      ],
    },
    'cli': {
      good: [
        'program.command("new").option("-t, --template <name>")',
        '// Subcomandos organizados: git add, git commit',
        'inquirer.prompt([{ type: "list", choices: top5Options }])',
      ],
      bad: [
        '// 20 flags en un solo comando',
        '// Sin subcomandos ni organización',
      ],
      guidelines: [
        'Subcomandos para organizar funcionalidad',
        'Máximo 5-7 opciones principales',
        'Defaults sensatos reducen decisiones',
      ],
    },
    'voice-alexa': {
      good: [
        '// Pocas opciones claras',
        '"¿Quieres A, B o C?"',
        '// Valores por defecto',
        '"Reproduciré jazz a menos que prefieras otro género"',
      ],
      bad: [
        '// Demasiadas opciones verbales',
        '"Puedes elegir entre rock, jazz, pop, clásica, electrónica, reggae..."',
      ],
      guidelines: [
        'Máximo 3 opciones verbales a la vez',
        'Ofrecer default y preguntar confirmación',
        'Permitir interrupciones para elegir rápido',
      ],
    },
    'game-unity': {
      good: [
        '// Menús con categorías claras',
        '// Tutoriales progresivos',
        '// Quick-access para acciones frecuentes',
      ],
      bad: [
        '// Menú de opciones con 50 configuraciones',
        '// Todos los items del inventario sin categorizar',
      ],
      guidelines: [
        'Categorizar items de inventario',
        'Radial menus con 8 máximo opciones',
        'Shortcuts para acciones frecuentes',
      ],
    },
  },

  // ============================================
  // LEY DE JAKOB
  // ============================================
  jakobs_law: {
    'web-html': {
      good: [
        '<header><a href="/"><img src="logo.svg" alt="Logo"></a></header>',
        '<nav role="navigation">',
        '<input type="search" placeholder="Buscar...">',
        '<footer> al final de la página',
      ],
      bad: [
        '// Logo que no enlaza a inicio',
        '// Navegación en ubicación inusual',
        '// Scroll horizontal en web',
      ],
      guidelines: [
        'Logo en top-left enlaza a inicio',
        'Navegación en posición estándar',
        'Patrones de e-commerce conocidos',
      ],
    },
    'web-react': {
      good: [
        '<Header><Logo href="/" /><Nav /><Search /></Header>',
        '<ShoppingCart icon onClick={openCart} />',
        '<Footer><Links /><Social /><Copyright /></Footer>',
      ],
      bad: [
        '<Logo onClick={openMenu} /> // Comportamiento inesperado',
        '<Nav position="bottom" /> // Inusual en web',
      ],
      guidelines: [
        'Seguir convenciones de UI libraries',
        'Patrones de layout reconocibles',
      ],
    },
    'ios-swiftui': {
      good: [
        'NavigationStack { } // Navegación estándar iOS',
        'TabView { } // Tab bar en bottom',
        '.navigationBarTitleDisplayMode(.large)',
        '.toolbar { ToolbarItem(placement: .primaryAction) }',
      ],
      bad: [
        '// Tab bar en top (no es iOS)',
        '// Navegación custom que rompe gestos',
        '// Botón atrás custom sin función de swipe',
      ],
      guidelines: [
        'Seguir Human Interface Guidelines',
        'Respetar gestos del sistema',
        'Usar componentes nativos de iOS',
      ],
    },
    'android-compose': {
      good: [
        'Scaffold(topBar = { TopAppBar() }, bottomBar = { NavigationBar() })',
        'NavigationDrawer para menú lateral',
        'FloatingActionButton para acción principal',
      ],
      bad: [
        '// FAB en posición inusual',
        '// Navigation bar en top',
        '// Gestos que conflictúan con sistema',
      ],
      guidelines: [
        'Seguir Material Design guidelines',
        'FAB en bottom-right',
        'Navigation drawer desde left edge',
      ],
    },
    'flutter': {
      good: [
        'Scaffold(appBar: AppBar(), bottomNavigationBar: BottomNavigationBar())',
        'Drawer() // Menú lateral estándar',
        'FloatingActionButton()',
        'Platform.isIOS ? CupertinoApp() : MaterialApp()',
      ],
      bad: [
        '// Mezclar patrones iOS y Android',
        '// Ignorar convenciones de plataforma',
      ],
      guidelines: [
        'Respetar convenciones de cada plataforma',
        'Usar adaptive widgets cuando sea posible',
        'Material en Android, Cupertino en iOS',
      ],
    },
    'cli': {
      good: [
        'program.version("1.0.0") // --version estándar',
        'program.helpOption("-h, --help")',
        '// Convenciones POSIX: -v verbose, -q quiet',
      ],
      bad: [
        '// -h para algo que no es help',
        '// Salida sin formato estándar',
      ],
      guidelines: [
        '--help y --version son esperados',
        'Exit codes estándar (0=éxito, 1=error)',
        'Flags cortos siguen convenciones (-v, -f, -r)',
      ],
    },
    'voice-alexa': {
      good: [
        '"Alexa, abre [skill]" // Patrón de invocación estándar',
        '"Ayuda" funciona en cualquier momento',
        '"Cancelar" / "Para" siempre disponible',
      ],
      bad: [
        '// Comandos que no siguen patrones de voz naturales',
        '// No responder a "ayuda"',
      ],
      guidelines: [
        'Seguir patrones de voz naturales',
        'Comandos universales siempre activos',
        'Confirmaciones claras y concisas',
      ],
    },
  },

  // ============================================
  // LEY DE MILLER
  // ============================================
  millers_law: {
    'web-html': {
      good: [
        '// Formateo: (555) 555-5555',
        '<fieldset> para agrupar campos',
        '// Chunks de 4 dígitos en tarjetas',
      ],
      bad: [
        '// Números sin formato: 5555555555',
        '// 15 campos sin agrupación',
      ],
      guidelines: [
        'Chunking en números largos',
        'Agrupar campos relacionados',
        'Máximo 5-9 items por grupo',
      ],
    },
    'web-react': {
      good: [
        '<FormSection title="Información Personal">',
        '<PhoneInput format="(###) ###-####" />',
        '<CardNumber format="#### #### #### ####" />',
        'const chunks = splitArray(items, 5);',
      ],
      bad: [
        '<Form>{twentyFieldsInARow}</Form>',
        '<Input value={unformattedNumber} />',
      ],
      guidelines: [
        'Componentes de input con formato automático',
        'Secciones para formularios largos',
      ],
    },
    'ios-swiftui': {
      good: [
        'List { Section("Personal") { ... } Section("Address") { ... } }',
        'Text(phoneNumber.formatted())',
        'GroupBox("Shipping Info") { }',
      ],
      bad: [
        'Form { /* 20 campos sin secciones */ }',
      ],
      guidelines: [
        'Usar Section en List/Form',
        'GroupBox para agrupar visualmente',
        'Formatters para números',
      ],
    },
    'android-compose': {
      good: [
        'LazyColumn { stickyHeader { Text("Sección 1") } items(chunk1) }',
        'Card { Column { /* grupo relacionado */ } }',
        'VisualTransformation para formateo',
      ],
      bad: [
        'Column { /* 20 items sin agrupar */ }',
      ],
      guidelines: [
        'stickyHeader para categorías',
        'Cards para agrupar contenido',
      ],
    },
    'flutter': {
      good: [
        'ListView(children: [header1, ...group1, header2, ...group2])',
        'TextInputFormatter para formateo',
        'Card(child: Column(children: relatedItems))',
      ],
      bad: [
        'ListView(children: fiftyItemsUngrouped)',
      ],
      guidelines: [
        'Agrupar con headers',
        'Formatters para inputs',
      ],
    },
    'cli': {
      good: [
        '// Salida agrupada con headers',
        'console.log("\\n=== Results ===\\n")',
        '// Tablas con columnas limitadas',
      ],
      bad: [
        '// Output de 50 líneas sin separación',
        '// Tablas con 15 columnas',
      ],
      guidelines: [
        'Agrupar output con separadores',
        'Paginación para resultados largos',
        'Máximo 5-7 columnas en tablas',
      ],
    },
  },

  // ============================================
  // UMBRAL DE DOHERTY
  // ============================================
  doherty_threshold: {
    'web-html': {
      good: [
        '<div class="skeleton-loader">',
        '<progress> para operaciones largas',
        'transition: all 0.2s ease;',
      ],
      bad: [
        '// Sin feedback durante cargas',
        '// Bloquear UI completamente',
      ],
      guidelines: [
        'Feedback visual < 400ms',
        'Skeleton loaders para contenido',
        'Animaciones suaves (200-300ms)',
      ],
    },
    'web-react': {
      good: [
        '<Suspense fallback={<Skeleton />}>',
        'const [isPending, startTransition] = useTransition();',
        'useDeferredValue(value)',
        '<Progress value={progress} />',
        'optimisticUpdate(newData);',
      ],
      bad: [
        '// await sin loading state',
        '// Blocking renders',
      ],
      guidelines: [
        'React 18 Suspense + lazy loading',
        'Optimistic updates para acciones',
        'useTransition para updates no urgentes',
      ],
    },
    'ios-swiftui': {
      good: [
        'ProgressView()',
        'ProgressView(value: progress)',
        '.redacted(reason: .placeholder)',
        'withAnimation(.easeInOut(duration: 0.3)) { }',
      ],
      bad: [
        '// Carga sin indicador',
        '// Animaciones > 500ms',
      ],
      guidelines: [
        'ProgressView para cargas',
        '.redacted para skeleton',
        'Animaciones 200-400ms',
      ],
    },
    'android-compose': {
      good: [
        'CircularProgressIndicator()',
        'LinearProgressIndicator(progress = value)',
        'Modifier.placeholder(visible = isLoading)',
        'animateContentSize()',
      ],
      bad: [
        '// Sin indicadores de carga',
      ],
      guidelines: [
        'Material progress indicators',
        'Placeholder para skeleton',
      ],
    },
    'flutter': {
      good: [
        'CircularProgressIndicator()',
        'LinearProgressIndicator(value: progress)',
        'Shimmer.fromColors(...) // Skeleton',
        'AnimatedContainer(duration: Duration(milliseconds: 300))',
      ],
      bad: [
        '// FutureBuilder sin loading state',
      ],
      guidelines: [
        'Siempre manejar estado loading',
        'Shimmer para skeletons',
      ],
    },
    'cli': {
      good: [
        'ora("Loading...").start()',
        'const bar = new ProgressBar(":bar :percent")',
        '// Spinner durante operaciones',
      ],
      bad: [
        '// Operaciones largas sin feedback',
        '// Cursor colgado sin información',
      ],
      guidelines: [
        'Spinners para operaciones < 10s',
        'Progress bars para operaciones medibles',
        'Logs incrementales para procesos largos',
      ],
    },
    'voice-alexa': {
      good: [
        '// Respuesta de confirmación inmediata',
        '"Un momento..." seguido de la respuesta',
        '// Sonidos de feedback',
      ],
      bad: [
        '// Silencio durante procesamiento',
        '// Respuestas > 8 segundos',
      ],
      guidelines: [
        'Confirmar recepción inmediatamente',
        'Audio feedback durante espera',
        'Respuesta completa < 8 segundos',
      ],
    },
  },

  // ============================================
  // LEY DE PROXIMIDAD
  // ============================================
  proximity_law: {
    'web-html': {
      good: [
        'gap: 8px; /* dentro del grupo */',
        'margin-bottom: 24px; /* entre grupos */',
        '<fieldset> para agrupar',
      ],
      bad: [
        '// Espaciado uniforme en todo',
        '// Labels lejos de inputs',
      ],
      guidelines: [
        'Menos espacio entre relacionados',
        'Más espacio entre no relacionados',
      ],
    },
    'web-react': {
      good: [
        '<Stack spacing={2}> para grupos',
        '<Stack spacing={6}> entre grupos',
        '<FormControl> agrupa label + input + error',
      ],
      bad: [
        '// Espaciado uniforme',
        '// Label y Input separados',
      ],
      guidelines: [
        'Stack/Flex con spacing variable',
        'Componentes que agrupan label+input',
      ],
    },
    'ios-swiftui': {
      good: [
        'VStack(spacing: 8) { /* grupo */ }',
        'VStack(spacing: 24) { grupo1; grupo2 }',
        'Section { /* elementos relacionados */ }',
      ],
      bad: [
        '// Spacing uniforme en todo',
      ],
      guidelines: [
        'Spacing variable según relación',
        'Section para agrupación semántica',
      ],
    },
    'android-compose': {
      good: [
        'Column(verticalArrangement = Arrangement.spacedBy(8.dp))',
        'Spacer(modifier = Modifier.height(24.dp)) // Entre grupos',
      ],
      bad: [
        '// Arrangement uniforme',
      ],
      guidelines: [
        'spacedBy() para grupos',
        'Spacer mayor entre grupos',
      ],
    },
    'flutter': {
      good: [
        'Column(children: [item1, SizedBox(height: 8), item2])',
        'SizedBox(height: 24) // Entre secciones',
        'Card para agrupar contenido',
      ],
      bad: [
        '// Espaciado uniforme',
      ],
      guidelines: [
        'SizedBox para espaciado consistente',
        'Cards para agrupación visual',
      ],
    },
  },

  // ============================================
  // EFECTO VON RESTORFF
  // ============================================
  von_restorff_effect: {
    'web-html': {
      good: [
        'class="btn btn-primary" /* CTA destacado */',
        '<mark> para resaltar',
        'class="badge new"',
      ],
      bad: [
        '// Todos los botones iguales',
        '// Solo color para diferencia',
      ],
      guidelines: [
        'CTA visualmente distintivo',
        'No solo color (accesibilidad)',
      ],
    },
    'web-react': {
      good: [
        '<Button variant="primary">Main Action</Button>',
        '<Badge variant="new">NEW</Badge>',
        '<Highlight>texto importante</Highlight>',
      ],
      bad: [
        '// Todos los botones variant="default"',
      ],
      guidelines: [
        'Variant primary para acción principal',
        'Badge para contenido nuevo',
      ],
    },
    'ios-swiftui': {
      good: [
        '.buttonStyle(.borderedProminent)',
        '.tint(.accentColor)',
        '.badge(count)',
        'Label { Image(systemName: "star.fill") }',
      ],
      bad: [
        '// Todos los botones .bordered',
      ],
      guidelines: [
        '.borderedProminent para CTA',
        '.badge para notificaciones',
      ],
    },
    'android-compose': {
      good: [
        'Button(colors = ButtonDefaults.buttonColors()) /* Primary */',
        'OutlinedButton() /* Secondary */',
        'Badge { Text("3") }',
      ],
      bad: [
        '// Todos los botones iguales',
      ],
      guidelines: [
        'Button vs OutlinedButton vs TextButton',
        'Badge para destacar',
      ],
    },
  },

  // ============================================
  // LEY DE POSTEL
  // ============================================
  postels_law: {
    'web-html': {
      good: [
        '<input type="tel"> /* acepta varios formatos */',
        'inputmode="numeric"',
        'autocomplete="email"',
      ],
      bad: [
        'pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" /* muy estricto */',
      ],
      guidelines: [
        'Validación flexible, output consistente',
        'Autocomplete para ayudar al usuario',
      ],
    },
    'web-react': {
      good: [
        '<PhoneInput country="auto" />',
        'parseDate(input) // Acepta múltiples formatos',
        '<Autocomplete freeSolo />',
        'normalizeInput(value)',
      ],
      bad: [
        'exactFormat={true}',
        'strictValidation={true}',
      ],
      guidelines: [
        'Librerías de parsing flexibles',
        'Normalizar input del usuario',
      ],
    },
    'ios-swiftui': {
      good: [
        'TextField("Email", text: $email).textContentType(.emailAddress)',
        '.keyboardType(.emailAddress)',
        '.autocapitalization(.none)',
      ],
      bad: [
        '// Sin textContentType',
        '// Validación en cada keystroke',
      ],
      guidelines: [
        'textContentType para autofill',
        'keyboardType apropiado',
        'Validación al submit, no en cada tecla',
      ],
    },
    'android-compose': {
      good: [
        'OutlinedTextField(keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email))',
        'LocalTextInputService para transformaciones',
      ],
      bad: [
        '// Sin keyboard options',
      ],
      guidelines: [
        'KeyboardOptions apropiado',
        'Transformación de input liberal',
      ],
    },
    'cli': {
      good: [
        '// Acepta múltiples formatos de fecha',
        'parseDate("2024-01-01") || parseDate("01/01/2024")',
        '// Flags case-insensitive',
        '// Valores por defecto sensatos',
      ],
      bad: [
        '// Solo un formato exacto aceptado',
        '// Sin valores por defecto',
      ],
      guidelines: [
        'Múltiples formatos de input',
        'Case-insensitive cuando posible',
        'Defaults razonables',
      ],
    },
  },

  // Continuar con más leyes si es necesario...
  // Las demás leyes seguirían el mismo patrón
};

/**
 * Obtiene los patrones específicos de una ley para una plataforma
 */
export function getPatternsForPlatform(
  lawId: string, 
  platformId: PlatformId
): PlatformCodePatterns | undefined {
  const lawPatterns = PLATFORM_PATTERNS[lawId];
  if (!lawPatterns) return undefined;
  
  // Si se solicita una plataforma específica
  if (lawPatterns[platformId]) {
    return lawPatterns[platformId];
  }
  
  // Fallback a patrones genéricos web si la plataforma no tiene específicos
  if (lawPatterns['web-html']) {
    return lawPatterns['web-html'];
  }
  
  return undefined;
}

/**
 * Obtiene todos los patrones de una ley para todas las plataformas
 */
export function getAllPatternsForLaw(lawId: string): LawPlatformPatterns | undefined {
  return PLATFORM_PATTERNS[lawId];
}
