/**
 * Base de conocimiento de las 30 Leyes de UX
 * Fuente: https://lawsofux.com/es/
 */

export interface UXLaw {
  id: string;
  name: string;
  nameEs: string;
  category: 'heuristic' | 'gestalt' | 'cognitive' | 'performance' | 'design' | 'mental';
  definition: string;
  definitionEs: string;
  keyPoints: string[];
  keyPointsEs: string[];
  checklistItems: string[];
  codePatterns: {
    good: string[];
    bad: string[];
  };
  relatedLaws: string[];
}

export const UX_LAWS: Record<string, UXLaw> = {
  // ============================================
  // LEYES HEURÍSTICAS PRINCIPALES
  // ============================================
  
  fitts_law: {
    id: 'fitts_law',
    name: "Fitts's Law",
    nameEs: "Ley de Fitts",
    category: 'heuristic',
    definition: "The time to acquire a target is a function of the distance to and size of the target.",
    definitionEs: "El tiempo para adquirir un objetivo es función de la distancia y el tamaño del objetivo.",
    keyPoints: [
      "Touch targets should be large enough for users to select accurately",
      "Touch targets should have ample spacing between them",
      "Touch targets should be placed in areas of the interface that are easy to reach"
    ],
    keyPointsEs: [
      "Los objetivos táctiles deben ser lo suficientemente grandes para seleccionarlos con precisión",
      "Los objetivos táctiles deben tener amplio espacio entre ellos",
      "Los objetivos táctiles deben colocarse en áreas de fácil acceso"
    ],
    checklistItems: [
      "Buttons have minimum 44x44px touch target (mobile) or 32x32px (desktop)",
      "Interactive elements have adequate spacing (minimum 8px)",
      "Important actions are placed in easily reachable areas",
      "Primary actions are larger than secondary actions",
      "Clickable areas match visual boundaries"
    ],
    codePatterns: {
      good: [
        "min-width: 44px; min-height: 44px;",
        "padding: 12px 24px;",
        "gap: 16px;",
        "touch-action: manipulation;"
      ],
      bad: [
        "width: 20px; height: 20px;",
        "padding: 2px;",
        "margin: 0;",
        "font-size: 10px;"
      ]
    },
    relatedLaws: ['hicks_law', 'doherty_threshold']
  },

  hicks_law: {
    id: 'hicks_law',
    name: "Hick's Law",
    nameEs: "Ley de Hick",
    category: 'heuristic',
    definition: "The time it takes to make a decision increases with the number and complexity of choices.",
    definitionEs: "El tiempo que lleva tomar una decisión aumenta con el número y la complejidad de las opciones.",
    keyPoints: [
      "Minimize choices when response times are critical",
      "Break complex tasks into smaller steps",
      "Avoid overwhelming users by highlighting recommended options",
      "Use progressive onboarding to minimize cognitive load",
      "Be careful not to simplify to the point of abstraction"
    ],
    keyPointsEs: [
      "Minimice las opciones cuando los tiempos de respuesta sean críticos",
      "Divida las tareas complejas en pasos más pequeños",
      "Evite abrumar a los usuarios resaltando las opciones recomendadas",
      "Utilice la incorporación progresiva para minimizar la carga cognitiva",
      "Tenga cuidado de no simplificar hasta el punto de la abstracción"
    ],
    checklistItems: [
      "Navigation has 7 or fewer main items",
      "Forms are broken into logical steps",
      "Default/recommended options are highlighted",
      "Search/filter available for large lists",
      "Progressive disclosure is implemented"
    ],
    codePatterns: {
      good: [
        "steps: [step1, step2, step3]",
        "defaultValue={recommendedOption}",
        "<Wizard steps={steps} />",
        "showMore={!expanded}"
      ],
      bad: [
        "options={arrayOf50Items}",
        "<select>{hundredOptions}</select>",
        "displayAllAtOnce={true}"
      ]
    },
    relatedLaws: ['millers_law', 'cognitive_load', 'choice_overload']
  },

  jakobs_law: {
    id: 'jakobs_law',
    name: "Jakob's Law",
    nameEs: "Ley de Jakob",
    category: 'heuristic',
    definition: "Users spend most of their time on other sites. This means that users prefer your site to work the same way as all the other sites they already know.",
    definitionEs: "Los usuarios pasan la mayor parte de su tiempo en otros sitios. Esto significa que los usuarios prefieren que su sitio funcione de la misma manera que todos los demás sitios que ya conocen.",
    keyPoints: [
      "Users will transfer expectations from familiar products to similar ones",
      "By leveraging existing mental models, we can create superior user experiences",
      "When making changes, minimize discord by allowing users to use a familiar version temporarily"
    ],
    keyPointsEs: [
      "Los usuarios transferirán las expectativas de productos familiares a otros similares",
      "Al aprovechar los modelos mentales existentes, podemos crear experiencias superiores",
      "Al realizar cambios, minimice la discordia permitiendo usar una versión familiar temporalmente"
    ],
    checklistItems: [
      "Logo in top-left links to home",
      "Navigation follows common patterns",
      "Shopping cart icon in e-commerce",
      "Standard form field behaviors",
      "Familiar icons and symbols used",
      "Search in expected location"
    ],
    codePatterns: {
      good: [
        "<header><Logo href='/' /></header>",
        "<nav role='navigation'>",
        "placeholder='Search...'",
        "type='email' autocomplete='email'"
      ],
      bad: [
        "logo onClick={openMenu}",
        "unconventionalNavPattern",
        "customScrollBehavior"
      ]
    },
    relatedLaws: ['mental_model', 'aesthetic_usability']
  },

  millers_law: {
    id: 'millers_law',
    name: "Miller's Law",
    nameEs: "Ley de Miller",
    category: 'heuristic',
    definition: "The average person can only keep 7 (plus or minus 2) items in their working memory.",
    definitionEs: "La persona promedio solo puede mantener 7 (más o menos 2) elementos en su memoria de trabajo.",
    keyPoints: [
      "Don't use the 'magical number seven' to justify unnecessary design limitations",
      "Organize content into smaller chunks to help users process and memorize easily",
      "Remember that short-term memory capacity varies by individual and context"
    ],
    keyPointsEs: [
      "No utilice el 'número mágico siete' para justificar limitaciones de diseño innecesarias",
      "Organice el contenido en partes más pequeñas para ayudar a procesar y memorizar",
      "Recuerde que la capacidad de memoria a corto plazo varía según el individuo y contexto"
    ],
    checklistItems: [
      "Content is chunked into digestible groups",
      "Phone numbers are formatted with separators",
      "Long lists are categorized",
      "Information hierarchy is clear",
      "Related items are grouped together"
    ],
    codePatterns: {
      good: [
        "phoneFormat='(XXX) XXX-XXXX'",
        "<FieldGroup label='Personal Info'>",
        "chunks={splitIntoGroups(items, 5)}",
        "sections={categorizedContent}"
      ],
      bad: [
        "displayAllFields={true}",
        "<form>{fiftyFieldsInARow}</form>",
        "showUnformattedNumber"
      ]
    },
    relatedLaws: ['chunking', 'cognitive_load', 'working_memory']
  },

  teslers_law: {
    id: 'teslers_law',
    name: "Tesler's Law",
    nameEs: "Ley de Tesler",
    category: 'heuristic',
    definition: "Tesler's Law, also known as The Law of Conservation of Complexity, states that for any system there is a certain amount of complexity which cannot be reduced.",
    definitionEs: "La Ley de Tesler, también conocida como La Ley de Conservación de la Complejidad, establece que para cualquier sistema existe una cierta cantidad de complejidad que no se puede reducir.",
    keyPoints: [
      "All processes have a core of complexity that cannot be designed away",
      "Ensure that as much as possible of the burden is lifted from users",
      "Take care not to simplify interfaces to the point of abstraction"
    ],
    keyPointsEs: [
      "Todos los procesos tienen un núcleo de complejidad que no se puede eliminar",
      "Asegúrese de que la mayor parte de la carga se elimine de los usuarios",
      "Tenga cuidado de no simplificar las interfaces hasta el punto de la abstracción"
    ],
    checklistItems: [
      "System handles complexity, not the user",
      "Smart defaults reduce user decisions",
      "Auto-detection of user preferences",
      "Complexity is hidden but accessible",
      "Advanced options available but not required"
    ],
    codePatterns: {
      good: [
        "autoDetect={true}",
        "smartDefaults={calculateDefaults(context)}",
        "<AdvancedOptions collapsed />",
        "inferredValue={detectFromContext()}"
      ],
      bad: [
        "requiredManualConfig={true}",
        "noDefaultsProvided",
        "userMustSelectEverything"
      ]
    },
    relatedLaws: ['hicks_law', 'postels_law', 'pragnanz_law']
  },

  parkinsons_law: {
    id: 'parkinsons_law',
    name: "Parkinson's Law",
    nameEs: "Ley de Parkinson",
    category: 'heuristic',
    definition: "Any task will inflate until all of the available time is spent.",
    definitionEs: "Cualquier tarea se agrandará hasta que se gaste todo el tiempo disponible.",
    keyPoints: [
      "Set clear time constraints for tasks",
      "Provide time estimates for processes",
      "Use deadlines to encourage completion"
    ],
    keyPointsEs: [
      "Establezca límites de tiempo claros para las tareas",
      "Proporcione estimaciones de tiempo para los procesos",
      "Use fechas límite para fomentar la finalización"
    ],
    checklistItems: [
      "Progress indicators show estimated time",
      "Deadlines are clearly communicated",
      "Time-limited offers are used appropriately",
      "Session timeouts are communicated"
    ],
    codePatterns: {
      good: [
        "estimatedTime='5 minutes'",
        "deadline={expirationDate}",
        "<Timer countdown={timeRemaining} />",
        "sessionTimeout={30 * 60 * 1000}"
      ],
      bad: [
        "unlimitedTime={true}",
        "noDeadlineShown",
        "infiniteSessionDuration"
      ]
    },
    relatedLaws: ['doherty_threshold', 'goal_gradient']
  },

  // ============================================
  // PRINCIPIOS GESTALT
  // ============================================

  proximity_law: {
    id: 'proximity_law',
    name: "Law of Proximity",
    nameEs: "Ley de Proximidad",
    category: 'gestalt',
    definition: "Objects that are near, or proximate to each other, tend to be grouped together.",
    definitionEs: "Los objetos que están cerca, o próximos entre sí, tienden a agruparse.",
    keyPoints: [
      "Proximity helps to establish a relationship with nearby objects",
      "Elements in close proximity are perceived to share similar functionality",
      "Proximity helps users understand and organize information more quickly"
    ],
    keyPointsEs: [
      "La proximidad ayuda a establecer una relación con los objetos cercanos",
      "Se percibe que los elementos cercanos comparten funciones similares",
      "La proximidad ayuda a comprender y organizar la información más rápidamente"
    ],
    checklistItems: [
      "Related form fields are grouped together",
      "Labels are closer to their inputs than other elements",
      "Action buttons are grouped by function",
      "Whitespace separates unrelated content",
      "Card layouts group related information"
    ],
    codePatterns: {
      good: [
        "gap: 8px; /* within group */",
        "margin-bottom: 24px; /* between groups */",
        "<FormGroup>",
        "spacing='compact' /* related items */"
      ],
      bad: [
        "uniform spacing everywhere",
        "label far from input",
        "no visual grouping"
      ]
    },
    relatedLaws: ['common_region_law', 'similarity_law', 'uniform_connectedness']
  },

  similarity_law: {
    id: 'similarity_law',
    name: "Law of Similarity",
    nameEs: "Ley de la Semejanza",
    category: 'gestalt',
    definition: "The human eye tends to perceive similar elements in a design as a complete picture, shape, or group, even if those elements are separated.",
    definitionEs: "El ojo humano tiende a percibir elementos similares en un diseño como una imagen, forma o grupo completo, incluso si esos elementos están separados.",
    keyPoints: [
      "Elements that are visually similar will be perceived as related",
      "Color, shape, size, orientation, and movement can signal group membership",
      "Ensure that links and navigation systems are visually differentiated from normal text"
    ],
    keyPointsEs: [
      "Los elementos visualmente similares se percibirán como relacionados",
      "El color, la forma, el tamaño y el movimiento pueden indicar pertenencia a un grupo",
      "Asegúrese de que los enlaces se diferencien visualmente del texto normal"
    ],
    checklistItems: [
      "Similar actions have similar styling",
      "Links are visually distinct from text",
      "Icons follow consistent style",
      "Status indicators use consistent colors",
      "Interactive elements share visual traits"
    ],
    codePatterns: {
      good: [
        "className='btn-primary' /* all primary actions */",
        "color: var(--link-color);",
        "<Icon set='consistent-set' />",
        "statusColors={SUCCESS: 'green', ERROR: 'red'}"
      ],
      bad: [
        "inconsistent button styles",
        "links same color as text",
        "mixed icon styles"
      ]
    },
    relatedLaws: ['proximity_law', 'uniform_connectedness', 'pragnanz_law']
  },

  pragnanz_law: {
    id: 'pragnanz_law',
    name: "Law of Prägnanz",
    nameEs: "Ley de Prägnanz",
    category: 'gestalt',
    definition: "People will perceive and interpret ambiguous or complex images as the simplest form possible, because it is the interpretation that requires the least cognitive effort.",
    definitionEs: "Las personas percibirán e interpretarán imágenes ambiguas o complejas de la forma más simple posible, porque es la interpretación que requiere menor esfuerzo cognitivo.",
    keyPoints: [
      "The human eye likes to find simplicity and order in complex shapes",
      "Research confirms people can visually process and remember simple figures better",
      "The human eye simplifies complex shapes by transforming them into a single unified form"
    ],
    keyPointsEs: [
      "Al ojo humano le gusta encontrar la simplicidad y el orden en formas complejas",
      "Las investigaciones confirman que procesamos mejor las figuras simples",
      "El ojo humano simplifica formas complejas transformándolas en una sola forma unificada"
    ],
    checklistItems: [
      "UI elements use simple, recognizable shapes",
      "Icons are clear and unambiguous",
      "Layouts follow predictable patterns",
      "Visual hierarchy is obvious",
      "Complexity is reduced where possible"
    ],
    codePatterns: {
      good: [
        "border-radius: 8px; /* simple rounded corners */",
        "<SimpleIcon name='home' />",
        "layout='grid' /* predictable pattern */",
        "variant='simple'"
      ],
      bad: [
        "complexShape={true}",
        "irregularBorders",
        "unpredictableLayout"
      ]
    },
    relatedLaws: ['occams_razor', 'teslers_law', 'similarity_law']
  },

  common_region_law: {
    id: 'common_region_law',
    name: "Law of Common Region",
    nameEs: "Ley de Región Común",
    category: 'gestalt',
    definition: "Elements tend to be perceived into groups if they are sharing an area with a clearly defined boundary.",
    definitionEs: "Los elementos tienden a percibirse en grupos si comparten un área con un límite claramente definido.",
    keyPoints: [
      "Common region creates clear structure and helps users understand relationships",
      "Adding a border around an element or group is an easy way to create common region",
      "A background can also create common region behind elements"
    ],
    keyPointsEs: [
      "La región común crea una estructura clara y ayuda a comprender relaciones",
      "Agregar un borde alrededor de un elemento es una manera fácil de crear región común",
      "También se puede crear definiendo un fondo detrás de un elemento o grupo"
    ],
    checklistItems: [
      "Cards group related content",
      "Sections have clear boundaries",
      "Modal dialogs are clearly contained",
      "Form sections are visually grouped",
      "Background colors differentiate areas"
    ],
    codePatterns: {
      good: [
        "<Card>",
        "border: 1px solid var(--border);",
        "background: var(--surface);",
        "<Section bordered>",
        "className='content-group'"
      ],
      bad: [
        "no visual boundaries",
        "flat design without grouping",
        "ambiguous content areas"
      ]
    },
    relatedLaws: ['proximity_law', 'uniform_connectedness']
  },

  uniform_connectedness: {
    id: 'uniform_connectedness',
    name: "Law of Uniform Connectedness",
    nameEs: "Ley de Conectividad Uniforme",
    category: 'gestalt',
    definition: "Elements that are visually connected are perceived as more related than elements with no connection.",
    definitionEs: "Los elementos que están conectados visualmente se perciben más relacionados que los elementos sin conexión.",
    keyPoints: [
      "Visual connections create perceived relationships",
      "Lines, arrows, and connectors show flow",
      "Connected elements imply interaction"
    ],
    keyPointsEs: [
      "Las conexiones visuales crean relaciones percibidas",
      "Líneas, flechas y conectores muestran flujo",
      "Los elementos conectados implican interacción"
    ],
    checklistItems: [
      "Flowcharts use connecting lines",
      "Breadcrumbs show path connection",
      "Progress indicators are connected",
      "Related actions are visually linked",
      "Navigation hierarchy is shown"
    ],
    codePatterns: {
      good: [
        "<Breadcrumb separator='/' />",
        "<Stepper connected />",
        "<FlowChart edges={connections} />",
        "borderLeft: '2px solid' /* connected indicator */"
      ],
      bad: [
        "isolated steps",
        "disconnected breadcrumbs",
        "no visual flow"
      ]
    },
    relatedLaws: ['proximity_law', 'common_region_law']
  },

  // ============================================
  // EFECTOS COGNITIVOS
  // ============================================

  von_restorff_effect: {
    id: 'von_restorff_effect',
    name: "Von Restorff Effect",
    nameEs: "Efecto Von Restorff",
    category: 'cognitive',
    definition: "The Von Restorff effect, also known as The Isolation Effect, predicts that when multiple similar objects are present, the one that differs from the rest is most likely to be remembered.",
    definitionEs: "El efecto Von Restorff, también conocido como el efecto de aislamiento, predice que cuando hay varios objetos similares presentes, es más probable que se recuerde el que difiere del resto.",
    keyPoints: [
      "Make important information or key actions visually distinctive",
      "Use restraint with visual emphasis to avoid elements competing",
      "Don't exclude users with color vision deficiency by relying solely on color",
      "Consider users with motion sensitivity when using movement for contrast"
    ],
    keyPointsEs: [
      "Haga que la información importante sea visualmente distintiva",
      "Sea moderado al poner énfasis visual para evitar competencia",
      "No confíe exclusivamente en el color para comunicar contraste",
      "Considere usuarios con sensibilidad al movimiento"
    ],
    checklistItems: [
      "Primary CTA stands out from secondary actions",
      "Important notifications are visually distinct",
      "Current/active states are clearly indicated",
      "Error messages are highly visible",
      "Emphasis uses more than just color"
    ],
    codePatterns: {
      good: [
        "<Button variant='primary'>Main Action</Button>",
        "className='highlighted'",
        "aria-current='page'",
        "<Badge variant='new'>NEW</Badge>"
      ],
      bad: [
        "all buttons same style",
        "subtle important messages",
        "color-only emphasis"
      ]
    },
    relatedLaws: ['selective_attention', 'serial_position']
  },

  zeigarnik_effect: {
    id: 'zeigarnik_effect',
    name: "Zeigarnik Effect",
    nameEs: "Efecto Zeigarnik",
    category: 'cognitive',
    definition: "People remember uncompleted or interrupted tasks better than completed tasks.",
    definitionEs: "Las personas recuerdan mejor las tareas incompletas o interrumpidas que las tareas completadas.",
    keyPoints: [
      "Use progress indicators to encourage completion",
      "Show incomplete states to motivate action",
      "Leverage unfinished tasks to drive engagement"
    ],
    keyPointsEs: [
      "Use indicadores de progreso para fomentar la finalización",
      "Muestre estados incompletos para motivar la acción",
      "Aproveche las tareas sin terminar para impulsar el engagement"
    ],
    checklistItems: [
      "Profile completion indicators are shown",
      "Progress bars indicate advancement",
      "Incomplete forms show status",
      "Checklists show remaining items",
      "Gamification elements track progress"
    ],
    codePatterns: {
      good: [
        "<ProgressBar value={65} label='65% complete' />",
        "<ProfileCompletion steps={completedSteps} />",
        "showRemaining={true}",
        "<Checklist items={tasks} />"
      ],
      bad: [
        "no progress indication",
        "hidden completion status",
        "binary complete/incomplete only"
      ]
    },
    relatedLaws: ['goal_gradient', 'peak_end_rule']
  },

  serial_position: {
    id: 'serial_position',
    name: "Serial Position Effect",
    nameEs: "Efecto de Posición en Serie",
    category: 'cognitive',
    definition: "Users have a propensity to best remember the first and last items in a series.",
    definitionEs: "Los usuarios tienden a recordar mejor al primer y último elemento de una serie.",
    keyPoints: [
      "Place important items at the beginning and end of lists",
      "Use primacy and recency to your advantage",
      "Middle items are less memorable"
    ],
    keyPointsEs: [
      "Coloque los elementos importantes al principio y al final de las listas",
      "Use la primacía y la recencia a su favor",
      "Los elementos del medio son menos memorables"
    ],
    checklistItems: [
      "Key actions at start/end of navigation",
      "Important info at beginning of content",
      "Memorable elements in first/last position",
      "Critical options not buried in middle"
    ],
    codePatterns: {
      good: [
        "items={[mostImportant, ...middle, alsoImportant]}",
        "<Nav><Home />{...items}<Profile /></Nav>",
        "priorityPosition='first' | 'last'"
      ],
      bad: [
        "random ordering",
        "important items in middle",
        "no positional strategy"
      ]
    },
    relatedLaws: ['von_restorff_effect', 'peak_end_rule']
  },

  aesthetic_usability: {
    id: 'aesthetic_usability',
    name: "Aesthetic-Usability Effect",
    nameEs: "Efecto de Estética-Usabilidad",
    category: 'cognitive',
    definition: "Users often perceive aesthetically pleasing design as design that's more usable.",
    definitionEs: "Los usuarios a menudo perciben un diseño estéticamente agradable como un diseño que es más útil.",
    keyPoints: [
      "Aesthetically pleasing design creates a positive response and makes users believe it works better",
      "People are more tolerant of minor usability issues when design is aesthetically pleasing",
      "Visually pleasing design can mask usability problems during testing"
    ],
    keyPointsEs: [
      "Un diseño agradable crea una respuesta positiva y hace creer que funciona mejor",
      "Las personas son más tolerantes con problemas menores si el diseño es agradable",
      "Un diseño agradable puede enmascarar problemas de usabilidad en pruebas"
    ],
    checklistItems: [
      "Visual design is polished and consistent",
      "Typography is well-crafted",
      "Color palette is harmonious",
      "Spacing and alignment are precise",
      "Attention to visual details"
    ],
    codePatterns: {
      good: [
        "font-family: var(--font-system);",
        "color: var(--color-primary);",
        "spacing: var(--space-4);",
        "transition: all 0.2s ease;"
      ],
      bad: [
        "inconsistent fonts",
        "clashing colors",
        "unaligned elements",
        "no transitions"
      ]
    },
    relatedLaws: ['jakobs_law', 'flow']
  },

  goal_gradient: {
    id: 'goal_gradient',
    name: "Goal-Gradient Effect",
    nameEs: "Efecto de Tendencia a la Meta",
    category: 'cognitive',
    definition: "The tendency to approach a goal increases with proximity to the goal.",
    definitionEs: "La tendencia a acercarse a una meta aumenta con la proximidad a la meta.",
    keyPoints: [
      "Show progress toward goals to motivate completion",
      "Artificial advancement can increase engagement",
      "Users accelerate as they approach completion"
    ],
    keyPointsEs: [
      "Muestre el progreso hacia las metas para motivar la finalización",
      "El avance artificial puede aumentar el engagement",
      "Los usuarios aceleran cuando se acercan a completar"
    ],
    checklistItems: [
      "Progress bars show advancement",
      "Steps remaining are displayed",
      "Loyalty programs show progress",
      "Gamification uses goal proximity",
      "Checkout shows steps to completion"
    ],
    codePatterns: {
      good: [
        "<Progress value={80} />",
        "stepsRemaining={2}",
        "<LoyaltyCard stamps={8} total={10} />",
        "showMilestones={true}"
      ],
      bad: [
        "no progress indication",
        "hidden completion distance",
        "no milestone markers"
      ]
    },
    relatedLaws: ['zeigarnik_effect', 'proximity_law']
  },

  // ============================================
  // RENDIMIENTO Y TIEMPOS
  // ============================================

  doherty_threshold: {
    id: 'doherty_threshold',
    name: "Doherty Threshold",
    nameEs: "Umbral de Doherty",
    category: 'performance',
    definition: "Productivity soars when a computer and its users interact at a pace (<400ms) that ensures that neither has to wait on the other.",
    definitionEs: "La productividad se dispara cuando una computadora y sus usuarios interactúan a un ritmo (<400 ms) que garantiza que ninguno tenga que esperar al otro.",
    keyPoints: [
      "Provide system feedback within 400ms to maintain attention and productivity",
      "Use perceived performance to improve response time and reduce wait perception",
      "Animation engages users visually while loading in the background",
      "Progress bars help make wait times tolerable regardless of accuracy",
      "Intentionally adding delay can increase perceived value and trust"
    ],
    keyPointsEs: [
      "Proporcione retroalimentación del sistema dentro de los 400 ms",
      "Utilice el rendimiento percibido para mejorar el tiempo de respuesta",
      "La animación involucra visualmente mientras se carga en segundo plano",
      "Las barras de progreso hacen tolerables los tiempos de espera",
      "Agregar un retraso intencional puede aumentar el valor percibido"
    ],
    checklistItems: [
      "UI responds within 400ms",
      "Loading states are shown immediately",
      "Skeleton screens for content loading",
      "Progress indicators for long operations",
      "Optimistic UI updates implemented"
    ],
    codePatterns: {
      good: [
        "<Skeleton />",
        "loading && <Spinner />",
        "<ProgressBar indeterminate />",
        "optimisticUpdate={true}",
        "debounce={300}"
      ],
      bad: [
        "no loading states",
        "blocking UI during fetch",
        "spinner for < 100ms operations"
      ]
    },
    relatedLaws: ['fitts_law', 'flow']
  },

  peak_end_rule: {
    id: 'peak_end_rule',
    name: "Peak-End Rule",
    nameEs: "Regla de Fin de Pico",
    category: 'performance',
    definition: "People judge an experience largely based on how they felt at its peak and at its end, rather than the total sum or average of every moment of the experience.",
    definitionEs: "Las personas juzgan una experiencia en gran medida en función de cómo se sintieron en su punto álgido y al final, en lugar de la suma total o el promedio de cada momento de la experiencia.",
    keyPoints: [
      "Pay close attention to the most intense points and final moments of the user journey",
      "Identify moments when your product is most helpful, valuable, or entertaining",
      "Remember that people recall negative experiences more vividly than positive ones"
    ],
    keyPointsEs: [
      "Preste mucha atención a los puntos más intensos y los momentos finales del viaje del usuario",
      "Identifique los momentos en los que su producto es más útil, valioso o entretenido",
      "Recuerde que las personas recuerdan las experiencias negativas más vívidamente"
    ],
    checklistItems: [
      "Checkout completion is delightful",
      "Error recovery is smooth",
      "Final step provides confirmation",
      "Peak moments are designed for delight",
      "Exit experience is positive"
    ],
    codePatterns: {
      good: [
        "<SuccessAnimation />",
        "<ConfirmationPage celebration />",
        "onComplete={showCelebration}",
        "<ThankYouScreen personalized />"
      ],
      bad: [
        "abrupt endings",
        "no confirmation feedback",
        "forgettable completion"
      ]
    },
    relatedLaws: ['serial_position', 'cognitive_bias']
  },

  // ============================================
  // PRINCIPIOS DE DISEÑO
  // ============================================

  occams_razor: {
    id: 'occams_razor',
    name: "Occam's Razor",
    nameEs: "La Navaja de Occam",
    category: 'design',
    definition: "Among competing hypotheses that predict equally well, the one with the fewest assumptions should be selected.",
    definitionEs: "Entre las hipótesis en competencia que predicen igualmente bien, se debe seleccionar la que tenga menos suposiciones.",
    keyPoints: [
      "The best method for reducing complexity is to avoid it in the first place",
      "Analyze each element and remove as many as possible without compromising function",
      "Consider this complete only when no additional elements can be removed"
    ],
    keyPointsEs: [
      "El mejor método para reducir la complejidad es evitarla en primer lugar",
      "Analice cada elemento y elimine tantos como sea posible sin comprometer la función",
      "Considere esto completado solo cuando no se puedan eliminar elementos adicionales"
    ],
    checklistItems: [
      "Every element has a clear purpose",
      "No decorative-only elements",
      "Features serve user needs",
      "UI is as simple as possible",
      "Removed unnecessary options"
    ],
    codePatterns: {
      good: [
        "/* minimal required props */",
        "<Button>Submit</Button>",
        "essentialFieldsOnly={true}",
        "simplified={true}"
      ],
      bad: [
        "unnecessaryDecorations",
        "featureCreep",
        "optionsForRareUseCases"
      ]
    },
    relatedLaws: ['teslers_law', 'aesthetic_usability']
  },

  postels_law: {
    id: 'postels_law',
    name: "Postel's Law",
    nameEs: "Ley de Postel",
    category: 'design',
    definition: "Be liberal in what you accept, and conservative in what you send.",
    definitionEs: "Sea liberal en lo que acepta y conservador en lo que envía.",
    keyPoints: [
      "Be empathetic, flexible and tolerant to various user actions or input",
      "Anticipate practically anything in terms of input, access and capability",
      "The more we can anticipate and plan in design, the more resilient the design",
      "Accept variable input from users, translate it to meet your requirements"
    ],
    keyPointsEs: [
      "Sea empático, flexible y tolerante con las diversas acciones del usuario",
      "Anticipe prácticamente cualquier cosa en términos de entrada, acceso y capacidad",
      "Cuanto más podamos anticipar, más resistente será el diseño",
      "Acepte entradas variables, tradúzcalas para cumplir con sus requisitos"
    ],
    checklistItems: [
      "Forms accept multiple input formats",
      "Phone fields accept various formats",
      "Date inputs are flexible",
      "Search is forgiving of typos",
      "Error messages are helpful"
    ],
    codePatterns: {
      good: [
        "parsePhoneNumber(input) /* accepts multiple formats */",
        "fuzzySearch={true}",
        "autocorrect={true}",
        "acceptedFormats={['YYYY-MM-DD', 'MM/DD/YYYY', 'DD.MM.YYYY']}"
      ],
      bad: [
        "strictFormat={true}",
        "exactMatchOnly",
        "noInputValidation"
      ]
    },
    relatedLaws: ['teslers_law', 'hicks_law']
  },

  pareto_principle: {
    id: 'pareto_principle',
    name: "Pareto Principle",
    nameEs: "Principio de Pareto",
    category: 'design',
    definition: "The Pareto principle states that, for many events, roughly 80% of the effects come from 20% of the causes.",
    definitionEs: "El principio de Pareto establece que, para muchos eventos, aproximadamente el 80% de los efectos provienen del 20% de las causas.",
    keyPoints: [
      "Inputs and outputs are often not evenly distributed",
      "A large group may contain only a few meaningful contributors",
      "Focus the majority of effort on areas that bring the greatest benefits"
    ],
    keyPointsEs: [
      "Entradas y resultados a menudo no están distribuidos uniformemente",
      "Un grupo grande puede contener solo unos pocos contribuyentes significativos",
      "Concentre la mayor parte del esfuerzo en las áreas de mayores beneficios"
    ],
    checklistItems: [
      "Most-used features are prioritized",
      "Common paths are optimized",
      "20% of features serve 80% of needs",
      "Analytics inform priorities",
      "Edge cases don't dominate design"
    ],
    codePatterns: {
      good: [
        "primaryActions={mostUsedFeatures}",
        "quickActions={topFeatures.slice(0, 5)}",
        "priorityOrder={byUsageFrequency}",
        "featuredItems={top20Percent}"
      ],
      bad: [
        "allFeaturesSameWeight",
        "noPrioritization",
        "edgeCasesDriveDesign"
      ]
    },
    relatedLaws: ['occams_razor', 'hicks_law']
  },

  // ============================================
  // CONCEPTOS COGNITIVOS
  // ============================================

  cognitive_load: {
    id: 'cognitive_load',
    name: "Cognitive Load",
    nameEs: "Carga Cognitiva",
    category: 'mental',
    definition: "The amount of mental resources required to understand and interact with an interface.",
    definitionEs: "La cantidad de recursos mentales necesarios para entender e interactuar con una interfaz.",
    keyPoints: [
      "Reduce mental demand on users",
      "Simplify interfaces to minimize cognitive effort",
      "Avoid requiring users to remember information"
    ],
    keyPointsEs: [
      "Reduzca la demanda mental en los usuarios",
      "Simplifique las interfaces para minimizar el esfuerzo cognitivo",
      "Evite requerir que los usuarios recuerden información"
    ],
    checklistItems: [
      "Information is displayed, not memorized",
      "Clear visual hierarchy",
      "Consistent patterns throughout",
      "Minimal required decisions",
      "Help is contextually available"
    ],
    codePatterns: {
      good: [
        "showInlineHelp={true}",
        "<Tooltip content={helpText}>",
        "displaySelectedValue={true}",
        "autocomplete='on'"
      ],
      bad: [
        "requiresMemorization",
        "hiddenInformation",
        "inconsistentPatterns"
      ]
    },
    relatedLaws: ['millers_law', 'hicks_law', 'working_memory']
  },

  mental_model: {
    id: 'mental_model',
    name: "Mental Model",
    nameEs: "Modelo Mental",
    category: 'mental',
    definition: "A compressed model based on what we believe we know about a system and how it works.",
    definitionEs: "Un modelo comprimido basado en lo que creemos saber sobre un sistema y cómo funciona.",
    keyPoints: [
      "Align design with user expectations",
      "Leverage existing mental models",
      "Match system behavior to user assumptions"
    ],
    keyPointsEs: [
      "Alinee el diseño con las expectativas del usuario",
      "Aproveche los modelos mentales existentes",
      "Haga coincidir el comportamiento del sistema con las suposiciones del usuario"
    ],
    checklistItems: [
      "Icons match user expectations",
      "Workflows follow logical order",
      "Terminology is familiar",
      "Metaphors are consistent",
      "Behavior matches expectations"
    ],
    codePatterns: {
      good: [
        "icon='trash' /* universally understood */",
        "label='Save' /* not 'Persist' */",
        "confirmBeforeDelete={true}",
        "standardWorkflow={true}"
      ],
      bad: [
        "unconventionalTerminology",
        "unexpectedBehavior",
        "novelMetaphors"
      ]
    },
    relatedLaws: ['jakobs_law', 'aesthetic_usability']
  },

  selective_attention: {
    id: 'selective_attention',
    name: "Selective Attention",
    nameEs: "Atención Selectiva",
    category: 'mental',
    definition: "The process of focusing our attention on only a subset of the stimuli in the environment — typically those related to our goals.",
    definitionEs: "El proceso de centrar nuestra atención solo en un subconjunto de los estímulos en el entorno — normalmente aquellos relacionados con nuestros objetivos.",
    keyPoints: [
      "Users focus on goal-relevant information",
      "Guide attention to important elements",
      "Remove distracting elements"
    ],
    keyPointsEs: [
      "Los usuarios se centran en información relevante para sus objetivos",
      "Guíe la atención hacia elementos importantes",
      "Elimine elementos distractores"
    ],
    checklistItems: [
      "Clear visual hierarchy",
      "Important elements are prominent",
      "Distractions are minimized",
      "Focus is guided appropriately",
      "Call-to-actions stand out"
    ],
    codePatterns: {
      good: [
        "focusTrap={true}",
        "autoFocus={primaryAction}",
        "<Spotlight target={importantElement} />",
        "hideNonEssential={true}"
      ],
      bad: [
        "competingFocalPoints",
        "cluttered interface",
        "buried important actions"
      ]
    },
    relatedLaws: ['von_restorff_effect', 'cognitive_load']
  },

  working_memory: {
    id: 'working_memory',
    name: "Working Memory",
    nameEs: "La Memoria de Trabajo",
    category: 'mental',
    definition: "A cognitive system that temporarily holds and manipulates information needed to complete tasks.",
    definitionEs: "Un sistema cognitivo que retiene y manipula temporalmente la información necesaria para completar tareas.",
    keyPoints: [
      "Limited capacity for temporary information",
      "Don't require users to hold too much in memory",
      "Display information rather than requiring recall"
    ],
    keyPointsEs: [
      "Capacidad limitada para información temporal",
      "No requiera que los usuarios retengan demasiado en memoria",
      "Muestre información en lugar de requerir recuerdo"
    ],
    checklistItems: [
      "Previous selections are visible",
      "Context is maintained across steps",
      "Comparison information is displayed",
      "Instructions remain visible",
      "Undo is available"
    ],
    codePatterns: {
      good: [
        "showPreviousSelections={true}",
        "persistContext={true}",
        "<ComparisonTable items={selected} />",
        "showBreadcrumb={true}"
      ],
      bad: [
        "requiresMemorization",
        "noContextPersistence",
        "hidePreviousSteps"
      ]
    },
    relatedLaws: ['millers_law', 'cognitive_load', 'chunking']
  },

  chunking: {
    id: 'chunking',
    name: "Chunking",
    nameEs: "Fragmentación",
    category: 'mental',
    definition: "A process by which individual pieces of an information set are broken down and then grouped together in a meaningful whole.",
    definitionEs: "Un proceso mediante el cual las piezas individuales de un conjunto de información se descomponen y luego se agrupan en un todo significativo.",
    keyPoints: [
      "Break information into digestible pieces",
      "Group related items together",
      "Use patterns to aid memory"
    ],
    keyPointsEs: [
      "Divida la información en piezas digeribles",
      "Agrupe elementos relacionados",
      "Use patrones para ayudar a la memoria"
    ],
    checklistItems: [
      "Long numbers are formatted",
      "Content is sectioned",
      "Lists are grouped logically",
      "Steps are broken down",
      "Information is categorized"
    ],
    codePatterns: {
      good: [
        "format='XXX-XXX-XXXX' /* phone */",
        "chunkSize={4} /* credit card */",
        "<FormSection title='Personal'>",
        "groupBy='category'"
      ],
      bad: [
        "unformattedLongNumbers",
        "monolithicForms",
        "ungroupedLists"
      ]
    },
    relatedLaws: ['millers_law', 'working_memory']
  },

  flow: {
    id: 'flow',
    name: "Flow",
    nameEs: "Fluir",
    category: 'mental',
    definition: "The mental state in which a person performing an activity is fully immersed in a feeling of energized focus, full involvement, and enjoyment in the process of the activity.",
    definitionEs: "El estado mental en el cual una persona que realiza alguna actividad está completamente inmersa en una sensación de enfoque energizado, plena implicación y disfrute en el proceso de la actividad.",
    keyPoints: [
      "Design for uninterrupted engagement",
      "Remove friction from user paths",
      "Match challenge to skill level"
    ],
    keyPointsEs: [
      "Diseñe para un engagement ininterrumpido",
      "Elimine la fricción de los caminos del usuario",
      "Equilibre el desafío con el nivel de habilidad"
    ],
    checklistItems: [
      "No unnecessary interruptions",
      "Smooth transitions between states",
      "Clear goals and feedback",
      "Appropriate challenge level",
      "Sense of control maintained"
    ],
    codePatterns: {
      good: [
        "disableInterruptions={true}",
        "smoothTransitions={true}",
        "immersiveMode={true}",
        "progressiveDisclosure={true}"
      ],
      bad: [
        "frequentPopups",
        "jarringTransitions",
        "unexpectedInterruptions"
      ]
    },
    relatedLaws: ['doherty_threshold', 'aesthetic_usability']
  },

  cognitive_bias: {
    id: 'cognitive_bias',
    name: "Cognitive Bias",
    nameEs: "Sesgo Cognitivo",
    category: 'mental',
    definition: "A systematic error in thinking or rationality in judgment that influences our perception of the world and decision-making ability.",
    definitionEs: "Un error sistemático de pensamiento o racionalidad en el juicio que influye en nuestra percepción del mundo y nuestra capacidad de toma de decisiones.",
    keyPoints: [
      "Users are subject to various biases",
      "Design should account for biases",
      "Avoid exploiting biases unethically"
    ],
    keyPointsEs: [
      "Los usuarios están sujetos a varios sesgos",
      "El diseño debe tener en cuenta los sesgos",
      "Evite explotar los sesgos de manera no ética"
    ],
    checklistItems: [
      "Defaults are user-beneficial",
      "Comparisons are fair",
      "Urgency is used appropriately",
      "Social proof is honest",
      "No dark patterns"
    ],
    codePatterns: {
      good: [
        "defaultToUserBenefit={true}",
        "fairComparison={true}",
        "honestSocialProof={true}",
        "ethicalNudges={true}"
      ],
      bad: [
        "manipulativeDefaults",
        "artificialScarcity",
        "deceptiveUrgency",
        "darkPatterns"
      ]
    },
    relatedLaws: ['peak_end_rule', 'selective_attention']
  },

  choice_overload: {
    id: 'choice_overload',
    name: "Choice Overload",
    nameEs: "Sobrecarga de Opciones",
    category: 'mental',
    definition: "The tendency for people to feel overwhelmed when presented with a large number of options, a term often used interchangeably with the paradox of choice.",
    definitionEs: "La tendencia de las personas a sentirse abrumadas cuando se les presenta una gran cantidad de opciones, término que se usa frecuentemente como sinónimo de la paradoja de la elección.",
    keyPoints: [
      "Too many options cause paralysis",
      "Curate and limit choices",
      "Provide recommendations"
    ],
    keyPointsEs: [
      "Demasiadas opciones causan parálisis",
      "Curar y limitar las opciones",
      "Proporcionar recomendaciones"
    ],
    checklistItems: [
      "Options are limited to essential",
      "Recommendations are provided",
      "Filtering is available",
      "Defaults reduce decisions",
      "Categories simplify selection"
    ],
    codePatterns: {
      good: [
        "maxOptions={6}",
        "showRecommended={true}",
        "<FilteredList />",
        "smartDefaults={true}"
      ],
      bad: [
        "unlimitedOptions",
        "noFiltering",
        "noRecommendations"
      ]
    },
    relatedLaws: ['hicks_law', 'millers_law']
  },

  active_user_paradox: {
    id: 'active_user_paradox',
    name: "Paradox of the Active User",
    nameEs: "Paradoja del Usuario Activo",
    category: 'mental',
    definition: "Users never read manuals but start using the software immediately.",
    definitionEs: "Los usuarios nunca leen los manuales, pero comienzan a usar el software de inmediato.",
    keyPoints: [
      "Design for immediate use",
      "Don't rely on documentation",
      "Make interfaces self-explanatory"
    ],
    keyPointsEs: [
      "Diseñe para uso inmediato",
      "No dependa de la documentación",
      "Haga las interfaces autoexplicativas"
    ],
    checklistItems: [
      "UI is self-explanatory",
      "Inline help is available",
      "Progressive disclosure used",
      "Tooltips explain features",
      "Onboarding is contextual"
    ],
    codePatterns: {
      good: [
        "<OnboardingTooltip />",
        "placeholder='Enter email...'",
        "<ContextualHelp />",
        "learnByDoing={true}"
      ],
      bad: [
        "requiresManualReading",
        "helpInSeparateDocs",
        "noInlineGuidance"
      ]
    },
    relatedLaws: ['occams_razor', 'jakobs_law']
  }
};

