export type CrossMathDifficulty = 'facil' | 'medio' | 'dificil';

export interface CrossMathLevel {
  id: string;
  levelNumber: number; // 1 to 5
  difficulty: CrossMathDifficulty;
  size: 2 | 3;
  numberBank: number[];
  // For 2x2:
  // Row 1: blank(r0c0) opRow0 blank(r0c1) = resRow0
  // Col ops: opCol0, opCol1
  // Row 2: blank(r1c0) opRow1 blank(r1c1) = resRow1
  // Col results: resCol0, resCol1
  // For 3x3:
  // Row 1: cell(r0c0) opRow0_0 cell(r0c1) opRow0_1 cell(r0c2) = resRow0
  // Col ops 0: opCol0_0, opCol0_1, opCol0_2
  // Row 2: cell(r1c0) opRow1_0 cell(r1c1) opRow1_1 cell(r1c2) = resRow1
  // Col ops 1: opCol1_0, opCol1_1, opCol1_2
  // Row 3: cell(r2c0) opRow2_0 cell(r2c1) opRow2_1 cell(r2c2) = resRow2
  // Col results: resCol0, resCol1, resCol2
  fixedCells?: Record<string, number>; // cell id -> fixed value
  blankIds: string[]; // cell ids that must be filled
  solution: Record<string, number>; // cell id -> correct number value
  rowOps: string[][];
  colOps: string[][];
  rowResults: number[];
  colResults: number[];
  instruction: string;
}

