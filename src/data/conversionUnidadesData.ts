export interface ConversionOption {
  key: 'A' | 'B' | 'C' | 'D';
  text: string;
  isCorrect: boolean;
}

export interface ConversionExercise {
  id: number;
  title: string;
  statement: string;
  unitFrom: string;
  unitTo: string;
  symbolFrom: string;
  symbolTo: string;
  givenValue: number;
  targetValue: number;
  operationType: 'multiplicacion' | 'division';
  ruleExplanation: string;
  ruleBadge: string;
  tableHeaders: [string, string];
  tableRows: [
    [string, string],
    [string, string]
  ];
  ruleOfThreeLatex: string;
  practicalRuleLatex: string;
  options: ConversionOption[];
  correctKey: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export const CONVERSION_EXERCISES: ConversionExercise[] = [
  {
    id: 1,
    title: 'Metros a Centímetros',
    statement: 'Convierte 5 metros a centímetros aplicando la regla de tres.',
    unitFrom: 'Metros',
    unitTo: 'Centímetros',
    symbolFrom: 'm',
    symbolTo: 'cm',
    givenValue: 5,
    targetValue: 500,
    operationType: 'multiplicacion',
    ruleBadge: 'Unidad más pequeña → Multiplicación',
    ruleExplanation: 'El centímetro es una unidad más pequeña que el metro. Por lo tanto, el número resultante debe ser mayor (multiplicar por 100).',
    tableHeaders: ['Metros (m)', 'Centímetros (cm)'],
    tableRows: [
      ['1', '100'],
      ['5', 'x']
    ],
    ruleOfThreeLatex: 'x = \\dfrac{5 \\times 100}{1} = 500\\text{ cm}',
    practicalRuleLatex: '5\\text{ m} \\times 100 = 500\\text{ cm}',
    options: [
      { key: 'A', text: '50 cm', isCorrect: false },
      { key: 'B', text: '500 cm', isCorrect: true },
      { key: 'C', text: '5,000 cm', isCorrect: false },
      { key: 'D', text: '0.05 cm', isCorrect: false }
    ],
    correctKey: 'B',
    explanation: 'Planteamos la proporción: 1 m equivale a 100 cm. Si tenemos 5 m, multiplicamos cruzado (5 × 100) y dividimos entre 1: x = 500 cm.'
  },
  {
    id: 2,
    title: 'Centímetros a Metros',
    statement: 'Convierte 250 centímetros a metros aplicando la regla de tres.',
    unitFrom: 'Centímetros',
    unitTo: 'Metros',
    symbolFrom: 'cm',
    symbolTo: 'm',
    givenValue: 250,
    targetValue: 2.5,
    operationType: 'division',
    ruleBadge: 'Unidad más grande → División',
    ruleExplanation: 'El metro es una unidad más grande que el centímetro. Por lo tanto, el número resultante debe ser menor (dividir entre 100).',
    tableHeaders: ['Metros (m)', 'Centímetros (cm)'],
    tableRows: [
      ['1', '100'],
      ['x', '250']
    ],
    ruleOfThreeLatex: 'x = \\dfrac{250 \\times 1}{100} = 2.5\\text{ m}',
    practicalRuleLatex: '250\\text{ cm} \\div 100 = 2.5\\text{ m}',
    options: [
      { key: 'A', text: '0.25 m', isCorrect: false },
      { key: 'B', text: '2.5 m', isCorrect: true },
      { key: 'C', text: '25 m', isCorrect: false },
      { key: 'D', text: '250 m', isCorrect: false }
    ],
    correctKey: 'B',
    explanation: 'Planteamos: 1 m son 100 cm. Para 250 cm, multiplicamos cruzado (250 × 1) y dividimos entre 100: x = 2.5 m.'
  },
  {
    id: 3,
    title: 'Kilogramos a Gramos',
    statement: 'Convierte 3.5 kilogramos a gramos aplicando la regla de tres.',
    unitFrom: 'Kilogramos',
    unitTo: 'Gramos',
    symbolFrom: 'kg',
    symbolTo: 'g',
    givenValue: 3.5,
    targetValue: 3500,
    operationType: 'multiplicacion',
    ruleBadge: 'Unidad más pequeña → Multiplicación',
    ruleExplanation: 'El gramo es una unidad más pequeña que el kilogramo. Multiplicamos por el factor de equivalencia (1000).',
    tableHeaders: ['Kilogramos (kg)', 'Gramos (g)'],
    tableRows: [
      ['1', '1000'],
      ['3.5', 'x']
    ],
    ruleOfThreeLatex: 'x = \\dfrac{3.5 \\times 1000}{1} = 3500\\text{ g}',
    practicalRuleLatex: '3.5\\text{ kg} \\times 1000 = 3500\\text{ g}',
    options: [
      { key: 'A', text: '350 g', isCorrect: false },
      { key: 'B', text: '3,500 g', isCorrect: true },
      { key: 'C', text: '35,000 g', isCorrect: false },
      { key: 'D', text: '0.35 g', isCorrect: false }
    ],
    correctKey: 'B',
    explanation: 'Como 1 kg = 1000 g, en 3.5 kg multiplicamos 3.5 × 1000 / 1 = 3500 g.'
  },
  {
    id: 4,
    title: 'Gramos a Kilogramos',
    statement: 'Convierte 4,200 gramos a kilogramos aplicando la regla de tres.',
    unitFrom: 'Gramos',
    unitTo: 'Kilogramos',
    symbolFrom: 'g',
    symbolTo: 'kg',
    givenValue: 4200,
    targetValue: 4.2,
    operationType: 'division',
    ruleBadge: 'Unidad más grande → División',
    ruleExplanation: 'El kilogramo es una unidad más grande que el gramo. Dividimos entre 1000.',
    tableHeaders: ['Kilogramos (kg)', 'Gramos (g)'],
    tableRows: [
      ['1', '1000'],
      ['x', '4200']
    ],
    ruleOfThreeLatex: 'x = \\dfrac{4200 \\times 1}{1000} = 4.2\\text{ kg}',
    practicalRuleLatex: '4200\\text{ g} \\div 1000 = 4.2\\text{ kg}',
    options: [
      { key: 'A', text: '0.42 kg', isCorrect: false },
      { key: 'B', text: '4.2 kg', isCorrect: true },
      { key: 'C', text: '42 kg', isCorrect: false },
      { key: 'D', text: '420 kg', isCorrect: false }
    ],
    correctKey: 'B',
    explanation: 'Planteamos: 1000 g equivalen a 1 kg. Multiplicamos 4200 × 1 y dividimos entre 1000: x = 4.2 kg.'
  },
  {
    id: 5,
    title: 'Litros a Mililitros',
    statement: 'Convierte 2.8 litros a mililitros aplicando la regla de tres.',
    unitFrom: 'Litros',
    unitTo: 'Mililitros',
    symbolFrom: 'L',
    symbolTo: 'mL',
    givenValue: 2.8,
    targetValue: 2800,
    operationType: 'multiplicacion',
    ruleBadge: 'Unidad más pequeña → Multiplicación',
    ruleExplanation: 'El mililitro es una unidad más pequeña que el litro. Multiplicamos por 1000.',
    tableHeaders: ['Litros (L)', 'Mililitros (mL)'],
    tableRows: [
      ['1', '1000'],
      ['2.8', 'x']
    ],
    ruleOfThreeLatex: 'x = \\dfrac{2.8 \\times 1000}{1} = 2800\\text{ mL}',
    practicalRuleLatex: '2.8\\text{ L} \\times 1000 = 2800\\text{ mL}',
    options: [
      { key: 'A', text: '280 mL', isCorrect: false },
      { key: 'B', text: '2,800 mL', isCorrect: true },
      { key: 'C', text: '28,000 mL', isCorrect: false },
      { key: 'D', text: '0.28 mL', isCorrect: false }
    ],
    correctKey: 'B',
    explanation: 'Sabiendo que 1 L = 1000 mL, 2.8 L equivalen a 2.8 × 1000 / 1 = 2800 mL.'
  },
  {
    id: 6,
    title: 'Mililitros a Litros',
    statement: 'Convierte 7,500 mililitros a litros aplicando la regla de tres.',
    unitFrom: 'Mililitros',
    unitTo: 'Litros',
    symbolFrom: 'mL',
    symbolTo: 'L',
    givenValue: 7500,
    targetValue: 7.5,
    operationType: 'division',
    ruleBadge: 'Unidad más grande → División',
    ruleExplanation: 'El litro es una unidad más grande que el mililitro. Dividimos entre 1000.',
    tableHeaders: ['Litros (L)', 'Mililitros (mL)'],
    tableRows: [
      ['1', '1000'],
      ['x', '7500']
    ],
    ruleOfThreeLatex: 'x = \\dfrac{7500 \\times 1}{1000} = 7.5\\text{ L}',
    practicalRuleLatex: '7500\\text{ mL} \\div 1000 = 7.5\\text{ L}',
    options: [
      { key: 'A', text: '0.75 L', isCorrect: false },
      { key: 'B', text: '7.5 L', isCorrect: true },
      { key: 'C', text: '75 L', isCorrect: false },
      { key: 'D', text: '750 L', isCorrect: false }
    ],
    correctKey: 'B',
    explanation: 'Planteamos: 1000 mL = 1 L. Con 7500 mL: x = (7500 × 1) / 1000 = 7.5 L.'
  },
  {
    id: 7,
    title: 'Metros Cúbicos a Litros',
    statement: 'Convierte 1.5 metros cúbicos (m³) a litros aplicando la regla de tres.',
    unitFrom: 'Metros cúbicos',
    unitTo: 'Litros',
    symbolFrom: 'm³',
    symbolTo: 'L',
    givenValue: 1.5,
    targetValue: 1500,
    operationType: 'multiplicacion',
    ruleBadge: 'Unidad más pequeña → Multiplicación',
    ruleExplanation: '1 metro cúbico equivale a 1000 litros. Vamos a una unidad más pequeña en capacidad, multiplicamos por 1000.',
    tableHeaders: ['Metros cúbicos (m³)', 'Litros (L)'],
    tableRows: [
      ['1', '1000'],
      ['1.5', 'x']
    ],
    ruleOfThreeLatex: 'x = \\dfrac{1.5 \\times 1000}{1} = 1500\\text{ L}',
    practicalRuleLatex: '1.5\\text{ m}^3 \\times 1000 = 1500\\text{ L}',
    options: [
      { key: 'A', text: '150 L', isCorrect: false },
      { key: 'B', text: '1,500 L', isCorrect: true },
      { key: 'C', text: '15,000 L', isCorrect: false },
      { key: 'D', text: '15 L', isCorrect: false }
    ],
    correctKey: 'B',
    explanation: 'Cada m³ almacena 1000 L. Entonces, 1.5 m³ son 1.5 × 1000 / 1 = 1500 L.'
  },
  {
    id: 8,
    title: 'Litros a Metros Cúbicos',
    statement: 'Convierte 3,200 litros a metros cúbicos (m³) aplicando la regla de tres.',
    unitFrom: 'Litros',
    unitTo: 'Metros cúbicos',
    symbolFrom: 'L',
    symbolTo: 'm³',
    givenValue: 3200,
    targetValue: 3.2,
    operationType: 'division',
    ruleBadge: 'Unidad más grande → División',
    ruleExplanation: 'El metro cúbico es una unidad más grande que el litro. Dividimos entre 1000.',
    tableHeaders: ['Metros cúbicos (m³)', 'Litros (L)'],
    tableRows: [
      ['1', '1000'],
      ['x', '3200']
    ],
    ruleOfThreeLatex: 'x = \\dfrac{3200 \\times 1}{1000} = 3.2\\text{ m}^3',
    practicalRuleLatex: '3200\\text{ L} \\div 1000 = 3.2\\text{ m}^3',
    options: [
      { key: 'A', text: '0.32 m³', isCorrect: false },
      { key: 'B', text: '3.2 m³', isCorrect: true },
      { key: 'C', text: '32 m³', isCorrect: false },
      { key: 'D', text: '320 m³', isCorrect: false }
    ],
    correctKey: 'B',
    explanation: 'Planteamos: 1000 L = 1 m³. Para 3200 L: x = (3200 × 1) / 1000 = 3.2 m³.'
  },
  {
    id: 9,
    title: 'Toneladas a Kilogramos',
    statement: 'Convierte 2.4 toneladas métricas a kilogramos aplicando la regla de tres.',
    unitFrom: 'Toneladas',
    unitTo: 'Kilogramos',
    symbolFrom: 't',
    symbolTo: 'kg',
    givenValue: 2.4,
    targetValue: 2400,
    operationType: 'multiplicacion',
    ruleBadge: 'Unidad más pequeña → Multiplicación',
    ruleExplanation: 'El kilogramo es una unidad más pequeña que la tonelada. Multiplicamos por 1000.',
    tableHeaders: ['Toneladas (t)', 'Kilogramos (kg)'],
    tableRows: [
      ['1', '1000'],
      ['2.4', 'x']
    ],
    ruleOfThreeLatex: 'x = \\dfrac{2.4 \\times 1000}{1} = 2400\\text{ kg}',
    practicalRuleLatex: '2.4\\text{ t} \\times 1000 = 2400\\text{ kg}',
    options: [
      { key: 'A', text: '240 kg', isCorrect: false },
      { key: 'B', text: '2,400 kg', isCorrect: true },
      { key: 'C', text: '24,000 kg', isCorrect: false },
      { key: 'D', text: '0.24 kg', isCorrect: false }
    ],
    correctKey: 'B',
    explanation: 'Una tonelada equivale a 1000 kg. Para 2.4 t: x = 2.4 × 1000 / 1 = 2400 kg.'
  },
  {
    id: 10,
    title: 'Kilogramos a Toneladas',
    statement: 'Convierte 1,800 kilogramos a toneladas métricas aplicando la regla de tres.',
    unitFrom: 'Kilogramos',
    unitTo: 'Toneladas',
    symbolFrom: 'kg',
    symbolTo: 't',
    givenValue: 1800,
    targetValue: 1.8,
    operationType: 'division',
    ruleBadge: 'Unidad más grande → División',
    ruleExplanation: 'La tonelada es una unidad más grande que el kilogramo. Dividimos entre 1000.',
    tableHeaders: ['Toneladas (t)', 'Kilogramos (kg)'],
    tableRows: [
      ['1', '1000'],
      ['x', '1800']
    ],
    ruleOfThreeLatex: 'x = \\dfrac{1800 \\times 1}{1000} = 1.8\\text{ t}',
    practicalRuleLatex: '1800\\text{ kg} \\div 1000 = 1.8\\text{ t}',
    options: [
      { key: 'A', text: '0.18 t', isCorrect: false },
      { key: 'B', text: '1.8 t', isCorrect: true },
      { key: 'C', text: '18 t', isCorrect: false },
      { key: 'D', text: '180 t', isCorrect: false }
    ],
    correctKey: 'B',
    explanation: 'Planteamos: 1000 kg = 1 t. Con 1800 kg: x = (1800 × 1) / 1000 = 1.8 t.'
  }
];