export const LAW_CATEGORIES = {
  heuristic: {
    name: 'Heuristic Laws',
    nameEs: 'Leyes Heurísticas',
    description: 'Fundamental UX principles based on human behavior research'
  },
  gestalt: {
    name: 'Gestalt Principles',
    nameEs: 'Principios Gestalt',
    description: 'Visual perception principles for grouping and organization'
  },
  cognitive: {
    name: 'Cognitive Effects',
    nameEs: 'Efectos Cognitivos',
    description: 'Memory and attention-related psychological effects'
  },
  performance: {
    name: 'Performance Principles',
    nameEs: 'Principios de Rendimiento',
    description: 'Time and response-related guidelines'
  },
  design: {
    name: 'Design Principles',
    nameEs: 'Principios de Diseño',
    description: 'General design philosophy and approach'
  },
  mental: {
    name: 'Mental Concepts',
    nameEs: 'Conceptos Mentales',
    description: 'Cognitive and psychological foundations'
  }
};

export function getLawById(id: string): UXLaw | undefined {
  return UX_LAWS[id];
}

export function getLawsByCategory(category: string): UXLaw[] {
  return Object.values(UX_LAWS).filter(law => law.category === category);
}

export function getAllLaws(): UXLaw[] {
  return Object.values(UX_LAWS);
}
