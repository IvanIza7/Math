import { ArenaChallenge, ArenaQuestion } from './arenaChallengesData';

export type PorcentajesDifficulty = 'basico' | 'intermedio' | 'avanzado';

export const PORCENTAJES_BASICO: ArenaQuestion[] = [
  {
    "id": "porc-bas-1",
    "question": "¿Cuánto es el 20 % de 450?",
    "options": [
      {
        "key": "A",
        "text": "80",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "90",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "100",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "110",
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "explanation": "20% de 450 = 0.20 × 450 = 90"
  },
  {
    "id": "porc-bas-2",
    "question": "Calcula el 15 % de 800.",
    "options": [
      {
        "key": "A",
        "text": "100",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "110",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "120",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "140",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "15% de 800 = 0.15 × 800 = 120"
  },
  {
    "id": "porc-bas-3",
    "question": "¿Cuánto es el 35 % de 600?",
    "options": [
      {
        "key": "A",
        "text": "180",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "200",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "210",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "240",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "35% de 600 = 0.35 × 600 = 210"
  },
  {
    "id": "porc-bas-4",
    "question": "Calcula el 8 % de 1,250.",
    "options": [
      {
        "key": "A",
        "text": "80",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "90",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "100",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "125",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "8% de 1,250 = 0.08 × 1,250 = 100"
  },
  {
    "id": "porc-bas-5",
    "question": "¿Cuánto es el 75 % de 320?",
    "options": [
      {
        "key": "A",
        "text": "200",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "220",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "240",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "260",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "75% de 320 = 0.75 × 320 = 240"
  },
  {
    "id": "porc-bas-6",
    "question": "Calcula el 12 % de 2,500.",
    "options": [
      {
        "key": "A",
        "text": "250",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "280",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "300",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "320",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "12% de 2,500 = 0.12 × 2,500 = 300"
  },
  {
    "id": "porc-bas-7",
    "question": "¿Cuánto es el 45 % de 720?",
    "options": [
      {
        "key": "A",
        "text": "304",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "314",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "324",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "334",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "45% de 720 = 0.45 × 720 = 324"
  },
  {
    "id": "porc-bas-8",
    "question": "Calcula el 5 % de 3,600.",
    "options": [
      {
        "key": "A",
        "text": "160",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "170",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "180",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "200",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "5% de 3,600 = 0.05 × 3,600 = 180"
  },
  {
    "id": "porc-bas-9",
    "question": "¿Cuánto es el 2.5 % de 800?",
    "options": [
      {
        "key": "A",
        "text": "10",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "20",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "25",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "40",
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "explanation": "2.5% de 800 = 0.025 × 800 = 20"
  },
  {
    "id": "porc-bas-10",
    "question": "Calcula el 125 % de 240.",
    "options": [
      {
        "key": "A",
        "text": "280",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "290",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "300",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "320",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "125% de 240 = 1.25 × 240 = 300"
  },
  {
    "id": "porc-bas-11",
    "question": "El 20 % de una cantidad es 90. ¿Cuál es la cantidad?",
    "options": [
      {
        "key": "A",
        "text": "360",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "400",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "450",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "500",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "Total = 90 / 0.20 = 450"
  },
  {
    "id": "porc-bas-12",
    "question": "El 15 % de un número es 60. ¿Cuál es el número?",
    "options": [
      {
        "key": "A",
        "text": "300",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "350",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "400",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "450",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "Total = 60 / 0.15 = 400"
  },
  {
    "id": "porc-bas-13",
    "question": "El 40 % de una cantidad equivale a 200. ¿Cuál es el total?",
    "options": [
      {
        "key": "A",
        "text": "400",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "450",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "500",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "555",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "Total = 200 / 0.40 = 500"
  },
  {
    "id": "porc-bas-14",
    "question": "El 75 % de un número es 300. ¿Cuál es el número?",
    "options": [
      {
        "key": "A",
        "text": "350",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "375",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "400",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "425",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "Total = 300 / 0.75 = 400"
  },
  {
    "id": "porc-bas-15",
    "question": "El 8 % de una cantidad es 48. ¿Cuál es la cantidad?",
    "options": [
      {
        "key": "A",
        "text": "500",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "550",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "600",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "650",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "Total = 48 / 0.08 = 600"
  },
  {
    "id": "porc-bas-16",
    "question": "El 25 % de un número equivale a 175. ¿Cuál es el número?",
    "options": [
      {
        "key": "A",
        "text": "600",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "650",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "700",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "750",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "Total = 175 / 0.25 = 700"
  },
  {
    "id": "porc-bas-17",
    "question": "El 60 % de una cantidad es 420. ¿Cuál es el total?",
    "options": [
      {
        "key": "A",
        "text": "600",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "650",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "700",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "750",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "Total = 420 / 0.60 = 700"
  },
  {
    "id": "porc-bas-18",
    "question": "El 12 % de un número es 96. ¿Cuál es el número?",
    "options": [
      {
        "key": "A",
        "text": "700",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "750",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "800",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "850",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "Total = 96 / 0.12 = 800"
  },
  {
    "id": "porc-bas-19",
    "question": "El 5 % de una cantidad equivale a 35. ¿Cuál es la cantidad?",
    "options": [
      {
        "key": "A",
        "text": "600",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "650",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "700",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "750",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "Total = 35 / 0.05 = 700"
  },
  {
    "id": "porc-bas-20",
    "question": "El 150 % de un número es 450. ¿Cuál es el número?",
    "options": [
      {
        "key": "A",
        "text": "250",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "275",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "300",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "350",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "Total = 450 / 1.50 = 300"
  },
  {
    "id": "porc-bas-21",
    "question": "¿Qué porcentaje representa 25 de 100?",
    "options": [
      {
        "key": "A",
        "text": "20 %",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "25 %",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "30 %",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "40 %",
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "explanation": "25 / 100 = 25%"
  },
  {
    "id": "porc-bas-22",
    "question": "¿Qué porcentaje representa 45 de 180?",
    "options": [
      {
        "key": "A",
        "text": "20 %",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "25 %",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "30 %",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "35 %",
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "explanation": "45 / 180 = 1/4 = 25%"
  },
  {
    "id": "porc-bas-23",
    "question": "¿Qué porcentaje representa 36 de 120?",
    "options": [
      {
        "key": "A",
        "text": "20 %",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "25 %",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "30 %",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "35 %",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "36 / 120 = 0.30 = 30%"
  },
  {
    "id": "porc-bas-24",
    "question": "De 200 alumnos, 50 aprobaron con calificación perfecta. ¿Qué porcentaje representan esos 50 alumnos del total?",
    "options": [
      {
        "key": "A",
        "text": "20 %",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "25 %",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "30 %",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "40 %",
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "explanation": "50 / 200 = 25%"
  },
  {
    "id": "porc-bas-25",
    "question": "Una persona tenía $800 y gastó $200. ¿Qué porcentaje de su dinero gastó?",
    "options": [
      {
        "key": "A",
        "text": "20 %",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "25 %",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "30 %",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "40 %",
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "explanation": "200 / 800 = 25%"
  },
  {
    "id": "porc-bas-26",
    "question": "De 500 productos, 40 son defectuosos. ¿Qué porcentaje de los productos es defectuoso?",
    "options": [
      {
        "key": "A",
        "text": "5 %",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "8 %",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "10 %",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "12 %",
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "explanation": "40 / 500 = 8%"
  },
  {
    "id": "porc-bas-27",
    "question": "Un estudiante respondió correctamente 42 de las 60 preguntas de un examen. ¿Qué porcentaje de aciertos obtuvo?",
    "options": [
      {
        "key": "A",
        "text": "60 %",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "65 %",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "70 %",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "75 %",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "42 / 60 = 7/10 = 70%"
  },
  {
    "id": "porc-bas-28",
    "question": "Una persona ahorró $300 de un ingreso de $1,500. ¿Qué porcentaje de su ingreso ahorró?",
    "options": [
      {
        "key": "A",
        "text": "15 %",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "20 %",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "25 %",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "30 %",
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "explanation": "300 / 1,500 = 20%"
  },
  {
    "id": "porc-bas-29",
    "question": "De 250 participantes, 175 terminaron una carrera. ¿Qué porcentaje de los participantes terminó?",
    "options": [
      {
        "key": "A",
        "text": "60 %",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "65 %",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "70 %",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "75 %",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "175 / 250 = 70%"
  },
  {
    "id": "porc-bas-30",
    "question": "Una tienda vendió 84 de los 120 artículos que tenía. ¿Qué porcentaje de los artículos vendió?",
    "options": [
      {
        "key": "A",
        "text": "60 %",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "65 %",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "70 %",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "80 %",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "84 / 120 = 7/10 = 70%"
  }
];

export const PORCENTAJES_INTERMEDIO: ArenaQuestion[] = [
  {
    "id": "porc-int-1",
    "question": "Una mochila cuesta $800 y aumenta su precio un 15 %. ¿Cuál es su nuevo precio?",
    "options": [
      {
        "key": "A",
        "text": "$880",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$900",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "$920",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "$940",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "$800 × 1.15 = $920"
  },
  {
    "id": "porc-int-2",
    "question": "El sueldo mensual de una persona es de $12,000 y recibe un aumento del 8 %. ¿Cuál será su nuevo sueldo?",
    "options": [
      {
        "key": "A",
        "text": "$12,480",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$12,960",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "$13,200",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "$13,080",
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "explanation": "$12,000 × 1.08 = $12,960"
  },
  {
    "id": "porc-int-3",
    "question": "Una computadora cuesta $15,000 y su precio aumenta un 12 %. ¿Cuánto costará después del aumento?",
    "options": [
      {
        "key": "A",
        "text": "$16,200",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$16,500",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "$16,800",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "$17,000",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "$15,000 × 1.12 = $16,800"
  },
  {
    "id": "porc-int-4",
    "question": "Una población de 2,500 habitantes aumenta un 20 %. ¿Cuántos habitantes tendrá después del aumento?",
    "options": [
      {
        "key": "A",
        "text": "2,800",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "3,000",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "3,200",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "3,500",
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "explanation": "2,500 × 1.20 = 3,000"
  },
  {
    "id": "porc-int-5",
    "question": "Un producto cuesta $640 y su precio aumenta un 25 %. ¿Cuál es su nuevo precio?",
    "options": [
      {
        "key": "A",
        "text": "$720",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$780",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "$800",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "$840",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "$640 × 1.25 = $800"
  },
  {
    "id": "porc-int-6",
    "question": "Una tienda vende una televisión por $7,500. Si el precio aumenta un 6 %, ¿cuánto costará ahora?",
    "options": [
      {
        "key": "A",
        "text": "$7,850",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$7,900",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "$7,950",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "$8,050",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "$7,500 × 1.06 = $7,950"
  },
  {
    "id": "porc-int-7",
    "question": "Una chamarra cuesta $1,200 y tiene un descuento del 20 %. ¿Cuánto se paga por ella?",
    "options": [
      {
        "key": "A",
        "text": "$900",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$940",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "$960",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "$1,000",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "$1,200 × 0.80 = $960"
  },
  {
    "id": "porc-int-8",
    "question": "Un teléfono cuesta $8,000 y tiene un descuento del 15 %. ¿Cuál es su precio final?",
    "options": [
      {
        "key": "A",
        "text": "$6,400",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$6,600",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "$6,800",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "$7,200",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "$8,000 × 0.85 = $6,800"
  },
  {
    "id": "porc-int-9",
    "question": "Unos zapatos cuestan $950 y tienen un descuento del 10 %. ¿Cuánto cuestan después del descuento?",
    "options": [
      {
        "key": "A",
        "text": "$845",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$850",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "$855",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "$860",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "$950 × 0.90 = $855"
  },
  {
    "id": "porc-int-10",
    "question": "Una bicicleta cuesta $4,500 y tiene un descuento del 30 %. ¿Cuál es su precio final?",
    "options": [
      {
        "key": "A",
        "text": "$3,000",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$3,050",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "$3,150",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "$3,500",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "$4,500 × 0.70 = $3,150"
  },
  {
    "id": "porc-int-11",
    "question": "Una consola cuesta $6,400 y se vende con un descuento del 12.5 %. ¿Cuánto debe pagar el comprador?",
    "options": [
      {
        "key": "A",
        "text": "$5,400",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$5,500",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "$5,600",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "$5,800",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "$6,400 × 0.875 = $5,600"
  },
  {
    "id": "porc-int-12",
    "question": "Una mesa cuesta $2,400 y tiene un descuento del 35 %. ¿Cuál es su precio final?",
    "options": [
      {
        "key": "A",
        "text": "$1,440",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$1,500",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "$1,560",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "$1,680",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "$2,400 × 0.65 = $1,560"
  },
  {
    "id": "porc-int-13",
    "question": "Después de recibir un descuento del 20 %, un artículo cuesta $640. ¿Cuál era su precio original?",
    "options": [
      {
        "key": "A",
        "text": "$768",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$780",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "$800",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "$820",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "Precio original = $640 / 0.80 = $800"
  },
  {
    "id": "porc-int-14",
    "question": "Una chamarra cuesta $1,020 después de aplicarle un descuento del 15 %. ¿Cuál era su precio antes del descuento?",
    "options": [
      {
        "key": "A",
        "text": "$1,150",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$1,200",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "$1,250",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "$1,300",
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "explanation": "Precio original = $1,020 / 0.85 = $1,200"
  },
  {
    "id": "porc-int-15",
    "question": "Después de aumentar su precio un 25 %, un producto cuesta $1,000. ¿Cuál era su precio original?",
    "options": [
      {
        "key": "A",
        "text": "$750",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$775",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "$800",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "$850",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "Precio original = $1,000 / 1.25 = $800"
  },
  {
    "id": "porc-int-16",
    "question": "Un artículo cuesta $1,380 después de un aumento del 15 %. ¿Cuál era su precio antes del aumento?",
    "options": [
      {
        "key": "A",
        "text": "$1,150",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$1,180",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "$1,200",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "$1,250",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "Precio original = $1,380 / 1.15 = $1,200"
  },
  {
    "id": "porc-int-17",
    "question": "Unos audífonos cuestan $1,530 después de aplicar un descuento del 10 %. ¿Cuál era su precio original?",
    "options": [
      {
        "key": "A",
        "text": "$1,600",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$1,650",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "$1,700",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "$1,750",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "Precio original = $1,530 / 0.90 = $1,700"
  },
  {
    "id": "porc-int-18",
    "question": "Una bicicleta cuesta $2,760 después de un descuento del 8 %. ¿Cuál era su precio original?",
    "options": [
      {
        "key": "A",
        "text": "$2,900",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$3,000",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "$3,100",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "$3,200",
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "explanation": "Precio original = $2,760 / 0.92 = $3,000"
  },
  {
    "id": "porc-int-19",
    "question": "Un producto cuesta $500 antes de impuestos. Si se le agrega un IVA del 16 %, ¿cuál es el precio final?",
    "options": [
      {
        "key": "A",
        "text": "$560",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$570",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "$580",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "$600",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "$500 × 1.16 = $580"
  },
  {
    "id": "porc-int-20",
    "question": "Una computadora cuesta $12,500 antes de impuestos. Si se agrega un IVA del 16 %, ¿cuánto se paga en total?",
    "options": [
      {
        "key": "A",
        "text": "$13,500",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$14,000",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "$14,500",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "$15,000",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "$12,500 × 1.16 = $14,500"
  },
  {
    "id": "porc-int-21",
    "question": "Un vendedor recibe una comisión del 5 % por una venta de $18,000. ¿Cuánto gana de comisión?",
    "options": [
      {
        "key": "A",
        "text": "$800",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$850",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "$900",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "$950",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "$18,000 × 0.05 = $900"
  },
  {
    "id": "porc-int-22",
    "question": "Una persona vende productos por un total de $24,000 y recibe una comisión del 7.5 %. ¿Cuánto recibe?",
    "options": [
      {
        "key": "A",
        "text": "$1,500",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$1,600",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "$1,800",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "$2,000",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "$24,000 × 0.075 = $1,800"
  },
  {
    "id": "porc-int-23",
    "question": "Un artículo cuesta $2,000 antes de impuestos. Si se agrega un IVA del 16 %, ¿cuánto corresponde únicamente al IVA?",
    "options": [
      {
        "key": "A",
        "text": "$280",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$300",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "$320",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "$360",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "IVA = $2,000 × 0.16 = $320"
  },
  {
    "id": "porc-int-24",
    "question": "Una persona obtiene una comisión del 4 % por vender un automóvil de $185,000. ¿Cuánto recibe de comisión?",
    "options": [
      {
        "key": "A",
        "text": "$6,400",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$7,000",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "$7,400",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "$8,400",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "Comisión = $185,000 × 0.04 = $7,400"
  },
  {
    "id": "porc-int-25",
    "question": "Una computadora cuesta $10,000. Primero aumenta su precio un 10 % y después recibe un descuento del 10 % sobre el nuevo precio. ¿Cuál es el precio final?",
    "options": [
      {
        "key": "A",
        "text": "$9,000",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$9,900",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "$10,000",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "$10,100",
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "explanation": "$10,000 × 1.10 = $11,000; $11,000 × 0.90 = $9,900"
  },
  {
    "id": "porc-int-26",
    "question": "Una tienda aplica un descuento del 20 % a un producto de $1,500 y después agrega un IVA del 16 % sobre el precio descontado. ¿Cuál es el total a pagar?",
    "options": [
      {
        "key": "A",
        "text": "$1,320",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$1,392",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "$1,400",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "$1,440",
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "explanation": "$1,500 × 0.80 = $1,200; $1,200 × 1.16 = $1,392"
  },
  {
    "id": "porc-int-27",
    "question": "El precio de una bicicleta de $4,000 aumenta un 15 % y luego aumenta otro 5 % sobre el precio actualizado. ¿Cuál es el precio final?",
    "options": [
      {
        "key": "A",
        "text": "$4,600",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$4,800",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "$4,830",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "$4,900",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "$4,000 × 1.15 = $4,600; $4,600 × 1.05 = $4,830"
  },
  {
    "id": "porc-int-28",
    "question": "Un producto de $2,000 tiene primero un descuento del 25 % y después otro descuento del 10 % sobre el precio ya rebajado. ¿Cuál es el precio final?",
    "options": [
      {
        "key": "A",
        "text": "$1,300",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$1,350",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "$1,400",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "$1,500",
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "explanation": "$2,000 × 0.75 = $1,500; $1,500 × 0.90 = $1,350"
  },
  {
    "id": "porc-int-29",
    "question": "Una tienda compra un producto por $800 y lo vende por $1,000. ¿Qué porcentaje del costo original representa la ganancia?",
    "options": [
      {
        "key": "A",
        "text": "20 %",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "25 %",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "30 %",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "40 %",
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "explanation": "Ganancia = $200. $200 / $800 = 25%"
  },
  {
    "id": "porc-int-30",
    "question": "Un artículo cuesta $1,600. Su precio aumenta un 20 % y posteriormente disminuye un 25 % sobre el precio aumentado. ¿Cuál es el precio final?",
    "options": [
      {
        "key": "A",
        "text": "$1,400",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$1,440",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "$1,500",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "$1,520",
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "explanation": "$1,600 × 1.20 = $1,920; $1,920 × 0.75 = $1,440"
  }
];

export const PORCENTAJES_AVANZADO: ArenaQuestion[] = [
  {
    "id": "porc-ava-1",
    "question": "Un producto cuesta $2,000. Su precio aumenta un 20 % y después disminuye un 10 % sobre el nuevo precio. ¿Cuál es el precio final?",
    "options": [
      {
        "key": "A",
        "text": "$2,100",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$2,160",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "$2,200",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "$2,400",
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "explanation": "$2,000 × 1.20 = $2,400; $2,400 × 0.90 = $2,160"
  },
  {
    "id": "porc-ava-2",
    "question": "Una computadora cuesta $10,000. Primero recibe un descuento del 15 % y después otro del 10 % sobre el precio rebajado. ¿Cuál es el precio final?",
    "options": [
      {
        "key": "A",
        "text": "$7,500",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$7,650",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "$7,750",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "$8,000",
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "explanation": "$10,000 × 0.85 = $8,500; $8,500 × 0.90 = $7,650"
  },
  {
    "id": "porc-ava-3",
    "question": "El precio de un artículo aumenta un 25 % y luego aumenta otro 20 %. Si inicialmente costaba $800, ¿cuál es su precio final?",
    "options": [
      {
        "key": "A",
        "text": "$1,000",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$1,100",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "$1,200",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "$1,250",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "$800 × 1.25 = $1,000; $1,000 × 1.20 = $1,200"
  },
  {
    "id": "porc-ava-4",
    "question": "Un producto de $1,500 recibe dos descuentos consecutivos: primero del 20 % y después del 15 %. ¿Cuánto cuesta al final?",
    "options": [
      {
        "key": "A",
        "text": "$1,020",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "$1,050",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "$1,080",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "$1,100",
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "explanation": "$1,500 × 0.80 = $1,200; $1,200 × 0.85 = $1,020"
  },
  {
    "id": "porc-ava-5",
    "question": "Un artículo aumenta su precio un 30 % y después disminuye un 20 %. Si su precio original era de $500, ¿cuál es el precio final?",
    "options": [
      {
        "key": "A",
        "text": "$500",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$520",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "$530",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "$550",
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "explanation": "$500 × 1.30 = $650; $650 × 0.80 = $520"
  },
  {
    "id": "porc-ava-6",
    "question": "Un producto cuesta $4,000. Su precio disminuye un 10 % y luego aumenta un 10 % sobre el precio reducido. ¿Cuál es su precio final?",
    "options": [
      {
        "key": "A",
        "text": "$3,600",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$3,900",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "$3,960",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "$4,000",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "$4,000 × 0.90 = $3,600; $3,600 × 1.10 = $3,960"
  },
  {
    "id": "porc-ava-7",
    "question": "Después de aumentar un 40 %, un producto cuesta $1,400. ¿Cuál era su precio original?",
    "options": [
      {
        "key": "A",
        "text": "$900",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$1,000",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "$1,100",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "$1,200",
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "explanation": "$1,400 / 1.40 = $1,000"
  },
  {
    "id": "porc-ava-8",
    "question": "Un artículo cuesta $1,275 después de aplicarle un descuento del 15 %. ¿Cuál era su precio original?",
    "options": [
      {
        "key": "A",
        "text": "$1,400",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$1,450",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "$1,500",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "$1,550",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "$1,275 / 0.85 = $1,500"
  },
  {
    "id": "porc-ava-9",
    "question": "Una cantidad aumenta un 25 % y llega a 750. ¿Cuál era la cantidad inicial?",
    "options": [
      {
        "key": "A",
        "text": "550",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "600",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "625",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "650",
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "explanation": "750 / 1.25 = 600"
  },
  {
    "id": "porc-ava-10",
    "question": "Un producto cuesta $2,160 después de aumentar su precio un 20 %. ¿Cuál era su precio antes del aumento?",
    "options": [
      {
        "key": "A",
        "text": "$1,700",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$1,800",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "$1,900",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "$2,000",
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "explanation": "$2,160 / 1.20 = $1,800"
  },
  {
    "id": "porc-ava-11",
    "question": "Después de dos descuentos consecutivos del 20 % y del 10 %, un producto cuesta $720. ¿Cuál era su precio original?",
    "options": [
      {
        "key": "A",
        "text": "$900",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$950",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "$1,000",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "$1,100",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "720 / (0.80 × 0.90) = 720 / 0.72 = $1,000"
  },
  {
    "id": "porc-ava-12",
    "question": "Un producto aumenta su precio un 10 % y después recibe un descuento del 10 %. Si el precio final es de $990, ¿cuál era su precio original?",
    "options": [
      {
        "key": "A",
        "text": "$990",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$1,000",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "$1,010",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "$1,100",
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "explanation": "990 / (1.10 × 0.90) = 990 / 0.99 = $1,000"
  },
  {
    "id": "porc-ava-13",
    "question": "El precio de un producto aumenta de $400 a $500. ¿Cuál es el porcentaje de aumento respecto al precio original?",
    "options": [
      {
        "key": "A",
        "text": "20 %",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "25 %",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "30 %",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "35 %",
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "explanation": "Aumento = $100. $100 / $400 = 25%"
  },
  {
    "id": "porc-ava-14",
    "question": "Una cantidad disminuye de 800 a 680. ¿Cuál es el porcentaje de disminución respecto al valor original?",
    "options": [
      {
        "key": "A",
        "text": "10 %",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "12 %",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "15 %",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "20 %",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "Disminución = 120. 120 / 800 = 15%"
  },
  {
    "id": "porc-ava-15",
    "question": "El sueldo de una persona pasa de $12,000 a $13,800. ¿Cuál fue el porcentaje de aumento?",
    "options": [
      {
        "key": "A",
        "text": "10 %",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "12 %",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "15 %",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "18 %",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "Aumento = $1,800. $1,800 / $12,000 = 15%"
  },
  {
    "id": "porc-ava-16",
    "question": "Las ventas de una tienda disminuyen de $50,000 a $42,500. ¿Cuál fue el porcentaje de disminución?",
    "options": [
      {
        "key": "A",
        "text": "10 %",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "12 %",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "15 %",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "17.5 %",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "Disminución = $7,500. $7,500 / $50,000 = 15%"
  },
  {
    "id": "porc-ava-17",
    "question": "Una población aumenta de 20,000 a 23,000 habitantes. ¿Qué porcentaje representa el aumento respecto a la población inicial?",
    "options": [
      {
        "key": "A",
        "text": "10 %",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "12 %",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "15 %",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "20 %",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "Aumento = 3,000. 3,000 / 20,000 = 15%"
  },
  {
    "id": "porc-ava-18",
    "question": "El precio de un producto pasa de $800 a $920. ¿Cuál es el porcentaje de aumento?",
    "options": [
      {
        "key": "A",
        "text": "12 %",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "15 %",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "18 %",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "20 %",
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "explanation": "Aumento = $120. $120 / $800 = 15%"
  },
  {
    "id": "porc-ava-19",
    "question": "En una escuela hay 800 estudiantes y el 35 % son mujeres. ¿Cuántas mujeres hay?",
    "options": [
      {
        "key": "A",
        "text": "260",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "280",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "300",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "320",
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "explanation": "800 × 0.35 = 280"
  },
  {
    "id": "porc-ava-20",
    "question": "En una empresa, el 40 % de los 500 empleados trabaja en ventas. Si el 30 % de quienes trabajan en ventas son supervisores, ¿cuántos supervisores hay en ventas?",
    "options": [
      {
        "key": "A",
        "text": "50",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "60",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "70",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "80",
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "explanation": "500 × 0.40 = 200 en ventas; 200 × 0.30 = 60 supervisores"
  },
  {
    "id": "porc-ava-21",
    "question": "Una tienda tiene 1,200 productos. El 25 % son electrónicos y el 40 % de los electrónicos son teléfonos. ¿Cuántos teléfonos hay?",
    "options": [
      {
        "key": "A",
        "text": "100",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "120",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "150",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "180",
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "explanation": "1,200 × 0.25 = 300; 300 × 0.40 = 120 teléfonos"
  },
  {
    "id": "porc-ava-22",
    "question": "En un grupo de 400 personas, el 60 % practica algún deporte. De quienes practican deporte, el 25 % juega fútbol. ¿Cuántas personas juegan fútbol?",
    "options": [
      {
        "key": "A",
        "text": "40",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "50",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "60",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "100",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "400 × 0.60 = 240; 240 × 0.25 = 60"
  },
  {
    "id": "porc-ava-23",
    "question": "Una fábrica produce 2,000 piezas al día. El 5 % resulta defectuoso y el 20 % de las piezas defectuosas no puede repararse. ¿Cuántas piezas no pueden repararse?",
    "options": [
      {
        "key": "A",
        "text": "10",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "20",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "50",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "100",
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "explanation": "2,000 × 0.05 = 100 defectuosas; 100 × 0.20 = 20 no reparables"
  },
  {
    "id": "porc-ava-24",
    "question": "Una biblioteca tiene 3,000 libros. El 40 % son novelas y el 15 % de las novelas son de ciencia ficción. ¿Cuántas novelas de ciencia ficción hay?",
    "options": [
      {
        "key": "A",
        "text": "120",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "150",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "180",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "200",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "3,000 × 0.40 = 1,200 novelas; 1,200 × 0.15 = 180"
  },
  {
    "id": "porc-ava-25",
    "question": "Un comerciante compra un artículo por $600 y lo vende por $750. ¿Qué porcentaje de ganancia obtiene respecto al costo de compra?",
    "options": [
      {
        "key": "A",
        "text": "20 %",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "25 %",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "30 %",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "35 %",
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "explanation": "Ganancia = $150. $150 / $600 = 25%"
  },
  {
    "id": "porc-ava-26",
    "question": "Un producto cuesta $1,000. Primero aumenta un 20 % y después recibe un descuento del 15 % sobre el precio aumentado. ¿Cuál es el precio final?",
    "options": [
      {
        "key": "A",
        "text": "$1,000",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$1,020",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "$1,050",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "$1,080",
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "explanation": "$1,000 × 1.20 = $1,200; $1,200 × 0.85 = $1,020"
  },
  {
    "id": "porc-ava-27",
    "question": "Un artículo cuesta $2,500 antes de impuestos. Primero se aplica un descuento del 20 % y después se agrega un IVA del 16 % sobre el precio descontado. ¿Cuánto se paga en total?",
    "options": [
      {
        "key": "A",
        "text": "$2,000",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$2,200",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "$2,320",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "$2,400",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "$2,500 × 0.80 = $2,000; $2,000 × 1.16 = $2,320"
  },
  {
    "id": "porc-ava-28",
    "question": "Una empresa aumenta el sueldo de un empleado un 10 % y al año siguiente lo aumenta otro 15 % sobre el nuevo sueldo. Si inicialmente ganaba $20,000 mensuales, ¿cuánto gana después de ambos aumentos?",
    "options": [
      {
        "key": "A",
        "text": "$24,000",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$24,500",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "$25,300",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "$26,000",
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "explanation": "$20,000 × 1.10 = $22,000; $22,000 × 1.15 = $25,300"
  },
  {
    "id": "porc-ava-29",
    "question": "Un producto cuesta $800. Su precio aumenta un 50 % y después disminuye un 40 % sobre el precio aumentado. ¿Cuál es el precio final?",
    "options": [
      {
        "key": "A",
        "text": "$720",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "$760",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "$800",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "$840",
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "explanation": "$800 × 1.50 = $1,200; $1,200 × 0.60 = $720"
  },
  {
    "id": "porc-ava-30",
    "question": "Una tienda reduce el precio de un artículo un 20 %. Después, para volver exactamente al precio original, ¿qué porcentaje debe aumentar el precio rebajado?",
    "options": [
      {
        "key": "A",
        "text": "20 %",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "25 %",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "30 %",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "40 %",
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "explanation": "Si costaba 100 pasa a 80. Para subir de 80 a 100 se requieren 20 más: 20 / 80 = 25%"
  }
];

export interface DifficultyLevelInfo {
  id: PorcentajesDifficulty;
  name: string;
  badge: string;
  badgeColor: string;
  icon: string;
  tagline: string;
  description: string;
  totalQuestions: number;
  questions: ArenaQuestion[];
}

export const PORCENTAJES_LEVELS_INFO: DifficultyLevelInfo[] = [
  {
    id: 'basico',
    name: 'Nivel 1: Básico',
    badge: 'Principiante',
    badgeColor: 'bg-[#22C55E] text-white',
    icon: '🌱',
    tagline: 'Cálculo directo y proporciones',
    description: 'Cálculo de porcentaje de una cantidad, hallar el total y determinar qué porcentaje representa una cifra.',
    totalQuestions: 30,
    questions: PORCENTAJES_BASICO,
  },
  {
    id: 'intermedio',
    name: 'Nivel 2: Intermedio',
    badge: 'Comercial',
    badgeColor: 'bg-[#F59E0B] text-white',
    icon: '⚡',
    tagline: 'Aumentos, descuentos, IVA y comisiones',
    description: 'Problemas del mundo real con descuentos, impuestos, comisiones bancarias y variaciones porcentuales.',
    totalQuestions: 30,
    questions: PORCENTAJES_INTERMEDIO,
  },
  {
    id: 'avanzado',
    name: 'Nivel 3: Avanzado',
    badge: 'Maestría',
    badgeColor: 'bg-[#EF4444] text-white',
    icon: '🔥',
    tagline: 'Porcentajes sucesivos y recuperación original',
    description: 'Porcentajes encadenados, recuperación del valor original antes de variaciones y problemas combinados de examen.',
    totalQuestions: 30,
    questions: PORCENTAJES_AVANZADO,
  }
];

export const DESAFIO_PORCENTAJES: ArenaChallenge = {
  id: 'desafio-porcentajes',
  title: 'DESAFÍO: CÁLCULO DE PORCENTAJES',
  shortTitle: 'Porcentajes: 3 Niveles',
  description: 'Banco de 90 ejercicios clasificados en Básico, Intermedio y Avanzado. ¡Elige tu nivel de maestría!',
  totalExercises: 90,
  passingScore: 3,
  color: '#EC4899',
  bgGradient: 'from-[#EC4899] to-[#DB2777]',
  badgeBg: 'bg-[#EC4899] text-white',
  hasDifficulties: true,
  questions: [...PORCENTAJES_BASICO, ...PORCENTAJES_INTERMEDIO, ...PORCENTAJES_AVANZADO]
};
