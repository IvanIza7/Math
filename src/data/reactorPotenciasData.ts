import { ArenaChallenge, ArenaQuestion } from './arenaChallengesData';

interface RawItem {
  id: string;
  fase: number;
  faseName: string;
  expression: string;
  correct: string;
  distractors: [string, string, string];
  explanation: string;
  bonus: {
    question: string;
    correct: string;
    incorrect: [string, string];
  };
}

const RAW_REACTOR_ITEMS: RawItem[] = [
  // FASE 1: Signos, Paréntesis y Exponente Cero (1 al 10)
  {
    id: 'rp-1',
    fase: 1,
    faseName: 'Fase 1: Signos, Paréntesis y Exponente Cero',
    expression: '3^4',
    correct: '81',
    distractors: ['12', '64', '27'],
    explanation: '3^4 = 3 \\times 3 \\times 3 \\times 3 = 81. El exponente 4 indica multiplicar la base por sí misma 4 veces.',
    bonus: {
      question: '¿Qué representa el exponente 4 en 3⁴?',
      correct: 'Multiplicar el 3 por sí mismo 4 veces',
      incorrect: ['Multiplicar 3 × 4', 'Sumar 3 cuatro veces']
    }
  },
  {
    id: 'rp-2',
    fase: 1,
    faseName: 'Fase 1: Signos, Paréntesis y Exponente Cero',
    expression: '(-4)^2',
    correct: '16',
    distractors: ['-16', '-8', '8'],
    explanation: '(-4)^2 = (-4) \\times (-4) = +16. Con paréntesis y exponente par, el signo negativo se vuelve positivo.',
    bonus: {
      question: '¿Por qué el resultado de (-4)² es positivo (+16)?',
      correct: 'Base negativa dentro de paréntesis con exponente par',
      incorrect: ['Todo número elevado siempre es positivo', 'Porque -4 × 2 = -8']
    }
  },
  {
    id: 'rp-3',
    fase: 1,
    faseName: 'Fase 1: Signos, Paréntesis y Exponente Cero',
    expression: '-4^2',
    correct: '-16',
    distractors: ['16', '-8', '8'],
    explanation: '-4^2 = -(4 \\times 4) = -16. Sin paréntesis, la potencia solo afecta al 4, no al signo negativo.',
    bonus: {
      question: '¿Por qué en -4² el resultado sí es negativo (-16)?',
      correct: 'Sin paréntesis, el exponente solo afecta al 4, no al signo',
      incorrect: ['El exponente es impar', 'Es una resta aritmética']
    }
  },
  {
    id: 'rp-4',
    fase: 1,
    faseName: 'Fase 1: Signos, Paréntesis y Exponente Cero',
    expression: '(-2)^5',
    correct: '-32',
    distractors: ['32', '-10', '10'],
    explanation: '(-2)^5 = (-2)(-2)(-2)(-2)(-2) = -32. Exponente impar sobre base negativa conserva el signo negativo.',
    bonus: {
      question: '¿Qué regla de signos aplica en (-2)⁵?',
      correct: 'Base negativa con exponente impar conserva el negativo',
      incorrect: ['Base negativa siempre da resultado negativo', 'Se multiplica -2 × 5']
    }
  },
  {
    id: 'rp-5',
    fase: 1,
    faseName: 'Fase 1: Signos, Paréntesis y Exponente Cero',
    expression: '(-7)^0',
    correct: '1',
    distractors: ['-1', '0', '-7'],
    explanation: '(-7)^0 = 1. Todo número distinto de cero elevado a la potencia 0 vale exactamente 1.',
    bonus: {
      question: '¿Cuál es la propiedad aplicada en (-7)⁰ = 1?',
      correct: 'Exponente cero: a⁰ = 1 (para a ≠ 0)',
      incorrect: ['Elemento neutro aditivo', 'Exponente nulo: a⁰ = 0']
    }
  },
  {
    id: 'rp-6',
    fase: 1,
    faseName: 'Fase 1: Signos, Paréntesis y Exponente Cero',
    expression: '-7^0',
    correct: '-1',
    distractors: ['1', '0', '-7'],
    explanation: '-7^0 = -(7^0) = -(1) = -1. Por jerarquía de operaciones, primero se resuelve la potencia 7⁰=1 y luego se aplica el signo negativo exterior.',
    bonus: {
      question: '¿Qué propiedad u orden actúa en -7⁰?',
      correct: 'Prioridad de potencia: -(7⁰) = -1',
      incorrect: ['(-a)⁰ = 1', 'Inverso aditivo']
    }
  },
  {
    id: 'rp-7',
    fase: 1,
    faseName: 'Fase 1: Signos, Paréntesis y Exponente Cero',
    expression: '1^{25}',
    correct: '1',
    distractors: ['25', '0', '26'],
    explanation: '1^{25} = 1. El 1 elevado a cualquier potencia real siempre es igual a 1.',
    bonus: {
      question: '¿Qué propiedad de la unidad se aplica en 1²⁵?',
      correct: 'Potencia de la unidad: 1ⁿ = 1',
      incorrect: ['Elemento neutro aditivo', 'Exponente cero']
    }
  },
  {
    id: 'rp-8',
    fase: 1,
    faseName: 'Fase 1: Signos, Paréntesis y Exponente Cero',
    expression: '(-1)^{14}',
    correct: '1',
    distractors: ['-1', '-14', '14'],
    explanation: '(-1)^{14} = 1. La base -1 con exponente par (14) siempre resulta en +1.',
    bonus: {
      question: '¿Por qué (-1)¹⁴ no da -1?',
      correct: 'Exponente par sobre base -1 da resultado positivo',
      incorrect: ['El -1 nunca puede ser negativo', 'Se divide 14 ÷ 2']
    }
  },
  {
    id: 'rp-9',
    fase: 1,
    faseName: 'Fase 1: Signos, Paréntesis y Exponente Cero',
    expression: '(-1)^{19}',
    correct: '-1',
    distractors: ['1', '-19', '19'],
    explanation: '(-1)^{19} = -1. La base -1 con exponente impar (19) conserva el signo negativo (-1).',
    bonus: {
      question: '¿Por qué (-1)¹⁹ conserva el signo negativo?',
      correct: 'Exponente impar sobre base -1 conserva el negativo',
      incorrect: ['Por propiedad conmutativa', 'Porque 19 es primo']
    }
  },
  {
    id: 'rp-10',
    fase: 1,
    faseName: 'Fase 1: Signos, Paréntesis y Exponente Cero',
    expression: '\\left(\\frac{2}{3}\\right)^3',
    correct: '\\frac{8}{27}',
    distractors: ['\\frac{6}{9}', '\\frac{8}{3}', '\\frac{2}{27}'],
    explanation: '\\left(\\frac{2}{3}\\right)^3 = \\frac{2^3}{3^3} = \\frac{8}{27}. El exponente afecta tanto al numerador como al denominador.',
    bonus: {
      question: '¿Qué ley de exponentes se aplicó en (2/3)³?',
      correct: 'Potencia de un cociente: (a/b)ⁿ = aⁿ / bⁿ',
      incorrect: ['Producto de bases iguales', 'Exponente fraccionario']
    }
  },

  // FASE 2: Leyes de los Exponentes en Acción (11 al 25)
  {
    id: 'rp-11',
    fase: 2,
    faseName: 'Fase 2: Leyes de los Exponentes en Acción',
    expression: 'x^4 \\cdot x^7',
    correct: 'x^{11}',
    distractors: ['x^{28}', '2x^{11}', 'x^3'],
    explanation: 'x^4 \\cdot x^7 = x^{4+7} = x^{11}. En multiplicación con misma base, se suman los exponentes.',
    bonus: {
      question: '¿Qué ley aplicaste en x⁴ · x⁷?',
      correct: 'Producto de bases iguales: aᵐ · aⁿ = aᵐ⁺ⁿ',
      incorrect: ['Potencia de una potencia: (aᵐ)ⁿ = aᵐⁿ', 'Propiedad distributiva']
    }
  },
  {
    id: 'rp-12',
    fase: 2,
    faseName: 'Fase 2: Leyes de los Exponentes en Acción',
    expression: 'a^3 \\cdot a \\cdot a^5',
    correct: 'a^9',
    distractors: ['a^8', 'a^{15}', '3a^9'],
    explanation: 'a^3 \\cdot a^1 \\cdot a^5 = a^{3+1+5} = a^9. Recuerda que la literal sin exponente visible tiene exponente 1.',
    bonus: {
      question: '¿Qué detalle clave evitó el error común a⁸?',
      correct: 'Recordar el exponente implícito a = a¹',
      incorrect: ['Ignorar la a central', 'Multiplicar 3 × 5']
    }
  },
  {
    id: 'rp-13',
    fase: 2,
    faseName: 'Fase 2: Leyes de los Exponentes en Acción',
    expression: '2^3 \\cdot 2^2',
    correct: '32',
    distractors: ['16', '4^5', '64'],
    explanation: '2^3 \\cdot 2^2 = 2^{3+2} = 2^5 = 32. La base se conserva y los exponentes se suman.',
    bonus: {
      question: '¿Cuál es el paso intermedio correcto para 2³ · 2²?',
      correct: '2^{3+2} = 2⁵ = 32',
      incorrect: ['4^{3+2} = 4⁵', '2^{3 × 2} = 2⁶']
    }
  },
  {
    id: 'rp-14',
    fase: 2,
    faseName: 'Fase 2: Leyes de los Exponentes en Acción',
    expression: '\\frac{y^{10}}{y^4}',
    correct: 'y^6',
    distractors: ['y^{14}', 'y^{2.5}', '\\frac{1}{y^6}'],
    explanation: '\\frac{y^{10}}{y^4} = y^{10-4} = y^6. En división con misma base, se restan los exponentes.',
    bonus: {
      question: '¿Qué ley aplicaste en y¹⁰ / y⁴?',
      correct: 'Cociente de bases iguales: aᵐ / aⁿ = aᵐ⁻ⁿ',
      incorrect: ['Potencia de un cociente', 'División de coeficientes']
    }
  },
  {
    id: 'rp-15',
    fase: 2,
    faseName: 'Fase 2: Leyes de los Exponentes en Acción',
    expression: '\\frac{5^7}{5^5}',
    correct: '25',
    distractors: ['10', '125', '1'],
    explanation: '\\frac{5^7}{5^5} = 5^{7-5} = 5^2 = 25.',
    bonus: {
      question: '¿Cuál es la forma simplificada en potencia para 5⁷ / 5⁵?',
      correct: '5^{7-5} = 5² = 25',
      incorrect: ['1²', '5^{7/5}']
    }
  },
  {
    id: 'rp-16',
    fase: 2,
    faseName: 'Fase 2: Leyes de los Exponentes en Acción',
    expression: '(x^4)^3',
    correct: 'x^{12}',
    distractors: ['x^7', '3x^4', 'x^{64}'],
    explanation: '(x^4)^3 = x^{4 \\times 3} = x^{12}. En potencia de una potencia, se multiplican los exponentes.',
    bonus: {
      question: '¿Qué ley aplicaste en (x⁴)³?',
      correct: 'Potencia de una potencia: (aᵐ)ⁿ = aᵐ · ⁿ',
      incorrect: ['Producto de bases iguales', 'Exponente cero']
    }
  },
  {
    id: 'rp-17',
    fase: 2,
    faseName: 'Fase 2: Leyes de los Exponentes en Acción',
    expression: '(2^2)^3',
    correct: '64',
    distractors: ['32', '12', '16'],
    explanation: '(2^2)^3 = 2^{2 \\times 3} = 2^6 = 64.',
    bonus: {
      question: '¿Cómo se operan los exponentes en (2²)³?',
      correct: 'Se multiplican: 2 × 3 = 6 ⟹ 2⁶ = 64',
      incorrect: ['Se suman: 2 + 3 = 5', 'Se restan: 3 - 2 = 1']
    }
  },
  {
    id: 'rp-18',
    fase: 2,
    faseName: 'Fase 2: Leyes de los Exponentes en Acción',
    expression: '(3x^2)^2',
    correct: '9x^4',
    distractors: ['6x^4', '3x^4', '9x^2'],
    explanation: '(3x^2)^2 = 3^2 \\cdot (x^2)^2 = 9x^4. El exponente exterior afecta tanto al coeficiente como a la variable.',
    bonus: {
      question: '¿Qué ley repartió el exponente exterior en (3x²)²?',
      correct: 'Potencia de un producto: (a · b)ⁿ = aⁿ · bⁿ',
      incorrect: ['Propiedad asociativa', 'Producto de bases iguales']
    }
  },
  {
    id: 'rp-19',
    fase: 2,
    faseName: 'Fase 2: Leyes de los Exponentes en Acción',
    expression: '(2a^3b)^3',
    correct: '8a^9b^3',
    distractors: ['6a^9b^3', '8a^6b^3', '2a^9b^3'],
    explanation: '(2a^3b)^3 = 2^3 \\cdot (a^3)^3 \\cdot b^3 = 8a^9b^3.',
    bonus: {
      question: '¿Qué dos leyes se combinaron en (2a³b)³?',
      correct: 'Potencia de un producto y potencia de potencia',
      incorrect: ['Cociente y exponente negativo', 'Exponente cero y unidad']
    }
  },
  {
    id: 'rp-20',
    fase: 2,
    faseName: 'Fase 2: Leyes de los Exponentes en Acción',
    expression: '\\left(\\frac{x}{4}\\right)^2',
    correct: '\\frac{x^2}{16}',
    distractors: ['\\frac{x^2}{8}', '\\frac{2x}{16}', '\\frac{x}{16}'],
    explanation: '\\left(\\frac{x}{4}\\right)^2 = \\frac{x^2}{4^2} = \\frac{x^2}{16}.',
    bonus: {
      question: '¿Qué ley aplica al denominador en (x/4)²?',
      correct: 'Potencia de un cociente: (a/b)ⁿ = aⁿ / bⁿ',
      incorrect: ['Multiplicación cruzada', 'Inverso multiplicativo']
    }
  },
  {
    id: 'rp-21',
    fase: 2,
    faseName: 'Fase 2: Leyes de los Exponentes en Acción',
    expression: '\\left(\\frac{2x^2}{y^3}\\right)^3',
    correct: '\\frac{8x^6}{y^9}',
    distractors: ['\\frac{6x^6}{y^9}', '\\frac{8x^5}{y^6}', '\\frac{2x^6}{y^9}'],
    explanation: '\\left(\\frac{2x^2}{y^3}\\right)^3 = \\frac{2^3 \\cdot (x^2)^3}{(y^3)^3} = \\frac{8x^6}{y^9}.',
    bonus: {
      question: '¿Qué operación se hizo con los exponentes de x e y en ((2x²)/(y³))³?',
      correct: 'Se multiplicaron por 3 (Potencia de potencia)',
      incorrect: ['Se sumaron con el 3', 'Se restaron']
    }
  },
  {
    id: 'rp-22',
    fase: 2,
    faseName: 'Fase 2: Leyes de los Exponentes en Acción',
    expression: '\\frac{x^3 \\cdot x^5}{x^2}',
    correct: 'x^6',
    distractors: ['x^{10}', 'x^{13}', 'x^4'],
    explanation: '\\frac{x^3 \\cdot x^5}{x^2} = \\frac{x^{3+5}}{x^2} = \\frac{x^8}{x^2} = x^{8-2} = x^6.',
    bonus: {
      question: '¿Cuál es el orden de leyes aplicadas en (x³ · x⁵) / x²?',
      correct: 'Primero producto (3+5=8), luego cociente (8-2=6)',
      incorrect: ['Primero multiplicación (3 × 5)', 'División directa 5 ÷ 2']
    }
  },
  {
    id: 'rp-23',
    fase: 2,
    faseName: 'Fase 2: Leyes de los Exponentes en Acción',
    expression: '(a^2)^4 \\cdot a^3',
    correct: 'a^{11}',
    distractors: ['a^9', 'a^{24}', 'a^{10}'],
    explanation: '(a^2)^4 \\cdot a^3 = a^{2 \\times 4} \\cdot a^3 = a^8 \\cdot a^3 = a^{8+3} = a^{11}.',
    bonus: {
      question: '¿Qué paso se resuelve primero en (a²)⁴ · a³?',
      correct: 'Resolver (a²)⁴ = a⁸ y luego sumar 3',
      incorrect: ['Sumar 2 + 4 + 3', 'Multiplicar 2 × 4 × 3']
    }
  },
  {
    id: 'rp-24',
    fase: 2,
    faseName: 'Fase 2: Leyes de los Exponentes en Acción',
    expression: '(4x^3)^0 + 5',
    correct: '6',
    distractors: ['5', '9', '1'],
    explanation: '(4x^3)^0 + 5 = 1 + 5 = 6. Cualquier base distinta de cero elevada a la 0 se convierte en 1.',
    bonus: {
      question: '¿Por qué desapareció 4x³ en (4x³)⁰ + 5?',
      correct: 'Todo el paréntesis está elevado a 0, convirtiéndose en 1',
      incorrect: ['Se canceló con el 5', '0 × 4 = 0']
    }
  },
  {
    id: 'rp-25',
    fase: 2,
    faseName: 'Fase 2: Leyes de los Exponentes en Acción',
    expression: '(2x^2y)^2 \\cdot (3xy^3)',
    correct: '12x^5y^5',
    distractors: ['6x^5y^5', '12x^4y^4', '7x^5y^5'],
    explanation: '(2x^2y)^2 \\cdot (3xy^3) = (4x^4y^2) \\cdot (3xy^3) = (4 \\times 3)(x^{4+1})(y^{2+3}) = 12x^5y^5.',
    bonus: {
      question: '¿Cómo se obtuvo el coeficiente 12 en (2x²y)² · (3xy³)?',
      correct: '2² × 3 = 4 × 3 = 12',
      incorrect: ['2 × 2 × 3', '(2 × 3)²']
    }
  },

  // FASE 3: Exponentes Negativos y Método del Ascensor (26 al 40)
  {
    id: 'rp-26',
    fase: 3,
    faseName: 'Fase 3: Exponentes Negativos y Método del Ascensor',
    expression: '5^{-2}',
    correct: '\\frac{1}{25}',
    distractors: ['-25', '-10', '\\frac{1}{10}'],
    explanation: '5^{-2} = \\frac{1}{5^2} = \\frac{1}{25}. El exponente negativo invierte la base al denominador.',
    bonus: {
      question: '¿Qué propiedad define al exponente negativo en 5⁻²?',
      correct: 'Inverso multiplicativo: a⁻ⁿ = 1 / aⁿ',
      incorrect: ['Cambio de signo: a⁻ⁿ = -aⁿ', 'Raíz cuadrada']
    }
  },
  {
    id: 'rp-27',
    fase: 3,
    faseName: 'Fase 3: Exponentes Negativos y Método del Ascensor',
    expression: '2^{-4}',
    correct: '\\frac{1}{16}',
    distractors: ['-16', '-8', '\\frac{1}{8}'],
    explanation: '2^{-4} = \\frac{1}{2^4} = \\frac{1}{16}.',
    bonus: {
      question: '¿Por qué el resultado de 2⁻⁴ no es negativo?',
      correct: 'El exponente negativo indica recíproco (ubicación), no signo de la base',
      incorrect: ['Porque 4 es par', 'Por propiedad conmutativa']
    }
  },
  {
    id: 'rp-28',
    fase: 3,
    faseName: 'Fase 3: Exponentes Negativos y Método del Ascensor',
    expression: '(-3)^{-2}',
    correct: '\\frac{1}{9}',
    distractors: ['-\\frac{1}{9}', '-9', '9'],
    explanation: '(-3)^{-2} = \\frac{1}{(-3)^2} = \\frac{1}{9}. La base completa (-3) baja al denominador con exponente positivo 2.',
    bonus: {
      question: '¿Qué sucede al trasladar (-3)⁻² al denominador?',
      correct: 'Queda 1 / (-3)² y al elevar al cuadrado da +9',
      incorrect: ['Se vuelve positivo antes de elevar', 'Se multiplica -3 × -2']
    }
  },
  {
    id: 'rp-29',
    fase: 3,
    faseName: 'Fase 3: Exponentes Negativos y Método del Ascensor',
    expression: '\\frac{1}{4^{-2}}',
    correct: '16',
    distractors: ['-16', '\\frac{1}{16}', '-8'],
    explanation: '\\frac{1}{4^{-2}} = 4^2 = 16. La potencia con exponente negativo en el denominador sube al numerador con exponente positivo.',
    bonus: {
      question: '¿Cuál es la regla del recíproco en el denominador?',
      correct: '1 / a⁻ⁿ = aⁿ (sube con exponente positivo)',
      incorrect: ['Se queda en el denominador', 'Se convierte en fracción negativa']
    }
  },
  {
    id: 'rp-30',
    fase: 3,
    faseName: 'Fase 3: Exponentes Negativos y Método del Ascensor',
    expression: '\\frac{1}{x^{-5}}',
    correct: 'x^5',
    distractors: ['-x^5', '\\frac{1}{x^5}', 'x^{-5}'],
    explanation: '\\frac{1}{x^{-5}} = x^5.',
    bonus: {
      question: '¿Por qué 1 / x⁻⁵ sube al numerador como x⁵?',
      correct: 'Para transformar su exponente negativo en positivo',
      incorrect: ['Porque es división entre 1', 'Por exponente cero']
    }
  },
  {
    id: 'rp-31',
    fase: 3,
    faseName: 'Fase 3: Exponentes Negativos y Método del Ascensor',
    expression: '\\left(\\frac{3}{4}\\right)^{-2}',
    correct: '\\frac{16}{9}',
    distractors: ['-\\frac{9}{16}', '\\frac{9}{16}', '-\\frac{16}{9}'],
    explanation: '\\left(\\frac{3}{4}\\right)^{-2} = \\left(\\frac{4}{3}\\right)^2 = \\frac{4^2}{3^2} = \\frac{16}{9}.',
    bonus: {
      question: '¿Qué ley aplica a fracciones con exponente negativo en (3/4)⁻²?',
      correct: '(a/b)⁻ⁿ = (b/a)ⁿ (se invierte la fracción)',
      incorrect: ['Solo cambia el signo de la fracción', 'Se resta 4 - 3']
    }
  },
  {
    id: 'rp-32',
    fase: 3,
    faseName: 'Fase 3: Exponentes Negativos y Método del Ascensor',
    expression: '\\left(\\frac{1}{2}\\right)^{-4}',
    correct: '16',
    distractors: ['-16', '\\frac{1}{16}', '-8'],
    explanation: '\\left(\\frac{1}{2}\\right)^{-4} = \\left(\\frac{2}{1}\\right)^4 = 2^4 = 16.',
    bonus: {
      question: '¿En qué se convierte 1/2 al invertirla por el exponente negativo?',
      correct: 'En 2/1 = 2, quedando 2⁴ = 16',
      incorrect: ['En -2⁴', 'En 1 / 2⁴']
    }
  },
  {
    id: 'rp-33',
    fase: 3,
    faseName: 'Fase 3: Exponentes Negativos y Método del Ascensor',
    expression: '6x^{-3}',
    correct: '\\frac{6}{x^3}',
    distractors: ['\\frac{1}{6x^3}', '-18x', '-\\frac{6}{x^3}'],
    explanation: '6x^{-3} = \\frac{6}{x^3}. Sin paréntesis, el exponente -3 solo afecta a la variable x; el 6 permanece en el numerador.',
    bonus: {
      question: '¿Por qué el 6 se queda arriba en 6x⁻³?',
      correct: 'Sin paréntesis, el exponente -3 solo afecta a la x',
      incorrect: ['El 6 es positivo', 'Es una suma oculta']
    }
  },
  {
    id: 'rp-34',
    fase: 3,
    faseName: 'Fase 3: Exponentes Negativos y Método del Ascensor',
    expression: '(6x)^{-2}',
    correct: '\\frac{1}{36x^2}',
    distractors: ['\\frac{6}{x^2}', '\\frac{1}{12x^2}', '-\\frac{1}{36x^2}'],
    explanation: '(6x)^{-2} = \\frac{1}{(6x)^2} = \\frac{1}{36x^2}. El paréntesis obliga a trasladar todo el paquete (6x) al denominador.',
    bonus: {
      question: '¿Qué diferencia este caso (6x)⁻² del anterior 6x⁻³?',
      correct: 'El paréntesis obliga a bajar tanto al 6 como a la x',
      incorrect: ['Se multiplica 6 × 2', 'El 6 desaparece']
    }
  },
  {
    id: 'rp-35',
    fase: 3,
    faseName: 'Fase 3: Exponentes Negativos y Método del Ascensor',
    expression: 'x^4 \\cdot x^{-9}',
    correct: '\\frac{1}{x^5}',
    distractors: ['x^{13}', '-x^5', 'x^{-36}'],
    explanation: 'x^4 \\cdot x^{-9} = x^{4 + (-9)} = x^{-5} = \\frac{1}{x^5}.',
    bonus: {
      question: '¿Cuál es el paso intermedio para x⁴ · x⁻⁹?',
      correct: 'x^{4 + (-9)} = x⁻⁵ = 1 / x⁵',
      incorrect: ['x^{4 - (-9)} = x¹³', 'x^{4 × -9} = x⁻³⁶']
    }
  },
  {
    id: 'rp-36',
    fase: 3,
    faseName: 'Fase 3: Exponentes Negativos y Método del Ascensor',
    expression: 'a^{-3} \\cdot a^{-4}',
    correct: '\\frac{1}{a^7}',
    distractors: ['a^{12}', 'a^1', '-a^7'],
    explanation: 'a^{-3} \\cdot a^{-4} = a^{-3 + (-4)} = a^{-7} = \\frac{1}{a^7}.',
    bonus: {
      question: '¿Qué ley de signos opera en los exponentes de a⁻³ · a⁻⁴?',
      correct: 'Suma de negativos: -3 + (-4) = -7 ⟹ 1 / a⁷',
      incorrect: ['Multiplicación: (-3)(-4) = +12', 'Resta: -3 - (-4) = +1']
    }
  },
  {
    id: 'rp-37',
    fase: 3,
    faseName: 'Fase 3: Exponentes Negativos y Método del Ascensor',
    expression: '\\frac{x^3}{x^{-5}}',
    correct: 'x^8',
    distractors: ['\\frac{1}{x^2}', 'x^{-2}', '\\frac{1}{x^8}'],
    explanation: '\\frac{x^3}{x^{-5}} = x^{3 - (-5)} = x^{3 + 5} = x^8. Al restar un exponente negativo, se convierte en suma.',
    bonus: {
      question: '¿Por qué el exponente final es +8 en x³ / x⁻⁵?',
      correct: 'Cociente de bases iguales: 3 - (-5) = 3 + 5 = 8',
      incorrect: ['Se multiplican 3 × 5', 'Se suman sin signo']
    }
  },
  {
    id: 'rp-38',
    fase: 3,
    faseName: 'Fase 3: Exponentes Negativos y Método del Ascensor',
    expression: '\\frac{y^{-6}}{y^{-2}}',
    correct: '\\frac{1}{y^4}',
    distractors: ['y^4', 'y^{-8}', '\\frac{1}{y^8}'],
    explanation: '\\frac{y^{-6}}{y^{-2}} = y^{-6 - (-2)} = y^{-6 + 2} = y^{-4} = \\frac{1}{y^4}.',
    bonus: {
      question: '¿Cuál es la resta exacta de exponentes en y⁻⁶ / y⁻²?',
      correct: '-6 - (-2) = -6 + 2 = -4 ⟹ 1 / y⁴',
      incorrect: ['-6 - 2 = -8', '-6 ÷ -2 = 3']
    }
  },
  {
    id: 'rp-39',
    fase: 3,
    faseName: 'Fase 3: Exponentes Negativos y Método del Ascensor',
    expression: '(x^{-3})^4',
    correct: '\\frac{1}{x^{12}}',
    distractors: ['x^{12}', '-x^{12}', '\\frac{1}{x^7}'],
    explanation: '(x^{-3})^4 = x^{(-3) \\times 4} = x^{-12} = \\frac{1}{x^{12}}.',
    bonus: {
      question: '¿Qué leyes se combinan en (x⁻³)⁴?',
      correct: 'Potencia de potencia ((-3)(4) = -12) y exponente negativo',
      incorrect: ['Suma de exponentes y signo negativo', 'Exponente cero']
    }
  },
  {
    id: 'rp-40',
    fase: 3,
    faseName: 'Fase 3: Exponentes Negativos y Método del Ascensor',
    expression: '\\frac{2a^{-2}b^3}{c^{-4}}',
    correct: '\\frac{2b^3c^4}{a^2}',
    distractors: ['\\frac{2a^2b^3}{c^4}', '2a^2b^3c^4', '\\frac{b^3c^4}{2a^2}'],
    explanation: '\\frac{2a^{-2}b^3}{c^{-4}} = \\frac{2b^3c^4}{a^2}. El factor a^{-2} baja al denominador como a^2 y c^{-4} sube al numerador como c^4.',
    bonus: {
      question: '¿Qué elementos cambian de piso en el ascensor en (2a⁻²b³) / c⁻⁴?',
      correct: 'Solo a⁻² baja y c⁻⁴ sube; 2 y b³ no se mueven',
      incorrect: ['Todos cambian de lugar', 'Solo los números']
    }
  },

  // FASE 4: Factorización Prima en Potencias (41 al 50)
  {
    id: 'rp-41',
    fase: 4,
    faseName: 'Fase 4: Factorización Prima en Potencias',
    expression: '36',
    correct: '2^2 \\cdot 3^2',
    distractors: ['2 \\cdot 3^2', '2^3 \\cdot 3', '6^2'],
    explanation: '36 = 2 \\times 18 = 2 \\times 2 \\times 9 = 2^2 \\cdot 3^2. Debe descomponerse exclusivamente en primos (2 y 3).',
    bonus: {
      question: '¿Por qué 6² no es una factorización prima válida de 36?',
      correct: 'Porque el 6 es un número compuesto (2 × 3), no primo',
      incorrect: ['Porque 6² no es igual a 36', 'Porque le falta el 1']
    }
  },
  {
    id: 'rp-42',
    fase: 4,
    faseName: 'Fase 4: Factorización Prima en Potencias',
    expression: '48',
    correct: '2^4 \\cdot 3',
    distractors: ['2^3 \\cdot 3^2', '2^2 \\cdot 3', '2^5 \\cdot 3'],
    explanation: '48 = 2 \\times 24 = 2^2 \\times 12 = 2^3 \\times 6 = 2^4 \\times 3 = 2^4 \\cdot 3.',
    bonus: {
      question: '¿Cuántas veces consecutivas se divide entre 2 al factorizar 48?',
      correct: '4 veces (48 ➔ 24 ➔ 12 ➔ 6 ➔ 3)',
      incorrect: ['3 veces', '2 veces']
    }
  },
  {
    id: 'rp-43',
    fase: 4,
    faseName: 'Fase 4: Factorización Prima en Potencias',
    expression: '75',
    correct: '3 \\cdot 5^2',
    distractors: ['3^2 \\cdot 5', '5^3', '3 \\cdot 5'],
    explanation: '75 = 3 \\times 25 = 3 \\times 5^2 = 3 \\cdot 5^2.',
    bonus: {
      question: '¿Con qué primo conviene empezar a dividir 75?',
      correct: 'Con el 3 (ya que 7+5=12, múltiplo de 3)',
      incorrect: ['Con el 2', 'Con el 7']
    }
  },
  {
    id: 'rp-44',
    fase: 4,
    faseName: 'Fase 4: Factorización Prima en Potencias',
    expression: '90',
    correct: '2 \\cdot 3^2 \\cdot 5',
    distractors: ['2^2 \\cdot 3 \\cdot 5', '2 \\cdot 3 \\cdot 5', '3^2 \\cdot 10'],
    explanation: '90 = 2 \\times 45 = 2 \\times 3 \\times 15 = 2 \\times 3^2 \\times 5 = 2 \\cdot 3^2 \\cdot 5.',
    bonus: {
      question: '¿Qué primo aparece al cuadrado en la factorización de 90?',
      correct: 'El 3 (3² = 9, y 9 × 10 = 90)',
      incorrect: ['El 2', 'El 5']
    }
  },
  {
    id: 'rp-45',
    fase: 4,
    faseName: 'Fase 4: Factorización Prima en Potencias',
    expression: '100',
    correct: '2^2 \\cdot 5^2',
    distractors: ['2^3 \\cdot 5', '2 \\cdot 5^2', '10^2'],
    explanation: '100 = 2 \\times 50 = 2^2 \\times 25 = 2^2 \\cdot 5^2.',
    bonus: {
      question: 'Si sacas √100 usando potencias, ¿cómo se resuelve?',
      correct: '√(2² · 5²) = 2¹ · 5¹ = 10',
      incorrect: ['2² + 5²', '2 · 5²']
    }
  },
  {
    id: 'rp-46',
    fase: 4,
    faseName: 'Fase 4: Factorización Prima en Potencias',
    expression: '120',
    correct: '2^3 \\cdot 3 \\cdot 5',
    distractors: ['2^2 \\cdot 3^2 \\cdot 5', '2^4 \\cdot 3 \\cdot 5', '2^3 \\cdot 15'],
    explanation: '120 = 2 \\times 60 = 2^2 \\times 30 = 2^3 \\times 15 = 2^3 \\cdot 3 \\cdot 5.',
    bonus: {
      question: '¿Qué potencia de 2 contiene el número 120?',
      correct: '2³ = 8 (8 × 15 = 120)',
      incorrect: ['2² = 4', '2⁴ = 16']
    }
  },
  {
    id: 'rp-47',
    fase: 4,
    faseName: 'Fase 4: Factorización Prima en Potencias',
    expression: '144',
    correct: '2^4 \\cdot 3^2',
    distractors: ['2^3 \\cdot 3^2', '2^2 \\cdot 3^2', '12^2'],
    explanation: '144 = 2^4 \\times 9 = 2^4 \\cdot 3^2.',
    bonus: {
      question: '¿Cómo ayuda 2⁴ · 3² a calcular √144 mentalmente?',
      correct: 'Dividiendo cada exponente entre 2: 2² · 3¹ = 4 · 3 = 12',
      incorrect: ['Restando exponentes', 'Sumando bases']
    }
  },
  {
    id: 'rp-48',
    fase: 4,
    faseName: 'Fase 4: Factorización Prima en Potencias',
    expression: '180',
    correct: '2^2 \\cdot 3^2 \\cdot 5',
    distractors: ['2^3 \\cdot 3 \\cdot 5', '2^2 \\cdot 3 \\cdot 5^2', '2 \\cdot 3^3 \\cdot 5'],
    explanation: '180 = 2 \\times 90 = 2^2 \\times 45 = 2^2 \\cdot 3^2 \\cdot 5.',
    bonus: {
      question: '¿Qué factores salen de la raíz en √180?',
      correct: 'El 2 y el 3 (tienen exponente 2), quedando 6√5',
      incorrect: ['Solo el 5', 'Ninguno']
    }
  },
  {
    id: 'rp-49',
    fase: 4,
    faseName: 'Fase 4: Factorización Prima en Potencias',
    expression: '250',
    correct: '2 \\cdot 5^3',
    distractors: ['2^2 \\cdot 5^2', '2^3 \\cdot 5', '5^4'],
    explanation: '250 = 2 \\times 125 = 2 \\times 5^3 = 2 \\cdot 5^3.',
    bonus: {
      question: '¿Qué raíz exacta permite resolver 2 · 5³ de inmediato?',
      correct: 'Raíz cúbica: ∛250 = 5∛2',
      incorrect: ['Raíz cuarta', 'Raíz quinta']
    }
  },
  {
    id: 'rp-50',
    fase: 4,
    faseName: 'Fase 4: Factorización Prima en Potencias',
    expression: '360',
    correct: '2^3 \\cdot 3^2 \\cdot 5',
    distractors: ['2^2 \\cdot 3^3 \\cdot 5', '2^3 \\cdot 3 \\cdot 5', '2^4 \\cdot 3^2 \\cdot 5'],
    explanation: '360 = 2 \\times 180 = 2 \\times (2^2 \\cdot 3^2 \\cdot 5) = 2^3 \\cdot 3^2 \\cdot 5.',
    bonus: {
      question: '¿Cuál es la relación de factorización entre 360 y 180?',
      correct: '360 es el doble de 180, así que solo sube en 1 el exponente del 2 (de 2² a 2³)',
      incorrect: ['Sube el exponente del 5', 'Se duplica cada exponente']
    }
  }
];

