import { Badge } from '../types';

export const GAME_BADGES: Badge[] = [
  {
    id: 'badge-novice',
    title: 'Iniciación Anti-Adivinanza',
    description: 'Comienza tu viaje en el entrenador pedagógico de matemáticas.',
    iconName: 'Sparkles',
    color: '#FFDE59',
    unlocked: true,
  },
  {
    id: 'badge-signs',
    title: 'Cazador de Signos',
    description: 'Usa el desarmador para encontrar el (-1) invisible en 3 expresiones.',
    iconName: 'Wrench',
    color: '#38B6FF',
    unlocked: false,
  },
  {
    id: 'badge-distributive',
    title: 'Guardián de la Distributiva',
    description: 'Visualiza el modelo de área a(b+c) = ab + ac en el Widget interactivo.',
    iconName: 'LayoutGrid',
    color: '#7ED957',
    unlocked: false,
  },
  {
    id: 'badge-perfect-trial',
    title: 'Combos Perfectos',
    description: 'Completa cualquier Combo Trial con 0 movimientos ilegales.',
    iconName: 'Trophy',
    color: '#FF5757',
    unlocked: false,
  },
  {
    id: 'badge-sets',
    title: 'Clasificador de Conjuntos',
    description: 'Empaca correctamente los números en las cajas N, Z, Q, I, R.',
    iconName: 'Box',
    color: '#C852FF',
    unlocked: false,
  },
  {
    id: 'badge-balance',
    title: 'Maestro del Balance',
    description: 'Mantiene la balanza algebraica en equilibrio perfecto.',
    iconName: 'Scale',
    color: '#38B6FF',
    unlocked: false,
  },
  {
    id: 'badge-proof',
    title: 'Demostrador Formal',
    description: 'Completa la demostración del Producto Notable paso a paso.',
    iconName: 'Award',
    color: '#FFDE59',
    unlocked: false,
  },
];

export const BADGES_LIST = GAME_BADGES;
