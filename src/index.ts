#!/usr/bin/env node
/**
 * UX Laws MCP Server
 * 30+ herramientas basadas en las Leyes de UX de lawsofux.com
 * Con soporte multi-plataforma: Web, Mobile, Desktop, Voice, CLI, Games, AR/VR
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { UX_LAWS, UXLaw, getAllLaws, getLawById, getLawsByCategory, LAW_CATEGORIES } from './knowledge/ux-laws.js';
import { PLATFORMS, PlatformId, detectPlatform, getAllPlatforms, getPlatformsByCategory } from './knowledge/platforms.js';
import { getPatternsForPlatform, getAllPatternsForLaw, PlatformCodePatterns } from './knowledge/platform-patterns.js';

// Crear el servidor MCP
const server = new Server(
  {
    name: 'ux-laws-mcp',
    version: '2.0.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// ============================================
// DEFINICIÓN DE LAS HERRAMIENTAS
// ============================================

interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required: string[];
  };
}

const platformEnum = Object.keys(PLATFORMS);

function createLawTool(law: UXLaw): ToolDefinition {
  return {
    name: `analyze_${law.id}`,
    description: `🔍 ${law.nameEs} (${law.name})\n\n${law.definitionEs}\n\nAnaliza código o componentes UI según esta ley para CUALQUIER PLATAFORMA: Web, iOS, Android, Flutter, Desktop, CLI, Voice UI, Games, AR/VR.`,
    inputSchema: {
      type: 'object',
      properties: {
        code: {
          type: 'string',
          description: 'Código del componente UI a analizar (HTML, JSX, Swift, Kotlin, Dart, C#, etc.)',
        },
        component_description: {
          type: 'string',
          description: 'Descripción del componente o interfaz a analizar',
        },
        platform: {
          type: 'string',
          enum: platformEnum,
          description: 'Plataforma objetivo: web-react, ios-swiftui, android-compose, flutter, cli, voice-alexa, game-unity, ar-vr, etc. Usa "auto" para detectar automáticamente.',
        },
        context: {
          type: 'string',
          description: 'Contexto adicional sobre el uso del componente',
        },
      },
      required: [],
    },
  };
}

// Generar las 30 herramientas dinámicamente
const lawTools: ToolDefinition[] = getAllLaws().map(createLawTool);

// Herramienta adicional para análisis completo
const additionalTools: ToolDefinition[] = [
  {
    name: 'ux_full_audit',
    description: '🎯 Auditoría UX Completa Multi-Plataforma\n\nAnaliza un componente o interfaz contra TODAS las 30 leyes de UX, adaptado a la plataforma específica (Web, iOS, Android, Flutter, Desktop, CLI, Voice, Games, AR/VR).',
    inputSchema: {
      type: 'object',
      properties: {
        code: {
          type: 'string',
          description: 'Código del componente UI a analizar',
        },
        component_description: {
          type: 'string',
          description: 'Descripción del componente o interfaz',
        },
        platform: {
          type: 'string',
          enum: platformEnum,
          description: 'Plataforma: web-react, ios-swiftui, android-compose, flutter, cli, voice-alexa, game-unity, ar-vr, etc.',
        },
        focus_areas: {
          type: 'array',
          items: { type: 'string' },
          description: 'Áreas de enfoque: heuristic, gestalt, cognitive, performance, design, mental',
        },
      },
      required: [],
    },
  },
  {
    name: 'ux_get_law_info',
    description: '📚 Información de Ley UX por Plataforma\n\nObtiene información detallada sobre una ley de UX, con patrones de código específicos para la plataforma elegida.',
    inputSchema: {
      type: 'object',
      properties: {
        law_id: {
          type: 'string',
          description: 'ID de la ley (ej: fitts_law, hicks_law, jakobs_law)',
        },
        platform: {
          type: 'string',
          enum: platformEnum,
          description: 'Plataforma para patrones específicos',
        },
      },
      required: ['law_id'],
    },
  },
  {
    name: 'ux_list_laws',
    description: '📋 Listar Leyes de UX\n\nLista todas las leyes de UX disponibles, opcionalmente filtradas por categoría.',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          description: 'Categoría para filtrar: heuristic, gestalt, cognitive, performance, design, mental',
        },
      },
      required: [],
    },
  },
  {
    name: 'ux_list_platforms',
    description: '🖥️ Listar Plataformas Soportadas\n\nMuestra todas las plataformas soportadas para análisis UX, agrupadas por categoría.',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          enum: ['web', 'mobile', 'desktop', 'voice', 'cli', 'game', 'xr'],
          description: 'Filtrar por categoría de plataforma',
        },
      },
      required: [],
    },
  },
  {
    name: 'ux_checklist',
    description: '✅ Checklist de UX por Plataforma\n\nGenera un checklist de verificación UX adaptado al tipo de componente Y plataforma específica.',
    inputSchema: {
      type: 'object',
      properties: {
        component_type: {
          type: 'string',
          description: 'Tipo de componente: form, navigation, button, modal, list, card, dashboard, menu, input, onboarding',
        },
        platform: {
          type: 'string',
          enum: platformEnum,
          description: 'Plataforma específica para el checklist',
        },
      },
      required: ['component_type'],
    },
  },
  {
    name: 'ux_detect_platform',
    description: '🔎 Detectar Plataforma\n\nDetecta automáticamente la plataforma basándose en el código proporcionado.',
    inputSchema: {
      type: 'object',
      properties: {
        code: {
          type: 'string',
          description: 'Código para analizar y detectar la plataforma',
        },
        file_extension: {
          type: 'string',
          description: 'Extensión del archivo (ej: .tsx, .swift, .dart, .kt)',
        },
      },
      required: ['code'],
    },
  },
  {
    name: 'ux_compare_platforms',
    description: '⚖️ Comparar Implementaciones entre Plataformas\n\nMuestra cómo implementar una ley de UX en diferentes plataformas para comparación.',
    inputSchema: {
      type: 'object',
      properties: {
        law_id: {
          type: 'string',
          description: 'ID de la ley a comparar',
        },
        platforms: {
          type: 'array',
          items: { type: 'string' },
          description: 'Lista de plataformas a comparar (ej: ["web-react", "ios-swiftui", "android-compose"])',
        },
      },
      required: ['law_id'],
    },
  },
];

// Registrar handler de lista de herramientas
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [...lawTools, ...additionalTools],
  };
});

// ============================================
// FUNCIONES DE ANÁLISIS
// ============================================

function analyzeLaw(
  law: UXLaw, 
  code?: string, 
  description?: string, 
  platformId?: PlatformId,
  context?: string
): string {
  // Detectar plataforma si es auto o no especificada
  let detectedPlatform: PlatformId = platformId || 'auto';
  if (detectedPlatform === 'auto' && code) {
    detectedPlatform = detectPlatform(code);
  }
  if (detectedPlatform === 'auto') {
    detectedPlatform = 'web-html';
  }
  
  const platform = PLATFORMS[detectedPlatform] || PLATFORMS['web-html'];
  const platformPatterns = getPatternsForPlatform(law.id, detectedPlatform);
  
  const issues: string[] = [];
  const goodPractices: string[] = [];

  const textToAnalyze = `${code || ''} ${description || ''} ${context || ''}`.toLowerCase();

  // Usar patrones específicos de la plataforma si existen
  const patterns = platformPatterns || {
    good: law.codePatterns.good,
    bad: law.codePatterns.bad,
    guidelines: law.keyPointsEs,
  };

  // Analizar patrones malos
  patterns.bad.forEach((pattern) => {
    const normalizedPattern = pattern.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (textToAnalyze.includes(normalizedPattern) || 
        textToAnalyze.includes(pattern.toLowerCase())) {
      issues.push(`⚠️ Posible problema: patrón "${pattern}" encontrado`);
    }
  });

  // Verificar patrones buenos
  patterns.good.forEach((pattern) => {
    const normalizedPattern = pattern.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (textToAnalyze.includes(normalizedPattern) || 
        textToAnalyze.includes(pattern.toLowerCase())) {
      goodPractices.push(`✅ Buena práctica: "${pattern}"`);
    }
  });

  let response = `# 📊 Análisis: ${law.nameEs}\n\n`;
  response += `**Plataforma detectada:** ${platform.name} (${platform.category})\n\n`;
  response += `## 📖 Definición\n${law.definitionEs}\n\n`;
  
  response += `## 🎯 Puntos Clave\n`;
  law.keyPointsEs.forEach((point, i) => {
    response += `${i + 1}. ${point}\n`;
  });
  response += '\n';

  // Guidelines específicos de la plataforma
  if (platformPatterns?.guidelines) {
    response += `## 📱 Guidelines para ${platform.name}\n`;
    platformPatterns.guidelines.forEach((guideline, i) => {
      response += `${i + 1}. ${guideline}\n`;
    });
    response += '\n';
  }

  if (code || description) {
    response += `## 🔍 Resultados del Análisis\n\n`;
    
    if (goodPractices.length > 0) {
      response += `### ✅ Buenas Prácticas Detectadas\n`;
      goodPractices.forEach(gp => response += `${gp}\n`);
      response += '\n';
    }

    if (issues.length > 0) {
      response += `### ⚠️ Posibles Problemas\n`;
      issues.forEach(issue => response += `${issue}\n`);
      response += '\n';
    }

    if (issues.length === 0 && goodPractices.length === 0) {
      response += `ℹ️ No se detectaron patrones específicos. Revisa manualmente el checklist.\n\n`;
    }
  }

  response += `## ✅ Checklist de Verificación\n`;
  law.checklistItems.forEach(item => response += `- [ ] ${item}\n`);
  response += '\n';

  response += `## 💻 Patrones Recomendados para ${platform.name}\n`;
  response += '```\n';
  patterns.good.forEach(pattern => response += `${pattern}\n`);
  response += '```\n\n';

  response += `## ❌ Patrones a Evitar en ${platform.name}\n`;
  response += '```\n';
  patterns.bad.forEach(pattern => response += `${pattern}\n`);
  response += '```\n\n';

  response += `## 🔗 Leyes Relacionadas\n`;
  law.relatedLaws.forEach(relatedId => {
    const related = getLawById(relatedId);
    if (related) {
      response += `- ${related.nameEs} (\`analyze_${related.id}\`)\n`;
    }
  });

  return response;
}

function performFullAudit(
  code?: string, 
  description?: string, 
  platformId?: PlatformId,
  focusAreas?: string[]
): string {
  // Detectar plataforma
  let detectedPlatform: PlatformId = platformId || 'auto';
  if (detectedPlatform === 'auto' && code) {
    detectedPlatform = detectPlatform(code);
  }
  if (detectedPlatform === 'auto') {
    detectedPlatform = 'web-html';
  }
  const platform = PLATFORMS[detectedPlatform] || PLATFORMS['web-html'];

  const laws = focusAreas && focusAreas.length > 0
    ? getAllLaws().filter(law => focusAreas.includes(law.category))
    : getAllLaws();

  let response = `# 🎯 Auditoría UX Completa\n\n`;
  response += `**Plataforma:** ${platform.name} (${platform.category})\n`;
  response += `📊 **Analizando contra ${laws.length} leyes de UX**\n\n`;

  const categoryResults: Record<string, { passed: number; warnings: number; laws: string[] }> = {};

  laws.forEach(law => {
    if (!categoryResults[law.category]) {
      categoryResults[law.category] = { passed: 0, warnings: 0, laws: [] };
    }

    const textToAnalyze = `${code || ''} ${description || ''}`.toLowerCase();
    const platformPatterns = getPatternsForPlatform(law.id, detectedPlatform);
    const patterns = platformPatterns?.bad || law.codePatterns.bad;
    
    let hasWarnings = false;
    patterns.forEach((pattern) => {
      if (textToAnalyze.includes(pattern.toLowerCase())) {
        hasWarnings = true;
      }
    });

    if (hasWarnings) {
      categoryResults[law.category].warnings++;
      categoryResults[law.category].laws.push(`⚠️ ${law.nameEs}`);
    } else {
      categoryResults[law.category].passed++;
      categoryResults[law.category].laws.push(`✅ ${law.nameEs}`);
    }
  });

  // Resumen por categoría
  response += `## 📋 Resumen por Categoría\n\n`;
  
  Object.entries(categoryResults).forEach(([category, results]) => {
    const categoryInfo = LAW_CATEGORIES[category as keyof typeof LAW_CATEGORIES];
    const total = results.passed + results.warnings;
    const score = Math.round((results.passed / total) * 100);
    
    response += `### ${categoryInfo.nameEs}\n`;
    response += `**Puntuación: ${score}%** (${results.passed}/${total} leyes)\n\n`;
    results.laws.forEach(law => response += `- ${law}\n`);
    response += '\n';
  });

  // Puntuación global
  const totalPassed = Object.values(categoryResults).reduce((sum, r) => sum + r.passed, 0);
  const totalWarnings = Object.values(categoryResults).reduce((sum, r) => sum + r.warnings, 0);
  const globalScore = Math.round((totalPassed / (totalPassed + totalWarnings)) * 100);

  response += `## 🏆 Puntuación Global: ${globalScore}%\n\n`;

  if (globalScore >= 80) {
    response += `🎉 **Excelente!** La interfaz sigue la mayoría de las mejores prácticas de UX.\n`;
  } else if (globalScore >= 60) {
    response += `👍 **Bien!** Hay margen de mejora en algunas áreas.\n`;
  } else {
    response += `⚠️ **Necesita atención.** Se recomienda revisar las leyes marcadas con advertencias.\n`;
  }

  return response;
}

function getLawInfo(lawId: string, platformId?: PlatformId): string {
  const law = getLawById(lawId);
  
  if (!law) {
    const allLaws = getAllLaws();
    return `❌ Ley no encontrada: "${lawId}"\n\n**Leyes disponibles:**\n${allLaws.map(l => `- ${l.id}: ${l.nameEs}`).join('\n')}`;
  }

  const platform = platformId ? PLATFORMS[platformId] : null;
  const platformPatterns = platformId ? getPatternsForPlatform(lawId, platformId) : null;

  let response = `# ${law.nameEs}\n`;
  response += `## ${law.name}\n\n`;
  response += `**Categoría:** ${LAW_CATEGORIES[law.category as keyof typeof LAW_CATEGORIES].nameEs}\n`;
  if (platform) {
    response += `**Plataforma:** ${platform.name}\n`;
  }
  response += '\n';
  
  response += `## 📖 Definición\n${law.definitionEs}\n\n`;
  response += `## 🇬🇧 Definition (English)\n${law.definition}\n\n`;
  
  response += `## 🎯 Puntos Clave\n`;
  law.keyPointsEs.forEach((point, i) => response += `${i + 1}. ${point}\n`);
  response += '\n';

  // Guidelines específicos de plataforma
  if (platformPatterns?.guidelines) {
    response += `## 📱 Guidelines para ${platform?.name}\n`;
    platformPatterns.guidelines.forEach((g, i) => response += `${i + 1}. ${g}\n`);
    response += '\n';
  }

  response += `## ✅ Checklist\n`;
  law.checklistItems.forEach(item => response += `- [ ] ${item}\n`);
  response += '\n';

  // Patrones de código
  const goodPatterns = platformPatterns?.good || law.codePatterns.good;
  const badPatterns = platformPatterns?.bad || law.codePatterns.bad;

  response += `## 💻 Buenos Patrones${platform ? ` (${platform.name})` : ''}\n\`\`\`\n`;
  goodPatterns.forEach(p => response += `${p}\n`);
  response += `\`\`\`\n\n`;

  response += `## ❌ Patrones a Evitar${platform ? ` (${platform.name})` : ''}\n\`\`\`\n`;
  badPatterns.forEach(p => response += `${p}\n`);
  response += `\`\`\`\n\n`;

  // Si hay patrones para otras plataformas, mostrar resumen
  if (!platformId) {
    const allPatterns = getAllPatternsForLaw(lawId);
    if (allPatterns) {
      response += `## 🌐 Plataformas con patrones específicos\n`;
      Object.keys(allPatterns).forEach(pId => {
        const p = PLATFORMS[pId as PlatformId];
        if (p) response += `- ${p.name} (\`${pId}\`)\n`;
      });
      response += '\n';
    }
  }

  response += `## 🔗 Leyes Relacionadas\n`;
  law.relatedLaws.forEach(relatedId => {
    const related = getLawById(relatedId);
    if (related) response += `- **${related.nameEs}**: ${related.definitionEs}\n`;
  });

  return response;
}

function listLaws(category?: string): string {
  const laws = category ? getLawsByCategory(category) : getAllLaws();
  
  let response = `# 📚 Leyes de UX`;
  if (category && LAW_CATEGORIES[category as keyof typeof LAW_CATEGORIES]) {
    response += ` - ${LAW_CATEGORIES[category as keyof typeof LAW_CATEGORIES].nameEs}`;
  }
  response += `\n\n`;
  response += `*Todas las leyes soportan análisis multi-plataforma*\n\n`;

  if (category) {
    laws.forEach(law => {
      response += `## ${law.nameEs}\n`;
      response += `**ID:** \`${law.id}\` | **Herramienta:** \`analyze_${law.id}\`\n`;
      response += `${law.definitionEs}\n\n`;
    });
  } else {
    Object.entries(LAW_CATEGORIES).forEach(([catKey, catInfo]) => {
      const catLaws = getLawsByCategory(catKey);
      response += `## ${catInfo.nameEs}\n`;
      catLaws.forEach(law => {
        response += `- **${law.nameEs}** (\`analyze_${law.id}\`)\n`;
      });
      response += '\n';
    });
  }

  return response;
}

function listPlatforms(category?: string): string {
  const platforms = category 
    ? getPlatformsByCategory(category) 
    : getAllPlatforms();
  
  let response = `# 🖥️ Plataformas Soportadas\n\n`;
  response += `El MCP puede analizar interfaces para **${getAllPlatforms().length} plataformas** diferentes.\n\n`;

  if (category) {
    response += `## ${category.toUpperCase()}\n\n`;
    platforms.forEach(p => {
      response += `### ${p.name}\n`;
      response += `- **ID:** \`${p.id}\`\n`;
      response += `- **Extensiones:** ${p.fileExtensions.join(', ')}\n`;
      response += `- ${p.description}\n\n`;
    });
  } else {
    const categories = ['web', 'mobile', 'desktop', 'voice', 'cli', 'game', 'xr'];
    categories.forEach(cat => {
      const catPlatforms = getPlatformsByCategory(cat);
      if (catPlatforms.length > 0) {
        response += `## ${cat.toUpperCase()}\n`;
        catPlatforms.forEach(p => {
          response += `- **${p.name}** (\`${p.id}\`): ${p.description}\n`;
        });
        response += '\n';
      }
    });
  }

  response += `---\n`;
  response += `💡 **Tip:** Usa \`platform: "auto"\` para detección automática.\n`;

  return response;
}

function generateChecklist(componentType: string, platformId?: PlatformId): string {
  const platform = platformId ? PLATFORMS[platformId] : null;

  // Checklists base (agnósticos de plataforma)
  const baseChecklists: Record<string, { laws: string[]; items: string[] }> = {
    form: {
      laws: ['fitts_law', 'hicks_law', 'millers_law', 'proximity_law', 'postels_law', 'cognitive_load'],
      items: [
        'Campos agrupados lógicamente (Ley de Proximidad)',
        'Labels cerca de sus inputs',
        'Botón de submit suficientemente grande (Ley de Fitts)',
        'Máximo 7±2 campos visibles a la vez (Ley de Miller)',
        'Valores por defecto inteligentes',
        'Validación tolerante de formatos (Ley de Postel)',
        'Mensajes de error claros y contextuales',
        'Indicador de campos obligatorios',
        'Progreso visible en formularios largos',
      ],
    },
    navigation: {
      laws: ['hicks_law', 'jakobs_law', 'serial_position', 'millers_law'],
      items: [
        'Máximo 7 elementos en navegación principal (Ley de Miller)',
        'Elementos importantes al inicio y final (Posición en Serie)',
        'Patrones de navegación familiares (Ley de Jakob)',
        'Estado actual claramente indicado',
      ],
    },
    button: {
      laws: ['fitts_law', 'von_restorff_effect', 'similarity_law'],
      items: [
        'Tamaño mínimo adecuado para la plataforma (Ley de Fitts)',
        'Espaciado mínimo entre botones',
        'CTA principal visualmente distintivo (Von Restorff)',
        'Botones similares tienen estilo consistente (Semejanza)',
        'Estados hover/focus/disabled definidos',
        'Texto descriptivo de la acción',
      ],
    },
    modal: {
      laws: ['common_region_law', 'doherty_threshold', 'teslers_law', 'selective_attention'],
      items: [
        'Límites claros del modal (Región Común)',
        'Fondo oscurecido para focus (Atención Selectiva)',
        'Botón de cerrar visible',
        'Animación de entrada suave (<400ms)',
        'Acción principal destacada',
      ],
    },
    list: {
      laws: ['millers_law', 'serial_position', 'chunking', 'hicks_law'],
      items: [
        'Paginación para listas largas',
        'Elementos importantes al inicio (Posición en Serie)',
        'Agrupación por categorías si aplica (Chunking)',
        'Filtros disponibles para muchos items (Ley de Hick)',
        'Búsqueda para listas extensas',
        'Loading states para cargas',
      ],
    },
    card: {
      laws: ['common_region_law', 'proximity_law', 'aesthetic_usability'],
      items: [
        'Borde o fondo define el contenedor (Región Común)',
        'Información relacionada agrupada (Proximidad)',
        'Jerarquía visual clara',
        'CTA visible si aplica',
        'Consistencia entre cards similares',
        'Diseño estético (Estética-Usabilidad)',
      ],
    },
  };

  // Items específicos por plataforma
  const platformSpecificItems: Record<string, Record<string, string[]>> = {
    form: {
      'ios-swiftui': [
        'Usar Form { } con Sections',
        'TextContentType para autofill',
        'KeyboardType apropiado para cada campo',
      ],
      'android-compose': [
        'Usar OutlinedTextField con KeyboardOptions',
        'ImeAction para navegación entre campos',
        'visualTransformation para formateo',
      ],
      'flutter': [
        'TextFormField con validator',
        'TextInputFormatter para máscaras',
        'FocusNode para navegación',
      ],
      'web-react': [
        'React Hook Form o Formik para estado',
        'Zod/Yup para validación',
        'aria-describedby para errores',
      ],
      'cli': [
        'inquirer.js para prompts interactivos',
        'Validación inline con mensajes claros',
        'Valores por defecto sensatos',
      ],
      'voice-alexa': [
        'Slots con valores predefinidos',
        'Confirmación de datos importantes',
        'Reprompts para valores inválidos',
      ],
    },
    navigation: {
      'ios-swiftui': [
        'TabView con máximo 5 tabs (Apple HIG)',
        'NavigationStack para drill-down',
        '.toolbar para acciones contextuales',
      ],
      'android-compose': [
        'BottomNavigation con 3-5 destinos',
        'NavigationDrawer para más opciones',
        'TopAppBar con navegación up',
      ],
      'flutter': [
        'BottomNavigationBar o NavigationRail',
        'Navigator 2.0 o go_router',
        'Drawer para menú lateral',
      ],
      'cli': [
        'Subcomandos bien organizados (git style)',
        '--help disponible en todos los niveles',
        'Autocompletado de comandos',
      ],
    },
    button: {
      'ios-swiftui': [
        'Mínimo 44x44 puntos (Apple HIG)',
        '.buttonStyle(.borderedProminent) para CTA',
        '.tint() para color de acento',
      ],
      'android-compose': [
        'Mínimo 48x48 dp (Material Design)',
        'Button para primario, OutlinedButton para secundario',
        'FloatingActionButton para acción principal',
      ],
      'flutter': [
        'Mínimo 48x48 (Material)',
        'ElevatedButton, OutlinedButton, TextButton',
        'MaterialTapTargetSize.padded',
      ],
      'game-unity': [
        'Escalar con resolución de pantalla',
        'Hit area mayor que visual',
        'Feedback visual y sonoro',
      ],
    },
  };

  const baseChecklist = baseChecklists[componentType.toLowerCase()];
  
  if (!baseChecklist) {
    return `❌ Tipo de componente no reconocido: "${componentType}"\n\n**Tipos disponibles:** ${Object.keys(baseChecklists).join(', ')}`;
  }

  let response = `# ✅ Checklist UX: ${componentType.toUpperCase()}\n\n`;
  
  if (platform) {
    response += `**Plataforma:** ${platform.name}\n\n`;
  }

  response += `## 📚 Leyes Aplicables\n`;
  baseChecklist.laws.forEach(lawId => {
    const law = getLawById(lawId);
    if (law) response += `- **${law.nameEs}**: ${law.definitionEs}\n`;
  });
  response += '\n';

  response += `## ✅ Checklist General\n`;
  baseChecklist.items.forEach((item, i) => {
    response += `- [ ] ${i + 1}. ${item}\n`;
  });
  response += '\n';

  // Items específicos de plataforma
  if (platformId && platformSpecificItems[componentType.toLowerCase()]?.[platformId]) {
    response += `## 📱 Checklist Específico para ${platform?.name}\n`;
    platformSpecificItems[componentType.toLowerCase()][platformId].forEach((item, i) => {
      response += `- [ ] ${i + 1}. ${item}\n`;
    });
    response += '\n';
  }

  return response;
}

function detectPlatformTool(code: string, fileExtension?: string): string {
  const detected = detectPlatform(code, fileExtension);
  const platform = PLATFORMS[detected];

  let response = `# 🔎 Plataforma Detectada\n\n`;
  response += `## ${platform.name}\n`;
  response += `- **ID:** \`${detected}\`\n`;
  response += `- **Categoría:** ${platform.category}\n`;
  response += `- **Descripción:** ${platform.description}\n\n`;

  response += `## 🎯 Patrones detectados\n`;
  platform.detectPatterns.forEach(pattern => {
    const regex = new RegExp(pattern, 'i');
    if (regex.test(code)) {
      response += `- ✅ \`${pattern}\`\n`;
    }
  });
  response += '\n';

  response += `## 💡 Usa esta plataforma en tus análisis\n`;
  response += `\`\`\`\nplatform: "${detected}"\n\`\`\`\n`;

  return response;
}

function comparePlatforms(lawId: string, platforms?: string[]): string {
  const law = getLawById(lawId);
  
  if (!law) {
    return `❌ Ley no encontrada: "${lawId}"`;
  }

  const platformsToCompare = platforms?.map(p => p as PlatformId) || 
    ['web-react', 'ios-swiftui', 'android-compose', 'flutter'];

  let response = `# ⚖️ Comparación: ${law.nameEs}\n\n`;
  response += `${law.definitionEs}\n\n`;

  platformsToCompare.forEach(platformId => {
    const platform = PLATFORMS[platformId];
    const patterns = getPatternsForPlatform(lawId, platformId);

    if (platform) {
      response += `## ${platform.name}\n`;
      
      if (patterns) {
        response += `### ✅ Buenos patrones\n\`\`\`\n`;
        patterns.good.forEach(p => response += `${p}\n`);
        response += `\`\`\`\n\n`;

        if (patterns.guidelines?.length) {
          response += `### 📋 Guidelines\n`;
          patterns.guidelines.forEach((g, i) => response += `${i + 1}. ${g}\n`);
          response += '\n';
        }
      } else {
        response += `*No hay patrones específicos para esta plataforma. Usa los patrones genéricos.*\n\n`;
      }
    }
  });

  return response;
}

// ============================================
// HANDLER DE HERRAMIENTAS
// ============================================

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  // Herramientas de análisis por ley (con soporte multi-plataforma)
  if (name.startsWith('analyze_')) {
    const lawId = name.replace('analyze_', '');
    const law = getLawById(lawId);
    
    if (law) {
      const result = analyzeLaw(
        law,
        args?.code as string | undefined,
        args?.component_description as string | undefined,
        args?.platform as PlatformId | undefined,
        args?.context as string | undefined
      );
      return { content: [{ type: 'text', text: result }] };
    }
  }

  // Herramientas adicionales
  switch (name) {
    case 'ux_full_audit':
      return {
        content: [{
          type: 'text',
          text: performFullAudit(
            args?.code as string | undefined,
            args?.component_description as string | undefined,
            args?.platform as PlatformId | undefined,
            args?.focus_areas as string[] | undefined
          ),
        }],
      };

    case 'ux_get_law_info':
      return {
        content: [{
          type: 'text',
          text: getLawInfo(
            args?.law_id as string,
            args?.platform as PlatformId | undefined
          ),
        }],
      };

    case 'ux_list_laws':
      return {
        content: [{
          type: 'text',
          text: listLaws(args?.category as string | undefined),
        }],
      };

    case 'ux_checklist':
      return {
        content: [{
          type: 'text',
          text: generateChecklist(
            args?.component_type as string,
            args?.platform as PlatformId | undefined
          ),
        }],
      };

    case 'ux_list_platforms':
      return {
        content: [{
          type: 'text',
          text: listPlatforms(args?.category as string | undefined),
        }],
      };

    case 'ux_detect_platform':
      return {
        content: [{
          type: 'text',
          text: detectPlatformTool(
            args?.code as string,
            args?.file_extension as string | undefined
          ),
        }],
      };

    case 'ux_compare_platforms':
      return {
        content: [{
          type: 'text',
          text: comparePlatforms(
            args?.law_id as string,
            args?.platforms as string[] | undefined
          ),
        }],
      };

    default:
      return {
        content: [{
          type: 'text',
          text: `❌ Herramienta no encontrada: ${name}`,
        }],
      };
  }
});

// ============================================
// RECURSOS
// ============================================

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: 'ux-laws://all',
        name: 'Todas las Leyes de UX',
        description: 'Lista completa de las 30 leyes de UX',
        mimeType: 'text/markdown',
      },
      ...Object.keys(LAW_CATEGORIES).map(cat => ({
        uri: `ux-laws://category/${cat}`,
        name: LAW_CATEGORIES[cat as keyof typeof LAW_CATEGORIES].nameEs,
        description: LAW_CATEGORIES[cat as keyof typeof LAW_CATEGORIES].description,
        mimeType: 'text/markdown',
      })),
      {
        uri: 'ux-laws://platforms',
        name: 'Plataformas Soportadas',
        description: 'Lista de las 20 plataformas con soporte específico',
        mimeType: 'text/markdown',
      },
    ],
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  if (uri === 'ux-laws://all') {
    return {
      contents: [{
        uri,
        mimeType: 'text/markdown',
        text: listLaws(),
      }],
    };
  }

  if (uri === 'ux-laws://platforms') {
    return {
      contents: [{
        uri,
        mimeType: 'text/markdown',
        text: listPlatforms(),
      }],
    };
  }

  if (uri.startsWith('ux-laws://category/')) {
    const category = uri.replace('ux-laws://category/', '');
    return {
      contents: [{
        uri,
        mimeType: 'text/markdown',
        text: listLaws(category),
      }],
    };
  }

  throw new Error(`Resource not found: ${uri}`);
});

// ============================================
// INICIAR SERVIDOR
// ============================================

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('🎨 UX Laws MCP Server running - 30 laws loaded');
}

main().catch(console.error);
