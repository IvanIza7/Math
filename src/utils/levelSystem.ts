import { UserStats, ProgressEvent } from '../types';

export const XP_PER_LEVEL = 500;

export interface LevelProgress {
  level: number;
  currentXp: number;
  xpInCurrentLevel: number;
  xpNeededForNextLevel: number;
  progressPercent: number;
}

/**
 * Calcula el nivel alcanzado en base a los puntos de experiencia acumulados.
 * Los nuevos usuarios o usuarios con 0 XP siempre comienzan en Nivel 1.
 */
export function calculateLevel(xp: number = 0): number {
  if (!xp || xp <= 0 || isNaN(xp)) return 1;
  return Math.max(1, Math.floor(xp / XP_PER_LEVEL) + 1);
}

/**
 * Retorna la información detallada de progreso dentro del nivel actual.
 */
export function getLevelProgress(xp: number = 0): LevelProgress {
  const safeXp = Math.max(0, Number(xp) || 0);
  const level = calculateLevel(safeXp);
  const xpInCurrentLevel = safeXp % XP_PER_LEVEL;
  const progressPercent = Math.min(100, Math.round((xpInCurrentLevel / XP_PER_LEVEL) * 100));

  return {
    level,
    currentXp: safeXp,
    xpInCurrentLevel,
    xpNeededForNextLevel: XP_PER_LEVEL,
    progressPercent,
  };
}

/**
 * Normaliza las estadísticas de un usuario.
 * - Nuevos usuarios (sin progreso previo): Nivel 1 y 0 XP.
 * - Usuarios con progreso: Ajusta y normaliza el XP acumulado y su nivel correspondiente
 *   para corregir cualquier inflación causada por bugs de duplicación exponencial.
 */
export function normalizeUserStats(
  rawStats: Partial<UserStats> = {},
  events: ProgressEvent[] = []
): UserStats {
  const hasEvents = Array.isArray(events) && events.length > 0;
  
  // 1. Si hay eventos inmutables registrados, el XP real es exactamente la suma de deltas
  let cleanXp = 0;
  if (hasEvents) {
    cleanXp = events.reduce((sum, evt) => sum + (Number(evt.xpDelta) || 0), 0);
  } else {
    // Si no hay eventos pero hay progreso en rawStats
    const trials = rawStats.trialsCompleted || [];
    const topics = rawStats.completedTopics || [];
    const attendance = rawStats.attendanceRecords || [];
    const hasAnyProgress = trials.length > 0 || topics.length > 0 || attendance.length > 0;

    if (!hasAnyProgress && (!rawStats.xp || rawStats.xp <= 0)) {
      // Usuario completamente nuevo: Nivel 1, 0 XP
      cleanXp = 0;
    } else if (hasAnyProgress) {
      // Si el XP guardado es desproporcionado comparado con las actividades realizadas,
      // normalizamos con base en el valor estándar de las actividades completadas
      const estimatedMaxXp = trials.length * 100 + topics.length * 75 + attendance.length * 50;
      const currentXp = Number(rawStats.xp) || 0;
      
      // Si el XP guardado es más del triple de lo humanamente posible por las actividades,
      // fue afectado por el bug exponencial: lo normalizamos al estimado
      if (currentXp > estimatedMaxXp * 2.5 && estimatedMaxXp > 0) {
        cleanXp = estimatedMaxXp;
      } else {
        cleanXp = Math.max(0, currentXp);
      }
    } else {
      cleanXp = Math.max(0, Number(rawStats.xp) || 0);
    }
  }

  const computedLevel = calculateLevel(cleanXp);

  return {
    xp: cleanXp,
    level: computedLevel,
    streak: Math.max(0, Number(rawStats.streak) || 0),
    trialsCompleted: Array.isArray(rawStats.trialsCompleted) ? rawStats.trialsCompleted : [],
    badgesUnlocked: Array.isArray(rawStats.badgesUnlocked) ? rawStats.badgesUnlocked : [],
    perfectTrialsCount: Math.max(0, Number(rawStats.perfectTrialsCount) || 0),
    illegalMovesCaughtCount: Math.max(0, Number(rawStats.illegalMovesCaughtCount) || 0),
    attendanceRecords: Array.isArray(rawStats.attendanceRecords) ? rawStats.attendanceRecords : [],
    completedTopics: Array.isArray(rawStats.completedTopics) ? rawStats.completedTopics : [],
  };
}
