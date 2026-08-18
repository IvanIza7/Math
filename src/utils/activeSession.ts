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

const DEFAULT_HERO_ITEMS: ActiveHeroItem[] = [
  {
    id: 'active-arena-desafio-1',
    type: 'arena-challenge',
    title: 'Leyes de Signos y Combos',
    subtitle: '5 ejercicios prácticos',
    badge: 'ARENA · DESAFÍO 1',
    progressText: 'Paso 2 de 4',
    progressPercent: 50,
    totalSteps: 4,
    currentStep: 2,
    bgColor: 'bg-[#FFDE59]',
    bgGradient: 'bg-[#FFDE59]',
    textColor: 'text-[#1E1E24]',
    badgeBg: 'bg-[#1E1E24] text-white font-black',
    ctaBg: 'bg-transparent hover:bg-black/10 text-[#1E1E24]',
    theme: 'arithmetic',
    actionPayload: { challengeId: 'desafio-1' },
    lastUpdated: Date.now(),
  },
  {
    id: 'active-asedio-lineal',
    type: 'asedio',
    title: 'Asedio Lineal',
    subtitle: '4 rondas de cálculo',
    badge: 'MINIJUEGO · NIVEL 1',
    progressText: 'Ronda 1 de 4',
    progressPercent: 25,
    totalSteps: 4,
    currentStep: 1,
    bgColor: 'bg-[#6F78DB]',
    bgGradient: 'bg-[#6F78DB]',
    textColor: 'text-white',
    badgeBg: 'bg-[#F7CA38] text-[#1E1E24] font-black',
    ctaBg: 'bg-white hover:bg-[#F4F7FC] text-[#1E1E24]',
    theme: 'equations',
    actionPayload: { levelNumber: 1 },
    lastUpdated: Date.now() - 1000,
  },
  {
    id: 'active-cross-math',
    type: 'crossmath',
    title: 'CrossMath Crucigrama',
    subtitle: '3 operaciones cruzadas',
    badge: 'LÓGICA · PUZZLE',
    progressText: 'Nivel 1 de 3',
    progressPercent: 33,
    totalSteps: 3,
    currentStep: 1,
    bgColor: 'bg-[#38BDF8]',
    bgGradient: 'bg-[#38BDF8]',
    textColor: 'text-[#1E1E24]',
    badgeBg: 'bg-white text-[#1E1E24] font-black',
    ctaBg: 'bg-white hover:bg-sky-50 text-[#1E1E24]',
    theme: 'algebra',
    actionPayload: { difficulty: 'easy' },
    lastUpdated: Date.now() - 2000,
  },
  {
    id: 'active-vol-01',
    type: 'quiz',
    title: 'Axiomas de Números Reales',
    subtitle: '4 preguntas guiadas',
    badge: 'VOL-01 · GUÍA',
    progressText: 'Lección 1.1',
    progressPercent: 50,
    totalSteps: 4,
    currentStep: 2,
    bgColor: 'bg-[#7ED957]',
    bgGradient: 'bg-[#7ED957]',
    textColor: 'text-[#1E1E24]',
    badgeBg: 'bg-white text-[#1E1E24] font-black',
    ctaBg: 'bg-white hover:bg-emerald-50 text-[#1E1E24]',
    theme: 'powers',
    actionPayload: { volCode: 'VOL-01' },
    lastUpdated: Date.now() - 3000,
  },
];

export function getActiveHeroSessions(): ActiveHeroItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Sanitize any gradient classes to solid colors
        return parsed.map((item: any, idx: number) => {
          let solidBg = item.bgColor || item.bgGradient || DEFAULT_HERO_ITEMS[idx % DEFAULT_HERO_ITEMS.length].bgColor;
          if (solidBg.includes('gradient') || solidBg.includes('from-') || solidBg.includes('to-')) {
            solidBg = DEFAULT_HERO_ITEMS[idx % DEFAULT_HERO_ITEMS.length].bgColor;
          }
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

  return DEFAULT_HERO_ITEMS;
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
