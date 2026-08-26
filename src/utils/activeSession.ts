// Utilities to persist and resume active Arena challenges, Asedio Lineal levels, and Quizzes

export interface ActiveHeroItem {
  id: string; // e.g. "challenge-asedio", "arena-1", "vol-01"
  type: 'asedio' | 'arena-challenge' | 'quiz' | 'crossmath';
  title: string;
  subtitle: string;
  badge: string; // e.g. "ASEDIO LINEAL · NIVEL 1", "ARENA · DESAFÍO 1"
  progressText: string; // e.g. "Paso 1 de 3", "Pregunta 3 de 5", "Nivel 4"
  progressPercent: number; // 0 to 100
  totalSteps: number;
  currentStep: number;
  bgColor?: string; // Solid single color (no gradient)
  bgGradient?: string; // Backwards compatibility alias
  textColor: string;
  badgeBg: string;
  ctaBg: string;
  theme: 'algebra' | 'arithmetic' | 'equations' | 'powers';
  actionPayload: any; // data needed to resume
  lastUpdated: number;
}

const STORAGE_KEY = 'math_active_hero_sessions_v2';

export function getActiveHeroSessions(): ActiveHeroItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.map((item: any) => {
          // Backward compatibility check for bgGradient
          const solidBg = item.bgColor || item.bgGradient || 'bg-[#1E1E24]';
          return {
            ...item,
            bgColor: solidBg,
            bgGradient: solidBg,
          };
        });
      }
    }
  } catch (e) {
    // fallback
  }

  return [];
}

export function saveActiveHeroSession(item: ActiveHeroItem) {
  try {
    const current = getActiveHeroSessions();
    const filtered = current.filter((c) => c.id !== item.id);
    const updated = [{ ...item, lastUpdated: Date.now() }, ...filtered];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated.slice(0, 8)));
  } catch (e) {
    // ignore
  }
}

export function clearActiveHeroSessions() {
  localStorage.removeItem(STORAGE_KEY);
}
