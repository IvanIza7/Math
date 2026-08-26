export interface EncyclopediaExample {
  problem: string; // Puede contener LaTeX
  steps: string[]; // Cada paso puede contener LaTeX
}

export interface EncyclopediaCard {
  id: string;
  categoria: string;
  color: string;
  titulo: string;
  resumen: string;
  teoria: { title: string; content: string; isLatex: boolean }[];
  ejemplos: EncyclopediaExample[];
  tips: string;
  widgetType?: string; // Para incrustar laboratorios interactivos
}

export const ENCYCLOPEDIA_CARDS: EncyclopediaCard[] = [
  // Aritmética
  {
    id: 'vol1-t1',
    categoria: 'Aritmética',
    color: '#00e676',
    titulo: 'Clasificación y representación numérica',
    resumen: 'Conjunto de Números Reales (R) compuesto por Racionales e Irracionales.',
    teoria: [
      { title: 'Inclusión de Reales', content: '\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}', isLatex: true },
      { title: 'Racionales (Q)', content: '\\text{Números expresables como } \\mathbf{\\frac{a}{b}} \\text{ con } \\mathbf{b \\neq 0}.', isLatex: true },
      { title: 'Irracionales (I)', content: '\\text{Decimales infinitos sin patrón, como } \\pi \\text{ o } \\sqrt{2}.', isLatex: true }
    ],
    ejemplos: [
      {
        problem: 'Clasifica el número \\sqrt{25}',
        steps: [
          'Calculamos la raíz exacta: \\sqrt{25} = 5',
          '\\text{El 5 es un número Natural (N), por lo tanto también es Entero (Z) y Racional (Q).}',
          '\\text{Respuesta: Es un número Racional.}'
        ]
      },
      {
        problem: 'Identifica el valor posicional del 7 en 3,472.15',
        steps: [
          '\\text{Observamos la parte entera: } 3,472',
          '\\text{El 2 son unidades, el 7 son decenas.}',
          '\\text{Respuesta: El 7 representa 70 unidades o 7 decenas.}'
        ]
      }
    ],
    tips: '\\text{Todo entero "n" es una fracción con un 1 invisible como denominador: } n = \\frac{n}{1}',
    widgetType: 'number-sets'
  },
  {
    id: 'vol1-t2',
    categoria: 'Aritmética',
    color: '#00e676',
    titulo: 'Operaciones básicas y propiedades',
    resumen: 'Suma, Resta, Multiplicación, División, Potencias, Raíces y Leyes de signos.',
    teoria: [
      { title: 'Jerarquía', content: '1. Paréntesis → 2. Potencias/Raíces → 3. Multiplicación/División → 4. Suma/Resta.', isLatex: false },
      { title: 'Leyes de Signos', content: '(+) \\cdot (+) = + \\quad (-) \\cdot (-) = + \\quad (+) \\cdot (-) = -', isLatex: true },
      { title: 'Definición de Raíz', content: '\\sqrt{a} = b \\iff b^2 = a', isLatex: true }
    ],
    ejemplos: [
      {
        problem: 'Resuelve: 5 + 3 \\times 2 - 4^2',
        steps: [
          'Primero potencias: 4^2 = 16. Queda: 5 + 3 \\times 2 - 16',
          'Luego multiplicación: 3 \\times 2 = 6. Queda: 5 + 6 - 16',
          'Finalmente sumas y restas: 11 - 16 = -5',
          'Respuesta: -5'
        ]
      },
      {
        problem: 'Calcula: (-8) \\div (-2) + 5',
        steps: [
          'Primero la división aplicando ley de signos: (-) \\div (-) = (+)',
          '-8 \\div -2 = 4',
          'Sumamos el 5: 4 + 5 = 9',
          'Respuesta: 9'
        ]
      }
    ],
    tips: 'El signo "-" delante de un paréntesis cambia el signo de todos los términos dentro.',
    widgetType: 'sign-laws'
  },
  {
    id: 'vol1-t3',
    categoria: 'Aritmética',
    color: '#00e676',
    titulo: 'Teoría de números',
    resumen: 'Múltiplos, Divisores, m.c.m., M.C.D. y Notación Científica.',
    teoria: [
      { title: 'Número Primo', content: 'Solo tiene 2 divisores: 1 y sí mismo (2, 3, 5, 7, 11...).', isLatex: false },
      { title: 'm.c.m. vs M.C.D.', content: '\\mathbf{m.c.m.}(12, 18) = 36, \\quad \\mathbf{M.C.D.}(12, 18) = 6', isLatex: true },
      { title: 'Notación Científica', content: 'a \\times 10^n \\quad (1 \\le a < 10)', isLatex: true }
    ],
    ejemplos: [
      {
        problem: 'Calcula el m.c.m. de 12 y 18',
        steps: [
          'Descomponemos 12: 12 = 2^2 \\times 3',
          'Descomponemos 18: 18 = 2 \\times 3^2',
          'Tomamos factores comunes y no comunes al mayor exponente: 2^2 \\times 3^2 = 4 \\times 9 = 36',
          'Respuesta: 36'
        ]
      },
      {
        problem: 'Expresa 45,000 en notación científica',
        steps: [
          'Movemos el punto decimal 4 lugares a la izquierda para obtener un número entre 1 y 10: 4.5',
          'Como movimos el punto a la izquierda, el exponente es positivo: 10^4',
          'Respuesta: 4.5 \\times 10^4'
        ]
      }
    ],
    tips: 'El único número primo par es el 2; todos los demás primos son impares.',
    widgetType: 'divisibility-towers'
  },
  {
    id: 'vol1-t4',
    categoria: 'Aritmética',
    color: '#00e676',
    titulo: 'Decimales y Fracciones',
    resumen: 'Operaciones con punto decimal y fracciones aritméticas.',
    teoria: [
      { title: 'Suma de Fracciones', content: '\\frac{a}{b} + \\frac{c}{d} = \\mathbf{\\frac{ad + bc}{bd}}', isLatex: true },
      { title: 'División de Fracciones', content: '\\frac{a}{b} \\div \\frac{c}{d} = \\mathbf{\\frac{a \\cdot d}{b \\cdot c}}', isLatex: true },
      { title: 'Fracción Propia', content: 'Numerador menor que el denominador (a < b).', isLatex: false }
    ],
    ejemplos: [
      {
        problem: 'Calcula: \\frac{2}{3} + \\frac{1}{4}',
        steps: [
          'Encontramos denominador común (3 \\times 4 = 12).',
          'Multiplicamos en cruz: 2 \\times 4 = 8, y 3 \\times 1 = 3.',
          'Sumamos los numeradores: \\frac{8 + 3}{12} = \\frac{11}{12}.',
          'Respuesta: \\frac{11}{12}'
        ]
      },
      {
        problem: 'Divide: 12.5 \\div 0.5',
        steps: [
          'Recorremos el punto decimal 1 lugar a la derecha en ambos números para eliminar el decimal del divisor.',
          'Nos queda: 125 \\div 5.',
          '125 \\div 5 = 25.',
          'Respuesta: 25'
        ]
      }
    ],
    tips: 'Dividir entre una fracción es matemáticamente idéntico a multiplicar por esa misma fracción invertida (recíproco).'
  },
  {
    id: 'vol1-t5',
    categoria: 'Aritmética',
    color: '#00e676',
    titulo: 'Probabilidad y representación de datos',
    resumen: 'Diagrama de Árbol y Probabilidad Clásica.',
    teoria: [
      { title: 'Probabilidad (Laplace)', content: 'P(A) = \\frac{\\text{Casos Favorables}}{\\text{Casos Totales}}', isLatex: true },
      { title: 'Diagrama de Árbol', content: 'Desglose gráfico de ramificaciones de combinaciones.', isLatex: false }
    ],
    ejemplos: [
      {
        problem: '¿Cuál es la probabilidad de lanzar un dado normal de 6 caras y obtener un número primo?',
        steps: [
          'Espacio muestral del dado: \\{1, 2, 3, 4, 5, 6\\} (6 casos totales).',
          'Números primos en el dado: \\{2, 3, 5\\} (3 casos favorables).',
          'Aplicamos la fórmula: P = \\frac{3}{6} = \\frac{1}{2} = 0.5 (o 50%).',
          'Respuesta: 50%'
        ]
      },
      {
        problem: 'Si lanzas dos monedas, ¿cuántos resultados posibles hay?',
        steps: [
          'Para la primera moneda hay 2 opciones (Águila o Sol).',
          'Para la segunda moneda hay 2 opciones (Águila o Sol).',
          'Usando el principio multiplicativo: 2 \\times 2 = 4 resultados totales.',
          'Respuesta: 4 resultados posibles.'
        ]
      }
    ],
    tips: 'Si dos eventos son independientes, el total de combinaciones es la multiplicación de las opciones de cada evento.'
  },

  // Álgebra
  {
    id: 'vol2-t1',
    categoria: 'Álgebra',
    color: '#a78bfa',
    titulo: 'Fundamentos del Álgebra',
    resumen: 'Guía esencial: Elementos del término, clasificación y conceptos clave.',
    teoria: [
      { 
        title: '¿Qué es el Álgebra?', 
        content: 'Es la rama de las matemáticas que generaliza la aritmética empleando números, letras (literales) y signos para formular relaciones, propiedades y resolver problemas con valores desconocidos.', 
        isLatex: false 
      },
      { 
        title: 'Elementos de un Término Algebraico', 
        content: '\\text{Un término es la unidad básica separada por signos } + \\text{ o } -. \\\\ \\text{Ejemplo: } -5x^3y^2 \\\\ \\bullet \\textbf{ Signo:} \\text{ Indica si es positivo (+) o negativo (-).} \\\\ \\bullet \\textbf{ Coeficiente:} \\text{ Número real que multiplica (5). Si no hay, es 1.} \\\\ \\bullet \\textbf{ Base / Literal:} \\text{ Letras que representan valores (x, y).} \\\\ \\bullet \\textbf{ Exponente:} \\text{ Potencia (3 y 2). Si no hay, es 1.}', 
        isLatex: true 
      },
      { 
        title: 'Clasificación por Número de Términos', 
        content: '\\bullet \\textbf{ Monomio: } \\text{ 1 término } (3x,\\; -7a^2b,\\; \\frac{1}{2}y^5) \\\\ \\bullet \\textbf{ Binomio: } \\text{ 2 términos } (2x + 5,\\; a^2 - b^2) \\\\ \\bullet \\textbf{ Trinomio: } \\text{ 3 términos } (x^2 + 6x + 9) \\\\ \\bullet \\textbf{ Polinomio: } \\text{ 2 o más términos } (4x^3 - 2x^2 + 5x - 7)', 
        isLatex: true 
      },
      { 
        title: 'Conceptos Operativos Clave', 
        content: '• Términos Semejantes: Tienen idéntica parte literal (mismas variables y exponentes). Solo estos se pueden sumar o restar directamente. Ej: 4x²y y -9x²y son semejantes; 4x²y y 4xy² NO lo son.\n\n• Valor Numérico: Resultado de sustituir las variables por números y operar.\n\n• Grado de un Término: Suma de los exponentes de todas sus literales (ej. -5x³y² es de grado 5).', 
        isLatex: false 
      }
    ],
    ejemplos: [
      {
        problem: 'Identifica los elementos del término: -8a^4b',
        steps: [
          'Signo: Negativo (-)',
          'Coeficiente: 8',
          'Literales: a, b',
          'Exponentes: 4 (para a) y 1 (para b)',
          'Grado del término: 4 + 1 = 5'
        ]
      },
      {
        problem: 'Simplifica si es posible: 3x^2y - 5xy^2 + 7x^2y',
        steps: [
          'Identificamos términos semejantes: 3x^2y y 7x^2y son semejantes.',
          '-5xy^2 NO es semejante porque la "y" está al cuadrado, no la "x".',
          'Sumamos los coeficientes de los semejantes: 3 + 7 = 10',
          'Respuesta: 10x^2y - 5xy^2'
        ]
      }
    ],
    tips: 'Si una literal no lleva coeficiente visible, su coeficiente es 1. Si no lleva exponente visible, su exponente es 1.',
    widgetType: 'algebra-balance'
  },
  {
    id: 'vol2-t2',
    categoria: 'Álgebra',
    color: '#a78bfa',
    titulo: 'Operaciones con Expresiones Algebraicas',
    resumen: 'Términos Semejantes, leyes de exponentes y operaciones con polinomios.',
    teoria: [
      { title: 'Términos Semejantes', content: 'Dos términos son semejantes solo si tienen exactamente la misma parte literal. Analogía de la Frutería: puedes sumar 3 manzanas (3m) con 2 manzanas (2m), pero no 3 manzanas con 2 manzanas cuadradas (2m^2).', isLatex: false },
      { title: 'Leyes de Exponentes', content: '\\text{Producto: } x^a \\cdot x^b = x^{a+b}. \\text{ Cociente: } \\frac{x^a}{x^b} = x^{a-b}. \\text{ Potencia: } (x^a)^b = x^{a \\cdot b}. \\text{ Negativo: } x^{-n} = \\frac{1}{x^n}', isLatex: true },
      { title: 'Multiplicación y División', content: 'Monomio x Monomio: multiplica coeficientes, suma exponentes. Monomio x Polinomio: aplica la propiedad distributiva. Polinomio / Monomio: divide cada término del numerador.', isLatex: false }
    ],
    ejemplos: [
      {
        problem: 'Reduce la expresión: 4x^2y - 5x + 2x^2y + 8x - 3',
        steps: [
          'Agrupamos términos semejantes: (4 + 2)x^2y + (-5 + 8)x - 3',
          'Sumamos los coeficientes: 6x^2y + 3x - 3',
          'Respuesta: 6x^2y + 3x - 3'
        ]
      },
      {
        problem: 'Multiplica y divide polinomios:',
        steps: [
          'Monomio por Monomio: (-3a^2b^3)(4ab^2) = -12a^3b^5',
          'Monomio por Polinomio: 2x(3x^2 - 5x + 4) = 6x^3 - 10x^2 + 8x',
          'División: \\frac{6x^4 - 9x^3 + 3x^2}{3x^2} = 2x^2 - 3x + 1'
        ]
      }
    ],
    tips: 'Sumar x + x da 2x (se suman los coeficientes); multiplicar x \\cdot x da x^2 (se suman los exponentes).',
    widgetType: 'algebra-balance'
  },
  {
    id: 'vol2-t3',
    categoria: 'Álgebra',
    color: '#a78bfa',
    titulo: 'Productos Notables y Factorización',
    resumen: 'Son operaciones inversas: la expansión multiplica y la factorización descompone en factores.',
    teoria: [
      { title: 'Binomio al Cuadrado / TCP', content: '(a \\pm b)^2 = a^2 \\pm 2ab + b^2', isLatex: true },
      { title: 'Binomios Conjugados', content: '(a + b)(a - b) = a^2 - b^2 \\quad (\\text{Diferencia de Cuadrados})', isLatex: true },
      { title: 'Término Común', content: '(x + a)(x + b) = x^2 + (a+b)x + ab \\quad (\\text{Trinomio } x^2+bx+c)', isLatex: true },
      { title: 'Factor Común', content: 'k(a+b+c) = ka + kb + kc', isLatex: true }
    ],
    ejemplos: [
      {
        problem: 'Factoriza la diferencia de cuadrados: 25x^2 - 49',
        steps: [
          'Identificamos que ambos son cuadrados perfectos y se restan.',
          'Sacamos raíz del primero: \\sqrt{25x^2} = 5x',
          'Sacamos raíz del segundo: \\sqrt{49} = 7',
          'Formamos binomios conjugados: (5x + 7)(5x - 7)',
          'Respuesta: (5x + 7)(5x - 7)'
        ]
      },
      {
        problem: 'Factoriza el trinomio de la forma x^2 + bx + c: x^2 - 7x + 12',
        steps: [
          'Buscamos dos números que multiplicados den +12 y sumados den -7.',
          'Los números son -4 y -3.',
          'Escribimos el producto de binomios con término común: (x - 4)(x - 3)',
          'Respuesta: (x - 4)(x - 3)'
        ]
      }
    ],
    tips: '(a + b)^2 NO es a^2 + b^2. ¡Nunca olvides sumar el término central +2ab (el doble producto)!',
    widgetType: 'factoring-blocks'
  },
  {
    id: 'vol2-t4',
    categoria: 'Álgebra',
    color: '#a78bfa',
    titulo: 'Ecuaciones de Primer Grado',
    resumen: 'Analogía de la balanza en equilibrio para encontrar la incógnita.',
    teoria: [
      { title: 'Analogía de la Balanza', content: 'Una ecuación es una balanza en equilibrio. Si sumas, restas, multiplicas o divides en un platillo izquierdo, debes aplicar exactamente la misma operación en el platillo derecho.', isLatex: false },
      { title: 'Operaciones Inversas', content: 'Para despejar, trasladas términos aplicando su operación inversa: Suma ↔ Resta, Multiplicación ↔ División.', isLatex: false }
    ],
    ejemplos: [
      {
        problem: 'Resuelve: \\frac{2x - 4}{3} = x - 3',
        steps: [
          'Multiplicamos toda la ecuación por el denominador (3) en ambos lados: 2x - 4 = 3(x - 3)',
          'Distribuimos: 2x - 4 = 3x - 9',
          'Agrupamos incógnitas a un lado y constantes al otro: -4 + 9 = 3x - 2x',
          'Simplificamos: 5 = x',
          'Respuesta: x = 5'
        ]
      },
      {
        problem: 'Resuelve: 2(x - 3) = x + 4',
        steps: [
          'Eliminamos el paréntesis distribuyendo: 2x - 6 = x + 4',
          'Pasamos las x de un lado y números del otro: 2x - x = 4 + 6',
          'Simplificamos: x = 10',
          'Respuesta: x = 10'
        ]
      }
    ],
    tips: 'Pasar un término "sumando" al otro lado es en realidad sumar esa cantidad matemática en ambos miembros simultáneamente para mantener el equilibrio.'
  },
  {
    id: 'vol2-t5',
    categoria: 'Álgebra',
    color: '#a78bfa',
    titulo: 'Sistemas de Ecuaciones (2x2)',
    resumen: 'Representan dos rectas en un plano. La solución (x,y) es el punto de cruce.',
    teoria: [
      { title: 'Sistema 2x2', content: '\\begin{cases} 2x + y = 7 \\\\ 3x - y = 8 \\end{cases}', isLatex: true },
      { title: 'Método de Reducción', content: 'Sumar o restar las dos ecuaciones término a término para eliminar estratégicamente una variable.', isLatex: false }
    ],
    ejemplos: [
      {
        problem: 'Halla (x, y) en: \n 1) 2x + y = 7 \n 2) 3x - y = 8',
        steps: [
          'Usamos reducción sumando las ecuaciones término a término.',
          '(2x + 3x) + (y - y) = 7 + 8 \\implies 5x = 15',
          'Despejamos x: x = \\frac{15}{5} = 3',
          'Sustituimos x = 3 en la primera ecuación: 2(3) + y = 7 \\implies 6 + y = 7',
          'Despejamos y: y = 1',
          'Respuesta: (3, 1)'
        ]
      },
      {
        problem: 'Halla x en: \n 1) 2x + 3y = 8 \n 2) 4x - y = 2',
        steps: [
          'Multiplicamos ec2 por 3 para igualar las y: 12x - 3y = 6',
          'Sumamos a ec1: (2x + 12x) + (3y - 3y) = 8 + 6',
          '14x = 14 \\implies x = 1',
          'Respuesta: x = 1'
        ]
      }
    ],
    tips: 'Si al graficar ambas ecuaciones las rectas son paralelas en el plano, significa que el sistema NO tiene solución.'
  },
  {
    id: 'vol2-t6',
    categoria: 'Álgebra',
    color: '#a78bfa',
    titulo: 'Ecuaciones de Segundo Grado',
    resumen: 'Tienen la forma ax² + bx + c = 0 y cuentan con hasta dos soluciones reales.',
    teoria: [
      { title: 'Incompletas', content: 'Forma ax^2+c=0 (falta término lineal): despeja directo. Forma ax^2+bx=0 (falta constante): factoriza x.', isLatex: false },
      { title: 'Fórmula General', content: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}', isLatex: true },
      { title: 'El Discriminante', content: '\\Delta = b^2 - 4ac. \\text{ Si } \\Delta > 0 \\text{: 2 sol. } \\Delta = 0 \\text{: 1 sol. } \\Delta < 0 \\text{: Sin sol. real.}', isLatex: true }
    ],
    ejemplos: [
      {
        problem: 'Resuelve la incompleta: 2x^2 - 18 = 0',
        steps: [
          'Falta el término lineal, así que despejamos: 2x^2 = 18',
          'Dividimos entre 2: x^2 = 9',
          'Sacamos raíz cuadrada: x = \\pm 3',
          'Respuesta: x_1 = 3, x_2 = -3'
        ]
      },
      {
        problem: 'Resuelve por fórmula general: x^2 - 5x + 6 = 0',
        steps: [
          'a=1, b=-5, c=6. Calculamos Discriminante = (-5)^2 - 4(1)(6) = 25 - 24 = 1',
          'Aplicamos fórmula: x = \\frac{-(-5) \\pm \\sqrt{1}}{2(1)}',
          'x = \\frac{5 \\pm 1}{2}',
          'Respuesta: x_1 = \\frac{6}{2} = 3, \\quad x_2 = \\frac{4}{2} = 2'
        ]
      }
    ],
    tips: 'Toda ecuación cuadrática tiene siempre 2 soluciones (pueden ser distintas, idénticas o complejas).'
  },
  {
    id: 'vol2-t7-frac',
    categoria: 'Álgebra',
    color: '#a78bfa',
    titulo: 'Fracciones Algebraicas',
    resumen: 'Cocientes entre polinomios. Su regla de oro: factorizar todo antes de simplificar u operar.',
    teoria: [
      { title: 'Simplificación', content: 'Factoriza numerador y denominador, luego cancela términos comunes que estén multiplicando.', isLatex: false },
      { title: 'Multiplicación', content: 'Factoriza todo, multiplica de frente y cancela cruzado (arriba y abajo).', isLatex: false }
    ],
    ejemplos: [
      {
        problem: 'Simplifica: \\frac{x^2 - 9}{x^2 + 5x + 6}',
        steps: [
          'Factorizamos numerador (diferencia de cuadrados): (x - 3)(x + 3)',
          'Factorizamos denominador (trinomio): (x + 2)(x + 3)',
          'Reescribimos: \\frac{(x - 3)(x + 3)}{(x + 2)(x + 3)}',
          'Cancelamos el factor (x + 3) presente arriba y abajo.',
          'Respuesta: \\frac{x - 3}{x + 2}'
        ]
      },
      {
        problem: 'Multiplica: \\frac{x + 1}{x - 2} \\cdot \\frac{x^2 - 4}{2x + 2}',
        steps: [
          'Factorizamos x^2 - 4 como (x - 2)(x + 2).',
          'Factorizamos 2x + 2 por factor común: 2(x + 1).',
          'Sustituimos: \\frac{x+1}{x-2} \\cdot \\frac{(x-2)(x+2)}{2(x+1)}',
          'Cancelamos (x+1) y (x-2) cruzados.',
          'Respuesta: \\frac{x + 2}{2}'
        ]
      }
    ],
    tips: '\\text{¡Jamás canceles términos sumados en una fracción! En } \\frac{x+5}{5} \\text{ NO puedes tachar el 5 para dejar solo la x. Siempre factoriza primero.}'
  },
  {
    id: 'vol2-t8',
    categoria: 'Álgebra',
    color: '#a78bfa',
    titulo: 'Desigualdades e Inecuaciones Lineales',
    resumen: 'Establecen relaciones de orden (<, >, ≤, ≥). Su solución es un conjunto o intervalo.',
    teoria: [
      { title: 'Solución en Intervalo', content: 'La solución no es un solo número, sino infinitos valores. Ejemplo: [-4, \\infty).', isLatex: false },
      { title: 'Regla Crítica de los Signos', content: 'Si multiplicas o divides ambos lados de una desigualdad por un número NEGATIVO, el sentido del signo de la desigualdad se invierte obligatoriamente.', isLatex: false }
    ],
    ejemplos: [
      {
        problem: 'Resuelve la inecuación: -3x + 4 \\le 16',
        steps: [
          'Pasamos el +4 al otro lado restando: -3x \\le 16 - 4 \\implies -3x \\le 12',
          'Dividimos entre -3. ¡OJO! Al dividir entre un negativo, invertimos el signo a \\ge:',
          'x \\ge \\frac{12}{-3} \\implies x \\ge -4',
          'Respuesta: x \\ge -4 (o intervalo [-4, \\infty))'
        ]
      },
      {
        problem: 'Resuelve: 2x - 5 > x + 3',
        steps: [
          'Pasamos la x restando a la izquierda y el -5 sumando a la derecha.',
          '2x - x > 3 + 5',
          'Simplificamos (no hay división por negativos, el signo se mantiene).',
          'Respuesta: x > 8'
        ]
      }
    ],
    tips: '¡No olvides la regla crítica! Multiplicar o dividir por un número negativo INVIERTE la boquita de la desigualdad (de < cambia a >).'
  },

  // Geometría Analítica
  {
    id: 'vol3-t1',
    categoria: 'Geometría Analítica',
    color: '#f472b6',
    titulo: 'Plano Cartesiano y Regiones',
    resumen: 'Sistema de ejes coordenados (X, Y) e inecuaciones.',
    teoria: [
      { title: 'Punto', content: 'P(x, y) = (\\text{Abscisa horizontal}, \\text{Ordenada vertical})', isLatex: true },
      { title: 'Cuadrantes', content: 'I (+,+), II (-,+), III (-,-), IV (+,-).', isLatex: false }
    ],
    ejemplos: [
      {
        problem: '¿En qué cuadrante se ubica el punto (-3, 5)?',
        steps: [
          'El valor de x (abscisa) es negativo (-3).',
          'El valor de y (ordenada) es positivo (5).',
          'La combinación (-,+) pertenece al segundo cuadrante.',
          'Respuesta: Cuadrante II'
        ]
      },
      {
        problem: 'Si y > 2x, ¿el punto (1, 4) pertenece a la región solución?',
        steps: [
          'Sustituimos x=1, y=4 en la inecuación: 4 > 2(1)',
          'Resolvemos el lado derecho: 4 > 2',
          'La declaración es VERDADERA, por lo tanto el punto está dentro de la región sombreada.',
          'Respuesta: Sí pertenece.'
        ]
      }
    ],
    tips: 'Para evaluar rápidamente de qué lado de una recta sombrear, prueba con el Origen (0,0) en tu inecuación.',
    widgetType: 'cartesian-plotter'
  },

  // Geometría Plana
  {
    id: 'vol4-t1',
    categoria: 'Geometría Plana',
    color: '#fb923c',
    titulo: 'Rectas, Ángulos y Figuras Planas',
    resumen: 'Clasificación de líneas, ángulos (0° a 360°) y polígonos.',
    teoria: [
      { title: 'Ángulo Recto', content: '\\theta = 90^\\circ \\iff r_1 \\perp r_2', isLatex: true },
      { title: 'Suma Cuadrilátero', content: 'S = (4 - 2) \\times 180^\\circ = 360^\\circ', isLatex: true },
      { title: 'Paralelogramo', content: 'Cuadrilátero con lados opuestos paralelos.', isLatex: false }
    ],
    ejemplos: [
      {
        problem: 'Calcula el ángulo restante en un triángulo donde dos de sus ángulos miden 50° y 60°.',
        steps: [
          'Sabemos que la suma de ángulos internos de cualquier triángulo es siempre 180°.',
          'Sumamos los conocidos: 50° + 60° = 110°',
          'Restamos del total: 180° - 110° = 70°',
          'Respuesta: 70°'
        ]
      },
      {
        problem: '¿Cuánto suman los ángulos interiores de un hexágono?',
        steps: [
          'Usamos la fórmula general de polígonos: S = (n - 2) \\times 180°',
          'Para un hexágono, n = 6. Sustituimos: (6 - 2) \\times 180°',
          'S = 4 \\times 180° = 720°',
          'Respuesta: 720°'
        ]
      }
    ],
    tips: 'Las diagonales de un Rombo siempre se cruzan formando exactamente ángulos de 90° (perpendiculares).'
  },

  // Trigonometría
  {
    id: 'vol5-t1',
    categoria: 'Trigonometría',
    color: '#38bdf8',
    titulo: 'Razones Trigonométricas y Triángulos',
    resumen: 'Seno, Coseno, Tangente y Teorema de Pitágoras en triángulos rectángulos.',
    teoria: [
      { title: 'Teorema de Pitágoras', content: 'c = \\sqrt{a^2 + b^2}', isLatex: true },
      { title: 'SOH CAH TOA', content: '\\text{Sen}=\\frac{\\text{Op}}{\\text{Hip}}, \\quad \\text{Cos}=\\frac{\\text{Ady}}{\\text{Hip}}, \\quad \\text{Tan}=\\frac{\\text{Op}}{\\text{Ady}}', isLatex: true },
      { title: 'Ángulos Notables', content: '\\sin(30^\\circ) = \\frac{1}{2}, \\quad \\cos(30^\\circ) = \\frac{\\sqrt{3}}{2}', isLatex: true }
    ],
    ejemplos: [
      {
        problem: 'Halla la hipotenusa si los catetos miden 3 cm y 4 cm.',
        steps: [
          'Aplicamos Pitágoras: c^2 = a^2 + b^2',
          'Sustituimos valores: c^2 = (3)^2 + (4)^2 = 9 + 16',
          'Sumamos: c^2 = 25',
          'Sacamos raíz cuadrada: c = \\sqrt{25} = 5',
          'Respuesta: 5 cm'
        ]
      },
      {
        problem: 'Calcula el cateto opuesto a un ángulo de 30° si la hipotenusa mide 10 m.',
        steps: [
          'La razón trigonométrica que relaciona opuesto e hipotenusa es Seno: \\sin(30^\\circ) = \\frac{Op}{Hip}',
          'Sabemos que \\sin(30^\\circ) = 0.5',
          'Sustituimos: 0.5 = \\frac{Op}{10}',
          'Despejamos: Op = 10 \\times 0.5 = 5',
          'Respuesta: 5 m'
        ]
      }
    ],
    tips: 'En un triángulo rectángulo, la hipotenusa siempre es, por obligación geométrica, el lado más largo (opuesto a los 90°).',
    widgetType: 'trig-triangle'
  }
];
