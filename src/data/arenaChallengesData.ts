import { ECUACIONES_ENTERAS, ECUACIONES_FRACCIONES } from './ecuacionesChallenges';

export interface ArenaQuestion {
  id: string;
  question: string;
  latex?: string;
  options?: Array<{ key: string; text: string; isCorrect?: boolean }>;
  correctKey: string;
  explanation?: string;
  inputType?: 'options' | 'text';
}

export interface ArenaChallenge {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  totalExercises: number;
  passingScore: number; // 3 out of 5
  color: string;
  bgGradient: string;
  badgeBg: string;
  questions: ArenaQuestion[];
}

export const ARENA_CHALLENGES: ArenaChallenge[] = [
  {
    id: 'desafio-1',
    title: 'DESAFÍO 1: LEYES DE SIGNOS Y MULTIPLICACIÓN',
    shortTitle: 'Leyes de Signos y Multiplicación',
    description: 'Banco de 50 ejercicios de multiplicación con signos y opuestos',
    totalExercises: 50,
    passingScore: 3,
    color: '#6F78DB',
    bgGradient: 'from-[#6F78DB] to-[#5A63C8]',
    badgeBg: 'bg-[#F7CA38] text-[#1E1E24]',
    questions: [
      { id: 'd1-1', question: '¿Cuál es el resultado?', latex: '-(-8)', options: [{ key: 'A', text: '8', isCorrect: true }, { key: 'B', text: '−8', isCorrect: false }, { key: 'C', text: '0', isCorrect: false }, { key: 'D', text: '−16', isCorrect: false }], correctKey: 'A' },
      { id: 'd1-2', question: '¿Cuál es el resultado?', latex: '-(-15)', options: [{ key: 'A', text: '−15', isCorrect: false }, { key: 'B', text: '15', isCorrect: true }, { key: 'C', text: '30', isCorrect: false }, { key: 'D', text: '−1', isCorrect: false }], correctKey: 'B' },
      { id: 'd1-3', question: '¿Cuál es el resultado?', latex: '(-4)(-6)', options: [{ key: 'A', text: '−24', isCorrect: false }, { key: 'B', text: '24', isCorrect: true }, { key: 'C', text: '−10', isCorrect: false }, { key: 'D', text: '10', isCorrect: false }], correctKey: 'B' },
      { id: 'd1-4', question: '¿Cuál es el resultado?', latex: '(-7)(+3)', options: [{ key: 'A', text: '21', isCorrect: false }, { key: 'B', text: '−21', isCorrect: true }, { key: 'C', text: '−4', isCorrect: false }, { key: 'D', text: '−10', isCorrect: false }], correctKey: 'B' },
      { id: 'd1-5', question: '¿Cuál es el resultado?', latex: '(+5)(-8)', options: [{ key: 'A', text: '−40', isCorrect: true }, { key: 'B', text: '40', isCorrect: false }, { key: 'C', text: '−13', isCorrect: false }, { key: 'D', text: '−3', isCorrect: false }], correctKey: 'A' },
      { id: 'd1-6', question: '¿Cuál es el resultado?', latex: '(-9)(-2)', options: [{ key: 'A', text: '−18', isCorrect: false }, { key: 'B', text: '18', isCorrect: true }, { key: 'C', text: '−11', isCorrect: false }, { key: 'D', text: '7', isCorrect: false }], correctKey: 'B' },
      { id: 'd1-7', question: '¿Cuál es el resultado?', latex: '-(-24)', options: [{ key: 'A', text: '−24', isCorrect: false }, { key: 'B', text: '24', isCorrect: true }, { key: 'C', text: '0', isCorrect: false }, { key: 'D', text: '−1', isCorrect: false }], correctKey: 'B' },
      { id: 'd1-8', question: '¿Cuál es el resultado?', latex: '(-12)(+4)', options: [{ key: 'A', text: '48', isCorrect: false }, { key: 'B', text: '−48', isCorrect: true }, { key: 'C', text: '−8', isCorrect: false }, { key: 'D', text: '−16', isCorrect: false }], correctKey: 'B' },
      { id: 'd1-9', question: '¿Cuál es el resultado?', latex: '(-6)(-7)', options: [{ key: 'A', text: '42', isCorrect: true }, { key: 'B', text: '−42', isCorrect: false }, { key: 'C', text: '−13', isCorrect: false }, { key: 'D', text: '13', isCorrect: false }], correctKey: 'A' },
      { id: 'd1-10', question: '¿Cuál es el resultado?', latex: '(+8)(+9)', options: [{ key: 'A', text: '−72', isCorrect: false }, { key: 'B', text: '72', isCorrect: true }, { key: 'C', text: '17', isCorrect: false }, { key: 'D', text: '−17', isCorrect: false }], correctKey: 'B' },
      { id: 'd1-11', question: '¿Cuál es el resultado?', latex: '-(-50)', options: [{ key: 'A', text: '−50', isCorrect: false }, { key: 'B', text: '50', isCorrect: true }, { key: 'C', text: '0', isCorrect: false }, { key: 'D', text: '25', isCorrect: false }], correctKey: 'B' },
      { id: 'd1-12', question: '¿Cuál es el resultado?', latex: '(-3)(-3)', options: [{ key: 'A', text: '−9', isCorrect: false }, { key: 'B', text: '9', isCorrect: true }, { key: 'C', text: '−6', isCorrect: false }, { key: 'D', text: '6', isCorrect: false }], correctKey: 'B' },
      { id: 'd1-13', question: '¿Cuál es el resultado?', latex: '(-11)(-5)', options: [{ key: 'A', text: '55', isCorrect: true }, { key: 'B', text: '−55', isCorrect: false }, { key: 'C', text: '−16', isCorrect: false }, { key: 'D', text: '16', isCorrect: false }], correctKey: 'A' },
      { id: 'd1-14', question: '¿Cuál es el resultado?', latex: '(-10)(+6)', options: [{ key: 'A', text: '60', isCorrect: false }, { key: 'B', text: '−60', isCorrect: true }, { key: 'C', text: '−4', isCorrect: false }, { key: 'D', text: '−16', isCorrect: false }], correctKey: 'B' },
      { id: 'd1-15', question: '¿Cuál es el resultado?', latex: '-[-(-7)]', options: [{ key: 'A', text: '7', isCorrect: false }, { key: 'B', text: '−7', isCorrect: true }, { key: 'C', text: '0', isCorrect: false }, { key: 'D', text: '−14', isCorrect: false }], correctKey: 'B' },
      { id: 'd1-16', question: '¿Cuál es el resultado?', latex: '(-5)(+12)', options: [{ key: 'A', text: '−60', isCorrect: true }, { key: 'B', text: '60', isCorrect: false }, { key: 'C', text: '−7', isCorrect: false }, { key: 'D', text: '7', isCorrect: false }], correctKey: 'A' },
      { id: 'd1-17', question: '¿Cuál es el resultado?', latex: '(-8)(-8)', options: [{ key: 'A', text: '−64', isCorrect: false }, { key: 'B', text: '64', isCorrect: true }, { key: 'C', text: '−16', isCorrect: false }, { key: 'D', text: '16', isCorrect: false }], correctKey: 'B' },
      { id: 'd1-18', question: '¿Cuál es el resultado?', latex: '-(-100)', options: [{ key: 'A', text: '−100', isCorrect: false }, { key: 'B', text: '100', isCorrect: true }, { key: 'C', text: '0', isCorrect: false }, { key: 'D', text: '−50', isCorrect: false }], correctKey: 'B' },
      { id: 'd1-19', question: '¿Cuál es el resultado?', latex: '(+7)(-9)', options: [{ key: 'A', text: '−63', isCorrect: true }, { key: 'B', text: '63', isCorrect: false }, { key: 'C', text: '−2', isCorrect: false }, { key: 'D', text: '2', isCorrect: false }], correctKey: 'A' },
      { id: 'd1-20', question: '¿Cuál es el resultado?', latex: '(-2)(-14)', options: [{ key: 'A', text: '−28', isCorrect: false }, { key: 'B', text: '28', isCorrect: true }, { key: 'C', text: '−16', isCorrect: false }, { key: 'D', text: '12', isCorrect: false }], correctKey: 'B' },
      { id: 'd1-21', question: '¿Cuál es el resultado?', latex: '-(-33)', options: [{ key: 'A', text: '33', isCorrect: true }, { key: 'B', text: '−33', isCorrect: false }, { key: 'C', text: '0', isCorrect: false }, { key: 'D', text: '−11', isCorrect: false }], correctKey: 'A' },
      { id: 'd1-22', question: '¿Cuál es el resultado?', latex: '(-13)(+2)', options: [{ key: 'A', text: '26', isCorrect: false }, { key: 'B', text: '−26', isCorrect: true }, { key: 'C', text: '−11', isCorrect: false }, { key: 'D', text: '−15', isCorrect: false }], correctKey: 'B' },
      { id: 'd1-23', question: '¿Cuál es el resultado?', latex: '(-4)(+8)', options: [{ key: 'A', text: '−32', isCorrect: true }, { key: 'B', text: '32', isCorrect: false }, { key: 'C', text: '−4', isCorrect: false }, { key: 'D', text: '4', isCorrect: false }], correctKey: 'A' },
      { id: 'd1-24', question: '¿Cuál es el resultado?', latex: '(-6)(-6)', options: [{ key: 'A', text: '−36', isCorrect: false }, { key: 'B', text: '36', isCorrect: true }, { key: 'C', text: '−12', isCorrect: false }, { key: 'D', text: '0', isCorrect: false }], correctKey: 'B' },
      { id: 'd1-25', question: '¿Cuál es el resultado?', latex: '-(-45)', options: [{ key: 'A', text: '−45', isCorrect: false }, { key: 'B', text: '45', isCorrect: true }, { key: 'C', text: '0', isCorrect: false }, { key: 'D', text: '90', isCorrect: false }], correctKey: 'B' },
      { id: 'd1-26', question: '¿Cuál es el resultado?', latex: '(-15)(-3)', options: [{ key: 'A', text: '45', isCorrect: true }, { key: 'B', text: '−45', isCorrect: false }, { key: 'C', text: '−18', isCorrect: false }, { key: 'D', text: '18', isCorrect: false }], correctKey: 'A' },
      { id: 'd1-27', question: '¿Cuál es el resultado?', latex: '(+14)(-2)', options: [{ key: 'A', text: '−28', isCorrect: true }, { key: 'B', text: '28', isCorrect: false }, { key: 'C', text: '−12', isCorrect: false }, { key: 'D', text: '16', isCorrect: false }], correctKey: 'A' },
      { id: 'd1-28', question: '¿Cuál es el resultado?', latex: '-[-(-12)]', options: [{ key: 'A', text: '12', isCorrect: false }, { key: 'B', text: '−12', isCorrect: true }, { key: 'C', text: '0', isCorrect: false }, { key: 'D', text: '−24', isCorrect: false }], correctKey: 'B' },
      { id: 'd1-29', question: '¿Cuál es el resultado?', latex: '(-7)(-7)', options: [{ key: 'A', text: '−49', isCorrect: false }, { key: 'B', text: '49', isCorrect: true }, { key: 'C', text: '−14', isCorrect: false }, { key: 'D', text: '0', isCorrect: false }], correctKey: 'B' },
      { id: 'd1-30', question: '¿Cuál es el resultado?', latex: '(-20)(+5)', options: [{ key: 'A', text: '100', isCorrect: false }, { key: 'B', text: '−100', isCorrect: true }, { key: 'C', text: '−15', isCorrect: false }, { key: 'D', text: '−25', isCorrect: false }], correctKey: 'B' },
      { id: 'd1-31', question: '¿Cuál es el resultado?', latex: '-(-81)', options: [{ key: 'A', text: '81', isCorrect: true }, { key: 'B', text: '−81', isCorrect: false }, { key: 'C', text: '9', isCorrect: false }, { key: 'D', text: '−9', isCorrect: false }], correctKey: 'A' },
      { id: 'd1-32', question: '¿Cuál es el resultado?', latex: '(-3)(-12)', options: [{ key: 'A', text: '−36', isCorrect: false }, { key: 'B', text: '36', isCorrect: true }, { key: 'C', text: '−15', isCorrect: false }, { key: 'D', text: '15', isCorrect: false }], correctKey: 'B' },
      { id: 'd1-33', question: '¿Cuál es el resultado?', latex: '(-9)(+4)', options: [{ key: 'A', text: '−36', isCorrect: true }, { key: 'B', text: '36', isCorrect: false }, { key: 'C', text: '−5', isCorrect: false }, { key: 'D', text: '−13', isCorrect: false }], correctKey: 'A' },
      { id: 'd1-34', question: '¿Cuál es el resultado?', latex: '-(-64)', options: [{ key: 'A', text: '−64', isCorrect: false }, { key: 'B', text: '64', isCorrect: true }, { key: 'C', text: '8', isCorrect: false }, { key: 'D', text: '−8', isCorrect: false }], correctKey: 'B' },
      { id: 'd1-35', question: '¿Cuál es el resultado?', latex: '(-5)(-11)', options: [{ key: 'A', text: '55', isCorrect: true }, { key: 'B', text: '−55', isCorrect: false }, { key: 'C', text: '−16', isCorrect: false }, { key: 'D', text: '6', isCorrect: false }], correctKey: 'A' },
      { id: 'd1-36', question: '¿Cuál es el resultado?', latex: '(+6)(-8)', options: [{ key: 'A', text: '−48', isCorrect: true }, { key: 'B', text: '48', isCorrect: false }, { key: 'C', text: '−2', isCorrect: false }, { key: 'D', text: '14', isCorrect: false }], correctKey: 'A' },
      { id: 'd1-37', question: '¿Cuál es el resultado?', latex: '-[-(-3)]', options: [{ key: 'A', text: '3', isCorrect: false }, { key: 'B', text: '−3', isCorrect: true }, { key: 'C', text: '0', isCorrect: false }, { key: 'D', text: '−6', isCorrect: false }], correctKey: 'B' },
      { id: 'd1-38', question: '¿Cuál es el resultado?', latex: '(-16)(+2)', options: [{ key: 'A', text: '32', isCorrect: false }, { key: 'B', text: '−32', isCorrect: true }, { key: 'C', text: '−14', isCorrect: false }, { key: 'D', text: '−18', isCorrect: false }], correctKey: 'B' },
      { id: 'd1-39', question: '¿Cuál es el resultado?', latex: '(-4)(-9)', options: [{ key: 'A', text: '−36', isCorrect: false }, { key: 'B', text: '36', isCorrect: true }, { key: 'C', text: '−13', isCorrect: false }, { key: 'D', text: '13', isCorrect: false }], correctKey: 'B' },
      { id: 'd1-40', question: '¿Cuál es el resultado?', latex: '-(-120)', options: [{ key: 'A', text: '120', isCorrect: true }, { key: 'B', text: '−120', isCorrect: false }, { key: 'C', text: '0', isCorrect: false }, { key: 'D', text: '60', isCorrect: false }], correctKey: 'A' },
      { id: 'd1-41', question: '¿Cuál es el resultado?', latex: '(-25)(-4)', options: [{ key: 'A', text: '−100', isCorrect: false }, { key: 'B', text: '100', isCorrect: true }, { key: 'C', text: '−29', isCorrect: false }, { key: 'D', text: '29', isCorrect: false }], correctKey: 'B' },
      { id: 'd1-42', question: '¿Cuál es el resultado?', latex: '(+11)(-7)', options: [{ key: 'A', text: '−77', isCorrect: true }, { key: 'B', text: '77', isCorrect: false }, { key: 'C', text: '−4', isCorrect: false }, { key: 'D', text: '18', isCorrect: false }], correctKey: 'A' },
      { id: 'd1-43', question: '¿Cuál es el resultado?', latex: '-(-17)', options: [{ key: 'A', text: '−17', isCorrect: false }, { key: 'B', text: '17', isCorrect: true }, { key: 'C', text: '0', isCorrect: false }, { key: 'D', text: '34', isCorrect: false }], correctKey: 'B' },
      { id: 'd1-44', question: '¿Cuál es el resultado?', latex: '(-8)(+7)', options: [{ key: 'A', text: '−56', isCorrect: true }, { key: 'B', text: '56', isCorrect: false }, { key: 'C', text: '−1', isCorrect: false }, { key: 'D', text: '−15', isCorrect: false }], correctKey: 'A' },
      { id: 'd1-45', question: '¿Cuál es el resultado?', latex: '(-5)(-5)', options: [{ key: 'A', text: '−25', isCorrect: false }, { key: 'B', text: '25', isCorrect: true }, { key: 'C', text: '−10', isCorrect: false }, { key: 'D', text: '0', isCorrect: false }], correctKey: 'B' },
      { id: 'd1-46', question: '¿Cuál es el resultado?', latex: '-[-(-20)]', options: [{ key: 'A', text: '20', isCorrect: false }, { key: 'B', text: '−20', isCorrect: true }, { key: 'C', text: '0', isCorrect: false }, { key: 'D', text: '−40', isCorrect: false }], correctKey: 'B' },
      { id: 'd1-47', question: '¿Cuál es el resultado?', latex: '(-18)(+3)', options: [{ key: 'A', text: '54', isCorrect: false }, { key: 'B', text: '−54', isCorrect: true }, { key: 'C', text: '−15', isCorrect: false }, { key: 'D', text: '−21', isCorrect: false }], correctKey: 'B' },
      { id: 'd1-48', question: '¿Cuál es el resultado?', latex: '(-12)(-5)', options: [{ key: 'A', text: '−60', isCorrect: false }, { key: 'B', text: '60', isCorrect: true }, { key: 'C', text: '−17', isCorrect: false }, { key: 'D', text: '17', isCorrect: false }], correctKey: 'B' },
      { id: 'd1-49', question: '¿Cuál es el resultado?', latex: '(+9)(-9)', options: [{ key: 'A', text: '−81', isCorrect: true }, { key: 'B', text: '81', isCorrect: false }, { key: 'C', text: '0', isCorrect: false }, { key: 'D', text: '−18', isCorrect: false }], correctKey: 'A' },
      { id: 'd1-50', question: '¿Cuál es el resultado?', latex: '-(-250)', options: [{ key: 'A', text: '−250', isCorrect: false }, { key: 'B', text: '250', isCorrect: true }, { key: 'C', text: '0', isCorrect: false }, { key: 'D', text: '500', isCorrect: false }], correctKey: 'B' },
    ],
  },
  {
    id: 'desafio-2',
    title: 'DESAFÍO 2: SUMAS Y RESTAS CON SIGNOS',
    shortTitle: 'Sumas y Restas con Signos',
    description: 'Banco de 50 ejercicios de adición, sustracción y enteros con signo',
    totalExercises: 50,
    passingScore: 3,
    color: '#3B82F6',
    bgGradient: 'from-[#3B82F6] to-[#2563EB]',
    badgeBg: 'bg-[#F7CA38] text-[#1E1E24]',
    questions: [
      { id: 'd2-1', question: '¿Cuál es el resultado?', latex: '4 - 9', options: [{ key: 'A', text: '5', isCorrect: false }, { key: 'B', text: '−5', isCorrect: true }, { key: 'C', text: '−13', isCorrect: false }, { key: 'D', text: '13', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-2', question: '¿Cuál es el resultado?', latex: '-5 - 7', options: [{ key: 'A', text: '−12', isCorrect: true }, { key: 'B', text: '12', isCorrect: false }, { key: 'C', text: '−2', isCorrect: false }, { key: 'D', text: '2', isCorrect: false }], correctKey: 'A' },
      { id: 'd2-3', question: '¿Cuál es el resultado?', latex: '-8 + 2', options: [{ key: 'A', text: '6', isCorrect: false }, { key: 'B', text: '−6', isCorrect: true }, { key: 'C', text: '−10', isCorrect: false }, { key: 'D', text: '10', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-4', question: '¿Cuál es el resultado?', latex: '3 - (-5)', options: [{ key: 'A', text: '−2', isCorrect: false }, { key: 'B', text: '8', isCorrect: true }, { key: 'C', text: '−8', isCorrect: false }, { key: 'D', text: '2', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-5', question: '¿Cuál es el resultado?', latex: '-10 + 4 - 2', options: [{ key: 'A', text: '−8', isCorrect: true }, { key: 'B', text: '8', isCorrect: false }, { key: 'C', text: '−16', isCorrect: false }, { key: 'D', text: '−4', isCorrect: false }], correctKey: 'A' },
      { id: 'd2-6', question: '¿Cuál es el resultado?', latex: '6 - 11', options: [{ key: 'A', text: '5', isCorrect: false }, { key: 'B', text: '−5', isCorrect: true }, { key: 'C', text: '−17', isCorrect: false }, { key: 'D', text: '17', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-7', question: '¿Cuál es el resultado?', latex: '-3 - 8', options: [{ key: 'A', text: '−11', isCorrect: true }, { key: 'B', text: '11', isCorrect: false }, { key: 'C', text: '−5', isCorrect: false }, { key: 'D', text: '5', isCorrect: false }], correctKey: 'A' },
      { id: 'd2-8', question: '¿Cuál es el resultado?', latex: '-12 + 15', options: [{ key: 'A', text: '−3', isCorrect: false }, { key: 'B', text: '3', isCorrect: true }, { key: 'C', text: '−27', isCorrect: false }, { key: 'D', text: '27', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-9', question: '¿Cuál es el resultado?', latex: '7 - (-4)', options: [{ key: 'A', text: '3', isCorrect: false }, { key: 'B', text: '11', isCorrect: true }, { key: 'C', text: '−11', isCorrect: false }, { key: 'D', text: '−3', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-10', question: '¿Cuál es el resultado?', latex: '-6 + 6', options: [{ key: 'A', text: '−12', isCorrect: false }, { key: 'B', text: '0', isCorrect: true }, { key: 'C', text: '12', isCorrect: false }, { key: 'D', text: '1', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-11', question: '¿Cuál es el resultado?', latex: '-9 - 9', options: [{ key: 'A', text: '0', isCorrect: false }, { key: 'B', text: '−18', isCorrect: true }, { key: 'C', text: '18', isCorrect: false }, { key: 'D', text: '−1', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-12', question: '¿Cuál es el resultado?', latex: '2 - 14', options: [{ key: 'A', text: '12', isCorrect: false }, { key: 'B', text: '−12', isCorrect: true }, { key: 'C', text: '−16', isCorrect: false }, { key: 'D', text: '16', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-13', question: '¿Cuál es el resultado?', latex: '-15 + 8', options: [{ key: 'A', text: '−7', isCorrect: true }, { key: 'B', text: '7', isCorrect: false }, { key: 'C', text: '−23', isCorrect: false }, { key: 'D', text: '23', isCorrect: false }], correctKey: 'A' },
      { id: 'd2-14', question: '¿Cuál es el resultado?', latex: '-4 - (-6)', options: [{ key: 'A', text: '−10', isCorrect: false }, { key: 'B', text: '2', isCorrect: true }, { key: 'C', text: '−2', isCorrect: false }, { key: 'D', text: '10', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-15', question: '¿Cuál es el resultado?', latex: '10 - 25', options: [{ key: 'A', text: '15', isCorrect: false }, { key: 'B', text: '−15', isCorrect: true }, { key: 'C', text: '−35', isCorrect: false }, { key: 'D', text: '35', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-16', question: '¿Cuál es el resultado?', latex: '-20 - 30', options: [{ key: 'A', text: '−50', isCorrect: true }, { key: 'B', text: '50', isCorrect: false }, { key: 'C', text: '−10', isCorrect: false }, { key: 'D', text: '10', isCorrect: false }], correctKey: 'A' },
      { id: 'd2-17', question: '¿Cuál es el resultado?', latex: '-1 + 18', options: [{ key: 'A', text: '−17', isCorrect: false }, { key: 'B', text: '17', isCorrect: true }, { key: 'C', text: '−19', isCorrect: false }, { key: 'D', text: '19', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-18', question: '¿Cuál es el resultado?', latex: '5 - (-9)', options: [{ key: 'A', text: '−4', isCorrect: false }, { key: 'B', text: '14', isCorrect: true }, { key: 'C', text: '−14', isCorrect: false }, { key: 'D', text: '4', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-19', question: '¿Cuál es el resultado?', latex: '-7 - 13', options: [{ key: 'A', text: '−20', isCorrect: true }, { key: 'B', text: '20', isCorrect: false }, { key: 'C', text: '−6', isCorrect: false }, { key: 'D', text: '6', isCorrect: false }], correctKey: 'A' },
      { id: 'd2-20', question: '¿Cuál es el resultado?', latex: '-14 + 5', options: [{ key: 'A', text: '9', isCorrect: false }, { key: 'B', text: '−9', isCorrect: true }, { key: 'C', text: '−19', isCorrect: false }, { key: 'D', text: '19', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-21', question: '¿Cuál es el resultado?', latex: '8 - 15', options: [{ key: 'A', text: '7', isCorrect: false }, { key: 'B', text: '−7', isCorrect: true }, { key: 'C', text: '−23', isCorrect: false }, { key: 'D', text: '23', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-22', question: '¿Cuál es el resultado?', latex: '-11 - (-4)', options: [{ key: 'A', text: '−15', isCorrect: false }, { key: 'B', text: '−7', isCorrect: true }, { key: 'C', text: '7', isCorrect: false }, { key: 'D', text: '15', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-23', question: '¿Cuál es el resultado?', latex: '-2 + 9 - 5', options: [{ key: 'A', text: '2', isCorrect: true }, { key: 'B', text: '−2', isCorrect: false }, { key: 'C', text: '16', isCorrect: false }, { key: 'D', text: '−16', isCorrect: false }], correctKey: 'A' },
      { id: 'd2-24', question: '¿Cuál es el resultado?', latex: '12 - 20', options: [{ key: 'A', text: '8', isCorrect: false }, { key: 'B', text: '−8', isCorrect: true }, { key: 'C', text: '−32', isCorrect: false }, { key: 'D', text: '32', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-25', question: '¿Cuál es el resultado?', latex: '-16 - 8', options: [{ key: 'A', text: '−24', isCorrect: true }, { key: 'B', text: '24', isCorrect: false }, { key: 'C', text: '−8', isCorrect: false }, { key: 'D', text: '8', isCorrect: false }], correctKey: 'A' },
      { id: 'd2-26', question: '¿Cuál es el resultado?', latex: '-30 + 45', options: [{ key: 'A', text: '−15', isCorrect: false }, { key: 'B', text: '15', isCorrect: true }, { key: 'C', text: '−75', isCorrect: false }, { key: 'D', text: '75', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-27', question: '¿Cuál es el resultado?', latex: '6 - (-8)', options: [{ key: 'A', text: '−2', isCorrect: false }, { key: 'B', text: '14', isCorrect: true }, { key: 'C', text: '−14', isCorrect: false }, { key: 'D', text: '2', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-28', question: '¿Cuál es el resultado?', latex: '-18 + 7', options: [{ key: 'A', text: '−11', isCorrect: true }, { key: 'B', text: '11', isCorrect: false }, { key: 'C', text: '−25', isCorrect: false }, { key: 'D', text: '25', isCorrect: false }], correctKey: 'A' },
      { id: 'd2-29', question: '¿Cuál es el resultado?', latex: '-25 - 25', options: [{ key: 'A', text: '0', isCorrect: false }, { key: 'B', text: '−50', isCorrect: true }, { key: 'C', text: '50', isCorrect: false }, { key: 'D', text: '−1', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-30', question: '¿Cuál es el resultado?', latex: '1 - 10', options: [{ key: 'A', text: '9', isCorrect: false }, { key: 'B', text: '−9', isCorrect: true }, { key: 'C', text: '−11', isCorrect: false }, { key: 'D', text: '11', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-31', question: '¿Cuál es el resultado?', latex: '-8 - (-12)', options: [{ key: 'A', text: '−20', isCorrect: false }, { key: 'B', text: '4', isCorrect: true }, { key: 'C', text: '−4', isCorrect: false }, { key: 'D', text: '20', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-32', question: '¿Cuál es el resultado?', latex: '-5 - 4 - 3', options: [{ key: 'A', text: '−12', isCorrect: true }, { key: 'B', text: '12', isCorrect: false }, { key: 'C', text: '−6', isCorrect: false }, { key: 'D', text: '2', isCorrect: false }], correctKey: 'A' },
      { id: 'd2-33', question: '¿Cuál es el resultado?', latex: '13 - 19', options: [{ key: 'A', text: '6', isCorrect: false }, { key: 'B', text: '−6', isCorrect: true }, { key: 'C', text: '−32', isCorrect: false }, { key: 'D', text: '32', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-34', question: '¿Cuál es el resultado?', latex: '-22 + 10', options: [{ key: 'A', text: '12', isCorrect: false }, { key: 'B', text: '−12', isCorrect: true }, { key: 'C', text: '−32', isCorrect: false }, { key: 'D', text: '32', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-35', question: '¿Cuál es el resultado?', latex: '9 - (-3)', options: [{ key: 'A', text: '6', isCorrect: false }, { key: 'B', text: '12', isCorrect: true }, { key: 'C', text: '−12', isCorrect: false }, { key: 'D', text: '−6', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-36', question: '¿Cuál es el resultado?', latex: '-40 + 15', options: [{ key: 'A', text: '−25', isCorrect: true }, { key: 'B', text: '25', isCorrect: false }, { key: 'C', text: '−55', isCorrect: false }, { key: 'D', text: '55', isCorrect: false }], correctKey: 'A' },
      { id: 'd2-37', question: '¿Cuál es el resultado?', latex: '-17 - 6', options: [{ key: 'A', text: '−23', isCorrect: true }, { key: 'B', text: '23', isCorrect: false }, { key: 'C', text: '−11', isCorrect: false }, { key: 'D', text: '11', isCorrect: false }], correctKey: 'A' },
      { id: 'd2-38', question: '¿Cuál es el resultado?', latex: '0 - 14', options: [{ key: 'A', text: '14', isCorrect: false }, { key: 'B', text: '−14', isCorrect: true }, { key: 'C', text: '0', isCorrect: false }, { key: 'D', text: '−1', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-39', question: '¿Cuál es el resultado?', latex: '-10 - (-10)', options: [{ key: 'A', text: '−20', isCorrect: false }, { key: 'B', text: '0', isCorrect: true }, { key: 'C', text: '20', isCorrect: false }, { key: 'D', text: '1', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-40', question: '¿Cuál es el resultado?', latex: '15 - 32', options: [{ key: 'A', text: '17', isCorrect: false }, { key: 'B', text: '−17', isCorrect: true }, { key: 'C', text: '−47', isCorrect: false }, { key: 'D', text: '47', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-41', question: '¿Cuál es el resultado?', latex: '-2 + 8 - 12', options: [{ key: 'A', text: '−6', isCorrect: true }, { key: 'B', text: '6', isCorrect: false }, { key: 'C', text: '−22', isCorrect: false }, { key: 'D', text: '18', isCorrect: false }], correctKey: 'A' },
      { id: 'd2-42', question: '¿Cuál es el resultado?', latex: '-35 + 20', options: [{ key: 'A', text: '15', isCorrect: false }, { key: 'B', text: '−15', isCorrect: true }, { key: 'C', text: '−55', isCorrect: false }, { key: 'D', text: '55', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-43', question: '¿Cuál es el resultado?', latex: '4 - (-11)', options: [{ key: 'A', text: '−7', isCorrect: false }, { key: 'B', text: '15', isCorrect: true }, { key: 'C', text: '−15', isCorrect: false }, { key: 'D', text: '7', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-44', question: '¿Cuál es el resultado?', latex: '-13 - 14', options: [{ key: 'A', text: '−27', isCorrect: true }, { key: 'B', text: '27', isCorrect: false }, { key: 'C', text: '−1', isCorrect: false }, { key: 'D', text: '1', isCorrect: false }], correctKey: 'A' },
      { id: 'd2-45', question: '¿Cuál es el resultado?', latex: '-50 + 60', options: [{ key: 'A', text: '−10', isCorrect: false }, { key: 'B', text: '10', isCorrect: true }, { key: 'C', text: '−110', isCorrect: false }, { key: 'D', text: '110', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-46', question: '¿Cuál es el resultado?', latex: '7 - 21', options: [{ key: 'A', text: '14', isCorrect: false }, { key: 'B', text: '−14', isCorrect: true }, { key: 'C', text: '−28', isCorrect: false }, { key: 'D', text: '28', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-47', question: '¿Cuál es el resultado?', latex: '-9 - (-2)', options: [{ key: 'A', text: '−11', isCorrect: false }, { key: 'B', text: '−7', isCorrect: true }, { key: 'C', text: '7', isCorrect: false }, { key: 'D', text: '11', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-48', question: '¿Cuál es el resultado?', latex: '-6 - 6 - 6', options: [{ key: 'A', text: '−18', isCorrect: true }, { key: 'B', text: '18', isCorrect: false }, { key: 'C', text: '0', isCorrect: false }, { key: 'D', text: '−6', isCorrect: false }], correctKey: 'A' },
      { id: 'd2-49', question: '¿Cuál es el resultado?', latex: '18 - 30', options: [{ key: 'A', text: '12', isCorrect: false }, { key: 'B', text: '−12', isCorrect: true }, { key: 'C', text: '−48', isCorrect: false }, { key: 'D', text: '48', isCorrect: false }], correctKey: 'B' },
      { id: 'd2-50', question: '¿Cuál es el resultado?', latex: '-100 + 40', options: [{ key: 'A', text: '60', isCorrect: false }, { key: 'B', text: '−60', isCorrect: true }, { key: 'C', text: '−140', isCorrect: false }, { key: 'D', text: '140', isCorrect: false }], correctKey: 'B' },
    ],
  },
  {
    id: 'desafio-3',
    title: 'DESAFÍO 3: LENGUAJE ALGEBRAICO',
    shortTitle: 'Lenguaje Algebraico',
    description: 'Banco de 50 ejercicios de descomposición y lista de divisores completos',
    totalExercises: 50,
    passingScore: 3,
    color: '#10B981',
    bgGradient: 'from-[#10B981] to-[#059669]',
    badgeBg: 'bg-[#F7CA38] text-[#1E1E24]',
    questions: [
    {
        "id": "q1",
        "type": "multiple-choice",
        "question": "Un número multiplicado por 3 y se le suma 3",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "3x + 3"
            },
            {
                "key": "B",
                "text": "x + 3"
            },
            {
                "key": "C",
                "text": "3(x - 3)"
            },
            {
                "key": "D",
                "text": "\\frac{x}{3} + 3"
            }
        ],
        "correctKey": "A",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q2",
        "type": "multiple-choice",
        "question": "El doble de un número disminuido en cinco unidades",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "2x + 5"
            },
            {
                "key": "B",
                "text": "2x - 5"
            },
            {
                "key": "C",
                "text": "x - 10"
            },
            {
                "key": "D",
                "text": "\\frac{x}{2} - 5"
            }
        ],
        "correctKey": "B",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q3",
        "type": "multiple-choice",
        "question": "El triple de un número aumentado en su mitad",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "3x + \\frac{x}{2}"
            },
            {
                "key": "B",
                "text": "3x - 2"
            },
            {
                "key": "C",
                "text": "\\frac{3x}{2}"
            },
            {
                "key": "D",
                "text": "x + \\frac{3}{2}"
            }
        ],
        "correctKey": "A",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q4",
        "type": "multiple-choice",
        "question": "El cuadrado de la suma de dos números diferentes",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "a^2 + b^2"
            },
            {
                "key": "B",
                "text": "(a + b)^2"
            },
            {
                "key": "C",
                "text": "2(a + b)"
            },
            {
                "key": "D",
                "text": "a + b^2"
            }
        ],
        "correctKey": "B",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q5",
        "type": "multiple-choice",
        "question": "La suma de los cuadrados de dos números diferentes",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "(a + b)^2"
            },
            {
                "key": "B",
                "text": "a^2 + b^2"
            },
            {
                "key": "C",
                "text": "2a + 2b"
            },
            {
                "key": "D",
                "text": "(ab)^2"
            }
        ],
        "correctKey": "B",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q6",
        "type": "multiple-choice",
        "question": "La cuarta parte de un número aumentada en ocho",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "4x + 8"
            },
            {
                "key": "B",
                "text": "\\frac{x + 8}{4}"
            },
            {
                "key": "C",
                "text": "\\frac{x}{4} + 8"
            },
            {
                "key": "D",
                "text": "4(x + 8)"
            }
        ],
        "correctKey": "C",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q7",
        "type": "multiple-choice",
        "question": "La mitad de la diferencia entre un número y diez",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "\\frac{x - 10}{2}"
            },
            {
                "key": "B",
                "text": "\\frac{x}{2} - 10"
            },
            {
                "key": "C",
                "text": "2(x - 10)"
            },
            {
                "key": "D",
                "text": "x - 5"
            }
        ],
        "correctKey": "A",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q8",
        "type": "multiple-choice",
        "question": "El producto de dos números consecutivos",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "x + (x + 1)"
            },
            {
                "key": "B",
                "text": "x(x + 1)"
            },
            {
                "key": "C",
                "text": "x^2 + 1"
            },
            {
                "key": "D",
                "text": "2x(x + 1)"
            }
        ],
        "correctKey": "B",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q9",
        "type": "multiple-choice",
        "question": "La suma de tres números enteros consecutivos",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "x + (x + 1) + (x + 2)"
            },
            {
                "key": "B",
                "text": "x(x + 1)(x + 2)"
            },
            {
                "key": "C",
                "text": "3x + 1"
            },
            {
                "key": "D",
                "text": "x^3"
            }
        ],
        "correctKey": "A",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q10",
        "type": "multiple-choice",
        "question": "El cubo del doble de un número",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "2x^3"
            },
            {
                "key": "B",
                "text": "(2x)^3"
            },
            {
                "key": "C",
                "text": "3(2x)"
            },
            {
                "key": "D",
                "text": "6x^3"
            }
        ],
        "correctKey": "B",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q11",
        "type": "multiple-choice",
        "question": "El doble del cubo de un número",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "(2x)^3"
            },
            {
                "key": "B",
                "text": "2x^3"
            },
            {
                "key": "C",
                "text": "8x^3"
            },
            {
                "key": "D",
                "text": "3x^2"
            }
        ],
        "correctKey": "B",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q12",
        "type": "multiple-choice",
        "question": "Un número aumentado en su 30%",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "x + 30"
            },
            {
                "key": "B",
                "text": "0.30x"
            },
            {
                "key": "C",
                "text": "x + 0.30x"
            },
            {
                "key": "D",
                "text": "\\frac{x}{30}"
            }
        ],
        "correctKey": "C",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q13",
        "type": "multiple-choice",
        "question": "El exceso de un número sobre veinte",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "20 - x"
            },
            {
                "key": "B",
                "text": "x - 20"
            },
            {
                "key": "C",
                "text": "x + 20"
            },
            {
                "key": "D",
                "text": "\\frac{x}{20}"
            }
        ],
        "correctKey": "B",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q14",
        "type": "multiple-choice",
        "question": "Cinco veces un número disminuido en el triple de otro",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "5x + 3y"
            },
            {
                "key": "B",
                "text": "5x - 3y"
            },
            {
                "key": "C",
                "text": "(5x)(3y)"
            },
            {
                "key": "D",
                "text": "\\frac{5x}{3y}"
            }
        ],
        "correctKey": "B",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q15",
        "type": "multiple-choice",
        "question": "El cociente de la suma de dos números sobre su diferencia",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "\\frac{a + b}{a - b}"
            },
            {
                "key": "B",
                "text": "\\frac{a - b}{a + b}"
            },
            {
                "key": "C",
                "text": "(a+b)(a-b)"
            },
            {
                "key": "D",
                "text": "\\frac{ab}{a - b}"
            }
        ],
        "correctKey": "A",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q16",
        "type": "multiple-choice",
        "question": "El recíproco de un número cualquiera no nulo",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "-x"
            },
            {
                "key": "B",
                "text": "\\frac{1}{x}"
            },
            {
                "key": "C",
                "text": "x^{-2}"
            },
            {
                "key": "D",
                "text": "1 - x"
            }
        ],
        "correctKey": "B",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q17",
        "type": "multiple-choice",
        "question": "La raíz cuadrada de la suma de dos números",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "\\sqrt{a} + \\sqrt{b}"
            },
            {
                "key": "B",
                "text": "\\sqrt{a + b}"
            },
            {
                "key": "C",
                "text": "\\sqrt{ab}"
            },
            {
                "key": "D",
                "text": "(\\sqrt{a+b})^2"
            }
        ],
        "correctKey": "B",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q18",
        "type": "multiple-choice",
        "question": "La suma de las raíces cuadradas de dos números",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "\\sqrt{a + b}"
            },
            {
                "key": "B",
                "text": "\\sqrt{a} + \\sqrt{b}"
            },
            {
                "key": "C",
                "text": "\\sqrt{ab}"
            },
            {
                "key": "D",
                "text": "\\frac{\\sqrt{a}}{b}"
            }
        ],
        "correctKey": "B",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q19",
        "type": "multiple-choice",
        "question": "El cuadrado de un número disminuido en siete",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "x^2 - 7"
            },
            {
                "key": "B",
                "text": "(x - 7)^2"
            },
            {
                "key": "C",
                "text": "2x - 7"
            },
            {
                "key": "D",
                "text": "7 - x^2"
            }
        ],
        "correctKey": "A",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q20",
        "type": "multiple-choice",
        "question": "El cuadrado de la diferencia de un número y siete",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "x^2 - 7"
            },
            {
                "key": "B",
                "text": "(x - 7)^2"
            },
            {
                "key": "C",
                "text": "x^2 - 49"
            },
            {
                "key": "D",
                "text": "2(x - 7)"
            }
        ],
        "correctKey": "B",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q21",
        "type": "multiple-choice",
        "question": "El triple del cuadrado de un número",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "(3x)^2"
            },
            {
                "key": "B",
                "text": "3x^2"
            },
            {
                "key": "C",
                "text": "9x^2"
            },
            {
                "key": "D",
                "text": "3x^3"
            }
        ],
        "correctKey": "B",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q22",
        "type": "multiple-choice",
        "question": "El cuadrado del triple de un número",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "3x^2"
            },
            {
                "key": "B",
                "text": "(3x)^2"
            },
            {
                "key": "C",
                "text": "6x^2"
            },
            {
                "key": "D",
                "text": "3(2x)"
            }
        ],
        "correctKey": "B",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q23",
        "type": "multiple-choice",
        "question": "Un número par cualquiera",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "x + 2"
            },
            {
                "key": "B",
                "text": "2n"
            },
            {
                "key": "C",
                "text": "2n + 1"
            },
            {
                "key": "D",
                "text": "n^2"
            }
        ],
        "correctKey": "B",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q24",
        "type": "multiple-choice",
        "question": "Un número impar cualquiera",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "2n"
            },
            {
                "key": "B",
                "text": "2n + 1"
            },
            {
                "key": "C",
                "text": "n + 1"
            },
            {
                "key": "D",
                "text": "2n + 2"
            }
        ],
        "correctKey": "B",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q25",
        "type": "multiple-choice",
        "question": "La suma de dos números pares consecutivos",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "2n + (2n + 2)"
            },
            {
                "key": "B",
                "text": "n + (n + 2)"
            },
            {
                "key": "C",
                "text": "2n + (2n + 1)"
            },
            {
                "key": "D",
                "text": "4n"
            }
        ],
        "correctKey": "A",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q26",
        "type": "multiple-choice",
        "question": "La suma de dos números impares consecutivos",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "(2n + 1) + (2n + 3)"
            },
            {
                "key": "B",
                "text": "2n + (2n + 2)"
            },
            {
                "key": "C",
                "text": "(2n + 1) + (2n + 2)"
            },
            {
                "key": "D",
                "text": "n + (n + 1)"
            }
        ],
        "correctKey": "A",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q27",
        "type": "multiple-choice",
        "question": "La edad de una persona dentro de doce años si su edad actual es x",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "x - 12"
            },
            {
                "key": "B",
                "text": "12x"
            },
            {
                "key": "C",
                "text": "x + 12"
            },
            {
                "key": "D",
                "text": "\\frac{x}{12}"
            }
        ],
        "correctKey": "C",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q28",
        "type": "multiple-choice",
        "question": "La edad de una persona hace ocho años si su edad actual es y",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "y - 8"
            },
            {
                "key": "B",
                "text": "y + 8"
            },
            {
                "key": "C",
                "text": "8 - y"
            },
            {
                "key": "D",
                "text": "8y"
            }
        ],
        "correctKey": "A",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q29",
        "type": "multiple-choice",
        "question": "El triple de la edad que tendré dentro de cuatro años (x = edad actual)",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "3x + 4"
            },
            {
                "key": "B",
                "text": "3(x + 4)"
            },
            {
                "key": "C",
                "text": "\\frac{x + 4}{3}"
            },
            {
                "key": "D",
                "text": "3x + 12x"
            }
        ],
        "correctKey": "B",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q30",
        "type": "multiple-choice",
        "question": "La diferencia de los cubos de dos números",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "(a - b)^3"
            },
            {
                "key": "B",
                "text": "a^3 - b^3"
            },
            {
                "key": "C",
                "text": "3a - 3b"
            },
            {
                "key": "D",
                "text": "(a^3)(b^3)"
            }
        ],
        "correctKey": "B",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q31",
        "type": "multiple-choice",
        "question": "El cubo de la diferencia de dos números",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "a^3 - b^3"
            },
            {
                "key": "B",
                "text": "(a - b)^3"
            },
            {
                "key": "C",
                "text": "a^3 - 3b"
            },
            {
                "key": "D",
                "text": "3(a - b)"
            }
        ],
        "correctKey": "B",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q32",
        "type": "multiple-choice",
        "question": "El promedio o media aritmética de cuatro notas (a, b, c, d)",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "a + b + c + d"
            },
            {
                "key": "B",
                "text": "\\frac{a + b + c + d}{4}"
            },
            {
                "key": "C",
                "text": "4(a + b + c + d)"
            },
            {
                "key": "D",
                "text": "\\frac{abcd}{4}"
            }
        ],
        "correctKey": "B",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q33",
        "type": "multiple-choice",
        "question": "El perímetro de un rectángulo cuya base (b) es el doble de su altura (h)",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "2(2h) + 2h"
            },
            {
                "key": "B",
                "text": "2h + h"
            },
            {
                "key": "C",
                "text": "2h \\cdot h"
            },
            {
                "key": "D",
                "text": "4h"
            }
        ],
        "correctKey": "A",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q34",
        "type": "multiple-choice",
        "question": "El área de un triángulo de base b y altura h",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "bh"
            },
            {
                "key": "B",
                "text": "\\frac{bh}{2}"
            },
            {
                "key": "C",
                "text": "2bh"
            },
            {
                "key": "D",
                "text": "\\frac{b + h}{2}"
            }
        ],
        "correctKey": "B",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q35",
        "type": "multiple-choice",
        "question": "La distancia recorrida a velocidad constante v en un tiempo t + 3",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "v + t + 3"
            },
            {
                "key": "B",
                "text": "v(t + 3)"
            },
            {
                "key": "C",
                "text": "\\frac{v}{t + 3}"
            },
            {
                "key": "D",
                "text": "vt + 3"
            }
        ],
        "correctKey": "B",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q36",
        "type": "multiple-choice",
        "question": "El costo total de x cuadernos a $25 cada uno más una mochila de $150",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "25 + 150x"
            },
            {
                "key": "B",
                "text": "25x + 150"
            },
            {
                "key": "C",
                "text": "175x"
            },
            {
                "key": "D",
                "text": "25(x + 150)"
            }
        ],
        "correctKey": "B",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q37",
        "type": "multiple-choice",
        "question": "La tercera parte de un número sumada con la cuarta parte de otro número",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "\\frac{x}{3} + \\frac{y}{4}"
            },
            {
                "key": "B",
                "text": "\\frac{x + y}{7}"
            },
            {
                "key": "C",
                "text": "\\frac{xy}{12}"
            },
            {
                "key": "D",
                "text": "3x + 4y"
            }
        ],
        "correctKey": "A",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q38",
        "type": "multiple-choice",
        "question": "El quíntuple de la suma de dos números",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "5x + y"
            },
            {
                "key": "B",
                "text": "5(x + y)"
            },
            {
                "key": "C",
                "text": "5xy"
            },
            {
                "key": "D",
                "text": "x + 5y"
            }
        ],
        "correctKey": "B",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q39",
        "type": "multiple-choice",
        "question": "El cociente entre el doble de un número y su sucesor",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "\\frac{2x}{x - 1}"
            },
            {
                "key": "B",
                "text": "\\frac{2x}{x + 1}"
            },
            {
                "key": "C",
                "text": "\\frac{x + 1}{2x}"
            },
            {
                "key": "D",
                "text": "\\frac{2x}{2x + 1}"
            }
        ],
        "correctKey": "B",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q40",
        "type": "multiple-choice",
        "question": "Un número disminuido en sus dos quintas partes",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "x - \\frac{2}{5}x"
            },
            {
                "key": "B",
                "text": "x - \\frac{2}{5}"
            },
            {
                "key": "C",
                "text": "\\frac{2}{5} - x"
            },
            {
                "key": "D",
                "text": "\\frac{x - 2}{5}"
            }
        ],
        "correctKey": "A",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q41",
        "type": "multiple-choice",
        "question": "El producto de la suma de dos números por su diferencia",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "(a + b)(a - b)"
            },
            {
                "key": "B",
                "text": "(a + b) - (a - b)"
            },
            {
                "key": "C",
                "text": "a^2 - 2ab + b^2"
            },
            {
                "key": "D",
                "text": "(a - b)^2"
            }
        ],
        "correctKey": "A",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q42",
        "type": "multiple-choice",
        "question": "Dos números cuya suma es 45 (si uno es x, el otro es)",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "x - 45"
            },
            {
                "key": "B",
                "text": "45 - x"
            },
            {
                "key": "C",
                "text": "45x"
            },
            {
                "key": "D",
                "text": "\\frac{45}{x}"
            }
        ],
        "correctKey": "B",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q43",
        "type": "multiple-choice",
        "question": "Dos números cuyo producto es 100 (si uno es x, el otro es)",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "100 - x"
            },
            {
                "key": "B",
                "text": "\\frac{100}{x}"
            },
            {
                "key": "C",
                "text": "100x"
            },
            {
                "key": "D",
                "text": "x + 100"
            }
        ],
        "correctKey": "B",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q44",
        "type": "multiple-choice",
        "question": "El opuesto aditivo del triple de un número",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "\\frac{1}{3x}"
            },
            {
                "key": "B",
                "text": "-3x"
            },
            {
                "key": "C",
                "text": "3(-x)^2"
            },
            {
                "key": "D",
                "text": "3 - x"
            }
        ],
        "correctKey": "B",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q45",
        "type": "multiple-choice",
        "question": "La raíz cúbica del producto de tres números",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "\\sqrt[3]{a} + \\sqrt[3]{b} + \\sqrt[3]{c}"
            },
            {
                "key": "B",
                "text": "\\sqrt[3]{abc}"
            },
            {
                "key": "C",
                "text": "3\\sqrt{abc}"
            },
            {
                "key": "D",
                "text": "\\frac{abc}{3}"
            }
        ],
        "correctKey": "B",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q46",
        "type": "multiple-choice",
        "question": "La suma de los inversos multiplicativos de dos números (x, y)",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "\\frac{1}{x} + \\frac{1}{y}"
            },
            {
                "key": "B",
                "text": "-x - y"
            },
            {
                "key": "C",
                "text": "\\frac{1}{x + y}"
            },
            {
                "key": "D",
                "text": "\\frac{xy}{x + y}"
            }
        ],
        "correctKey": "A",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q47",
        "type": "multiple-choice",
        "question": "El inverso multiplicativo de la suma de dos números",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "\\frac{1}{x} + \\frac{1}{y}"
            },
            {
                "key": "B",
                "text": "\\frac{1}{x + y}"
            },
            {
                "key": "C",
                "text": "-(x + y)"
            },
            {
                "key": "D",
                "text": "\\frac{x + y}{xy}"
            }
        ],
        "correctKey": "B",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q48",
        "type": "multiple-choice",
        "question": "El cuadrado de la mitad de un número",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "\\frac{x^2}{2}"
            },
            {
                "key": "B",
                "text": "\\left(\\frac{x}{2}\\right)^2"
            },
            {
                "key": "C",
                "text": "\\sqrt{\\frac{x}{2}}"
            },
            {
                "key": "D",
                "text": "2x^2"
            }
        ],
        "correctKey": "B",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q49",
        "type": "multiple-choice",
        "question": "La mitad del cuadrado de un número",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "\\left(\\frac{x}{2}\\right)^2"
            },
            {
                "key": "B",
                "text": "\\frac{x^2}{2}"
            },
            {
                "key": "C",
                "text": "\\frac{2x}{2}"
            },
            {
                "key": "D",
                "text": "(2x)^2"
            }
        ],
        "correctKey": "B",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    },
    {
        "id": "q50",
        "type": "multiple-choice",
        "question": "Ocho veces la diferencia entre el cubo de un número y diez",
        "optionsAreLatex": true,
        "options": [
            {
                "key": "A",
                "text": "8x^3 - 10"
            },
            {
                "key": "B",
                "text": "8(x^3 - 10)"
            },
            {
                "key": "C",
                "text": "(8x)^3 - 10"
            },
            {
                "key": "D",
                "text": "8(3x - 10)"
            }
        ],
        "correctKey": "B",
        "explanation": "Traducido literalmente de los enunciados verbales al álgebra."
    }
],
  },
  {
    id: 'desafio-4',
    title: 'DESAFÍO 4: ECUACIONES LINEALES Y PRODUCTOS NOTABLES',
    shortTitle: 'Ecuaciones y Productos Notables',
    description: 'Banco de 50 ejercicios de despeje algebraico, binomios y trinomios',
    totalExercises: 50,
    passingScore: 3,
    color: '#EC4899',
    bgGradient: 'from-[#EC4899] to-[#DB2777]',
    badgeBg: 'bg-[#F7CA38] text-[#1E1E24]',
    questions: [
      { id: 'd4-1', question: '¿Cuál es el valor de x en la ecuación 2x+5=13?', latex: '2x + 5 = 13', options: [{ key: 'A', text: 'x = 4', isCorrect: true }, { key: 'B', text: 'x = 9', isCorrect: false }, { key: 'C', text: 'x = 8', isCorrect: false }, { key: 'D', text: 'x = 6', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-2', question: 'Al desarrollar (x+3)², ¿qué trinomio se obtiene?', latex: '(x + 3)^2', options: [{ key: 'A', text: 'x² + 6x + 9', isCorrect: true }, { key: 'B', text: 'x² + 9', isCorrect: false }, { key: 'C', text: 'x² + 3x + 9', isCorrect: false }, { key: 'D', text: 'x² + 6x + 6', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-3', question: '¿Cuál es el valor de x en la ecuación 3x−4=11?', latex: '3x - 4 = 11', options: [{ key: 'A', text: 'x = 5', isCorrect: true }, { key: 'B', text: 'x = 7', isCorrect: false }, { key: 'C', text: 'x = 3', isCorrect: false }, { key: 'D', text: 'x = 15', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-4', question: 'Al desarrollar (x−4)², ¿qué trinomio se obtiene?', latex: '(x - 4)^2', options: [{ key: 'A', text: 'x² − 8x + 16', isCorrect: true }, { key: 'B', text: 'x² − 16', isCorrect: false }, { key: 'C', text: 'x² + 8x + 16', isCorrect: false }, { key: 'D', text: 'x² − 4x + 16', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-5', question: '¿Cuál es el valor de x en la ecuación 5x+2=17?', latex: '5x + 2 = 17', options: [{ key: 'A', text: 'x = 3', isCorrect: true }, { key: 'B', text: 'x = 4', isCorrect: false }, { key: 'C', text: 'x = 5', isCorrect: false }, { key: 'D', text: 'x = 2', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-6', question: 'Al resolver (x+5)(x−5), ¿qué resultado se obtiene?', latex: '(x + 5)(x - 5)', options: [{ key: 'A', text: 'x² − 25', isCorrect: true }, { key: 'B', text: 'x² + 25', isCorrect: false }, { key: 'C', text: 'x² − 10x − 25', isCorrect: false }, { key: 'D', text: 'x² − 10', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-7', question: '¿Cuál es el valor de x en la ecuación 4x−7=13?', latex: '4x - 7 = 13', options: [{ key: 'A', text: 'x = 5', isCorrect: true }, { key: 'B', text: 'x = 6', isCorrect: false }, { key: 'C', text: 'x = 4', isCorrect: false }, { key: 'D', text: 'x = 20', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-8', question: 'Al desarrollar (x+2)², ¿qué trinomio se obtiene?', latex: '(x + 2)^2', options: [{ key: 'A', text: 'x² + 4x + 4', isCorrect: true }, { key: 'B', text: 'x² + 4', isCorrect: false }, { key: 'C', text: 'x² + 2x + 4', isCorrect: false }, { key: 'D', text: 'x² + 4x + 2', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-9', question: '¿Cuál es el valor de x en la ecuación 6x+3=27?', latex: '6x + 3 = 27', options: [{ key: 'A', text: 'x = 4', isCorrect: true }, { key: 'B', text: 'x = 5', isCorrect: false }, { key: 'C', text: 'x = 3', isCorrect: false }, { key: 'D', text: 'x = 24', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-10', question: 'Al resolver (x+7)(x−7), ¿qué resultado se obtiene?', latex: '(x + 7)(x - 7)', options: [{ key: 'A', text: 'x² − 49', isCorrect: true }, { key: 'B', text: 'x² + 49', isCorrect: false }, { key: 'C', text: 'x² − 14x − 49', isCorrect: false }, { key: 'D', text: 'x² − 14', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-11', question: '¿Cuál es el valor de x en la ecuación 2x−9=5?', latex: '2x - 9 = 5', options: [{ key: 'A', text: 'x = 7', isCorrect: true }, { key: 'B', text: 'x = 6', isCorrect: false }, { key: 'C', text: 'x = 8', isCorrect: false }, { key: 'D', text: 'x = 14', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-12', question: 'Al desarrollar (x−6)², ¿qué trinomio se obtiene?', latex: '(x - 6)^2', options: [{ key: 'A', text: 'x² − 12x + 36', isCorrect: true }, { key: 'B', text: 'x² − 36', isCorrect: false }, { key: 'C', text: 'x² + 12x + 36', isCorrect: false }, { key: 'D', text: 'x² − 6x + 36', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-13', question: '¿Cuál es el valor de x en la ecuación 7x+1=22?', latex: '7x + 1 = 22', options: [{ key: 'A', text: 'x = 3', isCorrect: true }, { key: 'B', text: 'x = 4', isCorrect: false }, { key: 'C', text: 'x = 2', isCorrect: false }, { key: 'D', text: 'x = 21', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-14', question: 'Al resolver (x+3)(x+4), ¿qué resultado se obtiene?', latex: '(x + 3)(x + 4)', options: [{ key: 'A', text: 'x² + 7x + 12', isCorrect: true }, { key: 'B', text: 'x² + 12', isCorrect: false }, { key: 'C', text: 'x² + 7x + 7', isCorrect: false }, { key: 'D', text: 'x² + 12x + 7', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-15', question: '¿Cuál es el valor de x en la ecuación 3x+8=20?', latex: '3x + 8 = 20', options: [{ key: 'A', text: 'x = 4', isCorrect: true }, { key: 'B', text: 'x = 6', isCorrect: false }, { key: 'C', text: 'x = 5', isCorrect: false }, { key: 'D', text: 'x = 12', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-16', question: 'Al desarrollar (2x+1)², ¿qué trinomio se obtiene?', latex: '(2x + 1)^2', options: [{ key: 'A', text: '4x² + 4x + 1', isCorrect: true }, { key: 'B', text: '4x² + 1', isCorrect: false }, { key: 'C', text: '2x² + 4x + 1', isCorrect: false }, { key: 'D', text: '4x² + 2x + 1', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-17', question: '¿Cuál es el valor de x en la ecuación 5x−6=24?', latex: '5x - 6 = 24', options: [{ key: 'A', text: 'x = 6', isCorrect: true }, { key: 'B', text: 'x = 5', isCorrect: false }, { key: 'C', text: 'x = 7', isCorrect: false }, { key: 'D', text: 'x = 30', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-18', question: 'Al resolver (x+8)(x−8), ¿qué resultado se obtiene?', latex: '(x + 8)(x - 8)', options: [{ key: 'A', text: 'x² − 64', isCorrect: true }, { key: 'B', text: 'x² + 64', isCorrect: false }, { key: 'C', text: 'x² − 16x − 64', isCorrect: false }, { key: 'D', text: 'x² − 16', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-19', question: '¿Cuál es el valor de x en la ecuación 8x−4=20?', latex: '8x - 4 = 20', options: [{ key: 'A', text: 'x = 3', isCorrect: true }, { key: 'B', text: 'x = 2', isCorrect: false }, { key: 'C', text: 'x = 4', isCorrect: false }, { key: 'D', text: 'x = 24', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-20', question: 'Al desarrollar (x−5)², ¿qué trinomio se obtiene?', latex: '(x - 5)^2', options: [{ key: 'A', text: 'x² − 10x + 25', isCorrect: true }, { key: 'B', text: 'x² − 25', isCorrect: false }, { key: 'C', text: 'x² + 10x + 25', isCorrect: false }, { key: 'D', text: 'x² − 5x + 25', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-21', question: '¿Cuál es el valor de x en la ecuación 4x+10=30?', latex: '4x + 10 = 30', options: [{ key: 'A', text: 'x = 5', isCorrect: true }, { key: 'B', text: 'x = 4', isCorrect: false }, { key: 'C', text: 'x = 6', isCorrect: false }, { key: 'D', text: 'x = 20', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-22', question: 'Al resolver (x+2)(x+6), ¿qué resultado se obtiene?', latex: '(x + 2)(x + 6)', options: [{ key: 'A', text: 'x² + 8x + 12', isCorrect: true }, { key: 'B', text: 'x² + 12', isCorrect: false }, { key: 'C', text: 'x² + 8x + 8', isCorrect: false }, { key: 'D', text: 'x² + 12x + 8', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-23', question: '¿Cuál es el valor de x en la ecuación 2x+15=25?', latex: '2x + 15 = 25', options: [{ key: 'A', text: 'x = 5', isCorrect: true }, { key: 'B', text: 'x = 10', isCorrect: false }, { key: 'C', text: 'x = 4', isCorrect: false }, { key: 'D', text: 'x = 20', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-24', question: 'Al desarrollar (3x+2)², ¿qué trinomio se obtiene?', latex: '(3x + 2)^2', options: [{ key: 'A', text: '9x² + 12x + 4', isCorrect: true }, { key: 'B', text: '9x² + 4', isCorrect: false }, { key: 'C', text: '6x² + 12x + 4', isCorrect: false }, { key: 'D', text: '9x² + 6x + 4', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-25', question: '¿Cuál es el valor de x en la ecuación 9x−5=40?', latex: '9x - 5 = 40', options: [{ key: 'A', text: 'x = 5', isCorrect: true }, { key: 'B', text: 'x = 4', isCorrect: false }, { key: 'C', text: 'x = 6', isCorrect: false }, { key: 'D', text: 'x = 45', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-26', question: 'Al resolver (x+10)(x−10), ¿qué resultado se obtiene?', latex: '(x + 10)(x - 10)', options: [{ key: 'A', text: 'x² − 100', isCorrect: true }, { key: 'B', text: 'x² + 100', isCorrect: false }, { key: 'C', text: 'x² − 20x − 100', isCorrect: false }, { key: 'D', text: 'x² − 20', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-27', question: '¿Cuál es el valor de x en la ecuación 6x−8=16?', latex: '6x - 8 = 16', options: [{ key: 'A', text: 'x = 4', isCorrect: true }, { key: 'B', text: 'x = 3', isCorrect: false }, { key: 'C', text: 'x = 5', isCorrect: false }, { key: 'D', text: 'x = 24', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-28', question: 'Al desarrollar (x+7)², ¿qué trinomio se obtiene?', latex: '(x + 7)^2', options: [{ key: 'A', text: 'x² + 14x + 49', isCorrect: true }, { key: 'B', text: 'x² + 49', isCorrect: false }, { key: 'C', text: 'x² + 7x + 49', isCorrect: false }, { key: 'D', text: 'x² + 14x + 14', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-29', question: '¿Cuál es el valor de x en la ecuación 3x+12=27?', latex: '3x + 12 = 27', options: [{ key: 'A', text: 'x = 5', isCorrect: true }, { key: 'B', text: 'x = 4', isCorrect: false }, { key: 'C', text: 'x = 6', isCorrect: false }, { key: 'D', text: 'x = 15', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-30', question: 'Al resolver (x−3)(x−5), ¿qué resultado se obtiene?', latex: '(x - 3)(x - 5)', options: [{ key: 'A', text: 'x² − 8x + 15', isCorrect: true }, { key: 'B', text: 'x² − 15', isCorrect: false }, { key: 'C', text: 'x² + 8x + 15', isCorrect: false }, { key: 'D', text: 'x² − 8x − 15', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-31', question: '¿Cuál es el valor de x en la ecuación 5x+7=32?', latex: '5x + 7 = 32', options: [{ key: 'A', text: 'x = 5', isCorrect: true }, { key: 'B', text: 'x = 4', isCorrect: false }, { key: 'C', text: 'x = 6', isCorrect: false }, { key: 'D', text: 'x = 25', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-32', question: 'Al desarrollar (2x−3)², ¿qué trinomio se obtiene?', latex: '(2x - 3)^2', options: [{ key: 'A', text: '4x² − 12x + 9', isCorrect: true }, { key: 'B', text: '4x² − 9', isCorrect: false }, { key: 'C', text: '4x² + 12x + 9', isCorrect: false }, { key: 'D', text: '2x² − 12x + 9', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-33', question: '¿Cuál es el valor de x en la ecuación 7x−9=26?', latex: '7x - 9 = 26', options: [{ key: 'A', text: 'x = 5', isCorrect: true }, { key: 'B', text: 'x = 6', isCorrect: false }, { key: 'C', text: 'x = 4', isCorrect: false }, { key: 'D', text: 'x = 35', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-34', question: 'Al resolver (2x+3)(2x−3), ¿qué resultado se obtiene?', latex: '(2x + 3)(2x - 3)', options: [{ key: 'A', text: '4x² − 9', isCorrect: true }, { key: 'B', text: '4x² + 9', isCorrect: false }, { key: 'C', text: '2x² − 9', isCorrect: false }, { key: 'D', text: '4x² − 6x − 9', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-35', question: '¿Cuál es el valor de x en la ecuación 4x−12=16?', latex: '4x - 12 = 16', options: [{ key: 'A', text: 'x = 7', isCorrect: true }, { key: 'B', text: 'x = 6', isCorrect: false }, { key: 'C', text: 'x = 8', isCorrect: false }, { key: 'D', text: 'x = 28', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-36', question: 'Al desarrollar (x+9)², ¿qué trinomio se obtiene?', latex: '(x + 9)^2', options: [{ key: 'A', text: 'x² + 18x + 81', isCorrect: true }, { key: 'B', text: 'x² + 81', isCorrect: false }, { key: 'C', text: 'x² + 9x + 81', isCorrect: false }, { key: 'D', text: 'x² + 18x + 18', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-37', question: '¿Cuál es el valor de x en la ecuación 8x+6=38?', latex: '8x + 6 = 38', options: [{ key: 'A', text: 'x = 4', isCorrect: true }, { key: 'B', text: 'x = 3', isCorrect: false }, { key: 'C', text: 'x = 5', isCorrect: false }, { key: 'D', text: 'x = 32', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-38', question: 'Al resolver (x+5)(x−2), ¿qué resultado se obtiene?', latex: '(x + 5)(x - 2)', options: [{ key: 'A', text: 'x² + 3x − 10', isCorrect: true }, { key: 'B', text: 'x² − 10', isCorrect: false }, { key: 'C', text: 'x² − 3x − 10', isCorrect: false }, { key: 'D', text: 'x² + 3x + 10', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-39', question: '¿Cuál es el valor de x en la ecuación 10x−15=35?', latex: '10x - 15 = 35', options: [{ key: 'A', text: 'x = 5', isCorrect: true }, { key: 'B', text: 'x = 4', isCorrect: false }, { key: 'C', text: 'x = 6', isCorrect: false }, { key: 'D', text: 'x = 50', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-40', question: 'Al desarrollar (x−8)², ¿qué trinomio se obtiene?', latex: '(x - 8)^2', options: [{ key: 'A', text: 'x² − 16x + 64', isCorrect: true }, { key: 'B', text: 'x² − 64', isCorrect: false }, { key: 'C', text: 'x² + 16x + 64', isCorrect: false }, { key: 'D', text: 'x² − 8x + 64', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-41', question: '¿Cuál es el valor de x en la ecuación 2x+18=30?', latex: '2x + 18 = 30', options: [{ key: 'A', text: 'x = 6', isCorrect: true }, { key: 'B', text: 'x = 5', isCorrect: false }, { key: 'C', text: 'x = 7', isCorrect: false }, { key: 'D', text: 'x = 12', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-42', question: 'Al resolver (3x+1)(3x−1), ¿qué resultado se obtiene?', latex: '(3x + 1)(3x - 1)', options: [{ key: 'A', text: '9x² − 1', isCorrect: true }, { key: 'B', text: '9x² + 1', isCorrect: false }, { key: 'C', text: '6x² − 1', isCorrect: false }, { key: 'D', text: '9x² − 6x − 1', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-43', question: '¿Cuál es el valor de x en la ecuación 3x−14=13?', latex: '3x - 14 = 13', options: [{ key: 'A', text: 'x = 9', isCorrect: true }, { key: 'B', text: 'x = 8', isCorrect: false }, { key: 'C', text: 'x = 10', isCorrect: false }, { key: 'D', text: 'x = 27', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-44', question: 'Al desarrollar (x+1)², ¿qué trinomio se obtiene?', latex: '(x + 1)^2', options: [{ key: 'A', text: 'x² + 2x + 1', isCorrect: true }, { key: 'B', text: 'x² + 1', isCorrect: false }, { key: 'C', text: 'x² + x + 1', isCorrect: false }, { key: 'D', text: 'x² + 2x + 2', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-45', question: '¿Cuál es el valor de x en la ecuación 6x+14=50?', latex: '6x + 14 = 50', options: [{ key: 'A', text: 'x = 6', isCorrect: true }, { key: 'B', text: 'x = 5', isCorrect: false }, { key: 'C', text: 'x = 7', isCorrect: false }, { key: 'D', text: 'x = 36', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-46', question: 'Al resolver (x−4)(x+6), ¿qué resultado se obtiene?', latex: '(x - 4)(x + 6)', options: [{ key: 'A', text: 'x² + 2x − 24', isCorrect: true }, { key: 'B', text: 'x² − 24', isCorrect: false }, { key: 'C', text: 'x² − 2x − 24', isCorrect: false }, { key: 'D', text: 'x² + 10x − 24', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-47', question: '¿Cuál es el valor de x en la ecuación 5x−20=25?', latex: '5x - 20 = 25', options: [{ key: 'A', text: 'x = 9', isCorrect: true }, { key: 'B', text: 'x = 8', isCorrect: false }, { key: 'C', text: 'x = 10', isCorrect: false }, { key: 'D', text: 'x = 45', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-48', question: 'Al desarrollar (4x−1)², ¿qué trinomio se obtiene?', latex: '(4x - 1)^2', options: [{ key: 'A', text: '16x² − 8x + 1', isCorrect: true }, { key: 'B', text: '16x² − 1', isCorrect: false }, { key: 'C', text: '16x² + 8x + 1', isCorrect: false }, { key: 'D', text: '8x² − 8x + 1', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-49', question: '¿Cuál es el valor de x en la ecuación 7x+8=57?', latex: '7x + 8 = 57', options: [{ key: 'A', text: 'x = 7', isCorrect: true }, { key: 'B', text: 'x = 6', isCorrect: false }, { key: 'C', text: 'x = 8', isCorrect: false }, { key: 'D', text: 'x = 49', isCorrect: false }], correctKey: 'A' },
      { id: 'd4-50', question: 'Al resolver (x+9)(x−9), ¿qué resultado se obtiene?', latex: '(x + 9)(x - 9)', options: [{ key: 'A', text: 'x² − 81', isCorrect: true }, { key: 'B', text: 'x² + 81', isCorrect: false }, { key: 'C', text: 'x² − 18x − 81', isCorrect: false }, { key: 'D', text: 'x² − 18', isCorrect: false }], correctKey: 'A' },
    ],
  },
  ECUACIONES_ENTERAS,
  ECUACIONES_FRACCIONES
,
  {
    id: 'desafio-8',
    title: 'DESAFÍO 8: REDUCCIÓN DE TÉRMINOS SEMEJANTES',
    shortTitle: 'Reducción de Términos Semejantes',
    description: 'Banco de 100 ejercicios de reducción de términos semejantes',
    totalExercises: 100,
    passingScore: 3,
    color: '#F59E0B',
    bgGradient: 'from-[#F59E0B] to-[#D97706]',
    badgeBg: 'bg-[#1E1E24] text-white',
    questions: [
      { id: 'd8-1', question: '¿Cuál es el resultado de la reducción?', latex: 'x + 6x', options: [{ key: 'A', text: '-7x', isCorrect: false }, { key: 'B', text: '8x', isCorrect: false }, { key: 'C', text: '5x', isCorrect: false }, { key: 'D', text: '7x', isCorrect: true }], correctKey: 'D', explanation: '(1 + 6)x = 7x' },
      { id: 'd8-2', question: '¿Cuál es el resultado de la reducción?', latex: '8x - x', options: [{ key: 'A', text: '7x', isCorrect: true }, { key: 'B', text: '9x', isCorrect: false }, { key: 'C', text: '-7x', isCorrect: false }, { key: 'D', text: '8x', isCorrect: false }], correctKey: 'A', explanation: '(8 - 1)x = 7x' },
      { id: 'd8-3', question: '¿Cuál es el resultado de la reducción?', latex: '-x + 9x', options: [{ key: 'A', text: '8x', isCorrect: true }, { key: 'B', text: '6x', isCorrect: false }, { key: 'C', text: '7x', isCorrect: false }, { key: 'D', text: '-8x', isCorrect: false }], correctKey: 'A', explanation: '(-1 + 9)x = 8x' },
      { id: 'd8-4', question: '¿Cuál es el resultado de la reducción?', latex: '-x - 5x', options: [{ key: 'A', text: '6x', isCorrect: false }, { key: 'B', text: '-6x', isCorrect: true }, { key: 'C', text: '-5x', isCorrect: false }, { key: 'D', text: '-7x', isCorrect: false }], correctKey: 'B', explanation: '(-1 - 5)x = -6x' },
      { id: 'd8-5', question: '¿Cuál es el resultado de la reducción?', latex: '4x - x', options: [{ key: 'A', text: '-3x', isCorrect: false }, { key: 'B', text: '2x', isCorrect: false }, { key: 'C', text: '3x', isCorrect: true }, { key: 'D', text: 'x', isCorrect: false }], correctKey: 'C', explanation: '(4 - 1)x = 3x' },
      { id: 'd8-6', question: '¿Cuál es el resultado de la reducción?', latex: '-7x + x', options: [{ key: 'A', text: '-3x', isCorrect: false }, { key: 'B', text: '6x', isCorrect: false }, { key: 'C', text: '-6x', isCorrect: true }, { key: 'D', text: '-7x', isCorrect: false }], correctKey: 'C', explanation: '(-7 + 1)x = -6x' },
      { id: 'd8-7', question: '¿Cuál es el resultado de la reducción?', latex: '-x - x', options: [{ key: 'A', text: '0', isCorrect: false }, { key: 'B', text: '2x', isCorrect: false }, { key: 'C', text: '-2x', isCorrect: true }, { key: 'D', text: 'x', isCorrect: false }], correctKey: 'C', explanation: '(-1 - 1)x = -2x' },
      { id: 'd8-8', question: '¿Cuál es el resultado de la reducción?', latex: 'x + x', options: [{ key: 'A', text: '0', isCorrect: false }, { key: 'B', text: '5x', isCorrect: false }, { key: 'C', text: '2x', isCorrect: true }, { key: 'D', text: '-2x', isCorrect: false }], correctKey: 'C', explanation: '(1 + 1)x = 2x' },
      { id: 'd8-9', question: '¿Cuál es el resultado de la reducción?', latex: '10x - x', options: [{ key: 'A', text: '7x', isCorrect: false }, { key: 'B', text: '-9x', isCorrect: false }, { key: 'C', text: '11x', isCorrect: false }, { key: 'D', text: '9x', isCorrect: true }], correctKey: 'D', explanation: '(10 - 1)x = 9x' },
      { id: 'd8-10', question: '¿Cuál es el resultado de la reducción?', latex: '-x - 8x', options: [{ key: 'A', text: '-10x', isCorrect: false }, { key: 'B', text: '-9x', isCorrect: true }, { key: 'C', text: '9x', isCorrect: false }, { key: 'D', text: '-6x', isCorrect: false }], correctKey: 'B', explanation: '(-1 - 8)x = -9x' },
      { id: 'd8-11', question: '¿Cuál es el resultado de la reducción?', latex: '2x - x', options: [{ key: 'A', text: '-x', isCorrect: false }, { key: 'B', text: '4x', isCorrect: false }, { key: 'C', text: '2x', isCorrect: false }, { key: 'D', text: 'x', isCorrect: true }], correctKey: 'D', explanation: '(2 - 1)x = 1x = x' },
      { id: 'd8-12', question: '¿Cuál es el resultado de la reducción?', latex: '-x + 3x', options: [{ key: 'A', text: '3x', isCorrect: false }, { key: 'B', text: '5x', isCorrect: false }, { key: 'C', text: '-2x', isCorrect: false }, { key: 'D', text: '2x', isCorrect: true }], correctKey: 'D', explanation: '(-1 + 3)x = 2x' },
      { id: 'd8-13', question: '¿Cuál es el resultado de la reducción?', latex: 'x - 9x', options: [{ key: 'A', text: '-8x', isCorrect: true }, { key: 'B', text: '-6x', isCorrect: false }, { key: 'C', text: '8x', isCorrect: false }, { key: 'D', text: '-7x', isCorrect: false }], correctKey: 'A', explanation: '(1 - 9)x = -8x' },
      { id: 'd8-14', question: '¿Cuál es el resultado de la reducción?', latex: '-12x + x', options: [{ key: 'A', text: '-11x', isCorrect: true }, { key: 'B', text: '-10x', isCorrect: false }, { key: 'C', text: '11x', isCorrect: false }, { key: 'D', text: '-8x', isCorrect: false }], correctKey: 'A', explanation: '(-12 + 1)x = -11x' },
      { id: 'd8-15', question: '¿Cuál es el resultado de la reducción?', latex: 'x + x + 4x', options: [{ key: 'A', text: '7x', isCorrect: false }, { key: 'B', text: '8x', isCorrect: false }, { key: 'C', text: '6x', isCorrect: true }, { key: 'D', text: '-6x', isCorrect: false }], correctKey: 'C', explanation: '(1 + 1 + 4)x = 6x' },
      { id: 'd8-16', question: '¿Cuál es el resultado de la reducción?', latex: '7x - x - x', options: [{ key: 'A', text: '8x', isCorrect: false }, { key: 'B', text: '4x', isCorrect: false }, { key: 'C', text: '5x', isCorrect: true }, { key: 'D', text: '3x', isCorrect: false }], correctKey: 'C', explanation: '(7 - 1 - 1)x = 5x' },
      { id: 'd8-17', question: '¿Cuál es el resultado de la reducción?', latex: '-x - x - 3x', options: [{ key: 'A', text: '5x', isCorrect: false }, { key: 'B', text: '-7x', isCorrect: false }, { key: 'C', text: '-5x', isCorrect: true }, { key: 'D', text: '-6x', isCorrect: false }], correctKey: 'C', explanation: '(-1 - 1 - 3)x = -5x' },
      { id: 'd8-18', question: '¿Cuál es el resultado de la reducción?', latex: '3x - x + 5x', options: [{ key: 'A', text: '-7x', isCorrect: false }, { key: 'B', text: '8x', isCorrect: false }, { key: 'C', text: '7x', isCorrect: true }, { key: 'D', text: '9x', isCorrect: false }], correctKey: 'C', explanation: '(3 - 1 + 5)x = 7x' },
      { id: 'd8-19', question: '¿Cuál es el resultado de la reducción?', latex: '9x - 8x - x', options: [{ key: 'A', text: '0', isCorrect: false }, { key: 'B', text: '0', isCorrect: true }, { key: 'C', text: '1', isCorrect: false }, { key: 'D', text: '-1', isCorrect: false }], correctKey: 'B', explanation: '(9 - 8 - 1)x = 0x = 0' },
      { id: 'd8-20', question: '¿Cuál es el resultado de la reducción?', latex: '-4x + x - 2x', options: [{ key: 'A', text: '-4x', isCorrect: false }, { key: 'B', text: '5x', isCorrect: false }, { key: 'C', text: '-7x', isCorrect: false }, { key: 'D', text: '-5x', isCorrect: true }], correctKey: 'D', explanation: '(-4 + 1 - 2)x = -5x' },
      { id: 'd8-21', question: '¿Cuál es el resultado de la reducción?', latex: '-3x - 8x', options: [{ key: 'A', text: '-9x', isCorrect: false }, { key: 'B', text: '-11x', isCorrect: true }, { key: 'C', text: '11x', isCorrect: false }, { key: 'D', text: '-12x', isCorrect: false }], correctKey: 'B', explanation: '-3 - 8 = -11' },
      { id: 'd8-22', question: '¿Cuál es el resultado de la reducción?', latex: '-6x + 14x', options: [{ key: 'A', text: '-8x', isCorrect: false }, { key: 'B', text: '8x', isCorrect: true }, { key: 'C', text: '6x', isCorrect: false }, { key: 'D', text: '11x', isCorrect: false }], correctKey: 'B', explanation: '-6 + 14 = 8' },
      { id: 'd8-23', question: '¿Cuál es el resultado de la reducción?', latex: '5x - 12x', options: [{ key: 'A', text: '7x', isCorrect: false }, { key: 'B', text: '-7x', isCorrect: true }, { key: 'C', text: '-6x', isCorrect: false }, { key: 'D', text: '-9x', isCorrect: false }], correctKey: 'B', explanation: '5 - 12 = -7' },
      { id: 'd8-24', question: '¿Cuál es el resultado de la reducción?', latex: '-15x + 7x', options: [{ key: 'A', text: '-8x', isCorrect: true }, { key: 'B', text: '-9x', isCorrect: false }, { key: 'C', text: '8x', isCorrect: false }, { key: 'D', text: '-7x', isCorrect: false }], correctKey: 'A', explanation: '-15 + 7 = -8' },
      { id: 'd8-25', question: '¿Cuál es el resultado de la reducción?', latex: '-9x - 9x', options: [{ key: 'A', text: '-18x', isCorrect: true }, { key: 'B', text: '-20x', isCorrect: false }, { key: 'C', text: '18x', isCorrect: false }, { key: 'D', text: '-19x', isCorrect: false }], correctKey: 'A', explanation: '-9 - 9 = -18' },
      { id: 'd8-26', question: '¿Cuál es el resultado de la reducción?', latex: '14x - 6x', options: [{ key: 'A', text: '6x', isCorrect: false }, { key: 'B', text: '10x', isCorrect: false }, { key: 'C', text: '8x', isCorrect: true }, { key: 'D', text: '-8x', isCorrect: false }], correctKey: 'C', explanation: '14 - 6 = 8' },
      { id: 'd8-27', question: '¿Cuál es el resultado de la reducción?', latex: '-20x + 5x', options: [{ key: 'A', text: '-12x', isCorrect: false }, { key: 'B', text: '15x', isCorrect: false }, { key: 'C', text: '-15x', isCorrect: true }, { key: 'D', text: '-13x', isCorrect: false }], correctKey: 'C', explanation: '-20 + 5 = -15' },
      { id: 'd8-28', question: '¿Cuál es el resultado de la reducción?', latex: '4x - 11x', options: [{ key: 'A', text: '-7x', isCorrect: true }, { key: 'B', text: '-5x', isCorrect: false }, { key: 'C', text: '7x', isCorrect: false }, { key: 'D', text: '-8x', isCorrect: false }], correctKey: 'A', explanation: '4 - 11 = -7' },
      { id: 'd8-29', question: '¿Cuál es el resultado de la reducción?', latex: '-8x - 13x', options: [{ key: 'A', text: '-19x', isCorrect: false }, { key: 'B', text: '-22x', isCorrect: false }, { key: 'C', text: '21x', isCorrect: false }, { key: 'D', text: '-21x', isCorrect: true }], correctKey: 'D', explanation: '-8 - 13 = -21' },
      { id: 'd8-30', question: '¿Cuál es el resultado de la reducción?', latex: '-2x + 18x', options: [{ key: 'A', text: '16x', isCorrect: true }, { key: 'B', text: '19x', isCorrect: false }, { key: 'C', text: '15x', isCorrect: false }, { key: 'D', text: '-16x', isCorrect: false }], correctKey: 'A', explanation: '-2 + 18 = 16' },
      { id: 'd8-31', question: '¿Cuál es el resultado de la reducción?', latex: '13x - 20x', options: [{ key: 'A', text: '-4x', isCorrect: false }, { key: 'B', text: '7x', isCorrect: false }, { key: 'C', text: '-7x', isCorrect: true }, { key: 'D', text: '-5x', isCorrect: false }], correctKey: 'C', explanation: '13 - 20 = -7' },
      { id: 'd8-32', question: '¿Cuál es el resultado de la reducción?', latex: '-16x - 4x', options: [{ key: 'A', text: '-20x', isCorrect: true }, { key: 'B', text: '20x', isCorrect: false }, { key: 'C', text: '-18x', isCorrect: false }, { key: 'D', text: '-22x', isCorrect: false }], correctKey: 'A', explanation: '-16 - 4 = -20' },
      { id: 'd8-33', question: '¿Cuál es el resultado de la reducción?', latex: '25x - 15x', options: [{ key: 'A', text: '8x', isCorrect: false }, { key: 'B', text: '10x', isCorrect: true }, { key: 'C', text: '9x', isCorrect: false }, { key: 'D', text: '-10x', isCorrect: false }], correctKey: 'B', explanation: '25 - 15 = 10' },
      { id: 'd8-34', question: '¿Cuál es el resultado de la reducción?', latex: '-11x + 11x', options: [{ key: 'A', text: '-2', isCorrect: false }, { key: 'B', text: '0', isCorrect: false }, { key: 'C', text: '2', isCorrect: false }, { key: 'D', text: '0', isCorrect: true }], correctKey: 'D', explanation: '-11 + 11 = 0' },
      { id: 'd8-35', question: '¿Cuál es el resultado de la reducción?', latex: '-30x - 10x', options: [{ key: 'A', text: '-38x', isCorrect: false }, { key: 'B', text: '-39x', isCorrect: false }, { key: 'C', text: '40x', isCorrect: false }, { key: 'D', text: '-40x', isCorrect: true }], correctKey: 'D', explanation: '-30 - 10 = -40' },
      { id: 'd8-36', question: '¿Cuál es el resultado de la reducción?', latex: '7x - 19x', options: [{ key: 'A', text: '-12x', isCorrect: true }, { key: 'B', text: '12x', isCorrect: false }, { key: 'C', text: '-13x', isCorrect: false }, { key: 'D', text: '-10x', isCorrect: false }], correctKey: 'A', explanation: '7 - 19 = -12' },
      { id: 'd8-37', question: '¿Cuál es el resultado de la reducción?', latex: '-14x - 7x', options: [{ key: 'A', text: '-21x', isCorrect: true }, { key: 'B', text: '-19x', isCorrect: false }, { key: 'C', text: '21x', isCorrect: false }, { key: 'D', text: '-23x', isCorrect: false }], correctKey: 'A', explanation: '-14 - 7 = -21' },
      { id: 'd8-38', question: '¿Cuál es el resultado de la reducción?', latex: '-5x + 22x', options: [{ key: 'A', text: '17x', isCorrect: true }, { key: 'B', text: '19x', isCorrect: false }, { key: 'C', text: '18x', isCorrect: false }, { key: 'D', text: '-17x', isCorrect: false }], correctKey: 'A', explanation: '-5 + 22 = 17' },
      { id: 'd8-39', question: '¿Cuál es el resultado de la reducción?', latex: '18x - 30x', options: [{ key: 'A', text: '-13x', isCorrect: false }, { key: 'B', text: '-12x', isCorrect: true }, { key: 'C', text: '-9x', isCorrect: false }, { key: 'D', text: '-11x', isCorrect: false }], correctKey: 'B', explanation: '18 - 30 = -12' },
      { id: 'd8-40', question: '¿Cuál es el resultado de la reducción?', latex: '-25x - 25x', options: [{ key: 'A', text: '-48x', isCorrect: false }, { key: 'B', text: '50x', isCorrect: false }, { key: 'C', text: '-50x', isCorrect: true }, { key: 'D', text: '-47x', isCorrect: false }], correctKey: 'C', explanation: '-25 - 25 = -50' },
      { id: 'd8-41', question: '¿Cuál es el resultado de la reducción?', latex: '6x - 24x', options: [{ key: 'A', text: '-19x', isCorrect: false }, { key: 'B', text: '-16x', isCorrect: false }, { key: 'C', text: '18x', isCorrect: false }, { key: 'D', text: '-18x', isCorrect: true }], correctKey: 'D', explanation: '6 - 24 = -18' },
      { id: 'd8-42', question: '¿Cuál es el resultado de la reducción?', latex: '-12x + 3x - 5x', options: [{ key: 'A', text: '-14x', isCorrect: true }, { key: 'B', text: '-13x', isCorrect: false }, { key: 'C', text: '14x', isCorrect: false }, { key: 'D', text: '-16x', isCorrect: false }], correctKey: 'A', explanation: '-12 + 3 - 5 = -14' },
      { id: 'd8-43', question: '¿Cuál es el resultado de la reducción?', latex: '8x - 15x + 2x', options: [{ key: 'A', text: '5x', isCorrect: false }, { key: 'B', text: '-5x', isCorrect: true }, { key: 'C', text: '-3x', isCorrect: false }, { key: 'D', text: '-7x', isCorrect: false }], correctKey: 'B', explanation: '8 - 15 + 2 = -5' },
      { id: 'd8-44', question: '¿Cuál es el resultado de la reducción?', latex: '-4x - 6x - 10x', options: [{ key: 'A', text: '-22x', isCorrect: false }, { key: 'B', text: '-17x', isCorrect: false }, { key: 'C', text: '-20x', isCorrect: true }, { key: 'D', text: '20x', isCorrect: false }], correctKey: 'C', explanation: '-4 - 6 - 10 = -20' },
      { id: 'd8-45', question: '¿Cuál es el resultado de la reducción?', latex: '9x - 2x - 14x', options: [{ key: 'A', text: '7x', isCorrect: false }, { key: 'B', text: '-5x', isCorrect: false }, { key: 'C', text: '-7x', isCorrect: true }, { key: 'D', text: '-6x', isCorrect: false }], correctKey: 'C', explanation: '9 - 2 - 14 = -7' },
      { id: 'd8-46', question: '¿Cuál es el resultado de la reducción?', latex: '4x + 7 + 3x - 2', options: [{ key: 'A', text: '-7x + 5', isCorrect: false }, { key: 'B', text: '7x + 5', isCorrect: true }, { key: 'C', text: '7x + 3', isCorrect: false }, { key: 'D', text: '7x - 5', isCorrect: false }], correctKey: 'B', explanation: '7x + $ | C) $ $1$ | D) $) $7x $$(4x+3x) + (7-2) = 7x + 5' },
      { id: 'd8-47', question: '¿Cuál es el resultado de la reducción?', latex: '6x - 5 + 2x + 8', options: [{ key: 'A', text: '-8x - 3', isCorrect: false }, { key: 'B', text: '8x - 3', isCorrect: false }, { key: 'C', text: '-8x + 3', isCorrect: false }, { key: 'D', text: '8x + 3', isCorrect: true }], correctKey: 'D', explanation: '8x - 1$ | C) $ $1$ | D) $) $8x $$(6x+2x) + (-5+8) = 8x + 3' },
      { id: 'd8-48', question: '¿Cuál es el resultado de la reducción?', latex: '8x + 3 - 5x - 9', options: [{ key: 'A', text: '-3x - 6', isCorrect: false }, { key: 'B', text: '-3x + 6', isCorrect: false }, { key: 'C', text: '3x - 6', isCorrect: true }, { key: 'D', text: '3x + 6', isCorrect: false }], correctKey: 'C', explanation: '3x + 1$ | C) $ $-3x -$ | D) $) $$$(8x-5x) + (3-9) = 3x - 6' },
      { id: 'd8-49', question: '¿Cuál es el resultado de la reducción?', latex: '-2x + 10 + 7x - 4', options: [{ key: 'A', text: '-5x - 6', isCorrect: false }, { key: 'B', text: '5x - 6', isCorrect: false }, { key: 'C', text: '-5x + 6', isCorrect: false }, { key: 'D', text: '5x + 6', isCorrect: true }], correctKey: 'D', explanation: '9x + $ | C) $ $5x + $ | D) $) $$$(-2x+7x) + (10-4) = 5x + 6' },
      { id: 'd8-50', question: '¿Cuál es el resultado de la reducción?', latex: '5x - 8 - 9x + 3', options: [{ key: 'A', text: '4x - 5', isCorrect: false }, { key: 'B', text: '-4x + 5', isCorrect: false }, { key: 'C', text: '-4x - 4', isCorrect: false }, { key: 'D', text: '-4x - 5', isCorrect: true }], correctKey: 'D', explanation: '-4x + 1$ | C) $ $4x -$ | D) $) $$$(5x-9x) + (-8+3) = -4x - 5' },
      { id: 'd8-51', question: '¿Cuál es el resultado de la reducción?', latex: '9x + 4 - x - 10', options: [{ key: 'A', text: '-8x + 6', isCorrect: false }, { key: 'B', text: '8x + 6', isCorrect: false }, { key: 'C', text: '8x - 8', isCorrect: false }, { key: 'D', text: '8x - 6', isCorrect: true }], correctKey: 'D', explanation: '9x - $ | C) $ $8x + $ | D) $) $$(9x-1x) + (4-10) = 8x - 6' },
      { id: 'd8-52', question: '¿Cuál es el resultado de la reducción?', latex: '-3x - 7 - 4x - 2', options: [{ key: 'A', text: '-7x + 9', isCorrect: false }, { key: 'B', text: '7x + 9', isCorrect: false }, { key: 'C', text: '-7x - 9', isCorrect: true }, { key: 'D', text: '-7x - 10', isCorrect: false }], correctKey: 'C', explanation: '-7x + $ | C) $ $7x -$ | D) $) $-$$(-3x-4x) + (-7-2) = -7x - 9' },
      { id: 'd8-53', question: '¿Cuál es el resultado de la reducción?', latex: '12 + 5x - 8 + 2x', options: [{ key: 'A', text: '-7x - 4', isCorrect: false }, { key: 'B', text: '-7x + 4', isCorrect: false }, { key: 'C', text: '7x + 4', isCorrect: true }, { key: 'D', text: '7x + 5', isCorrect: false }], correctKey: 'C', explanation: '7x - $ | C) $ $1$ | D) $) $3x $$(5x+2x) + (12-8) = 7x + 4' },
      { id: 'd8-54', question: '¿Cuál es el resultado de la reducción?', latex: '7x - 1 - 7x + 6', options: [{ key: 'A', text: '4', isCorrect: false }, { key: 'B', text: '8', isCorrect: false }, { key: 'C', text: '-5', isCorrect: false }, { key: 'D', text: '5', isCorrect: true }], correctKey: 'D', explanation: '14x + $ | C) $ $$ | D) $)$$(7x-7x) + (-1+6) = 0x + 5 = 5' },
      { id: 'd8-55', question: '¿Cuál es el resultado de la reducción?', latex: '-x + 9 + 4x - 15', options: [{ key: 'A', text: '3x - 6', isCorrect: true }, { key: 'B', text: '3x + 6', isCorrect: false }, { key: 'C', text: '-3x - 6', isCorrect: false }, { key: 'D', text: '3x - 8', isCorrect: false }], correctKey: 'A', explanation: '5x - $ | C) $ $3x + $ | D) $) $-3x $$(-1x+4x) + (9-15) = 3x - 6' },
      { id: 'd8-56', question: '¿Cuál es el resultado de la reducción?', latex: '10x - 3 - 4x - 8', options: [{ key: 'A', text: '6x - 12', isCorrect: false }, { key: 'B', text: '6x - 11', isCorrect: true }, { key: 'C', text: '-6x - 11', isCorrect: false }, { key: 'D', text: '6x + 11', isCorrect: false }], correctKey: 'B', explanation: '6x + $ | C) $ $6x -$ | D) $) $14x -$$(10x-4x) + (-3-8) = 6x - 11' },
      { id: 'd8-57', question: '¿Cuál es el resultado de la reducción?', latex: '-6x + 12 + 6x - 4', options: [{ key: 'A', text: '10', isCorrect: false }, { key: 'B', text: '11', isCorrect: false }, { key: 'C', text: '-8', isCorrect: false }, { key: 'D', text: '8', isCorrect: true }], correctKey: 'D', explanation: '-12x + $ | C) $ $$ | D) $) $$(-6x+6x) + (12-4) = 0x + 8 = 8' },
      { id: 'd8-58', question: '¿Cuál es el resultado de la reducción?', latex: '3x + 15 - 8x - 5', options: [{ key: 'A', text: '-5x + 10', isCorrect: true }, { key: 'B', text: '5x - 10', isCorrect: false }, { key: 'C', text: '-5x - 10', isCorrect: false }, { key: 'D', text: '5x + 10', isCorrect: false }], correctKey: 'A', explanation: '5x + 1$ | C) $ $-5x - $ | D) $) $$(3x-8x) + (15-5) = -5x + 10' },
      { id: 'd8-59', question: '¿Cuál es el resultado de la reducción?', latex: '2x - 9 + x + 14', options: [{ key: 'A', text: '3x + 7', isCorrect: false }, { key: 'B', text: '3x + 4', isCorrect: false }, { key: 'C', text: '3x + 5', isCorrect: true }, { key: 'D', text: '-3x + 5', isCorrect: false }], correctKey: 'C', explanation: '2x + $ | C) $ $3x - $ | D) $) $$(2x+1x) + (-9+14) = 3x + 5' },
      { id: 'd8-60', question: '¿Cuál es el resultado de la reducción?', latex: '-5x - 6 + 2x - 1', options: [{ key: 'A', text: '3x + 7', isCorrect: false }, { key: 'B', text: '3x - 7', isCorrect: false }, { key: 'C', text: '-3x - 7', isCorrect: true }, { key: 'D', text: '-3x + 7', isCorrect: false }], correctKey: 'C', explanation: '-3x + $ | C) $ $3x -$ | D) $) $-$$(-5x+2x) + (-6-1) = -3x - 7' },
      { id: 'd8-61', question: '¿Cuál es el resultado de la reducción?', latex: '14x + 8 - 6x - 8', options: [{ key: 'A', text: '7x', isCorrect: false }, { key: 'B', text: '-8x', isCorrect: false }, { key: 'C', text: '11x', isCorrect: false }, { key: 'D', text: '8x', isCorrect: true }], correctKey: 'D', explanation: '8x + 1$ | C) $ $2$ | D) $)$$(14x-6x) + (8-8) = 8x + 0 = 8x' },
      { id: 'd8-62', question: '¿Cuál es el resultado de la reducción?', latex: '-8x + 2 - x - 7', options: [{ key: 'A', text: '-9x + 5', isCorrect: false }, { key: 'B', text: '9x + 5', isCorrect: false }, { key: 'C', text: '-9x - 7', isCorrect: false }, { key: 'D', text: '-9x - 5', isCorrect: true }], correctKey: 'D', explanation: '-7x - $ | C) $ $-9x +$ | D) $) $-$$(-8x-1x) + (2-7) = -9x - 5' },
      { id: 'd8-63', question: '¿Cuál es el resultado de la reducción?', latex: '11 - 4x - 5 + 9x', options: [{ key: 'A', text: '-5x - 6', isCorrect: false }, { key: 'B', text: '-5x + 6', isCorrect: false }, { key: 'C', text: '5x + 6', isCorrect: true }, { key: 'D', text: '5x - 6', isCorrect: false }], correctKey: 'C', explanation: '-5x + $ | C) $ $13x +$ | D) $) $$$(-4x+9x) + (11-5) = 5x + 6' },
      { id: 'd8-64', question: '¿Cuál es el resultado de la reducción?', latex: '6x + 2x - 3x + 10', options: [{ key: 'A', text: '5x + 11', isCorrect: false }, { key: 'B', text: '-5x + 10', isCorrect: false }, { key: 'C', text: '5x + 8', isCorrect: false }, { key: 'D', text: '5x + 10', isCorrect: true }], correctKey: 'D', explanation: '11x + 1$ | C) $ $5x - $ | D) $) $$$(6+2-3)x + 10 = 5x + 10' },
      { id: 'd8-65', question: '¿Cuál es el resultado de la reducción?', latex: '4 - 7x + 8 + 2x', options: [{ key: 'A', text: '-5x + 13', isCorrect: false }, { key: 'B', text: '-5x + 10', isCorrect: false }, { key: 'C', text: '5x + 12', isCorrect: false }, { key: 'D', text: '-5x + 12', isCorrect: true }], correctKey: 'D', explanation: '5x + 1$ | C) $ $-9x + $ | D) $) $$(-7x+2x) + (4+8) = -5x + 12' },
      { id: 'd8-66', question: '¿Cuál es el resultado de la reducción?', latex: '-2x - 3x + 15 - 20', options: [{ key: 'A', text: '-5x - 3', isCorrect: false }, { key: 'B', text: '-5x + 5', isCorrect: false }, { key: 'C', text: '5x + 5', isCorrect: false }, { key: 'D', text: '-5x - 5', isCorrect: true }], correctKey: 'D', explanation: '-5x + 3$ | C) $ $5x -$ | D) $) $-$$(-2-3)x + (15-20) = -5x - 5' },
      { id: 'd8-67', question: '¿Cuál es el resultado de la reducción?', latex: '15x - 6 - 8x + 6', options: [{ key: 'A', text: '7x', isCorrect: true }, { key: 'B', text: '9x', isCorrect: false }, { key: 'C', text: '10x', isCorrect: false }, { key: 'D', text: '-7x', isCorrect: false }], correctKey: 'A', explanation: '7x - 1$ | C) $ $2$ | D) $)$$(15x-8x) + (-6+6) = 7x' },
      { id: 'd8-68', question: '¿Cuál es el resultado de la reducción?', latex: 'x + 8 + x - 3', options: [{ key: 'A', text: '-2x - 5', isCorrect: false }, { key: 'B', text: '2x + 5', isCorrect: true }, { key: 'C', text: '2x - 5', isCorrect: false }, { key: 'D', text: '-2x + 5', isCorrect: false }], correctKey: 'B', explanation: 'x + $ | C) $ $2x + $ | D) $) $$(1x+1x) + (8-3) = 2x + 5' },
      { id: 'd8-69', question: '¿Cuál es el resultado de la reducción?', latex: '-3x + 14 - 5x - 4', options: [{ key: 'A', text: '8x + 10', isCorrect: false }, { key: 'B', text: '-8x + 10', isCorrect: true }, { key: 'C', text: '-8x - 10', isCorrect: false }, { key: 'D', text: '-8x + 11', isCorrect: false }], correctKey: 'B', explanation: '-8x - 1$ | C) $ $2x + $ | D) $) $$(-3x-5x) + (14-4) = -8x + 10' },
      { id: 'd8-70', question: '¿Cuál es el resultado de la reducción?', latex: '9x - 12 - 4x + 7', options: [{ key: 'A', text: '-5x + 5', isCorrect: false }, { key: 'B', text: '5x - 5', isCorrect: true }, { key: 'C', text: '5x + 5', isCorrect: false }, { key: 'D', text: '5x - 4', isCorrect: false }], correctKey: 'B', explanation: '5x + 1$ | C) $ $13x -$ | D) $)$$(9x-4x) + (-12+7) = 5x - 5' },
      { id: 'd8-71', question: '¿Cuál es el resultado de la reducción?', latex: '5 - x + 10 - 2x', options: [{ key: 'A', text: '-3x - 15', isCorrect: false }, { key: 'B', text: '-3x + 15', isCorrect: true }, { key: 'C', text: '-3x + 17', isCorrect: false }, { key: 'D', text: '-3x + 14', isCorrect: false }], correctKey: 'B', explanation: '3x + 1$ | C) $ $-x + $ | D) $) $$$(-1x-2x) + (5+10) = -3x + 15' },
      { id: 'd8-72', question: '¿Cuál es el resultado de la reducción?', latex: '-10x + 6 + 3x - 1', options: [{ key: 'A', text: '-7x + 3', isCorrect: false }, { key: 'B', text: '7x + 5', isCorrect: false }, { key: 'C', text: '-7x + 5', isCorrect: true }, { key: 'D', text: '7x - 5', isCorrect: false }], correctKey: 'C', explanation: '-7x + $ | C) $ $-13x +$ | D) $) $$$(-10x+3x) + (6-1) = -7x + 5' },
      { id: 'd8-73', question: '¿Cuál es el resultado de la reducción?', latex: '7x + 4 - 2x - 9', options: [{ key: 'A', text: '-5x - 5', isCorrect: false }, { key: 'B', text: '5x + 5', isCorrect: false }, { key: 'C', text: '5x - 5', isCorrect: true }, { key: 'D', text: '-5x + 5', isCorrect: false }], correctKey: 'C', explanation: '5x + 1$ | C) $ $9x -$ | D) $)$$(7x-2x) + (4-9) = 5x - 5' },
      { id: 'd8-74', question: '¿Cuál es el resultado de la reducción?', latex: '8 - 5x - 8 + 5x', options: [{ key: 'A', text: '0', isCorrect: false }, { key: 'B', text: '0', isCorrect: true }, { key: 'C', text: '-2', isCorrect: false }, { key: 'D', text: '1', isCorrect: false }], correctKey: 'B', explanation: '10$ | C) $ $-1$ | D) $) $$(-5x+5x) + (8-8) = 0' },
      { id: 'd8-75', question: '¿Cuál es el resultado de la reducción?', latex: '-4x - 4 + 4x + 4', options: [{ key: 'A', text: '-2', isCorrect: false }, { key: 'B', text: '0', isCorrect: true }, { key: 'C', text: '1', isCorrect: false }, { key: 'D', text: '3', isCorrect: false }], correctKey: 'B', explanation: '-8x - $ | C) $ $$ | D) $)$$(-4x+4x) + (-4+4) = 0' },
      { id: 'd8-76', question: '¿Cuál es el resultado de la reducción?', latex: '6x - (2x + 5)', options: [{ key: 'A', text: '-4x + 5', isCorrect: false }, { key: 'B', text: '4x - 4', isCorrect: false }, { key: 'C', text: '4x - 5', isCorrect: true }, { key: 'D', text: '4x - 7', isCorrect: false }], correctKey: 'C', explanation: '4x + $ | C) $ $8x -$ | D) $) $8x $$6x - 2x - 5 = 4x - 5' },
      { id: 'd8-77', question: '¿Cuál es el resultado de la reducción?', latex: '5x - (x - 4)', options: [{ key: 'A', text: '4x + 2', isCorrect: false }, { key: 'B', text: '-4x + 4', isCorrect: false }, { key: 'C', text: '4x + 4', isCorrect: true }, { key: 'D', text: '4x - 4', isCorrect: false }], correctKey: 'C', explanation: '4x - $ | C) $ $6x +$ | D) $) $6x $$5x - 1x + 4 = 4x + 4' },
      { id: 'd8-78', question: '¿Cuál es el resultado de la reducción?', latex: '3x + (4x - 7)', options: [{ key: 'A', text: '7x - 7', isCorrect: true }, { key: 'B', text: '-7x - 7', isCorrect: false }, { key: 'C', text: '-7x + 7', isCorrect: false }, { key: 'D', text: '7x + 7', isCorrect: false }], correctKey: 'A', explanation: '7x + $ | C) $ $-x -$ | D) $) $12x $$3x + 4x - 7 = 7x - 7' },
      { id: 'd8-79', question: '¿Cuál es el resultado de la reducción?', latex: '8x - (3x - 6)', options: [{ key: 'A', text: '5x - 6', isCorrect: false }, { key: 'B', text: '-5x + 6', isCorrect: false }, { key: 'C', text: '-5x - 6', isCorrect: false }, { key: 'D', text: '5x + 6', isCorrect: true }], correctKey: 'D', explanation: '5x - $ | C) $ $11x +$ | D) $) $11x $$8x - 3x + 6 = 5x + 6' },
      { id: 'd8-80', question: '¿Cuál es el resultado de la reducción?', latex: '2x - (5x + 1)', options: [{ key: 'A', text: '-3x - 1', isCorrect: true }, { key: 'B', text: '3x - 1', isCorrect: false }, { key: 'C', text: '3x + 1', isCorrect: false }, { key: 'D', text: '-3x + 1', isCorrect: false }], correctKey: 'A', explanation: '-3x + $ | C) $ $3x -$ | D) $) $-7x $$2x - 5x - 1 = -3x - 1' },
      { id: 'd8-81', question: '¿Cuál es el resultado de la reducción?', latex: '10 - (3x + 4)', options: [{ key: 'A', text: '-3x - 6', isCorrect: false }, { key: 'B', text: '3x + 6', isCorrect: false }, { key: 'C', text: '-3x + 6', isCorrect: true }, { key: 'D', text: '3x - 6', isCorrect: false }], correctKey: 'C', explanation: '-3x + 1$ | C) $ $3x +$ | D) $) $$10 - 3x - 4 = -3x + 6' },
      { id: 'd8-82', question: '¿Cuál es el resultado de la reducción?', latex: '7 - (2x - 5)', options: [{ key: 'A', text: '-2x + 12', isCorrect: true }, { key: 'B', text: '-2x - 12', isCorrect: false }, { key: 'C', text: '-2x + 13', isCorrect: false }, { key: 'D', text: '2x + 12', isCorrect: false }], correctKey: 'A', explanation: '-2x + $ | C) $ $2x + $ | D) $) $-2x -$$7 - 2x + 5 = -2x + 12' },
      { id: 'd8-83', question: '¿Cuál es el resultado de la reducción?', latex: '-(4x - 3) + 6x', options: [{ key: 'A', text: '2x + 5', isCorrect: false }, { key: 'B', text: '2x + 3', isCorrect: true }, { key: 'C', text: '-2x + 3', isCorrect: false }, { key: 'D', text: '-2x - 3', isCorrect: false }], correctKey: 'B', explanation: '2x - $ | C) $ $-2x +$ | D) $) $10x $$-4x + 3 + 6x = 2x + 3' },
      { id: 'd8-84', question: '¿Cuál es el resultado de la reducción?', latex: '-(x + 8) + 5x', options: [{ key: 'A', text: '-4x - 8', isCorrect: false }, { key: 'B', text: '4x - 8', isCorrect: true }, { key: 'C', text: '-4x + 8', isCorrect: false }, { key: 'D', text: '4x + 8', isCorrect: false }], correctKey: 'B', explanation: '4x + $ | C) $ $6x -$ | D) $) $-4x $$-x - 8 + 5x = 4x - 8' },
      { id: 'd8-85', question: '¿Cuál es el resultado de la reducción?', latex: '4x - (7 - 2x)', options: [{ key: 'A', text: '6x - 6', isCorrect: false }, { key: 'B', text: '6x + 7', isCorrect: false }, { key: 'C', text: '-6x - 7', isCorrect: false }, { key: 'D', text: '6x - 7', isCorrect: true }], correctKey: 'D', explanation: '2x - $ | C) $ $6x +$ | D) $) $-2x $$4x - 7 + 2x = 6x - 7' },
      { id: 'd8-86', question: '¿Cuál es el resultado de la reducción?', latex: '9x + (-4x + 2)', options: [{ key: 'A', text: '5x - 2', isCorrect: false }, { key: 'B', text: '5x + 2', isCorrect: true }, { key: 'C', text: '-5x - 2', isCorrect: false }, { key: 'D', text: '-5x + 2', isCorrect: false }], correctKey: 'B', explanation: '5x - $ | C) $ $13x +$ | D) $) $$9x - 4x + 2 = 5x + 2' },
      { id: 'd8-87', question: '¿Cuál es el resultado de la reducción?', latex: '-(2x + 9) - 3x', options: [{ key: 'A', text: '-5x - 7', isCorrect: false }, { key: 'B', text: '-5x + 9', isCorrect: false }, { key: 'C', text: '-5x - 9', isCorrect: true }, { key: 'D', text: '5x + 9', isCorrect: false }], correctKey: 'C', explanation: '-5x + $ | C) $ $-x -$ | D) $) $5x $$-2x - 9 - 3x = -5x - 9' },
      { id: 'd8-88', question: '¿Cuál es el resultado de la reducción?', latex: '12x - (5x - 8) - 3', options: [{ key: 'A', text: '7x + 4', isCorrect: false }, { key: 'B', text: '-7x + 5', isCorrect: false }, { key: 'C', text: '-7x - 5', isCorrect: false }, { key: 'D', text: '7x + 5', isCorrect: true }], correctKey: 'D', explanation: '7x - 1$ | C) $ $7x -$ | D) $) $17x $$12x - 5x + 8 - 3 = 7x + 5' },
      { id: 'd8-89', question: '¿Cuál es el resultado de la reducción?', latex: '-(3x - 4) - (x + 2)', options: [{ key: 'A', text: '4x + 2', isCorrect: false }, { key: 'B', text: '-4x - 0', isCorrect: false }, { key: 'C', text: '-4x - 2', isCorrect: false }, { key: 'D', text: '-4x + 2', isCorrect: true }], correctKey: 'D', explanation: '-4x + $ | C) $ $-2x +$ | D) $) $-4x $$-3x + 4 - x - 2 = -4x + 2' },
      { id: 'd8-90', question: '¿Cuál es el resultado de la reducción?', latex: '2(x + 3) + 4x', options: [{ key: 'A', text: '6x - 6', isCorrect: false }, { key: 'B', text: '-6x - 6', isCorrect: false }, { key: 'C', text: '-6x + 6', isCorrect: false }, { key: 'D', text: '6x + 6', isCorrect: true }], correctKey: 'D', explanation: '5x + $ | C) $ $6x +$ | D) $) $$2x + 6 + 4x = 6x + 6' },
      { id: 'd8-91', question: '¿Cuál es el resultado de la reducción?', latex: '3(2x - 1) - 5x', options: [{ key: 'A', text: 'x - 4', isCorrect: false }, { key: 'B', text: 'x + 3', isCorrect: false }, { key: 'C', text: 'x - 3', isCorrect: true }, { key: 'D', text: '-x - 3', isCorrect: false }], correctKey: 'C', explanation: 'x - $ | C) $ $11x -$ | D) $) $-x $$6x - 3 - 5x = x - 3' },
      { id: 'd8-92', question: '¿Cuál es el resultado de la reducción?', latex: '-(x - 6) - 6', options: [{ key: 'A', text: '-x', isCorrect: true }, { key: 'B', text: 'x', isCorrect: false }, { key: 'C', text: '-2x', isCorrect: false }, { key: 'D', text: '2x', isCorrect: false }], correctKey: 'A', explanation: '-x + 1$ | C) $ $ | D) $) $$$-x + 6 - 6 = -x' },
      { id: 'd8-93', question: '¿Cuál es el resultado de la reducción?', latex: '8x - (4x + 3) + 1', options: [{ key: 'A', text: '-4x - 2', isCorrect: false }, { key: 'B', text: '4x - 2', isCorrect: true }, { key: 'C', text: '4x - 0', isCorrect: false }, { key: 'D', text: '4x + 2', isCorrect: false }], correctKey: 'B', explanation: '4x - $ | C) $ $4x +$ | D) $) $12x $$8x - 4x - 3 + 1 = 4x - 2' },
      { id: 'd8-94', question: '¿Cuál es el resultado de la reducción?', latex: '-(5x + 2) + 2', options: [{ key: 'A', text: '-3x', isCorrect: false }, { key: 'B', text: '-7x', isCorrect: false }, { key: 'C', text: '-5x', isCorrect: true }, { key: 'D', text: '5x', isCorrect: false }], correctKey: 'C', explanation: '-5x + $ | C) $ $-5x -$ | D) $)$$-5x - 2 + 2 = -5x' },
      { id: 'd8-95', question: '¿Cuál es el resultado de la reducción?', latex: '7x - (2x - 9) - 10', options: [{ key: 'A', text: '5x + 1', isCorrect: false }, { key: 'B', text: '-5x + 1', isCorrect: false }, { key: 'C', text: '5x - 1', isCorrect: true }, { key: 'D', text: '5x - 0', isCorrect: false }], correctKey: 'C', explanation: '5x + 1$ | C) $ $5x - $ | D) $) $9x $$7x - 2x + 9 - 10 = 5x - 1' },
      { id: 'd8-96', question: '¿Cuál es el resultado de la reducción?', latex: '-(8 - 3x) + 4x', options: [{ key: 'A', text: '-7x + 8', isCorrect: false }, { key: 'B', text: '7x - 6', isCorrect: false }, { key: 'C', text: '7x - 8', isCorrect: true }, { key: 'D', text: '7x + 8', isCorrect: false }], correctKey: 'C', explanation: 'x - $ | C) $ $7x +$ | D) $) $-7x $$-8 + 3x + 4x = 7x - 8' },
      { id: 'd8-97', question: '¿Cuál es el resultado de la reducción?', latex: '5(x - 2) - 3x + 4', options: [{ key: 'A', text: '2x - 6', isCorrect: true }, { key: 'B', text: '2x - 7', isCorrect: false }, { key: 'C', text: '-2x + 6', isCorrect: false }, { key: 'D', text: '2x - 5', isCorrect: false }], correctKey: 'A', explanation: '2x - 1$ | C) $ $8x -$ | D) $) $2x $$5x - 10 - 3x + 4 = 2x - 6' },
      { id: 'd8-98', question: '¿Cuál es el resultado de la reducción?', latex: '-(x + 1) - (x + 1)', options: [{ key: 'A', text: '2x - 2', isCorrect: false }, { key: 'B', text: '-2x - 2', isCorrect: true }, { key: 'C', text: '2x + 2', isCorrect: false }, { key: 'D', text: '-2x + 2', isCorrect: false }], correctKey: 'B', explanation: '$ | C) $ $-2x +$ | D) $) $2x $$-x - 1 - x - 1 = -2x - 2' },
      { id: 'd8-99', question: '¿Cuál es el resultado de la reducción?', latex: '4x - (3x - (x + 2))', options: [{ key: 'A', text: '-2x - 2', isCorrect: false }, { key: 'B', text: '2x + 2', isCorrect: true }, { key: 'C', text: '-2x + 2', isCorrect: false }, { key: 'D', text: '2x + 3', isCorrect: false }], correctKey: 'B', explanation: '$ | C) $ $2x -$ | D) $) $4x $$4x - (3x - x - 2) = 4x - (2x - 2) = 2x + 2' },
      { id: 'd8-100', question: '¿Cuál es el resultado de la reducción?', latex: '15 - (6x + 5) + 2x', options: [{ key: 'A', text: '4x - 10', isCorrect: false }, { key: 'B', text: '-4x + 10', isCorrect: true }, { key: 'C', text: '-4x - 10', isCorrect: false }, { key: 'D', text: '4x + 10', isCorrect: false }], correctKey: 'B', explanation: '-4x + 2$ | C) $ $4x + $ | D) $) $-8x +$$15 - 6x - 5 + 2x = -4x + 10' }
    ]
  }
];
