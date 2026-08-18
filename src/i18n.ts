/**
 * ============================================================================
 * ARCHIVO CENTRAL DE TEXTOS Y DICCIONARIO i18n
 * ============================================================================
 * Este archivo centraliza todos los textos de la interfaz (títulos, mensajes
 * de bienvenida, etiquetas, botones, modales y advertencias) en un objeto JSON
 * para eliminar el hardcode de componentes.
 */

export const i18n = {
  // Identidad de marca y metadatos
  brand: {
    name: 'Entrenador Anti-Adivinanza',
    shortName: 'Anti-Adivinanza',
    tagline: 'Plataforma pedagógica de matemáticas sin adivinanzas',
    version: '2.5.0',
    institution: 'Bachillerato & Preparatoria',
  },

  // Encabezado principal (Header)
  header: {
    greetingTitle: '¡Conquista las matemáticas!',
    greetingSubtitlePrefix: 'Hola,',
    defaultStudentName: 'Ian',
    levelProgressLabel: 'Mi Progreso de Nivel',
    levelPrefix: 'Niv.',
    xpSuffix: 'XP',
    xpStarTooltip: 'Ver perfil y progreso',
    notificationsTitle: 'Notificaciones y Novedades',
    profileAvatarTooltip: 'Ver perfil de usuario',
  },

  // Navegación flotante inferior
  navigation: {
    home: 'Inicio',
    arena: 'Arena',
    classes: 'Clases',
    progress: 'Progreso',
    arsenal: 'Arsenal',
    attendance: 'Asistencia',
    badges: 'Insignias',
  },

  // Pantalla principal / Enciclopedia de Volúmenes
  home: {
    activeChallengesTitle: 'Desafíos & Temas Activos',
    volumesTitle: 'Enciclopedia de Volúmenes',
    volumesSubtitle: 'Guías teóricas, demostraciones paso a paso y laboratorios interactivos',
    searchPlaceholder: 'Buscar tema, propiedad o fórmula... (Ctrl + K)',
    searchButton: 'Buscar',
    filterAll: 'Todos los Volúmenes',
    btnReadGuide: 'Ver Guía Teórica',
    btnPractice: 'Practicar en Arena',
    btnInteractiveLab: 'Laboratorio Visual',
    completedBadge: 'Completado',
    startTopic: 'Comenzar Tema',
    xpRewardBadge: '+50 XP',
    volPrefix: 'VOLUMEN',
    topicsCountLabel: 'Temas',
  },

  // Buscador Global Modal (Ctrl + K)
  searchModal: {
    title: 'Buscador Global Anti-Adivinanza',
    placeholder: 'Buscar cualquier tema, fórmula o propiedad...',
    shortcutsLabel: 'Accesos Rápidos:',
    noResultsTitle: 'No se encontraron temas para',
    noResultsHint: 'Prueba buscando términos como "álgebra", "fracciones", "pitágoras" o "ecuaciones".',
    footerShortcut: 'Usa Ctrl + K en cualquier momento para buscar',
    footerBrand: 'Entrenador Anti-Adivinanza',
  },

  // Modal del Arsenal de Propiedades Reales
  arsenalModal: {
    title: 'Arsenal de la Ley Real',
    subtitle: 'Propiedades Fundamentales de los Números Reales',
    searchPlaceholder: 'Buscar propiedad...',
    filterAll: 'Todas',
    exampleLabel: 'Ejemplo:',
    commonTrapLabel: 'Trampa Común:',
    footerHint: '💡 Cada transformación debe estar legalmente justificada con una de estas propiedades.',
  },

  // Modal de Medallero e Insignias
  badgesModal: {
    title: 'Medallero & Insignias',
    subtitle: 'Logros desbloqueados en el Entrenador Anti-Adivinanza',
    unlockedBadge: 'Desbloqueada',
    lockedBadge: 'Bloqueada',
    emptyTitle: '¡Continúa practicando!',
    emptySubtitle: 'Resuelve ejercicios en la Arena y completa volúmenes para ganar más insignias.',
  },

  // Modal y Vista de Perfil
  profile: {
    title: 'Perfil del Estudiante',
    role: 'Estudiante Bachillerato',
    currentStreakLabel: 'Racha Actual',
    daysSuffix: 'Días Activos',
    perfectCombosLabel: 'Combos Perfectos',
    trapsAvoidedLabel: 'Trampas Evitadas',
    levelProgressTitle: 'Progreso hacia el Nivel',
    badgesTitle: 'Insignias Destacadas',
    viewAllBadgesBtn: 'Ver Todas las Insignias',
    academicGoalLabel: 'Meta Académica',
    favoriteAreaLabel: 'Área Favorita',
    darkModeLabel: 'Modo Oscuro',
    darkModeSubtitle: 'Tema de alto contraste para estudiar',
    darkModeActive: 'Activado',
    darkModeInactive: 'Desactivado',
    closeTooltip: 'Cerrar perfil',
  },

  // Asistencia y Planificador
  attendance: {
    title: 'Registro de Asistencia & Horas',
    subtitle: 'Control de sesiones de estudio y temas cubiertos',
    btnRegister: 'Registrar Nueva Asistencia',
    sessionPrefix: 'Sesión #',
    completedStatus: 'Completada',
    emptyHistory: 'No hay registros de asistencia aún.',
    topicLabel: 'Tema Estudiado',
    dateLabel: 'Fecha y Hora',
    notesLabel: 'Notas de la sesión',
  },

  // Minijuegos & Arena
  games: {
    asedioTitle: 'Asedio Lineal',
    asedioSubtitle: 'Defiende la base resolviendo operaciones matemáticas contra el reloj',
    crossMathTitle: 'CrossMath Crucigrama',
    crossMathSubtitle: 'Calcula las casillas faltantes para que todas las operaciones coincidan',
    arenaTitle: 'Arena de Desafíos Anti-Adivinanza',
    arenaSubtitle: 'Supera combos de problemas aplicando propiedades matemáticas justificadas',
    illegalMoveWarningTitle: '¡Movimiento Ilegal Detectado!',
    illegalMoveWarningDesc: 'Esa operación rompe una ley matemática fundamental. Revisa el Arsenal.',
  },
} as const;

export type I18nType = typeof i18n;
export const APP_TEXTS = i18n;

/**
 * Función auxiliar para obtener textos por clave de ruta con valor por defecto
 * Ejemplo: t('header.greetingTitle')
 */
export function t(path: string, fallback?: string): string {
  const parts = path.split('.');
  let current: any = i18n;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return fallback || path;
    }
  }
  return typeof current === 'string' ? current : fallback || path;
}

export default i18n;
