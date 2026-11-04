import { ArenaQuestion, ArenaChallenge } from './arenaChallengesData';

export interface PorcentajeMixtoQuestion extends ArenaQuestion {
  tipo: 'porcentaje_desconocido' | 'cantidad_desconocida' | 'entero_desconocido';
  dificultad: 'básico' | 'intermedio';
  formato: 'multiple_choice' | 'numeric_input';
  unidad: 'porcentaje' | 'moneda' | 'cantidad';
  correctDisplay?: string;
  inputPrefix?: string;
  inputSuffix?: string;
  acceptableAnswers?: string[];
}

export const PORCENTAJES_MIXTO_QUESTIONS: PorcentajeMixtoQuestion[] = [
  // Ejercicio 1 🔘
  {
    id: 'porcentaje_001',
    tipo: 'porcentaje_desconocido',
    dificultad: 'básico',
    formato: 'multiple_choice',
    unidad: 'porcentaje',
    question: 'En una tienda, un artículo cuesta $200 y tiene un descuento de $30. ¿Qué porcentaje representa el descuento?',
    latex: '\\text{Artículo: } \\$200, \\quad \\text{Descuento: } \\$30',
    options: [
      { key: 'A', text: '15%', isCorrect: true },
      { key: 'B', text: '5%', isCorrect: false },
      { key: 'C', text: '7.5%', isCorrect: false },
      { key: 'D', text: '35%', isCorrect: false }
    ],
    correctKey: 'A',
    correctDisplay: '15%',
    explanation: '\\dfrac{30}{200} \\times 100\\% = 0.15 \\times 100\\% = 15\\%'
  },
  // Ejercicio 2 ⌨️
  {
    id: 'porcentaje_002',
    tipo: 'cantidad_desconocida',
    dificultad: 'básico',
    formato: 'numeric_input',
    unidad: 'moneda',
    inputType: 'text',
    question: 'Una mochila cuesta $400 y tiene un descuento del 15%. ¿Cuánto dinero descuentan?',
    latex: '\\text{Mochila: } \\$400, \\quad \\text{Descuento: } 15\\%',
    inputPrefix: '$',
    correctKey: '60',
    correctDisplay: '$60',
    acceptableAnswers: ['60', '$60', '60.0', '60.00'],
    explanation: '400 \\times \\dfrac{15}{100} = 400 \\times 0.15 = \\$60'
  },
  // Ejercicio 3 🔘
  {
    id: 'porcentaje_003',
    tipo: 'entero_desconocido',
    dificultad: 'básico',
    formato: 'multiple_choice',
    unidad: 'moneda',
    question: 'En una tienda, $45 representan el 15% del precio original de un producto. ¿Cuál era el precio original?',
    latex: '15\\% \\text{ del total} = \\$45',
    options: [
      { key: 'A', text: '$450', isCorrect: false },
      { key: 'B', text: '$225', isCorrect: false },
      { key: 'C', text: '$330', isCorrect: false },
      { key: 'D', text: '$300', isCorrect: true }
    ],
    correctKey: 'D',
    correctDisplay: '$300',
    explanation: '\\text{Total} = \\dfrac{45}{0.15} = \\dfrac{45 \\times 100}{15} = \\$300'
  },
  // Ejercicio 4 ⌨️
  {
    id: 'porcentaje_004',
    tipo: 'porcentaje_desconocido',
    dificultad: 'básico',
    formato: 'numeric_input',
    unidad: 'porcentaje',
    inputType: 'text',
    question: 'De 80 estudiantes, 20 utilizan transporte escolar. ¿Qué porcentaje de estudiantes representan?',
    latex: '\\text{Transporte: } 20 \\text{ de } 80',
    inputSuffix: '%',
    correctKey: '25',
    correctDisplay: '25%',
    acceptableAnswers: ['25', '25%', '%25'],
    explanation: '\\dfrac{20}{80} \\times 100\\% = \\dfrac{1}{4} \\times 100\\% = 25\\%'
  },
  // Ejercicio 5 🔘
  {
    id: 'porcentaje_005',
    tipo: 'cantidad_desconocida',
    dificultad: 'básico',
    formato: 'multiple_choice',
    unidad: 'cantidad',
    question: 'Una escuela tiene 250 alumnos y el 12% participa en deportes. ¿Cuántos alumnos participan?',
    latex: '12\\% \\text{ de } 250 \\text{ alumnos}',
    options: [
      { key: 'A', text: '15', isCorrect: false },
      { key: 'B', text: '30', isCorrect: true },
      { key: 'C', text: '37.5', isCorrect: false },
      { key: 'D', text: '36', isCorrect: false }
    ],
    correctKey: 'B',
    correctDisplay: '30 alumnos',
    explanation: '250 \\times 0.12 = 30\\text{ alumnos}'
  },
  // Ejercicio 6 ⌨️
  {
    id: 'porcentaje_006',
    tipo: 'entero_desconocido',
    dificultad: 'básico',
    formato: 'numeric_input',
    unidad: 'moneda',
    inputType: 'text',
    question: 'Una camisa tiene un descuento de $80, que equivale al 20% de su precio original. ¿Cuál era su precio?',
    latex: '20\\% \\text{ de la camisa} = \\$80',
    inputPrefix: '$',
    correctKey: '400',
    correctDisplay: '$400',
    acceptableAnswers: ['400', '$400', '400.0'],
    explanation: '\\text{Precio original} = \\dfrac{80}{0.20} = \\dfrac{80 \\times 100}{20} = \\$400'
  },
  // Ejercicio 7 🔘
  {
    id: 'porcentaje_007',
    tipo: 'porcentaje_desconocido',
    dificultad: 'básico',
    formato: 'multiple_choice',
    unidad: 'porcentaje',
    question: 'De las 150 páginas de un libro, Ana leyó 45. ¿Qué porcentaje del libro leyó?',
    latex: '\\text{Leído: } 45 \\text{ de } 150 \\text{ páginas}',
    options: [
      { key: 'A', text: '45%', isCorrect: false },
      { key: 'B', text: '37.5%', isCorrect: false },
      { key: 'C', text: '30%', isCorrect: true },
      { key: 'D', text: '5%', isCorrect: false }
    ],
    correctKey: 'C',
    correctDisplay: '30%',
    explanation: '\\dfrac{45}{150} \\times 100\\% = 0.30 \\times 100\\% = 30\\%'
  },
  // Ejercicio 8 ⌨️
  {
    id: 'porcentaje_008',
    tipo: 'cantidad_desconocida',
    dificultad: 'básico',
    formato: 'numeric_input',
    unidad: 'moneda',
    inputType: 'text',
    question: 'Un teléfono cuesta $900 y aumenta su precio un 10%. ¿De cuánto es el aumento?',
    latex: '10\\% \\text{ de aumento sobre } \\$900',
    inputPrefix: '$',
    correctKey: '90',
    correctDisplay: '$90',
    acceptableAnswers: ['90', '$90', '90.0'],
    explanation: '900 \\times 0.10 = \\$90'
  },
  // Ejercicio 9 🔘
  {
    id: 'porcentaje_009',
    tipo: 'entero_desconocido',
    dificultad: 'básico',
    formato: 'multiple_choice',
    unidad: 'cantidad',
    question: 'En una encuesta, 36 personas representan el 12% de los participantes. ¿Cuántas personas participaron?',
    latex: '12\\% \\text{ del total} = 36 \\text{ personas}',
    options: [
      { key: 'A', text: '300', isCorrect: true },
      { key: 'B', text: '325', isCorrect: false },
      { key: 'C', text: '320', isCorrect: false },
      { key: 'D', text: '225', isCorrect: false }
    ],
    correctKey: 'A',
    correctDisplay: '300 personas',
    explanation: '\\text{Total} = \\dfrac{36}{0.12} = \\dfrac{36 \\times 100}{12} = 300\\text{ personas}'
  },
  // Ejercicio 10 ⌨️
  {
    id: 'porcentaje_010',
    tipo: 'porcentaje_desconocido',
    dificultad: 'básico',
    formato: 'numeric_input',
    unidad: 'porcentaje',
    inputType: 'text',
    question: 'Un tanque tiene una capacidad de 60 litros y contiene 18 litros. ¿Qué porcentaje de su capacidad está ocupado?',
    latex: '18 \\text{ L de } 60 \\text{ L}',
    inputSuffix: '%',
    correctKey: '30',
    correctDisplay: '30%',
    acceptableAnswers: ['30', '30%', '%30'],
    explanation: '\\dfrac{18}{60} \\times 100\\% = 0.30 \\times 100\\% = 30\\%'
  },
  // Ejercicio 11 🔘
  {
    id: 'porcentaje_011',
    tipo: 'cantidad_desconocida',
    dificultad: 'básico',
    formato: 'multiple_choice',
    unidad: 'moneda',
    question: 'Una computadora cuesta $1,200 y se paga un anticipo del 25%. ¿Cuánto es el anticipo?',
    latex: '25\\% \\text{ de anticipo sobre } \\$1,200',
    options: [
      { key: 'A', text: '$300', isCorrect: true },
      { key: 'B', text: '$450', isCorrect: false },
      { key: 'C', text: '$320', isCorrect: false },
      { key: 'D', text: '$225', isCorrect: false }
    ],
    correctKey: 'A',
    correctDisplay: '$300',
    explanation: '1200 \\times 0.25 = \\dfrac{1200}{4} = \\$300'
  },
  // Ejercicio 12 ⌨️
  {
    id: 'porcentaje_012',
    tipo: 'entero_desconocido',
    dificultad: 'básico',
    formato: 'numeric_input',
    unidad: 'cantidad',
    inputType: 'text',
    question: 'Un paquete contiene 24 galletas, que representan el 30% de todas las galletas preparadas. ¿Cuántas galletas se prepararon?',
    latex: '30\\% \\text{ de las galletas} = 24',
    inputSuffix: ' galletas',
    correctKey: '80',
    correctDisplay: '80 galletas',
    acceptableAnswers: ['80', '80 galletas'],
    explanation: '\\text{Total} = \\dfrac{24}{0.30} = \\dfrac{24 \\times 100}{30} = 80\\text{ galletas}'
  },
  // Ejercicio 13 🔘
  {
    id: 'porcentaje_013',
    tipo: 'porcentaje_desconocido',
    dificultad: 'básico',
    formato: 'multiple_choice',
    unidad: 'porcentaje',
    question: 'De 240 productos fabricados, 36 salieron defectuosos. ¿Qué porcentaje salió defectuoso?',
    latex: '36 \\text{ defectuosos de } 240',
    options: [
      { key: 'A', text: '15%', isCorrect: true },
      { key: 'B', text: '7.5%', isCorrect: false },
      { key: 'C', text: '10%', isCorrect: false },
      { key: 'D', text: '40%', isCorrect: false }
    ],
    correctKey: 'A',
    correctDisplay: '15%',
    explanation: '\\dfrac{36}{240} \\times 100\\% = 0.15 \\times 100\\% = 15\\%'
  },
  // Ejercicio 14 ⌨️
  {
    id: 'porcentaje_014',
    tipo: 'cantidad_desconocida',
    dificultad: 'básico',
    formato: 'numeric_input',
    unidad: 'cantidad',
    inputType: 'text',
    question: 'En una biblioteca hay 350 libros y el 20% son novelas. ¿Cuántas novelas hay?',
    latex: '20\\% \\text{ de } 350 \\text{ libros}',
    inputSuffix: ' novelas',
    correctKey: '70',
    correctDisplay: '70 novelas',
    acceptableAnswers: ['70', '70 novelas'],
    explanation: '350 \\times 0.20 = 70\\text{ novelas}'
  },
  // Ejercicio 15 🔘
  {
    id: 'porcentaje_015',
    tipo: 'entero_desconocido',
    dificultad: 'básico',
    formato: 'multiple_choice',
    unidad: 'moneda',
    question: 'Un trabajador ahorró $180, equivalente al 15% de su sueldo. ¿Cuál es su sueldo?',
    latex: '15\\% \\text{ del sueldo} = \\$180',
    options: [
      { key: 'A', text: '$1,220', isCorrect: false },
      { key: 'B', text: '$1,380', isCorrect: false },
      { key: 'C', text: '$1,200', isCorrect: true },
      { key: 'D', text: '$960', isCorrect: false }
    ],
    correctKey: 'C',
    correctDisplay: '$1,200',
    explanation: '\\text{Sueldo} = \\dfrac{180}{0.15} = \\dfrac{180 \\times 100}{15} = \\$1,200'
  },
  // Ejercicio 16 ⌨️
  {
    id: 'porcentaje_016',
    tipo: 'porcentaje_desconocido',
    dificultad: 'básico',
    formato: 'numeric_input',
    unidad: 'porcentaje',
    inputType: 'text',
    question: 'Una botella tiene 500 ml de capacidad y contiene 125 ml. ¿Qué porcentaje de su capacidad está ocupada?',
    latex: '125\\text{ ml de } 500\\text{ ml}',
    inputSuffix: '%',
    correctKey: '25',
    correctDisplay: '25%',
    acceptableAnswers: ['25', '25%', '%25'],
    explanation: '\\dfrac{125}{500} \\times 100\\% = \\dfrac{1}{4} \\times 100\\% = 25\\%'
  },
  // Ejercicio 17 🔘
  {
    id: 'porcentaje_017',
    tipo: 'cantidad_desconocida',
    dificultad: 'básico',
    formato: 'multiple_choice',
    unidad: 'moneda',
    question: 'Una bicicleta cuesta $1,500 y tiene un descuento del 8%. ¿Cuánto dinero se descuenta?',
    latex: '8\\% \\text{ de descuento sobre } \\$1,500',
    options: [
      { key: 'A', text: '$96', isCorrect: false },
      { key: 'B', text: '$130', isCorrect: false },
      { key: 'C', text: '$120', isCorrect: true },
      { key: 'D', text: '$138', isCorrect: false }
    ],
    correctKey: 'C',
    correctDisplay: '$120',
    explanation: '1500 \\times 0.08 = \\$120'
  },
  // Ejercicio 18 ⌨️
  {
    id: 'porcentaje_018',
    tipo: 'entero_desconocido',
    dificultad: 'básico',
    formato: 'numeric_input',
    unidad: 'cantidad',
    inputType: 'text',
    question: 'En un grupo, 42 estudiantes representan el 35% del total. ¿Cuántos estudiantes hay en el grupo?',
    latex: '35\\% \\text{ del grupo} = 42 \\text{ estudiantes}',
    inputSuffix: ' estudiantes',
    correctKey: '120',
    correctDisplay: '120 estudiantes',
    acceptableAnswers: ['120', '120 estudiantes'],
    explanation: '\\text{Total} = \\dfrac{42}{0.35} = \\dfrac{4200}{35} = 120\\text{ estudiantes}'
  },
  // Ejercicio 19 🔘
  {
    id: 'porcentaje_019',
    tipo: 'porcentaje_desconocido',
    dificultad: 'básico',
    formato: 'multiple_choice',
    unidad: 'porcentaje',
    question: 'De los $800 que tenía Luis, gastó $120. ¿Qué porcentaje de su dinero gastó?',
    latex: '\\$120 \\text{ de } \\$800',
    options: [
      { key: 'A', text: '15%', isCorrect: true },
      { key: 'B', text: '7.5%', isCorrect: false },
      { key: 'C', text: '35%', isCorrect: false },
      { key: 'D', text: '5%', isCorrect: false }
    ],
    correctKey: 'A',
    correctDisplay: '15%',
    explanation: '\\dfrac{120}{800} \\times 100\\% = 0.15 \\times 100\\% = 15\\%'
  },
  // Ejercicio 20 ⌨️
  {
    id: 'porcentaje_020',
    tipo: 'cantidad_desconocida',
    dificultad: 'básico',
    formato: 'numeric_input',
    unidad: 'cantidad',
    inputType: 'text',
    question: 'Una fábrica produce 600 piezas y el 7% presenta fallas. ¿Cuántas piezas tienen fallas?',
    latex: '7\\% \\text{ de } 600 \\text{ piezas}',
    inputSuffix: ' piezas',
    correctKey: '42',
    correctDisplay: '42 piezas',
    acceptableAnswers: ['42', '42 piezas'],
    explanation: '600 \\times 0.07 = 42\\text{ piezas}'
  },
  // Ejercicio 21 🔘
  {
    id: 'porcentaje_021',
    tipo: 'entero_desconocido',
    dificultad: 'básico',
    formato: 'multiple_choice',
    unidad: 'cantidad',
    question: 'Una tienda vendió 54 camisetas, que representan el 18% de sus existencias. ¿Cuántas camisetas tenía?',
    latex: '18\\% \\text{ de las camisetas} = 54',
    options: [
      { key: 'A', text: '325', isCorrect: false },
      { key: 'B', text: '280', isCorrect: false },
      { key: 'C', text: '300', isCorrect: true },
      { key: 'D', text: '360', isCorrect: false }
    ],
    correctKey: 'C',
    correctDisplay: '300 camisetas',
    explanation: '\\text{Total} = \\dfrac{54}{0.18} = \\dfrac{5400}{18} = 300\\text{ camisetas}'
  },
  // Ejercicio 22 ⌨️
  {
    id: 'porcentaje_022',
    tipo: 'porcentaje_desconocido',
    dificultad: 'básico',
    formato: 'numeric_input',
    unidad: 'porcentaje',
    inputType: 'text',
    question: 'De 320 árboles plantados, 80 son pinos. ¿Qué porcentaje son pinos?',
    latex: '80 \\text{ pinos de } 320 \\text{ árboles}',
    inputSuffix: '%',
    correctKey: '25',
    correctDisplay: '25%',
    acceptableAnswers: ['25', '25%', '%25'],
    explanation: '\\dfrac{80}{320} \\times 100\\% = \\dfrac{1}{4} \\times 100\\% = 25\\%'
  },
  // Ejercicio 23 🔘
  {
    id: 'porcentaje_023',
    tipo: 'cantidad_desconocida',
    dificultad: 'básico',
    formato: 'multiple_choice',
    unidad: 'moneda',
    question: 'Un recibo de $750 incluye una propina del 10%. ¿Cuánto corresponde a la propina?',
    latex: '10\\% \\text{ de propina sobre } \\$750',
    options: [
      { key: 'A', text: '$45', isCorrect: false },
      { key: 'B', text: '$37.50', isCorrect: false },
      { key: 'C', text: '$70', isCorrect: false },
      { key: 'D', text: '$75', isCorrect: true }
    ],
    correctKey: 'D',
    correctDisplay: '$75',
    explanation: '750 \\times 0.10 = \\$75'
  },
  // Ejercicio 24 ⌨️
  {
    id: 'porcentaje_024',
    tipo: 'entero_desconocido',
    dificultad: 'básico',
    formato: 'numeric_input',
    unidad: 'moneda',
    inputType: 'text',
    question: 'Un depósito de $96 corresponde al 12% de una meta de ahorro. ¿Cuál es la meta total?',
    latex: '12\\% \\text{ de la meta} = \\$96',
    inputPrefix: '$',
    correctKey: '800',
    correctDisplay: '$800',
    acceptableAnswers: ['800', '$800', '800.0'],
    explanation: '\\text{Meta} = \\dfrac{96}{0.12} = \\dfrac{9600}{12} = \\$800'
  },
  // Ejercicio 25 🔘
  {
    id: 'porcentaje_025',
    tipo: 'porcentaje_desconocido',
    dificultad: 'básico',
    formato: 'multiple_choice',
    unidad: 'porcentaje',
    question: 'Una persona recorrió 42 km de una ruta de 60 km. ¿Qué porcentaje de la ruta recorrió?',
    latex: '42\\text{ km de } 60\\text{ km}',
    options: [
      { key: 'A', text: '100%', isCorrect: false },
      { key: 'B', text: '75%', isCorrect: false },
      { key: 'C', text: '35%', isCorrect: false },
      { key: 'D', text: '70%', isCorrect: true }
    ],
    correctKey: 'D',
    correctDisplay: '70%',
    explanation: '\\dfrac{42}{60} \\times 100\\% = \\dfrac{7}{10} \\times 100\\% = 70\\%'
  },
  // Ejercicio 26 ⌨️
  {
    id: 'porcentaje_026',
    tipo: 'cantidad_desconocida',
    dificultad: 'básico',
    formato: 'numeric_input',
    unidad: 'cantidad',
    inputType: 'text',
    question: 'En una tienda hay 480 artículos y el 5% está en oferta. ¿Cuántos artículos están en oferta?',
    latex: '5\\% \\text{ de } 480 \\text{ artículos}',
    inputSuffix: ' artículos',
    correctKey: '24',
    correctDisplay: '24 artículos',
    acceptableAnswers: ['24', '24 artículos'],
    explanation: '480 \\times 0.05 = 24\\text{ artículos}'
  },
  // Ejercicio 27 🔘
  {
    id: 'porcentaje_027',
    tipo: 'entero_desconocido',
    dificultad: 'intermedio',
    formato: 'multiple_choice',
    unidad: 'cantidad',
    question: 'Una estudiante respondió correctamente 36 preguntas, que son el 80% del examen. ¿Cuántas preguntas tenía el examen?',
    latex: '80\\% \\text{ del examen} = 36 \\text{ preguntas}',
    options: [
      { key: 'A', text: '45', isCorrect: true },
      { key: 'B', text: '67.5', isCorrect: false },
      { key: 'C', text: '36', isCorrect: false },
      { key: 'D', text: '65', isCorrect: false }
    ],
    correctKey: 'A',
    correctDisplay: '45 preguntas',
    explanation: '\\text{Examen} = \\dfrac{36}{0.80} = \\dfrac{360}{8} = 45\\text{ preguntas}'
  },
  // Ejercicio 28 ⌨️
  {
    id: 'porcentaje_028',
    tipo: 'porcentaje_desconocido',
    dificultad: 'intermedio',
    formato: 'numeric_input',
    unidad: 'porcentaje',
    inputType: 'text',
    question: 'De 250 boletos, se vendieron 175. ¿Qué porcentaje de boletos se vendió?',
    latex: '175 \\text{ boletos de } 250',
    inputSuffix: '%',
    correctKey: '70',
    correctDisplay: '70%',
    acceptableAnswers: ['70', '70%', '%70'],
    explanation: '\\dfrac{175}{250} \\times 100\\% = \\dfrac{7}{10} \\times 100\\% = 70\\%'
  },
  // Ejercicio 29 🔘
  {
    id: 'porcentaje_029',
    tipo: 'cantidad_desconocida',
    dificultad: 'intermedio',
    formato: 'multiple_choice',
    unidad: 'moneda',
    question: 'Un pantalón cuesta $680 y se aplica un descuento del 15%. ¿Cuánto dinero se descuenta?',
    latex: '15\\% \\text{ de descuento sobre } \\$680',
    options: [
      { key: 'A', text: '$77', isCorrect: false },
      { key: 'B', text: '$132', isCorrect: false },
      { key: 'C', text: '$102', isCorrect: true },
      { key: 'D', text: '$107', isCorrect: false }
    ],
    correctKey: 'C',
    correctDisplay: '$102',
    explanation: '680 \\times 0.15 = \\$102'
  },
  // Ejercicio 30 ⌨️
  {
    id: 'porcentaje_030',
    tipo: 'entero_desconocido',
    dificultad: 'intermedio',
    formato: 'numeric_input',
    unidad: 'moneda',
    inputType: 'text',
    question: 'Una cantidad de $56 representa el 7% de un total. ¿Cuál es el total?',
    latex: '7\\% \\text{ del total} = \\$56',
    inputPrefix: '$',
    correctKey: '800',
    correctDisplay: '$800',
    acceptableAnswers: ['800', '$800', '800.0'],
    explanation: '\\text{Total} = \\dfrac{56}{0.07} = \\dfrac{5600}{7} = \\$800'
  },
  // Ejercicio 31 🔘
  {
    id: 'porcentaje_031',
    tipo: 'porcentaje_desconocido',
    dificultad: 'intermedio',
    formato: 'multiple_choice',
    unidad: 'porcentaje',
    question: 'De 90 minutos de clase, se utilizaron 27 minutos en una actividad. ¿Qué porcentaje del tiempo se utilizó?',
    latex: '27\\text{ min de } 90\\text{ min}',
    options: [
      { key: 'A', text: '34.5%', isCorrect: false },
      { key: 'B', text: '40%', isCorrect: false },
      { key: 'C', text: '30%', isCorrect: true },
      { key: 'D', text: '33%', isCorrect: false }
    ],
    correctKey: 'C',
    correctDisplay: '30%',
    explanation: '\\dfrac{27}{90} \\times 100\\% = \\dfrac{3}{10} \\times 100\\% = 30\\%'
  },
  // Ejercicio 32 ⌨️
  {
    id: 'porcentaje_032',
    tipo: 'cantidad_desconocida',
    dificultad: 'intermedio',
    formato: 'numeric_input',
    unidad: 'cantidad',
    inputType: 'text',
    question: 'Un automóvil consume el 8% de un tanque de 50 litros. ¿Cuántos litros consumió?',
    latex: '8\\% \\text{ de } 50\\text{ litros}',
    inputSuffix: ' litros',
    correctKey: '4',
    correctDisplay: '4 litros',
    acceptableAnswers: ['4', '4 litros', '4.0'],
    explanation: '50 \\times 0.08 = 4\\text{ litros}'
  },
  // Ejercicio 33 🔘
  {
    id: 'porcentaje_033',
    tipo: 'entero_desconocido',
    dificultad: 'intermedio',
    formato: 'multiple_choice',
    unidad: 'moneda',
    question: 'Una donación de $125 equivale al 25% de la cantidad que se desea reunir. ¿Cuál es la meta?',
    latex: '25\\% \\text{ de la meta} = \\$125',
    options: [
      { key: 'A', text: '$500', isCorrect: true },
      { key: 'B', text: '$525', isCorrect: false },
      { key: 'C', text: '$450', isCorrect: false },
      { key: 'D', text: '$480', isCorrect: false }
    ],
    correctKey: 'A',
    correctDisplay: '$500',
    explanation: '\\text{Meta} = \\dfrac{125}{0.25} = 125 \\times 4 = \\$500'
  },
  // Ejercicio 34 ⌨️
  {
    id: 'porcentaje_034',
    tipo: 'porcentaje_desconocido',
    dificultad: 'intermedio',
    formato: 'numeric_input',
    unidad: 'porcentaje',
    inputType: 'text',
    question: 'En una caja hay 200 focos y 6 están fundidos. ¿Qué porcentaje está fundido?',
    latex: '6\\text{ focos de } 200',
    inputSuffix: '%',
    correctKey: '3',
    correctDisplay: '3%',
    acceptableAnswers: ['3', '3%', '%3'],
    explanation: '\\dfrac{6}{200} \\times 100\\% = 3\\%'
  },
  // Ejercicio 35 🔘
  {
    id: 'porcentaje_035',
    tipo: 'cantidad_desconocida',
    dificultad: 'intermedio',
    formato: 'multiple_choice',
    unidad: 'cantidad',
    question: 'Una tienda tiene 1,250 productos y el 4% son electrónicos. ¿Cuántos productos electrónicos tiene?',
    latex: '4\\% \\text{ de } 1,250 \\text{ productos}',
    options: [
      { key: 'A', text: '40', isCorrect: false },
      { key: 'B', text: '75', isCorrect: false },
      { key: 'C', text: '50', isCorrect: true },
      { key: 'D', text: '37.5', isCorrect: false }
    ],
    correctKey: 'C',
    correctDisplay: '50 productos',
    explanation: '1250 \\times 0.04 = 50\\text{ productos}'
  },
  // Ejercicio 36 ⌨️
  {
    id: 'porcentaje_036',
    tipo: 'entero_desconocido',
    dificultad: 'intermedio',
    formato: 'numeric_input',
    unidad: 'cantidad',
    inputType: 'text',
    question: 'Un equipo ganó 21 partidos, equivalentes al 70% de los partidos jugados. ¿Cuántos partidos jugó?',
    latex: '70\\% \\text{ de los partidos} = 21',
    inputSuffix: ' partidos',
    correctKey: '30',
    correctDisplay: '30 partidos',
    acceptableAnswers: ['30', '30 partidos'],
    explanation: '\\text{Partidos} = \\dfrac{21}{0.70} = \\dfrac{210}{7} = 30\\text{ partidos}'
  },
  // Ejercicio 37 🔘
  {
    id: 'porcentaje_037',
    tipo: 'porcentaje_desconocido',
    dificultad: 'intermedio',
    formato: 'multiple_choice',
    unidad: 'porcentaje',
    question: 'De 400 kg de cosecha, se echaron a perder 52 kg. ¿Qué porcentaje se perdió?',
    latex: '52\\text{ kg de } 400\\text{ kg}',
    options: [
      { key: 'A', text: '10.4%', isCorrect: false },
      { key: 'B', text: '13%', isCorrect: true },
      { key: 'C', text: '38%', isCorrect: false },
      { key: 'D', text: '8%', isCorrect: false }
    ],
    correctKey: 'B',
    correctDisplay: '13%',
    explanation: '\\dfrac{52}{400} \\times 100\\% = \\dfrac{13}{100} \\times 100\\% = 13\\%'
  },
  // Ejercicio 38 ⌨️
  {
    id: 'porcentaje_038',
    tipo: 'cantidad_desconocida',
    dificultad: 'intermedio',
    formato: 'numeric_input',
    unidad: 'moneda',
    inputType: 'text',
    question: 'Un celular de $2,400 aumenta su precio un 5%. ¿Cuánto aumenta?',
    latex: '5\\% \\text{ de aumento sobre } \\$2,400',
    inputPrefix: '$',
    correctKey: '120',
    correctDisplay: '$120',
    acceptableAnswers: ['120', '$120', '120.0'],
    explanation: '2400 \\times 0.05 = \\$120'
  },
  // Ejercicio 39 🔘
  {
    id: 'porcentaje_039',
    tipo: 'entero_desconocido',
    dificultad: 'intermedio',
    formato: 'multiple_choice',
    unidad: 'moneda',
    question: 'Una persona pagó $210, que equivale al 30% de una deuda. ¿De cuánto era la deuda?',
    latex: '30\\% \\text{ de la deuda} = \\$210',
    options: [
      { key: 'A', text: '$700', isCorrect: true },
      { key: 'B', text: '$675', isCorrect: false },
      { key: 'C', text: '$770', isCorrect: false },
      { key: 'D', text: '$805', isCorrect: false }
    ],
    correctKey: 'A',
    correctDisplay: '$700',
    explanation: '\\text{Deuda} = \\dfrac{210}{0.30} = \\dfrac{2100}{3} = \\$700'
  },
  // Ejercicio 40 ⌨️
  {
    id: 'porcentaje_040',
    tipo: 'porcentaje_desconocido',
    dificultad: 'intermedio',
    formato: 'numeric_input',
    unidad: 'porcentaje',
    inputType: 'text',
    question: 'De 75 preguntas, un alumno contestó correctamente 60. ¿Qué porcentaje contestó correctamente?',
    latex: '60 \\text{ correctas de } 75',
    inputSuffix: '%',
    correctKey: '80',
    correctDisplay: '80%',
    acceptableAnswers: ['80', '80%', '%80'],
    explanation: '\\dfrac{60}{75} \\times 100\\% = \\dfrac{4}{5} \\times 100\\% = 80\\%'
  },
  // Ejercicio 41 🔘
  {
    id: 'porcentaje_041',
    tipo: 'cantidad_desconocida',
    dificultad: 'intermedio',
    formato: 'multiple_choice',
    unidad: 'cantidad',
    question: 'En una comunidad de 1,800 habitantes, el 15% usa bicicleta para transportarse. ¿Cuántos habitantes son?',
    latex: '15\\% \\text{ de } 1,800 \\text{ habitantes}',
    options: [
      { key: 'A', text: '260', isCorrect: false },
      { key: 'B', text: '324', isCorrect: false },
      { key: 'C', text: '290', isCorrect: false },
      { key: 'D', text: '270', isCorrect: true }
    ],
    correctKey: 'D',
    correctDisplay: '270 habitantes',
    explanation: '1800 \\times 0.15 = 270\\text{ habitantes}'
  },
  // Ejercicio 42 ⌨️
  {
    id: 'porcentaje_042',
    tipo: 'entero_desconocido',
    dificultad: 'intermedio',
    formato: 'numeric_input',
    unidad: 'cantidad',
    inputType: 'text',
    question: 'Una caja tiene 18 piezas rojas, que representan el 12% de todas las piezas. ¿Cuántas piezas hay en total?',
    latex: '12\\% \\text{ del total} = 18 \\text{ piezas}',
    inputSuffix: ' piezas',
    correctKey: '150',
    correctDisplay: '150 piezas',
    acceptableAnswers: ['150', '150 piezas'],
    explanation: '\\text{Total} = \\dfrac{18}{0.12} = \\dfrac{1800}{12} = 150\\text{ piezas}'
  },
  // Ejercicio 43 🔘
  {
    id: 'porcentaje_043',
    tipo: 'porcentaje_desconocido',
    dificultad: 'intermedio',
    formato: 'multiple_choice',
    unidad: 'porcentaje',
    question: 'De 640 asistentes a un evento, 160 llegaron en autobús. ¿Qué porcentaje llegó en autobús?',
    latex: '160 \\text{ de } 640 \\text{ asistentes}',
    options: [
      { key: 'A', text: '45%', isCorrect: false },
      { key: 'B', text: '35%', isCorrect: false },
      { key: 'C', text: '12.5%', isCorrect: false },
      { key: 'D', text: '25%', isCorrect: true }
    ],
    correctKey: 'D',
    correctDisplay: '25%',
    explanation: '\\dfrac{160}{640} \\times 100\\% = \\dfrac{1}{4} \\times 100\\% = 25\\%'
  },
  // Ejercicio 44 ⌨️
  {
    id: 'porcentaje_044',
    tipo: 'cantidad_desconocida',
    dificultad: 'intermedio',
    formato: 'numeric_input',
    unidad: 'moneda',
    inputType: 'text',
    question: 'Un producto de $950 tiene un impuesto del 16%. ¿Cuánto corresponde al impuesto?',
    latex: '16\\% \\text{ de impuesto sobre } \\$950',
    inputPrefix: '$',
    correctKey: '152',
    correctDisplay: '$152',
    acceptableAnswers: ['152', '$152', '152.0'],
    explanation: '950 \\times 0.16 = \\$152'
  },
  // Ejercicio 45 🔘
  {
    id: 'porcentaje_045',
    tipo: 'entero_desconocido',
    dificultad: 'intermedio',
    formato: 'multiple_choice',
    unidad: 'moneda',
    question: 'Una familia destinó $360, que representan el 24% de su presupuesto mensual, a alimentos. ¿Cuál es su presupuesto?',
    latex: '24\\% \\text{ del presupuesto} = \\$360',
    options: [
      { key: 'A', text: '$1,505', isCorrect: false },
      { key: 'B', text: '$1,475', isCorrect: false },
      { key: 'C', text: '$1,510', isCorrect: false },
      { key: 'D', text: '$1,500', isCorrect: true }
    ],
    correctKey: 'D',
    correctDisplay: '$1,500',
    explanation: '\\text{Presupuesto} = \\dfrac{360}{0.24} = \\dfrac{36000}{24} = \\$1,500'
  },
  // Ejercicio 46 ⌨️
  {
    id: 'porcentaje_046',
    tipo: 'porcentaje_desconocido',
    dificultad: 'intermedio',
    formato: 'numeric_input',
    unidad: 'porcentaje',
    inputType: 'text',
    question: 'De 1,200 litros de agua almacenados, se utilizaron 180 litros. ¿Qué porcentaje se utilizó?',
    latex: '180\\text{ L de } 1,200\\text{ L}',
    inputSuffix: '%',
    correctKey: '15',
    correctDisplay: '15%',
    acceptableAnswers: ['15', '15%', '%15'],
    explanation: '\\dfrac{180}{1200} \\times 100\\% = 0.15 \\times 100\\% = 15\\%'
  },
  // Ejercicio 47 🔘
  {
    id: 'porcentaje_047',
    tipo: 'cantidad_desconocida',
    dificultad: 'intermedio',
    formato: 'multiple_choice',
    unidad: 'cantidad',
    question: 'Una escuela tiene 840 estudiantes y el 35% está en secundaria. ¿Cuántos estudiantes están en secundaria?',
    latex: '35\\% \\text{ de } 840 \\text{ estudiantes}',
    options: [
      { key: 'A', text: '264', isCorrect: false },
      { key: 'B', text: '294', isCorrect: true },
      { key: 'C', text: '249.9', isCorrect: false },
      { key: 'D', text: '323.4', isCorrect: false }
    ],
    correctKey: 'B',
    correctDisplay: '294 estudiantes',
    explanation: '840 \\times 0.35 = 294\\text{ estudiantes}'
  },
  // Ejercicio 48 ⌨️
  {
    id: 'porcentaje_048',
    tipo: 'entero_desconocido',
    dificultad: 'intermedio',
    formato: 'numeric_input',
    unidad: 'cantidad',
    inputType: 'text',
    question: 'Un depósito contiene 72 litros, equivalentes al 45% de su capacidad. ¿Cuál es su capacidad total?',
    latex: '45\\% \\text{ de la capacidad} = 72\\text{ L}',
    inputSuffix: ' litros',
    correctKey: '160',
    correctDisplay: '160 litros',
    acceptableAnswers: ['160', '160 litros'],
    explanation: '\\text{Capacidad} = \\dfrac{72}{0.45} = \\dfrac{7200}{45} = 160\\text{ litros}'
  },
  // Ejercicio 49 🔘
  {
    id: 'porcentaje_049',
    tipo: 'porcentaje_desconocido',
    dificultad: 'intermedio',
    formato: 'multiple_choice',
    unidad: 'porcentaje',
    question: 'De 500 piezas, 35 requieren reparación. ¿Qué porcentaje requiere reparación?',
    latex: '35 \\text{ piezas de } 500',
    options: [
      { key: 'A', text: '32%', isCorrect: false },
      { key: 'B', text: '5.6%', isCorrect: false },
      { key: 'C', text: '5.95%', isCorrect: false },
      { key: 'D', text: '7%', isCorrect: true }
    ],
    correctKey: 'D',
    correctDisplay: '7%',
    explanation: '\\dfrac{35}{500} \\times 100\\% = \\dfrac{7}{100} \\times 100\\% = 7\\%'
  },
  // Ejercicio 50 ⌨️
  {
    id: 'porcentaje_050',
    tipo: 'cantidad_desconocida',
    dificultad: 'intermedio',
    formato: 'numeric_input',
    unidad: 'cantidad',
    inputType: 'text',
    question: 'Un curso tiene 320 estudiantes y el 12.5% está inscrito en el turno vespertino. ¿Cuántos estudiantes están inscritos en ese turno?',
    latex: '12.5\\% \\text{ de } 320 \\text{ estudiantes}',
    inputSuffix: ' estudiantes',
    correctKey: '40',
    correctDisplay: '40 estudiantes',
    acceptableAnswers: ['40', '40 estudiantes'],
    explanation: '320 \\times 0.125 = \\dfrac{320}{8} = 40\\text{ estudiantes}'
  }
];

export const DESAFIO_PORCENTAJES_MIXTO: ArenaChallenge = {
  id: 'desafio-porcentajes-mixto',
  title: 'DESAFÍO: PORCENTAJES (OPCIÓN MÚLTIPLE Y TECLADO)',
  shortTitle: 'Porcentajes: Opción Múltiple y Teclado',
  description: 'Banco de 50 ejercicios sobre porcentaje, cantidad y total, combinando selección múltiple 🔘 y respuesta escrita con teclado ⌨️.',
  totalExercises: 50,
  passingScore: 3,
  color: '#8B5CF6',
  bgGradient: 'from-[#8B5CF6] to-[#7C3AED]',
  badgeBg: 'bg-[#1E1E24] text-white',
  questions: PORCENTAJES_MIXTO_QUESTIONS
};