export const CROSS_MATH_LEVELS: CrossMathLevel[] = [
  // ====================== NIVEL 1: FÁCIL (2x2) ======================
  {
    id: 'cm-easy-1',
    levelNumber: 1,
    difficulty: 'facil',
    size: 2,
    numberBank: [1, 3, 4, 6],
    blankIds: ['r0c0', 'r0c1', 'r1c0', 'r1c1'],
    solution: {
      r0c0: 6,
      r0c1: 4,
      r1c0: 3,
      r1c1: 1,
    },
    rowOps: [['+'], ['-']],
    colOps: [['+'], ['-']],
    rowResults: [10, 2],
    colResults: [9, 3],
    instruction: 'Coloca los números [1, 3, 4, 6] en los espacios vacíos.',
  },
  {
    id: 'cm-easy-2',
    levelNumber: 2,
    difficulty: 'facil',
    size: 2,
    numberBank: [1, 2, 7, 8],
    blankIds: ['r0c0', 'r0c1', 'r1c0', 'r1c1'],
    solution: {
      r0c0: 7,
      r0c1: 2,
      r1c0: 1,
      r1c1: 8,
    },
    rowOps: [['-'], ['+']],
    colOps: [['+'], ['+']],
    rowResults: [5, 9],
    colResults: [8, 10],
    instruction: 'Coloca los números [1, 2, 7, 8] en los espacios vacíos.',
  },
  {
    id: 'cm-easy-3',
    levelNumber: 3,
    difficulty: 'facil',
    size: 2,
    numberBank: [2, 4, 5, 9],
    blankIds: ['r0c0', 'r0c1', 'r1c0', 'r1c1'],
    solution: {
      r0c0: 5,
      r0c1: 9,
      r1c0: 4,
      r1c1: 2,
    },
    rowOps: [['+'], ['-']],
    colOps: [['-'], ['-']],
    rowResults: [14, 2],
    colResults: [1, 7],
    instruction: 'Coloca los números [2, 4, 5, 9] en los espacios vacíos.',
  },
  {
    id: 'cm-easy-4',
    levelNumber: 4,
    difficulty: 'facil',
    size: 2,
    numberBank: [2, 3, 6, 8],
    blankIds: ['r0c0', 'r0c1', 'r1c0', 'r1c1'],
    solution: {
      r0c0: 8,
      r0c1: 3,
      r1c0: 2,
      r1c1: 6,
    },
    rowOps: [['-'], ['+']],
    colOps: [['-'], ['+']],
    rowResults: [5, 8],
    colResults: [6, 9],
    instruction: 'Coloca los números [2, 3, 6, 8] en los espacios vacíos.',
  },
  {
    id: 'cm-easy-5',
    levelNumber: 5,
    difficulty: 'facil',
    size: 2,
    numberBank: [1, 4, 5, 10],
    blankIds: ['r0c0', 'r0c1', 'r1c0', 'r1c1'],
    solution: {
      r0c0: 10,
      r0c1: 4,
      r1c0: 1,
      r1c1: 5,
    },
    rowOps: [['-'], ['+']],
    colOps: [['-'], ['+']],
    rowResults: [6, 6],
    colResults: [9, 9],
    instruction: 'Coloca los números [1, 4, 5, 10] en los espacios vacíos.',
  },

  // ====================== NIVEL 2: MEDIO (2x2) ======================
  {
    id: 'cm-med-1',
    levelNumber: 1,
    difficulty: 'medio',
    size: 2,
    numberBank: [2, 3, 4, 5],
    blankIds: ['r0c0', 'r0c1', 'r1c0', 'r1c1'],
    solution: {
      r0c0: 3,
      r0c1: 4,
      r1c0: 5,
      r1c1: 2,
    },
    rowOps: [['*'], ['*']],
    colOps: [['+'], ['-']],
    rowResults: [12, 10],
    colResults: [8, 2],
    instruction: 'Coloca los números [2, 3, 4, 5] respetando multiplicación.',
  },
  {
    id: 'cm-med-2',
    levelNumber: 2,
    difficulty: 'medio',
    size: 2,
    numberBank: [2, 3, 4, 6],
    blankIds: ['r0c0', 'r0c1', 'r1c0', 'r1c1'],
    solution: {
      r0c0: 6,
      r0c1: 2,
      r1c0: 4,
      r1c1: 3,
    },
    rowOps: [['/'], ['*']],
    colOps: [['-'], ['+']],
    rowResults: [3, 12],
    colResults: [2, 5],
    instruction: 'Coloca los números [2, 3, 4, 6] en la cuadrícula.',
  },
  {
    id: 'cm-med-3',
    levelNumber: 3,
    difficulty: 'medio',
    size: 2,
    numberBank: [3, 4, 7, 8],
    blankIds: ['r0c0', 'r0c1', 'r1c0', 'r1c1'],
    solution: {
      r0c0: 7,
      r0c1: 3,
      r1c0: 8,
      r1c1: 4,
    },
    rowOps: [['*'], ['/']],
    colOps: [['+'], ['*']],
    rowResults: [21, 2],
    colResults: [15, 12],
    instruction: 'Coloca los números [3, 4, 7, 8] en la cuadrícula.',
  },
  {
    id: 'cm-med-4',
    levelNumber: 4,
    difficulty: 'medio',
    size: 2,
    numberBank: [1, 3, 5, 9],
    blankIds: ['r0c0', 'r0c1', 'r1c0', 'r1c1'],
    solution: {
      r0c0: 9,
      r0c1: 3,
      r1c0: 5,
      r1c1: 1,
    },
    rowOps: [['/'], ['-']],
    colOps: [['-'], ['+']],
    rowResults: [3, 4],
    colResults: [4, 4],
    instruction: 'Coloca los números [1, 3, 5, 9] en la cuadrícula.',
  },
  {
    id: 'cm-med-5',
    levelNumber: 5,
    difficulty: 'medio',
    size: 2,
    numberBank: [2, 3, 4, 6],
    blankIds: ['r0c0', 'r0c1', 'r1c0', 'r1c1'],
    solution: {
      r0c0: 4,
      r0c1: 6,
      r1c0: 2,
      r1c1: 3,
    },
    rowOps: [['+'], ['*']],
    colOps: [['*'], ['/']],
    rowResults: [10, 6],
    colResults: [8, 2],
    instruction: 'Coloca los números [2, 3, 4, 6] en la cuadrícula.',
  },

  // ====================== NIVEL 3: DIFÍCIL (3x3) ======================
  // Desafío 11:
  // [ 7 ] + [ 8 ] - [ 5 ] = 10
  //   +       -       *
  // [ 4 ] * [ 6 ] - [ 10 ] = 14
  //   +       +       -
  // [ 12 ] - [ 9 ] + [ 6 ] = 9
  //   =       =       =
  //  23      11      44
  {
    id: 'cm-diff-1',
    levelNumber: 1,
    difficulty: 'dificil',
    size: 3,
    numberBank: [4, 5, 8, 9, 10, 12],
    fixedCells: {
      r0c0: 7,
      r1c1: 6,
      r2c2: 6,
    },
    blankIds: ['r0c1', 'r0c2', 'r1c0', 'r1c2', 'r2c0', 'r2c1'],
    solution: {
      r0c0: 7,
      r0c1: 8,
      r0c2: 5,
      r1c0: 4,
      r1c1: 6,
      r1c2: 10,
      r2c0: 12,
      r2c1: 9,
      r2c2: 6,
    },
    rowOps: [
      ['+', '-'],
      ['*', '-'],
      ['-', '+'],
    ],
    colOps: [
      ['+', '-', '*'],
      ['+', '+', '-'],
    ],
    rowResults: [10, 14, 9],
    colResults: [23, 11, 44],
    instruction: 'Cuadrícula 3x3. Tienes 3 números fijos. Usa el banco para llenar los 6 restantes.',
  },

  // Desafío 12:
  // [ 3 ] * [ 5 ] - [ 8 ] = 7
  //   +       *       /
  // [ 9 ] - [ 2 ] + [ 4 ] = 11
  //   -       -       +
  // [ 7 ] * [ 1 ] + [ 6 ] = 13
  //   =       =       =
  //   5       9       8
  {
    id: 'cm-diff-2',
    levelNumber: 2,
    difficulty: 'dificil',
    size: 3,
    numberBank: [1, 2, 3, 6, 8, 9],
    fixedCells: {
      r0c1: 5,
      r1c2: 4,
      r2c0: 7,
    },
    blankIds: ['r0c0', 'r0c2', 'r1c0', 'r1c1', 'r2c1', 'r2c2'],
    solution: {
      r0c0: 3,
      r0c1: 5,
      r0c2: 8,
      r1c0: 9,
      r1c1: 2,
      r1c2: 4,
      r2c0: 7,
      r2c1: 1,
      r2c2: 6,
    },
    rowOps: [
      ['*', '-'],
      ['-', '+'],
      ['*', '+'],
    ],
    colOps: [
      ['+', '*', '/'],
      ['-', '-', '+'],
    ],
    rowResults: [7, 11, 13],
    colResults: [5, 9, 8],
    instruction: 'Cuadrícula 3x3. Completa los 6 espacios vacíos con el banco.',
  },

  // Desafío 13:
  // [ 8 ] / [ 4 ] + [ 2 ] = 4
  //   -       +       *
  // [ 5 ] * [ 7 ] - [ 3 ] = 32
  //   +       +       *
  // [ 1 ] + [ 9 ] - [ 6 ] = 4
  //   =       =       =
  //   4      20      36
  {
    id: 'cm-diff-3',
    levelNumber: 3,
    difficulty: 'dificil',
    size: 3,
    numberBank: [1, 3, 4, 6, 7, 8],
    fixedCells: {
      r0c2: 2,
      r1c0: 5,
      r2c1: 9,
    },
    blankIds: ['r0c0', 'r0c1', 'r1c1', 'r1c2', 'r2c0', 'r2c2'],
    solution: {
      r0c0: 8,
      r0c1: 4,
      r0c2: 2,
      r1c0: 5,
      r1c1: 7,
      r1c2: 3,
      r2c0: 1,
      r2c1: 9,
      r2c2: 6,
    },
    rowOps: [
      ['/', '+'],
      ['*', '-'],
      ['+', '-'],
    ],
    colOps: [
      ['-', '+', '*'],
      ['+', '+', '*'],
    ],
    rowResults: [4, 32, 4],
    colResults: [4, 20, 36],
    instruction: 'Cuadrícula 3x3. Resuelve las operaciones respetando la jerarquía.',
  },

  // Desafío 14:
  // [ 6 ] * [ 8 ] / [ 4 ] = 12
  //   /       *       +
  // [ 2 ] + [ 3 ] + [ 9 ] = 14
  //   +       -       -
  // [ 5 ] * [ 7 ] - [ 1 ] = 34
  //   =       =       =
  //   8      17      12
  {
    id: 'cm-diff-4',
    levelNumber: 4,
    difficulty: 'dificil',
    size: 3,
    numberBank: [1, 3, 5, 6, 8, 9],
    fixedCells: {
      r0c2: 4,
      r1c0: 2,
      r2c1: 7,
    },
    blankIds: ['r0c0', 'r0c1', 'r1c1', 'r1c2', 'r2c0', 'r2c2'],
    solution: {
      r0c0: 6,
      r0c1: 8,
      r0c2: 4,
      r1c0: 2,
      r1c1: 3,
      r1c2: 9,
      r2c0: 5,
      r2c1: 7,
      r2c2: 1,
    },
    rowOps: [
      ['*', '/'],
      ['+', '+'],
      ['*', '-'],
    ],
    colOps: [
      ['/', '*', '+'],
      ['+', '-', '-'],
    ],
    rowResults: [12, 14, 34],
    colResults: [8, 17, 12],
    instruction: 'Cuadrícula 3x3 con multiplicación y división combinadas.',
  },

  // Desafío 15:
  // [ 9 ] - [ 1 ] + [ 7 ] = 15
  //   *       +       -
  // [ 4 ] * [ 5 ] / [ 2 ] = 10
  //   -       +       *
  // [ 8 ] + [ 6 ] * [ 3 ] = 26
  //   =       =       =
  //  28      12       1
  {
    id: 'cm-diff-5',
    levelNumber: 5,
    difficulty: 'dificil',
    size: 3,
    numberBank: [1, 3, 4, 5, 7, 8],
    fixedCells: {
      r0c0: 9,
      r1c2: 2,
      r2c1: 6,
    },
    blankIds: ['r0c1', 'r0c2', 'r1c0', 'r1c1', 'r2c0', 'r2c2'],
    solution: {
      r0c0: 9,
      r0c1: 1,
      r0c2: 7,
      r1c0: 4,
      r1c1: 5,
      r1c2: 2,
      r2c0: 8,
      r2c1: 6,
      r2c2: 3,
    },
    rowOps: [
      ['-', '+'],
      ['*', '/'],
      ['+', '*'],
    ],
    colOps: [
      ['*', '+', '-'],
      ['-', '+', '*'],
    ],
    rowResults: [15, 10, 26],
    colResults: [28, 12, 1],
    instruction: 'Cuadrícula 3x3 nivel maestro. Resuelve y valida todas las filas y columnas.',
  },
];
