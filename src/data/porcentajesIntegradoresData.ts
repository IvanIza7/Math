export interface EtapaOption {
  key: 'A' | 'B' | 'C' | 'D';
  text: string;
  isCorrect: boolean;
}

export interface EtapaConversionData {
  title: string;
  question: string;
  options: EtapaOption[];
  correctKey: string;
  explanation: string;
  latexExplanation?: string;
}

export interface StepProcedure {
  stepTitle: string;
  latex: string;
  explanation: string;
}

export interface EtapaPorcentajesData {
  title: string;
  question: string;
  options: EtapaOption[];
  correctKey: string;
  steps: StepProcedure[];
  explanation: string;
}

export interface EtapaGraficaData {
  title: string;
  question: string;
  options: EtapaOption[];
  correctKey: string;
  formula: string;
  descuentoPercent: number;
  descuentoAngle: number;
  descuentoAmount: number;
  pagoPercent: number;
  pagoAngle: number;
  pagoAmount: number;
  totalAmount: number;
  explanation: string;
}

export interface AuditData {
  conversion: string;
  precioOriginal: string;
  descuento: string;
  importeDescontado: string;
  precioFinal: string;
  anguloDescuento: string;
  anguloPago: string;
  comprobacionAngular: string;
}

export interface EjercicioIntegrador {
  id: number;
  title: string;
  badge: string;
  statement: string;
  mission: string;
  whatYouNeedToSolve: string[];
  importantData: { label: string; value: string }[];
  etapa1: EtapaConversionData;
  etapa2: EtapaPorcentajesData;
  etapa3: EtapaGraficaData;
  audit: AuditData;
}

