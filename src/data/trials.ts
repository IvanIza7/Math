export interface TrialStep {
  instruction: string;
  rules: string[];           // 4 opciones de regla
  correctRule: number;       // índice correcto (0-indexed)
  transformations: string[]; // 4 opciones de transformación
  correctTransformation: number;
  result: string;            // expresión resultado del paso
}

export interface Trial {
  id: string;
  title: string;
  category: 'Aritmética' | 'Álgebra' | 'Geometría';
  difficulty: 'Fácil' | 'Medio' | 'Difícil';
  xp: number;
  volCode: string;
  color: string;
  expression: string;  // expresión inicial
  target: string;      // resultado final esperado
  steps: TrialStep[];
}

export const DAILY_MATH_TRIALS: Trial[] = [
  {
    id: 't01',
    title: 'Doble Negación',
    category: 'Aritmética',
    difficulty: 'Fácil',
    xp: 100,
    volCode: 'VOL-01',
    color: '#00e676',
    expression: '-(-8)',
    target: '8',
    steps: [
      {
        instruction: 'Paso 1 — Ley de los Signos para la Negación',
        rules: [
          'Ley de Doble Negación: -(-a) = +a',
          'Propiedad Distributiva Universal',
          'Elemento Neutro Aditivo: a + 0 = a',
          'Inverso Multiplicativo'
        ],
        correctRule: 0,
        transformations: [
          '+8',
          '-8',
          '1/8',
          '0'
        ],
        correctTransformation: 0,
        result: '8'
      }
    ]
  },
  {
    id: 't02',
    title: 'Factor Común',
    category: 'Álgebra',
    difficulty: 'Medio',
    xp: 150,
    volCode: 'VOL-02',
    color: '#a78bfa',
    expression: '6x^2 + 9x',
    target: '3x(2x + 3)',
    steps: [
      {
        instruction: 'Paso 1 — Factorización por Máximo Común Divisor (M.C.D.)',
        rules: [
          'Factor Común: Extraer M.C.D.(6, 9) = 3 y literal x con menor exponente',
          'Binomio al Cuadrado: (a + b)² = a² + 2ab + b²',
          'Diferencia de Cuadrados: a² - b² = (a - b)(a + b)',
          'Ley del Inverso Aditivo'
        ],
        correctRule: 0,
        transformations: [
          '3x(2x + 3)',
          '6x(x + 9)',
          '9x(2x + 1)',
          '3(2x^2 + 9x)'
        ],
        correctTransformation: 0,
        result: '3x(2x + 3)'
      }
    ]
  },
  {
    id: 't03',
    title: 'Ecuación Lineal',
    category: 'Álgebra',
    difficulty: 'Medio',
    xp: 150,
    volCode: 'VOL-02',
    color: '#a78bfa',
    expression: '2x + 5 = 13',
    target: 'x = 4',
    steps: [
      {
        instruction: 'Paso 1 — Transposición del Término Independiente',
        rules: [
          'Inverso Aditivo: Restar 5 en ambos miembros de la ecuación',
          'Multiplicación por Cero',
          'Leyes de Exponentes',
          'Factorización por Agrupación'
        ],
        correctRule: 0,
        transformations: [
          '2x = 13 - 5  =>  2x = 8',
          '2x = 13 + 5  =>  2x = 18',
          'x + 5 = 13 / 2',
          '2x = 5'
        ],
        correctTransformation: 0,
        result: '2x = 8'
      },
      {
        instruction: 'Paso 2 — Despeje de la Incógnita por División',
        rules: [
          'Inverso Multiplicativo: Dividir ambos miembros entre 2',
          'Elevación al Cuadrado',
          'Propiedad Conmutativa',
          'Trinomio Cuadrado Perfecto'
        ],
        correctRule: 0,
        transformations: [
          'x = 8 / 2  =>  x = 4',
          'x = 8 * 2  =>  x = 16',
          'x = 8 - 2  =>  x = 6',
          'x = 2'
        ],
        correctTransformation: 0,
        result: 'x = 4'
      }
    ]
  },
  {
    id: 't04',
    title: 'Ángulo Notable 30°',
    category: 'Geometría',
    difficulty: 'Difícil',
    xp: 200,
    volCode: 'VOL-05',
    color: '#38bdf8',
    expression: 'sen(30^\\circ)',
    target: '1/2',
    steps: [
      {
        instruction: 'Paso 1 — Definición Trigonómétrica para Ángulos Notables',
        rules: [
          'Valor Notable: En triángulo equilátero bisecado, sen(30°) = Cateto Opuesto / Hipotenusa = 1 / 2',
          'Teorema de Pitágoras: a² + b² = c²',
          'Leyes de los Signos en Cuadrante I',
          'Identidad Pitagórica: sen²(x) + cos²(x) = 1'
        ],
        correctRule: 0,
        transformations: [
          '1/2',
          '\\sqrt{3}/2',
          '\\sqrt{2}/2',
          '1'
        ],
        correctTransformation: 0,
        result: '1/2'
      }
    ]
  },
  {
    id: 't05',
    title: 'Divisibilidad por 3',
    category: 'Aritmética',
    difficulty: 'Fácil',
    xp: 100,
    volCode: 'VOL-01',
    color: '#00e676',
    expression: '348 \\div 3',
    target: '116',
    steps: [
      {
        instruction: 'Paso 1 — Criterio de Divisibilidad entre 3',
        rules: [
          'Criterio del 3: Suma de dígitos 3 + 4 + 8 = 15 (Múltiplo de 3) ⟹ Es divisible',
          'Criterio del 2: Termina en número par',
          'Criterio del 5: Termina en 0 o 5',
          'Regla de Paridad Prima'
        ],
        correctRule: 0,
        transformations: [
          '348 / 3 = 116 (Divisible)',
          '348 / 3 = 106 (Residuo 2)',
          'No es divisible entre 3',
          '348 / 3 = 124'
        ],
        correctTransformation: 0,
        result: '116'
      }
    ]
  },
  {
    id: 't06',
    title: 'Cuadrado de Binomio',
    category: 'Álgebra',
    difficulty: 'Difícil',
    xp: 200,
    volCode: 'VOL-02',
    color: '#a78bfa',
    expression: '(x + 3)^2',
    target: 'x^2 + 6x + 9',
    steps: [
      {
        instruction: 'Paso 1 — Regla del Binomio al Cuadrado',
        rules: [
          'Binomio al Cuadrado: (a + b)² = a² + 2ab + b²',
          'Diferencia de Cuadrados: (a + b)(a - b) = a² - b²',
          'Leyes de Exponentes para Suma',
          'Factor Común por Monomio'
        ],
        correctRule: 0,
        transformations: [
          'x^2 + 2(x)(3) + 3^2  =>  x^2 + 6x + 9',
          'x^2 + 9',
          'x^2 + 3x + 9',
          '2x + 6'
        ],
        correctTransformation: 0,
        result: 'x^2 + 6x + 9'
      }
    ]
  }
];

export const COMBO_TRIALS = DAILY_MATH_TRIALS.map(t => ({
  id: t.id,
  title: t.title,
  difficulty: t.difficulty === 'Fácil' ? 'facil' : t.difficulty === 'Medio' ? 'medio' : 'dificil',
  category: t.category === 'Aritmética' ? 'Aritmética Básica' : t.category === 'Álgebra' ? 'Álgebra de Bloques' : 'Geometría/Trigo',
  topic: t.title,
  initialLatex: t.expression,
  targetLatex: t.target,
  xpReward: t.xp,
  steps: t.steps.map((s, idx) => ({
    stepNumber: idx + 1,
    promptText: s.instruction,
    currentLatex: t.expression,
    choices: s.transformations.map((trans, choiceIdx) => ({
      id: `c-${idx}-${choiceIdx}`,
      latexResult: trans,
      ruleId: s.rules[0],
      isLegal: choiceIdx === s.correctTransformation,
      explanation: choiceIdx === s.correctTransformation ? 'Transformación válida e irreprochable' : 'Paso incorrecto',
    }))
  })),
  hint: `Aplica la regla correspondiente`,
}));