// Convert to ArenaQuestion format with randomized option keys
export const QUESTIONS_REACTOR_POTENCIAS: ArenaQuestion[] = RAW_REACTOR_ITEMS.map((item, idx) => {
  // Distribute options across A, B, C, D deterministically or pseudo-randomly based on index
  const allTexts = [item.correct, ...item.distractors];
  // Stable rotation so correct answer isn't always 'A'
  const shift = idx % 4; // 0 -> A, 1 -> B, 2 -> C, 3 -> D
  const rotated = [
    allTexts[(4 - shift) % 4],
    allTexts[(5 - shift) % 4],
    allTexts[(6 - shift) % 4],
    allTexts[(7 - shift) % 4]
  ];
  const keys = ['A', 'B', 'C', 'D'];
  const correctKey = keys[shift];

  const options = rotated.map((text, i) => ({
    key: keys[i],
    text,
    isCorrect: keys[i] === correctKey
  }));

  // Bonus options: correct is index 0 in raw, rotate so it's not always 1
  const bonusShift = idx % 3;
  const rawBonusTexts = [item.bonus.correct, ...item.bonus.incorrect];
  const rotatedBonus = [
    rawBonusTexts[(3 - bonusShift) % 3],
    rawBonusTexts[(4 - bonusShift) % 3],
    rawBonusTexts[(5 - bonusShift) % 3]
  ];

  return {
    id: item.id,
    question: item.fase >= 4 ? `Factoriza en números primos el número: $${item.expression}$` : `Calcula el resultado simplificado de:`,
    latex: item.fase >= 4 ? item.expression : item.expression,
    options,
    correctKey,
    explanation: item.explanation,
    inputType: 'options',
    optionsAreLatex: true,
    bonusQuestion: {
      question: item.bonus.question,
      options: rotatedBonus,
      correctIndex: bonusShift
    }
  };
});

export const DESAFIO_REACTOR_POTENCIAS: ArenaChallenge = {
  id: 'desafio-reactor-potencias',
  title: 'DESAFÍO: EL REACTOR DE POTENCIAS Y FACTORES',
  shortTitle: 'Reactor de Potencias y Factores',
  description: '50 reactivos progresivos en 4 fases: Signos y Cero, Leyes de Exponentes, Exponentes Negativos y Descomposición Prima con Bonus Diagnóstico de Atención.',
  totalExercises: 50,
  passingScore: 35, // 70%
  color: '#8B5CF6',
  bgGradient: 'from-[#8B5CF6] to-[#6D28D9]',
  badgeBg: 'bg-[#FFE600] text-[#1E1E24]',
  questions: QUESTIONS_REACTOR_POTENCIAS
};
