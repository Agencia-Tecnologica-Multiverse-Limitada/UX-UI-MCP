# 🎯 UX Laws MCP v2.0

> MCP Server para análisis de interfaces basado en las 30 Leyes de UX con soporte **multi-plataforma** (20 plataformas).

## 📋 Características

- ✅ **30 Leyes de UX** extraídas de [lawsofux.com](https://lawsofux.com/es/)
- ✅ **20 Plataformas** con patrones específicos
- ✅ **Detección automática** de plataforma basada en código
- ✅ **37 Herramientas** (30 para leyes + 7 utilidades)
- ✅ **Checklists específicos** por plataforma y componente
- ✅ **Comparación entre plataformas**

## 🚀 Instalación

```bash
npm install
npm run build
```

## ⚙️ Configuración en Claude Desktop

Añade a tu `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "ux-laws": {
      "command": "node",
      "args": ["C:/ruta/a/UX-UI-MCP/dist/index.js"]
    }
  }
}
```

---

## 🖥️ Plataformas Soportadas (20)

El MCP detecta automáticamente la plataforma basándose en el código, o puedes especificarla manualmente.

### 🌐 Web (4)
| ID | Plataforma | Detección |
|----|------------|-----------|
| `web-html` | HTML/CSS | `<html>`, `<div>`, `class=` |
| `web-react` | React | `useState`, `<Component />`, `className=` |
| `web-vue` | Vue.js | `<template>`, `v-if`, `v-for` |
| `web-angular` | Angular | `*ngIf`, `[(ngModel)]`, `@Component` |

### 📱 Mobile (6)
| ID | Plataforma | Detección |
|----|------------|-----------|
| `ios-swiftui` | SwiftUI | `@State`, `VStack`, `.modifier` |
| `ios-uikit` | UIKit | `UIView`, `UIButton`, `@IBOutlet` |
| `android-compose` | Jetpack Compose | `@Composable`, `Modifier.`, `remember` |
| `android-xml` | Android XML | `android:`, `app:layout_` |
| `flutter` | Flutter | `Widget`, `StatelessWidget`, `BuildContext` |
| `react-native` | React Native | `<View>`, `StyleSheet.create`, `react-native` |

### 💻 Desktop (4)
| ID | Plataforma | Detección |
|----|------------|-----------|
| `desktop-electron` | Electron | `electron`, `ipcRenderer`, `BrowserWindow` |
| `desktop-wpf` | WPF | `<Window`, `x:Name`, `<Grid>` |
| `desktop-macos` | macOS/AppKit | `NSView`, `NSWindow`, `@IBAction` |
| `desktop-qt` | Qt/QML | `QWidget`, `QML`, `Q_OBJECT` |

### 🎙️ Voice (2)
| ID | Plataforma | Detección |
|----|------------|-----------|
| `voice-alexa` | Alexa Skills | `IntentHandler`, `Alexa`, `canHandle` |
| `voice-google` | Google Assistant | `DialogflowApp`, `conv.ask`, `actions-on-google` |

### ⌨️ CLI (1)
| ID | Plataforma | Detección |
|----|------------|-----------|
| `cli` | Command Line | `argv`, `commander`, `inquirer`, `chalk` |

### 🎮 Games (2)
| ID | Plataforma | Detección |
|----|------------|-----------|
| `game-unity` | Unity | `MonoBehaviour`, `GameObject`, `[SerializeField]` |
| `game-unreal` | Unreal Engine | `UCLASS`, `AActor`, `UUserWidget` |

### 🥽 XR (1)
| ID | Plataforma | Detección |
|----|------------|-----------|
| `ar-vr` | AR/VR | `XRController`, `ARSession`, `OVRInput` |

---

## 🛠️ Herramientas Disponibles (37)

### 📊 Herramientas por Ley (30)

Cada ley tiene su propia herramienta de análisis con patrones específicos por plataforma:

```
analyze_fitts_law          - Ley de Fitts (tamaños/distancias)
analyze_hicks_law          - Ley de Hick (complejidad de decisión)
analyze_jakobs_law         - Ley de Jakob (familiaridad)
analyze_millers_law        - Ley de Miller (7±2 elementos)
analyze_postels_law        - Ley de Postel (tolerancia)
analyze_peak_end_rule      - Regla del Peak-End
analyze_aesthetic_usability - Efecto Estética-Usabilidad
analyze_doherty_threshold  - Umbral de Doherty (<400ms)
analyze_teslers_law        - Ley de Tesler (complejidad irreducible)
analyze_pareto_principle   - Principio de Pareto (80/20)
analyze_proximity_law      - Ley de Proximidad
analyze_common_region_law  - Ley de Región Común
analyze_pragnanz_law       - Ley de Prägnanz
analyze_similarity_law     - Ley de Semejanza
analyze_uniform_connectedness - Conexión Uniforme
analyze_closure_law        - Ley de Cierre
analyze_common_fate_law    - Ley del Destino Común
analyze_continuity_law     - Ley de Continuidad
analyze_figure_ground      - Figura y Fondo
analyze_serial_position    - Efecto de Posición en Serie
analyze_von_restorff_effect - Efecto Von Restorff
analyze_zeigarnik_effect   - Efecto Zeigarnik
analyze_chunking           - Fragmentación (Chunking)
analyze_cognitive_load     - Carga Cognitiva
analyze_selective_attention - Atención Selectiva
analyze_goal_gradient      - Efecto de Gradiente de Meta
analyze_occams_razor       - Navaja de Occam
analyze_parkinsons_law     - Ley de Parkinson
analyze_progressive_disclosure - Revelación Progresiva
analyze_feedback_principle - Principio de Feedback
```

#### Parámetros de las herramientas de análisis:

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `code` | string | Código fuente a analizar |
| `component_description` | string | Descripción del componente |
| `platform` | enum | Plataforma (o "auto" para detectar) |
| `context` | string | Contexto adicional |

### 🔧 Herramientas de Utilidad (7)

#### `ux_full_audit`
Auditoría completa contra las 30 leyes.

```json
{
  "code": "<código>",
  "component_description": "Formulario de checkout",
  "platform": "web-react",
  "focus_areas": ["heuristics", "gestalt"]
}
```

#### `ux_get_law_info`
Información detallada de una ley específica.

```json
{
  "law_id": "fitts_law",
  "platform": "ios-swiftui"
}
```

#### `ux_list_laws`
Lista todas las leyes, opcionalmente filtradas por categoría.

```json
{
  "category": "gestalt"
}
```

#### `ux_checklist`
Genera checklist para un tipo de componente.

```json
{
  "component_type": "form",
  "platform": "flutter"
}
```

#### `ux_list_platforms`
Lista todas las plataformas soportadas.

```json
{
  "category": "mobile"
}
```

#### `ux_detect_platform`
Detecta la plataforma basándose en el código.

```json
{
  "code": "@Composable fun MyScreen() { ... }",
  "file_extension": ".kt"
}
```

#### `ux_compare_platforms`
Compara cómo aplicar una ley en diferentes plataformas.

```json
{
  "law_id": "fitts_law",
  "platforms": ["web-react", "ios-swiftui", "android-compose", "flutter"]
}
```

---

## 📚 Categorías de Leyes

| Categoría | Leyes | Descripción |
|-----------|-------|-------------|
| `heuristics` | 10 | Principios heurísticos fundamentales |
| `gestalt` | 9 | Principios de percepción visual |
| `cognitive` | 6 | Principios de psicología cognitiva |
| `principles` | 5 | Principios de diseño de UX |

---

## 💡 Ejemplos de Uso

### Analizar un botón en SwiftUI

```
Herramienta: analyze_fitts_law
{
  "code": "Button(action: {}) { Text(\"Submit\") }.frame(width: 200, height: 44)",
  "platform": "ios-swiftui"
}
```

### Auditoría completa de un formulario Flutter

```
Herramienta: ux_full_audit
{
  "code": "...(código del formulario)...",
  "platform": "flutter",
  "focus_areas": ["heuristics", "cognitive"]
}
```

### Comparar Ley de Fitts entre plataformas

```
Herramienta: ux_compare_platforms
{
  "law_id": "fitts_law",
  "platforms": ["web-react", "ios-swiftui", "android-compose", "game-unity"]
}
```

### Generar checklist de navegación para CLI

```
Herramienta: ux_checklist
{
  "component_type": "navigation",
  "platform": "cli"
}
```

---

## 🎯 Cómo el MCP Diferencia Plataformas

### 1. **Detección Automática**
Cuando usas `platform: "auto"`, el MCP analiza el código buscando patrones específicos:

```
SwiftUI  → @State, VStack, .frame
Compose  → @Composable, Modifier., remember
Flutter  → Widget, build(), StatelessWidget
React    → useState, className, <Component />
CLI      → argv, commander, inquirer
Voice    → IntentHandler, conv.ask
Games    → MonoBehaviour, AActor
```

### 2. **Patrones Específicos por Plataforma**
Cada ley tiene patrones de código adaptados:

**Ley de Fitts - Tamaños mínimos:**
- iOS: `44pt` (Human Interface Guidelines)
- Android: `48dp` (Material Design)
- Web: `44px` (WCAG)
- Games: Escalar con resolución

**Ley de Jakob - Patrones familiares:**
- iOS: TabBar inferior, Navigation Stack
- Android: BottomNavigation, Drawer
- Web: Hamburger menu, breadcrumbs
- CLI: Subcomandos tipo git

### 3. **Guidelines de Plataforma**
El MCP incluye referencias a las guías oficiales:
- 📘 Apple Human Interface Guidelines
- 📗 Material Design Guidelines
- 📙 Windows Design Guidelines
- 📕 Web Content Accessibility Guidelines

---

## 📂 Estructura del Proyecto

```
UX-UI-MCP/
├── src/
│   ├── index.ts                 # Servidor MCP principal
│   └── knowledge/
│       ├── ux-laws.ts           # 30 leyes de UX
│       ├── platforms.ts         # 20 definiciones de plataforma
│       └── platform-patterns.ts # Patrones específicos por plataforma
├── dist/                        # Código compilado
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔄 Changelog

### v2.0.0
- ✨ Soporte para 20 plataformas
- ✨ Detección automática de plataforma
- ✨ Patrones de código específicos por plataforma
- ✨ 3 nuevas herramientas: `ux_list_platforms`, `ux_detect_platform`, `ux_compare_platforms`
- ✨ Checklists específicos por plataforma
- 📚 Guidelines de plataforma en análisis

### v1.0.0
- 🎉 Release inicial
- 📚 30 leyes de UX
- 🛠️ 34 herramientas

---

## 📄 Licencia

MIT

---

## 🙏 Créditos

- Leyes de UX: [lawsofux.com](https://lawsofux.com/es/) por Jon Yablonski
- Basado en el protocolo MCP de Anthropic