import { CurriculumModule } from '../types';

export interface VolumeTopic {
  id: string;
  title: string;
  conceptSummary: string;
  subtopics: string[];
  latexFormulas: { title: string; latex: string; explanation: string }[];
  keyConcepts: { term: string; definition: string; bgPill: string }[];
  invisibleTrick: string;
  exercisesToPut: string[];
  widgetType?: 'number-sets' | 'positional-table' | 'sign-laws' | 'divisibility-towers' | 'algebra-balance' | 'factoring-blocks' | 'cartesian-plotter' | 'trig-triangle';
}

export interface VolumeData {
  code: string;        // "VOL-01"
  label: string;       // "I"
  title: string;       // "Aritmética"
  subtitle: string;    // "y Teoría de Números"
  color: string;       // "#00e676"
  bgShade: string;     // "#00e67612"
  progress: number;    // temas completados
  total: number;       // temas totales
  topics: VolumeTopic[];
}

export const VOLUMES_DATA: VolumeData[] = [
  {
    code: 'VOL-01',
    label: 'I',
    title: 'Aritmética',
    subtitle: 'y Teoría de Números',
    color: '#00e676',
    bgShade: '#00e67612',
    progress: 3,
    total: 5,
    topics: [
      {
        id: 'vol1-t1',
        title: 'Clasificación y representación numérica',
        conceptSummary: 'Conjunto de Números Reales (R) compuesto por Racionales (Enteros [Naturales y Negativos] y Fraccionarios) e Irracionales (√2, π).',
        subtopics: [
          'Definición de Números Reales (R) y subconjuntos (N, Z, Q, I)',
          'Tabla posicional: Billones, Millones, Millares y Unidades',
          'Submultiplicadores decimales: Décimos hasta Diezmillonésimos'
        ],
        latexFormulas: [
          { title: 'Inclusión de Reales', latex: '\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}', explanation: 'Inclusión natural de conjuntos numéricos.' },
          { title: 'Irracionales Famosos', latex: '\\mathbb{I} = \\{ \\pi, e, \\sqrt{2}, \\sqrt{3} \\}', explanation: 'Números decimales infinitos no periódicos.' }
        ],
        keyConcepts: [
          { term: 'Racionales (Q)', definition: 'Expresables como fracción a/b con b≠0.', bgPill: '#00e676' },
          { term: 'Irracionales (I)', definition: 'Decimales infinitos sin patrón repetitivo.', bgPill: '#ffd600' },
          { term: 'Valor Posicional', definition: 'Ubicación de unidades, décimas y milésimas.', bgPill: '#38bdf8' }
        ],
        invisibleTrick: 'Todo entero "n" es una fracción con un 1 invisible como denominador: n = n/1.',
        exercisesToPut: [
          'Transcripción de cantidades numéricas a su expresión en letra y viceversa',
          'Identificación del valor posicional o descomposición aditiva de un dígito en un número entero o decimal'
        ],
        widgetType: 'number-sets'
      },
      {
        id: 'vol1-t2',
        title: 'Operaciones básicas y propiedades',
        conceptSummary: 'Partes de las operaciones básicas: Suma, Resta, Multiplicación, División, Potenciación y Radicación.',
        subtopics: [
          'Partes de las operaciones (Sumandos, Minuendo/Sustraendo, Factores, Divisor/Dividendo)',
          'Potenciación (Base, Exponente) y Radicación (Índice, Radicando)',
          'Concepto de Raíz Cuadrada exacta (√a=b ⟺ b²=a)',
          'Leyes de los signos para adición, sustracción, producto y cociente'
        ],
        latexFormulas: [
          { title: 'Definición de Raíz Cuadrada', latex: '\\sqrt{a} = b \\iff b^2 = a', explanation: 'La radicación es la operación inversa de la potenciación.' },
          { title: 'Leyes de Signos', latex: '(+) \\cdot (+) = + \\quad (-) \\cdot (-) = + \\quad (+) \\cdot (-) = -', explanation: 'Mismo signo da positivo; distinto signo da negativo.' }
        ],
        keyConcepts: [
          { term: 'Jerarquía', definition: 'Paréntesis → Potencias/Raíces → Mult/Div → Suma/Resta.', bgPill: '#00e676' },
          { term: 'Leyes de Signos', definition: '(-) · (-) = (+), (-) · (+) = (-).', bgPill: '#ff4444' }
        ],
        invisibleTrick: 'El signo "-" delante de un paréntesis cambia el signo de todos los términos dentro.',
        exercisesToPut: [
          'Cálculo de operaciones directas empleando la jerarquía y reglas de signos',
          'Cálculo manual de raíces cuadradas exactas'
        ],
        widgetType: 'sign-laws'
      },
      {
        id: 'vol1-t3',
        title: 'Teoría de números',
        conceptSummary: 'Múltiplo y Divisor.',
        subtopics: [
          'Múltiplo vs Divisor y definición de Número Primo',
          'Criterios de divisibilidad (2, 3, 5, 6, 9 y ceros)',
          'Descomposición prima para Mínimo Común Múltiplo (m.c.m.) y Máximo Común Divisor (M.C.D.)',
          'Notación Científica con potencias de base 10'
        ],
        latexFormulas: [
          { title: 'Notación Científica', latex: 'a \\times 10^n \\quad (1 \\le a < 10)', explanation: 'Expresa números gigantes o diminutos mediante potencias de 10.' },
          { title: 'm.c.m. vs M.C.D.', latex: '\\text{m.c.m.}(12, 18) = 36, \\quad \\text{M.C.D.}(12, 18) = 6', explanation: 'Factores primos de mayor exponente vs de menor exponente común.' }
        ],
        keyConcepts: [
          { term: 'Número Primo', definition: 'Solo tiene 2 divisores: 1 y sí mismo (2, 3, 5, 7, 11...).', bgPill: '#00e676' },
          { term: 'Criterio del 3', definition: 'La suma de sus dígitos es múltiplo de 3.', bgPill: '#ffd600' }
        ],
        invisibleTrick: 'El único número primo par es el 2; todos los demás números primos son impares.',
        exercisesToPut: [
          'Determinar si un número es primo o compuesto',
          'Aplicación de criterios de divisibilidad',
          'Descomposición en factores primos para hallar el m.c.m. y M.C.D.',
          'Conversión de números decimales/enteros a notación científica y viceversa'
        ],
        widgetType: 'divisibility-towers'
      },
      {
        id: 'vol1-t4',
        title: 'Decimales y Fracciones',
        conceptSummary: 'División decimal con punto.',
        subtopics: [
          'División decimal y desplazamiento del punto',
          'Fracciones Propias, Impropias y Mixtas',
          'Suma/resta con común denominador, multiplicación directa y división cruzada',
          'Razón Geométrica como comparación por cociente'
        ],
        latexFormulas: [
          { title: 'Suma de Fracciones', latex: '\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}', explanation: 'Multiplicación en cruz para suma con distinto denominador.' },
          { title: 'División de Fracciones', latex: '\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a \\cdot d}{b \\cdot c}', explanation: 'Multiplicación por el recíproco de la segunda fracción.' }
        ],
        keyConcepts: [
          { term: 'Fracción Propia', definition: 'Numerador menor que el denominador (a < b).', bgPill: '#38bdf8' },
          { term: 'Recíproco', definition: 'Inversión de numerador y denominador (a/b ➔ b/a).', bgPill: '#00e676' }
        ],
        invisibleTrick: 'Dividir entre una fracción es idéntico a multiplicar por su fracción invertida.',
        exercisesToPut: [
          'Divisiones de números decimales desplazando el punto',
          'Conversión de fracciones mixtas a impropias y viceversa',
          'Operaciones combinadas de suma, resta, multiplicación y división de fracciones',
          'Simplificación de razones geométricas'
        ]
      },
      {
        id: 'vol1-t5',
        title: 'Probabilidad y representación de datos',
        conceptSummary: 'Diagrama de Árbol para enumerar resultados posibles de experimentos.',
        subtopics: [
          'Diagrama de Árbol para enumeración secuencial',
          'Diagrama Cartesiano para espacios muestrales bidimensionales'
        ],
        latexFormulas: [
          { title: 'Probabilidad Clásica (Laplace)', latex: 'P(A) = \\frac{\\text{Casos Favorables}}{\\text{Casos Totales Posibles}}', explanation: 'Razón de espacio muestral con eventos equiprobables.' }
        ],
        keyConcepts: [
          { term: 'Diagrama de Árbol', definition: 'Desglose gráfico de ramificaciones de posibilidades.', bgPill: '#ffd600' },
          { term: 'Espacio Muestral', definition: 'Conjunto de todos los resultados posibles.', bgPill: '#a78bfa' }
        ],
        invisibleTrick: 'Si dos eventos son independientes, el total de combinaciones es el producto del número de opciones de cada evento.',
        exercisesToPut: [
          'Construcción de esquemas de árbol o diagramas cartesianos para determinar los resultados posibles al lanzar monedas o dados secuencialmente'
        ]
      }
    ]
  },
  {
    code: 'VOL-02',
    label: 'II',
    title: 'Álgebra',
    subtitle: 'y Estructuras',
    color: '#a78bfa',
    bgShade: '#a78bfa12',
    progress: 1,
    total: 7,
    topics: [
      {
        id: 'vol2-t1',
        title: 'Conceptos fundamentales',
        conceptSummary: 'Lenguaje Algebraico.',
        subtopics: [
          'Traducción de lenguaje verbal a expresiones algebraicas',
          'Monomios, Binomios, Trinomios y Polinomios',
          'Partes del término algebraico: Signo, Coeficiente, Literal, Exponente',
          'Evaluación de Valor Numérico por sustitución'
        ],
        latexFormulas: [
          { title: 'Estructura de un Término', latex: '-5 x^3 y^2', explanation: 'Signo (-), Coeficiente (5), Literales (x, y) y Exponentes (3, 2).' },
          { title: 'Valor Numérico', latex: 'P(x) = 2x^2 - 3x + 1 \\implies P(2) = 2(4) - 6 + 1 = 3', explanation: 'Sustitución de literales por constantes numéricas.' }
        ],
        keyConcepts: [
          { term: 'Lenguaje Algebraico', definition: 'Simbología matemática con variables.', bgPill: '#a78bfa' },
          { term: 'Monomio', definition: 'Expresión algebraica de 1 solo término.', bgPill: '#00e676' }
        ],
        invisibleTrick: 'Si una literal no lleva coeficiente visible, su coeficiente es 1. Si no lleva exponente visible, su exponente es 1.',
        exercisesToPut: [
          'Traducción de enunciados del lenguaje común a expresiones algebraicas',
          'Identificación de elementos de un término',
          'Evaluación de expresiones algebraicas mediante la sustitución de valores numéricos dados'
        ]
      },
      {
        id: 'vol2-t2',
        title: 'Operaciones algebraicas',
        conceptSummary: 'Términos Semejantes y reducción.',
        subtopics: [
          'Términos Semejantes (mismas literales y mismos exponentes)',
          'Reducción de términos semejantes',
          'Reglas de Supresión de Paréntesis',
          'Multiplicación y división de monomios y polinomios con leyes de exponentes'
        ],
        latexFormulas: [
          { title: 'Producto de Potencias', latex: 'x^a \\cdot x^b = x^{a+b}', explanation: 'En multiplicación con misma base, los exponentes se suman.' },
          { title: 'Cociente de Potencias', latex: '\\frac{x^a}{x^b} = x^{a-b}', explanation: 'En división con misma base, los exponentes se restan.' }
        ],
        keyConcepts: [
          { term: 'Términos Semejantes', definition: 'Coinciden en variables y exponentes exactos.', bgPill: '#a78bfa' },
          { term: 'Supresión (-)', definition: 'Signo negativo invierte todos los signos internos.', bgPill: '#ff4444' }
        ],
        invisibleTrick: 'Sumar x + x da 2x (suma de coeficientes); multiplicar x · x da x² (suma de exponentes).',
        exercisesToPut: [
          'Reducción de expresiones simplificando términos semejantes',
          'Suma, resta, multiplicación y división de monomios y polinomios'
        ],
        widgetType: 'algebra-balance'
      },
      {
        id: 'vol2-t3',
        title: 'Fracciones Algebraicas',
        conceptSummary: 'Cociente de expresiones algebraicas.',
        subtopics: [
          'Definición de fracción algebraica y dominio',
          'Simplificación por cancelación de factores comunes',
          'Suma y resta con mismo y diferente denominador',
          'Multiplicación y división por recíproco'
        ],
        latexFormulas: [
          { title: 'Simplificación Legal', latex: '\\frac{x^2 - 9}{x + 3} = \\frac{(x-3)(x+3)}{x+3} = x - 3', explanation: 'Solo se pueden cancelar factores multiplicativos completos.' }
        ],
        keyConcepts: [
          { term: 'Cancelación de Factores', definition: 'Aplica únicamente a multiplicaciones, jamás a sumas.', bgPill: '#a78bfa' }
        ],
        invisibleTrick: '¡Jamás canceles términos sumados en una fracción! En (x+5)/5 no puedes tachar el 5 para dejar solo x.',
        exercisesToPut: [
          'Simplificación de fracciones reduciendo factores comunes',
          'Operaciones básicas (suma, resta, producto y cociente) de fracciones algebraicas'
        ]
      },
      {
        id: 'vol2-t4',
        title: 'Ecuaciones de Primer Grado',
        conceptSummary: 'Ecuación de primer grado.',
        subtopics: [
          'Concepto de igualdad y miembros de una ecuación',
          'Despeje por operaciones inversas',
          'Ecuaciones con paréntesis y signos de agrupación',
          'Ecuaciones con coeficientes fraccionarios usando el m.c.m.'
        ],
        latexFormulas: [
          { title: 'Ecuación Lineal Canónica', latex: 'a x + b = 0 \\implies x = -\\frac{b}{a}', explanation: 'Despeje directo de la incógnita x.' }
        ],
        keyConcepts: [
          { term: 'Transposición', definition: 'Aplicar la misma operación inversa en ambos lados.', bgPill: '#a78bfa' }
        ],
        invisibleTrick: 'Pasar un término sumando al otro lado restando es en realidad restar esa cantidad en ambos miembros.',
        exercisesToPut: [
          'Despeje y resolución de ecuaciones de primer grado simples, con paréntesis y con fracciones'
        ]
      },
      {
        id: 'vol2-t5',
        title: 'Sistemas de Ecuaciones Lineales (2x2)',
        conceptSummary: 'Sistema de dos ecuaciones de primer grado con dos incógnitas.',
        subtopics: [
          'Concepto de sistema 2x2 y solución simultánea (x, y)',
          'Método de Reducción (Suma o Resta)',
          'Método de Sustitución',
          'Método de Igualación'
        ],
        latexFormulas: [
          { title: 'Sistema 2x2 General', latex: '\\begin{cases} a_1 x + b_1 y = c_1 \\\\ a_2 x + b_2 y = c_2 \\end{cases}', explanation: 'Dos ecuaciones lineales con dos incógnitas.' }
        ],
        keyConcepts: [
          { term: 'Reducción', definition: 'Multiplicar ecuaciones para eliminar una variable al sumar.', bgPill: '#00e676' },
          { term: 'Sustitución', definition: 'Despejar una variable y colocar su valor en la otra ecuación.', bgPill: '#ffd600' }
        ],
        invisibleTrick: 'Si ambas rectas son paralelas en el plano, el sistema no tiene solución (incompatible).',
        exercisesToPut: [
          'Resolución de sistemas de ecuaciones de 2x2 aplicando reducción, sustitución e igualación'
        ]
      },
      {
        id: 'vol2-t6',
        title: 'Ecuaciones de Segundo Grado (Cuadráticas)',
        conceptSummary: 'Exponente máximo 2.',
        subtopics: [
          'Formas incompletas puras y mixtas',
          'Forma completa ax² + bx + c = 0',
          'Resolución por factorización y despeje',
          'Resolución por Fórmula General x = (-b ± √(b² - 4ac)) / (2a)'
        ],
        latexFormulas: [
          { title: 'Fórmula General', latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}', explanation: 'Resolución universal de ecuaciones cuadráticas.' }
        ],
        keyConcepts: [
          { term: 'Discriminante (Δ)', definition: 'b² - 4ac indica el número de soluciones reales (Δ>0: 2, Δ=0: 1, Δ<0: 0).', bgPill: '#a78bfa' }
        ],
        invisibleTrick: 'Toda ecuación cuadrática tiene exactamente 2 soluciones (pueden ser reales distintas, reales iguales o complejas).',
        exercisesToPut: [
          'Resolución de ecuaciones cuadráticas incompletas despejando o factorizando',
          'Resolución de ecuaciones cuadráticas completas mediante fórmula general o descomposición'
        ]
      },
      {
        id: 'vol2-t7',
        title: 'Productos Notables y Factorización',
        conceptSummary: 'Productos Notables: Binomio al cuadrado ((a±b)²=a²±2ab+b²), Binomios conjugados ((a+b)(a-b)=a²-b²), Binomios con término común.',
        subtopics: [
          'Binomio al cuadrado y Trinomio Cuadrado Perfecto (T.C.P.)',
          'Binomios conjugados y Diferencia de Cuadrados',
          'Binomios con término común y Trinomio x² + bx + c',
          'Factorización por Factor Común'
        ],
        latexFormulas: [
          { title: 'Binomio al Cuadrado', latex: '(a \\pm b)^2 = a^2 \\pm 2ab + b^2', explanation: 'Cuadrado del primero ± doble producto + cuadrado del segundo.' },
          { title: 'Diferencia de Cuadrados', latex: 'a^2 - b^2 = (a + b)(a - b)', explanation: 'Factoriza en producto de binomios conjugados.' }
        ],
        keyConcepts: [
          { term: 'Factor Común', definition: 'Extraer el M.C.D. de coeficientes y literales con menor exponente.', bgPill: '#a78bfa' },
          { term: 'Binomios Conjugados', definition: 'Términos iguales con signo central opuesto.', bgPill: '#00e676' }
        ],
        invisibleTrick: '(a + b)² NO es a² + b². ¡Siempre incluye el término central +2ab!',
        exercisesToPut: [
          'Desarrollo directo de productos notables mediante sus reglas específicas',
          'Factorización de polinomios identificando el caso correspondiente'
        ],
        widgetType: 'factoring-blocks'
      }
    ]
  },
  {
    code: 'VOL-03',
    label: 'III',
    title: 'Geometría Analítica',
    subtitle: 'y Plano Cartesiano',
    color: '#f472b6',
    bgShade: '#f472b612',
    progress: 0,
    total: 1,
    topics: [
      {
        id: 'vol3-t1',
        title: 'Plano Cartesiano y Regiones',
        conceptSummary: 'Sistema de coordenadas por dos rectas perpendiculares (Eje x Abscisas, Eje y Ordenadas).',
        subtopics: [
          'Eje X (Abscisas), Eje Y (Ordenadas) y Origen (0,0)',
          'División en los IV Cuadrantes y signos de (x,y)',
          'Localización de puntos en el plano',
          'Desigualdades e Inecuaciones con regiones sombreadas y líneas continuas/punteadas'
        ],
        latexFormulas: [
          { title: 'Coordenada Punto', latex: 'P(x, y) = (\\text{Abscisa}, \\text{Ordenada})', explanation: 'Ubicación biunívoca en el plano cartesiano.' },
          { title: 'Región de Inecuación', latex: 'y > m x + b \\quad \\text{o} \\quad x \\le a', explanation: 'Semiplano sombreado delimitado por una recta frontera.' }
        ],
        keyConcepts: [
          { term: 'Abscisa (x)', definition: 'Distancia horizontal al eje vertical Y.', bgPill: '#f472b6' },
          { term: 'Ordenada (y)', definition: 'Distancia vertical al eje horizontal X.', bgPill: '#38bdf8' },
          { term: 'Frontera Punteada', definition: 'Se usa para desigualdades estrictas (< o >).', bgPill: '#ffd600' }
        ],
        invisibleTrick: 'Para evaluar qué lado de la recta sombrear, prueba con el punto (0,0) en la inecuación.',
        exercisesToPut: [
          'Ubicación de pares ordenados en los cuadrantes del plano cartesiano',
          'Graficación de regiones de desigualdad (ejemplo: x > a o y ≤ b)'
        ],
        widgetType: 'cartesian-plotter'
      }
    ]
  },
  {
    code: 'VOL-04',
    label: 'IV',
    title: 'Geometría Plana',
    subtitle: 'Ángulos y Figuras',
    color: '#fb923c',
    bgShade: '#fb923c12',
    progress: 0,
    total: 1,
    topics: [
      {
        id: 'vol4-t1',
        title: 'Rectas, Ángulos y Figuras Planas',
        conceptSummary: 'Rectas Paralelas y Perpendiculares.',
        subtopics: [
          'Rectas Paralelas, Perpendiculares y Mediatriz',
          'Clasificación de Ángulos: Agudo, Recto, Obtuso, Llano, Entrante y Perigonal',
          'Clasificación de Cuadriláteros: Paralelogramos (cuadrado, rectángulo, rombo, romboide)',
          'Trapecios (rectángulo, isósceles, escaleno) y Trapezoides (simétrico, asimétrico)'
        ],
        latexFormulas: [
          { title: 'Suma de Ángulos de Cuadrilátero', latex: 'S = (4 - 2) \\times 180^\\circ = 360^\\circ', explanation: 'Todo cuadrilátero suma 360° en sus ángulos internos.' },
          { title: 'Ángulo Recto', latex: '\\theta = 90^\\circ \\iff r_1 \\perp r_2', explanation: 'Las rectas perpendiculares forman un ángulo de 90°.' }
        ],
        keyConcepts: [
          { term: 'Paralelogramos', definition: 'Cuadriláteros con dos pares de lados opuestos paralelos.', bgPill: '#fb923c' },
          { term: 'Mediatriz', definition: 'Recta perpendicular que corta a un segmento en su punto medio exacto.', bgPill: '#00e676' }
        ],
        invisibleTrick: 'Las diagonales de un rombo siempre se cruzan formando un ángulo de 90° exactos.',
        exercisesToPut: [
          'Identificación y clasificación visual de tipos de rectas, ángulos según sus grados y cuadriláteros según la igualdad o paralelismo de sus lados'
        ]
      }
    ]
  },
  {
    code: 'VOL-05',
    label: 'V',
    title: 'Trigonometría',
    subtitle: 'y Triángulos',
    color: '#38bdf8',
    bgShade: '#38bdf812',
    progress: 0,
    total: 1,
    topics: [
      {
        id: 'vol5-t1',
        title: 'Razones Trigonométricas y Resolución de Triángulos',
        conceptSummary: 'Razones en triángulos rectángulos: Seno (co/h), Coseno (ca/h), Tangente (co/ca), Cotangente (ca/co), Secante (h/ca) y Cosecante (h/co).',
        subtopics: [
          'Definición de las 6 razones trigonométricas en triángulo rectángulo',
          'Valores de funciones trigonométricas para ángulos notables (30°, 45°, 60°)',
          'Resolución de triángulos rectángulos mediante razones y Teorema de Pitágoras'
        ],
        latexFormulas: [
          { title: 'Teorema de Pitágoras', latex: 'c = \\sqrt{a^2 + b^2}', explanation: 'Relación entre los catetos y la hipotenusa.' },
          { title: 'Seno de 30°', latex: '\\sin(30^\\circ) = \\frac{1}{2}, \\quad \\cos(30^\\circ) = \\frac{\\sqrt{3}}{2}', explanation: 'Valor exacto derivado del triángulo notable.' }
        ],
        keyConcepts: [
          { term: 'SOH CAH TOA', definition: 'Sin = Opuesto/Hipo, Cos = Adyacente/Hipo, Tan = Opuesto/Adyacente.', bgPill: '#38bdf8' },
          { term: 'Hipotenusa (c)', definition: 'Lado opuesto al ángulo recto de 90°.', bgPill: '#ffd600' }
        ],
        invisibleTrick: 'En un triángulo rectángulo, la hipotenusa siempre es el lado con la longitud mayor.',
        exercisesToPut: [
          'Determinación del valor exacto de razones trigonométricas para ángulos de 30°, 45° y 60°',
          'Cálculo de lados o ángulos desconocidos en triángulos rectángulos a partir de datos conocidos'
        ],
        widgetType: 'trig-triangle'
      }
    ]
  }
];

export const CURRICULUM_MODULES: CurriculumModule[] = VOLUMES_DATA.map((v, idx) => ({
  id: `modulo-${idx + 1}`,
  moduleNumber: idx + 1,
  title: `${v.title} ${v.subtitle}`,
  subtitle: `Volumen ${v.code}`,
  icon: 'Hash',
  color: v.color,
  subtopics: v.topics.map((t) => ({
    id: t.id,
    title: t.title,
    badge: v.code,
    color: v.color,
    summary: t.conceptSummary,
    latexFormulas: t.latexFormulas,
    keyConcepts: t.keyConcepts,
    invisibleTrick: t.invisibleTrick,
    widgetType: t.widgetType,
  }))
}));