export const EJERCICIOS_INTEGRADORES: EjercicioIntegrador[] = [
  {
    id: 1,
    title: 'Compra de tela',
    badge: '15% de descuento',
    statement: 'Una tienda vende tela a $80 por metro. Necesitas 250 centímetros de tela y te ofrecen un descuento del 15%.',
    mission: 'Convierte los centímetros a metros, calcula cuánto pagarás aplicando directamente el porcentaje sin descuento y representa el descuento y el pago en una gráfica circular.',
    whatYouNeedToSolve: [
      'Convertir los centímetros a metros.',
      'Calcular el precio final después de aplicar el descuento.',
      'Representar el descuento y el importe pagado mediante una gráfica de pastel.'
    ],
    importantData: [
      { label: 'Longitud deseada', value: '250 cm' },
      { label: 'Precio unitario', value: '$80 / metro' },
      { label: 'Descuento', value: '15%' }
    ],
    etapa1: {
      title: 'Etapa 1. Conversión de unidades',
      question: '¿Cuántos metros equivalen a 250 centímetros?',
      options: [
        { key: 'A', text: '0.25 m', isCorrect: false },
        { key: 'B', text: '2.5 m', isCorrect: true },
        { key: 'C', text: '25 m', isCorrect: false },
        { key: 'D', text: '2500 m', isCorrect: false }
      ],
      correctKey: 'B',
      explanation: 'Para convertir de centímetros a metros, se divide la cantidad entre 100, ya que 1 m = 100 cm: 250 cm ÷ 100 = 2.5 m.',
      latexExplanation: '250\\text{ cm} \\times \\frac{1\\text{ m}}{100\\text{ cm}} = 2.5\\text{ m}'
    },
    etapa2: {
      title: 'Etapa 2. Cálculo de porcentajes',
      question: 'La tela cuesta $80 por metro y necesitas comprar 2.5 metros. Si recibes un descuento del 15 %, ¿cuánto debes pagar?',
      options: [
        { key: 'A', text: '$140.00', isCorrect: false },
        { key: 'B', text: '$170.00', isCorrect: true },
        { key: 'C', text: '$180.00', isCorrect: false },
        { key: 'D', text: '$200.00', isCorrect: false }
      ],
      correctKey: 'B',
      steps: [
        {
          stepTitle: 'Paso 1. Calcular el precio original',
          latex: '2.5 \\times 80 = 200',
          explanation: 'El precio original de los 2.5 m es de $200.00.'
        },
        {
          stepTitle: 'Paso 2. Calcular el descuento',
          latex: '200 \\times \\frac{15}{100} = 30',
          explanation: 'El descuento del 15 % equivale a $30.00.'
        },
        {
          stepTitle: 'Paso 3. Calcular el precio final',
          latex: '200 - 30 = 170 \\quad \\text{ó} \\quad 200 \\times 0.85 = 170',
          explanation: 'El precio final a pagar es de $170.00 (el 85 % del total).'
        }
      ],
      explanation: 'El precio original es $200. Al descontar el 15% ($30), el cliente únicamente paga $170 (85%).'
    },
    etapa3: {
      title: 'Etapa 3. Representación gráfica',
      question: 'Si el precio original es de $200 y el descuento es de $30 (15 %), ¿qué ángulo debe ocupar el sector del descuento en la gráfica de pastel?',
      options: [
        { key: 'A', text: '30°', isCorrect: false },
        { key: 'B', text: '45°', isCorrect: false },
        { key: 'C', text: '54°', isCorrect: true },
        { key: 'D', text: '90°', isCorrect: false }
      ],
      correctKey: 'C',
      formula: '\\text{Ángulo} = \\text{Porcentaje} \\times 360^\\circ',
      descuentoPercent: 15,
      descuentoAngle: 54,
      descuentoAmount: 30,
      pagoPercent: 85,
      pagoAngle: 306,
      pagoAmount: 170,
      totalAmount: 200,
      explanation: 'El sector del descuento (15%) abarca: 15% × 360° = 54°. El sector pagado (85%) abarca: 85% × 360° = 306°. Ambos suman 54° + 306° = 360°.'
    },
    audit: {
      conversion: '250 cm = 2.5 m',
      precioOriginal: '$200.00',
      descuento: '15 %',
      importeDescontado: '$30.00',
      precioFinal: '$170.00',
      anguloDescuento: '54°',
      anguloPago: '306°',
      comprobacionAngular: '54° + 306° = 360°'
    }
  },
  {
    id: 2,
    title: 'Compra de gasolina',
    badge: '10% de descuento',
    statement: 'Una estación vende gasolina a $24 por litro. Compras 15 litros y obtienes un descuento del 10%.',
    mission: 'Convierte litros a mililitros, encuentra el precio final sin calcular primero el importe del descuento y determina los grados de ambos sectores.',
    whatYouNeedToSolve: [
      'Convertir los litros a mililitros (1 L = 1000 mL).',
      'Calcular directamente el 90 % del costo total para obtener el precio final.',
      'Calcular los grados angulares de ambos sectores (descuento y pago).'
    ],
    importantData: [
      { label: 'Volumen comprado', value: '15 litros' },
      { label: 'Precio unitario', value: '$24 / litro' },
      { label: 'Descuento', value: '10%' }
    ],
    etapa1: {
      title: 'Etapa 1. Conversión de unidades',
      question: '¿Cuántos mililitros equivalen a 15 litros de gasolina? (Recuerda que 1 L = 1000 mL)',
      options: [
        { key: 'A', text: '1,500 mL', isCorrect: false },
        { key: 'B', text: '15,000 mL', isCorrect: true },
        { key: 'C', text: '150,000 mL', isCorrect: false },
        { key: 'D', text: '150 mL', isCorrect: false }
      ],
      correctKey: 'B',
      explanation: 'Para pasar de litros a mililitros multiplicamos por 1000: 15 L × 1000 = 15,000 mL.',
      latexExplanation: '15\\text{ L} \\times \\frac{1000\\text{ mL}}{1\\text{ L}} = 15\\,000\\text{ mL}'
    },
    etapa2: {
      title: 'Etapa 2. Cálculo de porcentajes',
      question: 'Compras 15 litros a $24 por litro con un descuento del 10 %. Calculando directamente el 90 % a pagar, ¿cuál es el precio final?',
      options: [
        { key: 'A', text: '$310.00', isCorrect: false },
        { key: 'B', text: '$320.00', isCorrect: false },
        { key: 'C', text: '$324.00', isCorrect: true },
        { key: 'D', text: '$336.00', isCorrect: false }
      ],
      correctKey: 'C',
      steps: [
        {
          stepTitle: 'Paso 1. Calcular el precio original',
          latex: '15 \\times 24 = 360',
          explanation: 'El costo original por 15 litros es de $360.00.'
        },
        {
          stepTitle: 'Paso 2. Aplicar el porcentaje directo a pagar (90 %)',
          latex: '360 \\times 0.90 = 324',
          explanation: 'Al pagar el 90 % (100 % - 10 %), obtenemos directamente $324.00.'
        },
        {
          stepTitle: 'Paso 3. Verificación del descuento',
          latex: '360 - 324 = 36 \\quad (10\\% \\text{ de } 360 = 36)',
          explanation: 'El ahorro fue de $36.00 y el pago final es de $324.00.'
        }
      ],
      explanation: 'El precio original es $360.00. Multiplicando directamente por 0.90 (90%) se obtiene $324.00.'
    },
    etapa3: {
      title: 'Etapa 3. Representación gráfica',
      question: 'En la gráfica de pastel de esta compra, ¿qué medida angular corresponde al sector del descuento (10 %)?',
      options: [
        { key: 'A', text: '18°', isCorrect: false },
        { key: 'B', text: '36°', isCorrect: true },
        { key: 'C', text: '45°', isCorrect: false },
        { key: 'D', text: '72°', isCorrect: false }
      ],
      correctKey: 'B',
      formula: '\\text{Ángulo} = \\text{Porcentaje} \\times 360^\\circ',
      descuentoPercent: 10,
      descuentoAngle: 36,
      descuentoAmount: 36,
      pagoPercent: 90,
      pagoAngle: 324,
      pagoAmount: 324,
      totalAmount: 360,
      explanation: 'Sector descuento: 10% × 360° = 36°. Sector pagado: 90% × 360° = 324°. La suma es 36° + 324° = 360°.'
    },
    audit: {
      conversion: '15 L = 15 000 mL',
      precioOriginal: '$360.00',
      descuento: '10 %',
      importeDescontado: '$36.00',
      precioFinal: '$324.00',
      anguloDescuento: '36°',
      anguloPago: '324°',
      comprobacionAngular: '36° + 324° = 360°'
    }
  },
  {
    id: 3,
    title: 'Compra de arroz',
    badge: '20% de descuento',
    statement: 'Un supermercado vende arroz a $32 por kilogramo. Compras 2.5 kg y recibes un descuento del 20%.',
    mission: 'Convierte kilogramos a gramos. Calcula el 80% del precio original para obtener directamente cuánto pagarás.',
    whatYouNeedToSolve: [
      'Convertir 2.5 kilogramos a gramos.',
      'Calcular el precio original y el 80 % directo.',
      'Determinar el ángulo del descuento y verificar la suma total de 360°.'
    ],
    importantData: [
      { label: 'Peso comprado', value: '2.5 kg' },
      { label: 'Precio por kg', value: '$32 / kg' },
      { label: 'Descuento', value: '20%' }
    ],
    etapa1: {
      title: 'Etapa 1. Conversión de unidades',
      question: '¿Cuántos gramos equivalen a 2.5 kilogramos de arroz? (1 kg = 1000 g)',
      options: [
        { key: 'A', text: '250 g', isCorrect: false },
        { key: 'B', text: '2,500 g', isCorrect: true },
        { key: 'C', text: '25,000 g', isCorrect: false },
        { key: 'D', text: '25 g', isCorrect: false }
      ],
      correctKey: 'B',
      explanation: '1 kilogramo equivale a 1000 gramos: 2.5 × 1000 = 2500 g.',
      latexExplanation: '2.5\\text{ kg} \\times \\frac{1000\\text{ g}}{1\\text{ kg}} = 2500\\text{ g}'
    },
    etapa2: {
      title: 'Etapa 2. Cálculo de porcentajes',
      question: 'Si compras 2.5 kg a $32 el kilo y tienes 20 % de descuento, ¿cuánto pagarás en total (80 % del precio original)?',
      options: [
        { key: 'A', text: '$58.00', isCorrect: false },
        { key: 'B', text: '$60.00', isCorrect: false },
        { key: 'C', text: '$64.00', isCorrect: true },
        { key: 'D', text: '$68.00', isCorrect: false }
      ],
      correctKey: 'C',
      steps: [
        {
          stepTitle: 'Paso 1. Calcular el precio original',
          latex: '2.5 \\times 32 = 80',
          explanation: 'El precio original de los 2.5 kg es de $80.00.'
        },
        {
          stepTitle: 'Paso 2. Calcular el 80 % a pagar',
          latex: '80 \\times 0.80 = 64',
          explanation: 'El 80 % de $80.00 equivale a $64.00.'
        },
        {
          stepTitle: 'Paso 3. Importe descontado',
          latex: '80 - 64 = 16 \\quad (20\\% \\text{ de } 80 = 16)',
          explanation: 'El descuento fue de $16.00 y se pagan $64.00.'
        }
      ],
      explanation: 'Precio original = 2.5 × 32 = $80. Descuento del 20% = $16. Precio final = $64.00.'
    },
    etapa3: {
      title: 'Etapa 3. Representación gráfica',
      question: '¿Qué ángulo le corresponde al sector del descuento (20 %) en la gráfica de pastel?',
      options: [
        { key: 'A', text: '50°', isCorrect: false },
        { key: 'B', text: '60°', isCorrect: false },
        { key: 'C', text: '72°', isCorrect: true },
        { key: 'D', text: '80°', isCorrect: false }
      ],
      correctKey: 'C',
      formula: '\\text{Ángulo} = \\text{Porcentaje} \\times 360^\\circ',
      descuentoPercent: 20,
      descuentoAngle: 72,
      descuentoAmount: 16,
      pagoPercent: 80,
      pagoAngle: 288,
      pagoAmount: 64,
      totalAmount: 80,
      explanation: 'Ángulo descuento (20%): 0.20 × 360° = 72°. Ángulo pagado (80%): 0.80 × 360° = 288°. Verificación: 72° + 288° = 360°.'
    },
    audit: {
      conversion: '2.5 kg = 2500 g',
      precioOriginal: '$80.00',
      descuento: '20 %',
      importeDescontado: '$16.00',
      precioFinal: '$64.00',
      anguloDescuento: '72°',
      anguloPago: '288°',
      comprobacionAngular: '72° + 288° = 360°'
    }
  },
  {
    id: 4,
    title: 'Compra de bebida',
    badge: '25% de descuento',
    statement: 'Una tienda vende una bebida a $60 por litro. Compras 4 litros y recibes un descuento del 25%.',
    mission: 'Convierte litros a mililitros, calcula el 75% del precio original y representa la proporción entre descuento y pago.',
    whatYouNeedToSolve: [
      'Convertir 4 litros a mililitros.',
      'Calcular el 75 % del costo original para obtener el pago final.',
      'Representar el ángulo de la cuarta parte del círculo (25 %) y las tres cuartas partes (75 %).'
    ],
    importantData: [
      { label: 'Volumen adquirido', value: '4 litros' },
      { label: 'Precio unitario', value: '$60 / litro' },
      { label: 'Descuento', value: '25%' }
    ],
    etapa1: {
      title: 'Etapa 1. Conversión de unidades',
      question: '¿Cuántos mililitros equivalen a 4 litros de bebida? (1 L = 1000 mL)',
      options: [
        { key: 'A', text: '400 mL', isCorrect: false },
        { key: 'B', text: '4,000 mL', isCorrect: true },
        { key: 'C', text: '40,000 mL', isCorrect: false },
        { key: 'D', text: '2,500 mL', isCorrect: false }
      ],
      correctKey: 'B',
      explanation: 'Cada litro contiene 1000 mL, por tanto 4 L × 1000 = 4000 mL.',
      latexExplanation: '4\\text{ L} \\times \\frac{1000\\text{ mL}}{1\\text{ L}} = 4000\\text{ mL}'
    },
    etapa2: {
      title: 'Etapa 2. Cálculo de porcentajes',
      question: 'Compras 4 litros a $60 cada uno con 25 % de descuento. ¿Cuál es el precio final a pagar (75 % del precio original)?',
      options: [
        { key: 'A', text: '$160.00', isCorrect: false },
        { key: 'B', text: '$175.00', isCorrect: false },
        { key: 'C', text: '$180.00', isCorrect: true },
        { key: 'D', text: '$200.00', isCorrect: false }
      ],
      correctKey: 'C',
      steps: [
        {
          stepTitle: 'Paso 1. Calcular el precio original',
          latex: '4 \\times 60 = 240',
          explanation: 'El precio original de 4 litros es de $240.00.'
        },
        {
          stepTitle: 'Paso 2. Calcular el descuento del 25 % (1/4)',
          latex: '240 \\times 0.25 = 60',
          explanation: 'El descuento de 25 % es de $60.00.'
        },
        {
          stepTitle: 'Paso 3. Calcular el precio final (75 %)',
          latex: '240 - 60 = 180 \\quad \\text{ó} \\quad 240 \\times 0.75 = 180',
          explanation: 'El precio con descuento es de $180.00.'
        }
      ],
      explanation: 'Total original: $240. Descuento del 25%: $60. Total a pagar (75%): $180.00.'
    },
    etapa3: {
      title: 'Etapa 3. Representación gráfica',
      question: 'Con un descuento del 25 % y un importe pagado del 75 %, ¿cuál es el ángulo que representa el sector del descuento?',
      options: [
        { key: 'A', text: '45°', isCorrect: false },
        { key: 'B', text: '75°', isCorrect: false },
        { key: 'C', text: '90°', isCorrect: true },
        { key: 'D', text: '120°', isCorrect: false }
      ],
      correctKey: 'C',
      formula: '\\text{Ángulo} = \\text{Porcentaje} \\times 360^\\circ',
      descuentoPercent: 25,
      descuentoAngle: 90,
      descuentoAmount: 60,
      pagoPercent: 75,
      pagoAngle: 270,
      pagoAmount: 180,
      totalAmount: 240,
      explanation: 'Un 25 % de 360° es exactamente un ángulo recto: 0.25 × 360° = 90°. El resto (75 %) abarca 270°.'
    },
    audit: {
      conversion: '4 L = 4000 mL',
      precioOriginal: '$240.00',
      descuento: '25 %',
      importeDescontado: '$60.00',
      precioFinal: '$180.00',
      anguloDescuento: '90°',
      anguloPago: '270°',
      comprobacionAngular: '90° + 270° = 360°'
    }
  },
  {
    id: 5,
    title: 'Compra de cable eléctrico',
    badge: '15% de descuento',
    statement: 'Una ferretería vende cable a $18 por metro. Necesitas 3.6 metros y obtienes un descuento del 15%.',
    mission: 'Convierte metros a centímetros y calcula directamente el 85% del precio para encontrar el importe que pagarás.',
    whatYouNeedToSolve: [
      'Convertir 3.6 metros a centímetros (1 m = 100 cm).',
      'Calcular el precio final directo aplicando el 85 %.',
      'Determinar los grados del sector de descuento (15%) y del importe pagado (85%).'
    ],
    importantData: [
      { label: 'Longitud del cable', value: '3.6 metros' },
      { label: 'Precio por metro', value: '$18 / metro' },
      { label: 'Descuento', value: '15%' }
    ],
    etapa1: {
      title: 'Etapa 1. Conversión de unidades',
      question: '¿Cuántos centímetros equivalen a 3.6 metros de cable? (1 m = 100 cm)',
      options: [
        { key: 'A', text: '36 cm', isCorrect: false },
        { key: 'B', text: '360 cm', isCorrect: true },
        { key: 'C', text: '3,600 cm', isCorrect: false },
        { key: 'D', text: '0.36 cm', isCorrect: false }
      ],
      correctKey: 'B',
      explanation: 'Multiplicamos 3.6 metros por 100: 3.6 × 100 = 360 cm.',
      latexExplanation: '3.6\\text{ m} \\times \\frac{100\\text{ cm}}{1\\text{ m}} = 360\\text{ cm}'
    },
    etapa2: {
      title: 'Etapa 2. Cálculo de porcentajes',
      question: 'Por 3.6 m a $18/m, ¿cuál es el precio final tras aplicar directamente el 85 % (100% - 15%)?',
      options: [
        { key: 'A', text: '$52.40', isCorrect: false },
        { key: 'B', text: '$55.08', isCorrect: true },
        { key: 'C', text: '$58.12', isCorrect: false },
        { key: 'D', text: '$60.00', isCorrect: false }
      ],
      correctKey: 'B',
      steps: [
        {
          stepTitle: 'Paso 1. Calcular el precio original',
          latex: '3.6 \\times 18 = 64.80',
          explanation: 'El precio original de 3.6 m de cable es $64.80.'
        },
        {
          stepTitle: 'Paso 2. Calcular el descuento del 15 %',
          latex: '64.80 \\times 0.15 = 9.72',
          explanation: 'El descuento de 15 % es de $9.72.'
        },
        {
          stepTitle: 'Paso 3. Calcular el precio final directo (85 %)',
          latex: '64.80 \\times 0.85 = 55.08',
          explanation: 'El precio final con descuento es de $55.08.'
        }
      ],
      explanation: 'Precio original = $64.80. Descuento del 15% = $9.72. Precio a pagar = $55.08.'
    },
    etapa3: {
      title: 'Etapa 3. Representación gráfica',
      question: 'Si el descuento es del 15 %, ¿qué ángulo representa el descuento en la gráfica circular?',
      options: [
        { key: 'A', text: '36°', isCorrect: false },
        { key: 'B', text: '48°', isCorrect: false },
        { key: 'C', text: '54°', isCorrect: true },
        { key: 'D', text: '65°', isCorrect: false }
      ],
      correctKey: 'C',
      formula: '\\text{Ángulo} = \\text{Porcentaje} \\times 360^\\circ',
      descuentoPercent: 15,
      descuentoAngle: 54,
      descuentoAmount: 9.72,
      pagoPercent: 85,
      pagoAngle: 306,
      pagoAmount: 55.08,
      totalAmount: 64.80,
      explanation: 'Ángulo descuento: 15% × 360° = 54°. Ángulo pago: 85% × 360° = 306°. Total: 54° + 306° = 360°.'
    },
    audit: {
      conversion: '3.6 m = 360 cm',
      precioOriginal: '$64.80',
      descuento: '15 %',
      importeDescontado: '$9.72',
      precioFinal: '$55.08',
      anguloDescuento: '54°',
      anguloPago: '306°',
      comprobacionAngular: '54° + 306° = 360°'
    }
  },
  {
    id: 6,
    title: 'Compra de manzanas',
    badge: '10% de descuento',
    statement: 'Una frutería vende manzanas a $36 por kilogramo. Compras 4 cajas de 2.5 kg cada una y recibes un descuento del 10%.',
    mission: 'Calcula el peso total de las cajas, conviértelo a gramos, calcula el precio final y determina los sectores de la gráfica.',
    whatYouNeedToSolve: [
      'Calcular el peso total (4 × 2.5 kg = 10 kg) y convertirlo a gramos.',
      'Calcular el costo original y el precio con 10 % de descuento (90 % restante).',
      'Determinar los grados de los dos sectores de la gráfica circular.'
    ],
    importantData: [
      { label: 'Cantidad', value: '4 cajas de 2.5 kg c/u' },
      { label: 'Precio por kg', value: '$36 / kg' },
      { label: 'Descuento', value: '10%' }
    ],
    etapa1: {
      title: 'Etapa 1. Conversión de unidades',
      question: '4 cajas de 2.5 kg equivalen a 10 kg en total. ¿A cuántos gramos equivale este peso total? (1 kg = 1000 g)',
      options: [
        { key: 'A', text: '1,000 g', isCorrect: false },
        { key: 'B', text: '2,500 g', isCorrect: false },
        { key: 'C', text: '10,000 g', isCorrect: true },
        { key: 'D', text: '100,000 g', isCorrect: false }
      ],
      correctKey: 'C',
      explanation: '4 cajas × 2.5 kg = 10 kg. Al multiplicar por 1000 g/kg obtenemos 10,000 g.',
      latexExplanation: '4 \\times 2.5\\text{ kg} = 10\\text{ kg} \\rightarrow 10\\text{ kg} \\times 1000 = 10\\,000\\text{ g}'
    },
    etapa2: {
      title: 'Etapa 2. Cálculo de porcentajes',
      question: 'Por los 10 kg de manzana a $36/kg con un 10 % de descuento, ¿cuál es el precio final a pagar?',
      options: [
        { key: 'A', text: '$310.00', isCorrect: false },
        { key: 'B', text: '$324.00', isCorrect: true },
        { key: 'C', text: '$330.00', isCorrect: false },
        { key: 'D', text: '$340.00', isCorrect: false }
      ],
      correctKey: 'B',
      steps: [
        {
          stepTitle: 'Paso 1. Calcular el precio original',
          latex: '10 \\times 36 = 360',
          explanation: '10 kg × $36/kg = $360.00.'
        },
        {
          stepTitle: 'Paso 2. Calcular el descuento del 10 %',
          latex: '360 \\times 0.10 = 36',
          explanation: 'El descuento de 10 % corresponde a $36.00.'
        },
        {
          stepTitle: 'Paso 3. Calcular el precio final (90 %)',
          latex: '360 - 36 = 324 \\quad \\text{ó} \\quad 360 \\times 0.90 = 324',
          explanation: 'El total a pagar es $324.00.'
        }
      ],
      explanation: 'Precio total = $360.00. Menos el 10% ($36.00), el importe final pagado es de $324.00.'
    },
    etapa3: {
      title: 'Etapa 3. Representación gráfica',
      question: '¿Cuáles son las medidas angulares del descuento (10 %) y del importe pagado (90 %) en la gráfica de pastel?',
      options: [
        { key: 'A', text: '30° y 330°', isCorrect: false },
        { key: 'B', text: '36° y 324°', isCorrect: true },
        { key: 'C', text: '40° y 320°', isCorrect: false },
        { key: 'D', text: '45° y 315°', isCorrect: false }
      ],
      correctKey: 'B',
      formula: '\\text{Ángulo} = \\text{Porcentaje} \\times 360^\\circ',
      descuentoPercent: 10,
      descuentoAngle: 36,
      descuentoAmount: 36,
      pagoPercent: 90,
      pagoAngle: 324,
      pagoAmount: 324,
      totalAmount: 360,
      explanation: 'Descuento: 10% × 360° = 36°. Pago: 90% × 360° = 324°. La suma completa es 36° + 324° = 360°.'
    },
    audit: {
      conversion: '10 kg = 10 000 g',
      precioOriginal: '$360.00',
      descuento: '10 %',
      importeDescontado: '$36.00',
      precioFinal: '$324.00',
      anguloDescuento: '36°',
      anguloPago: '324°',
      comprobacionAngular: '36° + 324° = 360°'
    }
  },
  {
    id: 7,
    title: 'Compra de pintura',
    badge: '20% de descuento',
    statement: 'Una tienda vende pintura a $95 por litro. Compras 2 cubetas de 3.5 litros cada una y recibes un descuento del 20%.',
    mission: 'Calcula el volumen total en litros y mililitros. Después, encuentra el precio final y los grados de cada sector.',
    whatYouNeedToSolve: [
      'Calcular el volumen total (2 × 3.5 L = 7 L) y convertirlo a mililitros.',
      'Calcular el precio original y el 80 % del precio final.',
      'Determinar los grados del sector de descuento (20%) y de pago (80%).'
    ],
    importantData: [
      { label: 'Volumen adquirido', value: '2 cubetas de 3.5 L c/u' },
      { label: 'Precio unitario', value: '$95 / litro' },
      { label: 'Descuento', value: '20%' }
    ],
    etapa1: {
      title: 'Etapa 1. Conversión de unidades',
      question: '2 cubetas de 3.5 litros suman 7 litros en total. ¿Cuántos mililitros representan? (1 L = 1000 mL)',
      options: [
        { key: 'A', text: '700 mL', isCorrect: false },
        { key: 'B', text: '3,500 mL', isCorrect: false },
        { key: 'C', text: '7,000 mL', isCorrect: true },
        { key: 'D', text: '70,000 mL', isCorrect: false }
      ],
      correctKey: 'C',
      explanation: 'El volumen total es 2 × 3.5 = 7 litros. En mililitros: 7 × 1000 = 7000 mL.',
      latexExplanation: '2 \\times 3.5\\text{ L} = 7\\text{ L} \\rightarrow 7\\text{ L} \\times 1000 = 7000\\text{ mL}'
    },
    etapa2: {
      title: 'Etapa 2. Cálculo de porcentajes',
      question: 'Por los 7 litros a $95/L con 20 % de descuento, ¿cuánto pagarás en total (80 % del precio original)?',
      options: [
        { key: 'A', text: '$510.00', isCorrect: false },
        { key: 'B', text: '$525.00', isCorrect: false },
        { key: 'C', text: '$532.00', isCorrect: true },
        { key: 'D', text: '$540.00', isCorrect: false }
      ],
      correctKey: 'C',
      steps: [
        {
          stepTitle: 'Paso 1. Calcular el precio original',
          latex: '7 \\times 95 = 665',
          explanation: '7 litros a $95 por litro = $665.00.'
        },
        {
          stepTitle: 'Paso 2. Calcular el descuento del 20 %',
          latex: '665 \\times 0.20 = 133',
          explanation: 'El 20 % de descuento es $133.00.'
        },
        {
          stepTitle: 'Paso 3. Calcular el precio final (80 %)',
          latex: '665 - 133 = 532 \\quad \\text{ó} \\quad 665 \\times 0.80 = 532',
          explanation: 'El importe total a pagar es $532.00.'
        }
      ],
      explanation: 'Precio original = $665.00. Menos el descuento del 20% ($133.00), el pago final es de $532.00.'
    },
    etapa3: {
      title: 'Etapa 3. Representación gráfica',
      question: 'Para el descuento del 20 % y el importe pagado del 80 %, ¿cuál es el ángulo del sector de descuento?',
      options: [
        { key: 'A', text: '60°', isCorrect: false },
        { key: 'B', text: '70°', isCorrect: false },
        { key: 'C', text: '72°', isCorrect: true },
        { key: 'D', text: '90°', isCorrect: false }
      ],
      correctKey: 'C',
      formula: '\\text{Ángulo} = \\text{Porcentaje} \\times 360^\\circ',
      descuentoPercent: 20,
      descuentoAngle: 72,
      descuentoAmount: 133,
      pagoPercent: 80,
      pagoAngle: 288,
      pagoAmount: 532,
      totalAmount: 665,
      explanation: 'Descuento: 20% × 360° = 72°. Pago: 80% × 360° = 288°. Verificación: 72° + 288° = 360°.'
    },
    audit: {
      conversion: '7 L = 7000 mL',
      precioOriginal: '$665.00',
      descuento: '20 %',
      importeDescontado: '$133.00',
      precioFinal: '$532.00',
      anguloDescuento: '72°',
      anguloPago: '288°',
      comprobacionAngular: '72° + 288° = 360°'
    }
  },
  {
    id: 8,
    title: 'Tela para uniformes',
    badge: '30% de descuento',
    statement: 'Un taller compra 18 metros de tela a $45 por metro y recibe un descuento del 30%.',
    mission: 'Convierte metros a centímetros, calcula directamente el 70% del precio original y representa la distribución del precio.',
    whatYouNeedToSolve: [
      'Convertir 18 metros a centímetros.',
      'Calcular el precio original y aplicar directamente el 70 % restante.',
      'Determinar el ángulo del descuento (30 %) y el del importe pagado (70 %).'
    ],
    importantData: [
      { label: 'Longitud de tela', value: '18 metros' },
      { label: 'Precio por metro', value: '$45 / metro' },
      { label: 'Descuento', value: '30%' }
    ],
    etapa1: {
      title: 'Etapa 1. Conversión de unidades',
      question: '¿Cuántos centímetros equivalen a 18 metros de tela? (1 m = 100 cm)',
      options: [
        { key: 'A', text: '180 cm', isCorrect: false },
        { key: 'B', text: '1,800 cm', isCorrect: true },
        { key: 'C', text: '18,000 cm', isCorrect: false },
        { key: 'D', text: '18 cm', isCorrect: false }
      ],
      correctKey: 'B',
      explanation: 'Para pasar de metros a centímetros se multiplica por 100: 18 × 100 = 1800 cm.',
      latexExplanation: '18\\text{ m} \\times \\frac{100\\text{ cm}}{1\\text{ m}} = 1800\\text{ cm}'
    },
    etapa2: {
      title: 'Etapa 2. Cálculo de porcentajes',
      question: '18 metros a $45/m tienen un precio original de $810. Si recibes un 30 % de descuento, ¿cuál es el importe a pagar (70 %)?',
      options: [
        { key: 'A', text: '$540.00', isCorrect: false },
        { key: 'B', text: '$567.00', isCorrect: true },
        { key: 'C', text: '$580.00', isCorrect: false },
        { key: 'D', text: '$600.00', isCorrect: false }
      ],
      correctKey: 'B',
      steps: [
        {
          stepTitle: 'Paso 1. Calcular el precio original',
          latex: '18 \\times 45 = 810',
          explanation: '18 metros a $45 c/u = $810.00.'
        },
        {
          stepTitle: 'Paso 2. Calcular el descuento del 30 %',
          latex: '810 \\times 0.30 = 243',
          explanation: 'El descuento del 30 % es de $243.00.'
        },
        {
          stepTitle: 'Paso 3. Calcular el precio final (70 %)',
          latex: '810 - 243 = 567 \\quad \\text{ó} \\quad 810 \\times 0.70 = 567',
          explanation: 'El precio final con descuento es de $567.00.'
        }
      ],
      explanation: 'Precio original = $810.00. Menos el descuento de $243.00, el importe final es de $567.00.'
    },
    etapa3: {
      title: 'Etapa 3. Representación gráfica',
      question: '¿Qué ángulo le corresponde al sector de descuento del 30 % en la gráfica circular?',
      options: [
        { key: 'A', text: '90°', isCorrect: false },
        { key: 'B', text: '100°', isCorrect: false },
        { key: 'C', text: '108°', isCorrect: true },
        { key: 'D', text: '120°', isCorrect: false }
      ],
      correctKey: 'C',
      formula: '\\text{Ángulo} = \\text{Porcentaje} \\times 360^\\circ',
      descuentoPercent: 30,
      descuentoAngle: 108,
      descuentoAmount: 243,
      pagoPercent: 70,
      pagoAngle: 252,
      pagoAmount: 567,
      totalAmount: 810,
      explanation: 'Descuento: 30% × 360° = 108°. Pago: 70% × 360° = 252°. Suma angular: 108° + 252° = 360°.'
    },
    audit: {
      conversion: '18 m = 1800 cm',
      precioOriginal: '$810.00',
      descuento: '30 %',
      importeDescontado: '$243.00',
      precioFinal: '$567.00',
      anguloDescuento: '108°',
      anguloPago: '252°',
      comprobacionAngular: '108° + 252° = 360°'
    }
  },
  {
    id: 9,
    title: 'Consumo de agua',
    badge: '5% de descuento',
    statement: 'Una familia consume 1.8 m³ de agua. Considera que 1 m³ equivale a 1000 litros. El precio es de $12 por m³ y se ofrece un descuento del 5%.',
    mission: 'Convierte metros cúbicos a litros. Calcula el precio total y el 95% que se pagará, y determina el ángulo del descuento.',
    whatYouNeedToSolve: [
      'Convertir 1.8 m³ a litros (1 m³ = 1000 L).',
      'Calcular el precio total original y el 95 % a pagar tras el 5 % de descuento.',
      'Calcular la apertura angular del sector de descuento (5%).'
    ],
    importantData: [
      { label: 'Volumen consumido', value: '1.8 m³' },
      { label: 'Precio por m³', value: '$12 / m³' },
      { label: 'Descuento', value: '5%' }
    ],
    etapa1: {
      title: 'Etapa 1. Conversión de unidades',
      question: '¿Cuántos litros de agua equivalen a 1.8 metros cúbicos (m³)? (1 m³ = 1000 L)',
      options: [
        { key: 'A', text: '180 L', isCorrect: false },
        { key: 'B', text: '1,800 L', isCorrect: true },
        { key: 'C', text: '18,000 L', isCorrect: false },
        { key: 'D', text: '18 L', isCorrect: false }
      ],
      correctKey: 'B',
      explanation: '1 metro cúbico equivale a 1000 litros: 1.8 × 1000 = 1800 L.',
      latexExplanation: '1.8\\text{ m}^3 \\times \\frac{1000\\text{ L}}{1\\text{ m}^3} = 1800\\text{ L}'
    },
    etapa2: {
      title: 'Etapa 2. Cálculo de porcentajes',
      question: 'Con 1.8 m³ a $12/m³, el precio original es $21.60. Con 5 % de descuento, ¿cuánto pagará la familia (95 %)?',
      options: [
        { key: 'A', text: '$19.80', isCorrect: false },
        { key: 'B', text: '$20.10', isCorrect: false },
        { key: 'C', text: '$20.52', isCorrect: true },
        { key: 'D', text: '$21.00', isCorrect: false }
      ],
      correctKey: 'C',
      steps: [
        {
          stepTitle: 'Paso 1. Calcular el precio original',
          latex: '1.8 \\times 12 = 21.60',
          explanation: '1.8 m³ a $12 c/u = $21.60.'
        },
        {
          stepTitle: 'Paso 2. Calcular el descuento del 5 %',
          latex: '21.60 \\times 0.05 = 1.08',
          explanation: 'El descuento del 5 % es de $1.08.'
        },
        {
          stepTitle: 'Paso 3. Calcular el precio final (95 %)',
          latex: '21.60 - 1.08 = 20.52 \\quad \\text{ó} \\quad 21.60 \\times 0.95 = 20.52',
          explanation: 'El pago final con descuento es de $20.52.'
        }
      ],
      explanation: 'Total original: $21.60. Menos el descuento de $1.08 (5%), el pago final resulta en $20.52.'
    },
    etapa3: {
      title: 'Etapa 3. Representación gráfica',
      question: '¿Cuál es la apertura angular que ocupa el sector del descuento (5 %) en la gráfica de pastel?',
      options: [
        { key: 'A', text: '12°', isCorrect: false },
        { key: 'B', text: '15°', isCorrect: false },
        { key: 'C', text: '18°', isCorrect: true },
        { key: 'D', text: '24°', isCorrect: false }
      ],
      correctKey: 'C',
      formula: '\\text{Ángulo} = \\text{Porcentaje} \\times 360^\\circ',
      descuentoPercent: 5,
      descuentoAngle: 18,
      descuentoAmount: 1.08,
      pagoPercent: 95,
      pagoAngle: 342,
      pagoAmount: 20.52,
      totalAmount: 21.60,
      explanation: 'Descuento: 5% × 360° = 18°. Importe pagado: 95% × 360° = 342°. Comprobación: 18° + 342° = 360°.'
    },
    audit: {
      conversion: '1.8 m³ = 1800 L',
      precioOriginal: '$21.60',
      descuento: '5 %',
      importeDescontado: '$1.08',
      precioFinal: '$20.52',
      anguloDescuento: '18°',
      anguloPago: '342°',
      comprobacionAngular: '18° + 342° = 360°'
    }
  },
  {
    id: 10,
    title: 'Compra de cemento',
    badge: '12.5% de descuento',
    statement: 'Una constructora compra 1.5 toneladas métricas de cemento a $2400 por tonelada y recibe un descuento del 12.5%.',
    mission: 'Convierte toneladas a kilogramos, calcula directamente el 87.5% del precio original y representa el descuento y el pago.',
    whatYouNeedToSolve: [
      'Convertir 1.5 toneladas a kilogramos (1 t = 1000 kg).',
      'Calcular el precio original y el 87.5 % correspondiente al pago final.',
      'Representar el ángulo del descuento (12.5 %) y del pago (87.5 %) en la gráfica.'
    ],
    importantData: [
      { label: 'Peso del cemento', value: '1.5 toneladas' },
      { label: 'Precio por tonelada', value: '$2,400 / tonelada' },
      { label: 'Descuento', value: '12.5%' }
    ],
    etapa1: {
      title: 'Etapa 1. Conversión de unidades',
      question: '¿Cuántos kilogramos equivalen a 1.5 toneladas métricas de cemento? (1 t = 1000 kg)',
      options: [
        { key: 'A', text: '150 kg', isCorrect: false },
        { key: 'B', text: '1,500 kg', isCorrect: true },
        { key: 'C', text: '15,000 kg', isCorrect: false },
        { key: 'D', text: '15 kg', isCorrect: false }
      ],
      correctKey: 'B',
      explanation: 'Una tonelada métrica equivale a 1000 kilogramos: 1.5 × 1000 = 1500 kg.',
      latexExplanation: '1.5\\text{ t} \\times \\frac{1000\\text{ kg}}{1\\text{ t}} = 1500\\text{ kg}'
    },
    etapa2: {
      title: 'Etapa 2. Cálculo de porcentajes',
      question: 'Comprando 1.5 toneladas a $2,400/t con un descuento del 12.5 %, ¿cuál es el precio final a pagar (87.5 % del original)?',
      options: [
        { key: 'A', text: '$3,000.00', isCorrect: false },
        { key: 'B', text: '$3,150.00', isCorrect: true },
        { key: 'C', text: '$3,250.00', isCorrect: false },
        { key: 'D', text: '$3,300.00', isCorrect: false }
      ],
      correctKey: 'B',
      steps: [
        {
          stepTitle: 'Paso 1. Calcular el precio original',
          latex: '1.5 \\times 2400 = 3600',
          explanation: '1.5 toneladas × $2,400/t = $3,600.00.'
        },
        {
          stepTitle: 'Paso 2. Calcular el descuento del 12.5 %',
          latex: '3600 \\times 0.125 = 450',
          explanation: 'El 12.5 % de descuento equivale a $450.00.'
        },
        {
          stepTitle: 'Paso 3. Calcular el precio final (87.5 %)',
          latex: '3600 - 450 = 3150 \\quad \\text{ó} \\quad 3600 \\times 0.875 = 3150',
          explanation: 'El precio final a pagar es de $3,150.00.'
        }
      ],
      explanation: 'Precio original: $3,600.00. Descuento del 12.5% = $450.00. Total final a pagar = $3,150.00.'
    },
    etapa3: {
      title: 'Etapa 3. Representación gráfica',
      question: 'En la gráfica circular, ¿cuántos grados corresponden al descuento (12.5 %) y al importe pagado (87.5 %)?',
      options: [
        { key: 'A', text: '30° y 330°', isCorrect: false },
        { key: 'B', text: '40° y 320°', isCorrect: false },
        { key: 'C', text: '45° y 315°', isCorrect: true },
        { key: 'D', text: '50° y 310°', isCorrect: false }
      ],
      correctKey: 'C',
      formula: '\\text{Ángulo} = \\text{Porcentaje} \\times 360^\\circ',
      descuentoPercent: 12.5,
      descuentoAngle: 45,
      descuentoAmount: 450,
      pagoPercent: 87.5,
      pagoAngle: 315,
      pagoAmount: 3150,
      totalAmount: 3600,
      explanation: 'Descuento: 12.5% × 360° = 45°. Pago: 87.5% × 360° = 315°. Comprobación: 45° + 315° = 360°.'
    },
    audit: {
      conversion: '1.5 t = 1500 kg',
      precioOriginal: '$3,600.00',
      descuento: '12,5 %',
      importeDescontado: '$450.00',
      precioFinal: '$3,150.00',
      anguloDescuento: '45°',
      anguloPago: '315°',
      comprobacionAngular: '45° + 315° = 360°'
    }
  }
];
