// Utility to convert numbers to Spanish words for large quantities

const UNIDADES = ['', 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
const DECENAS_10_19 = [
  'diez', 'once', 'doce', 'trece', 'catorce', 'quince',
  'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'
];
const DECENAS = [
  '', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta',
  'sesenta', 'setenta', 'ochenta', 'noventa'
];
const VEINTIS = [
  'veinte', 'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro',
  'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve'
];
const CENTENAS = [
  '', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos',
  'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'
];

function convertGroup3Digits(num: number): string {
  if (num === 0) return '';
  if (num === 100) return 'cien';

  const c = Math.floor(num / 100);
  const d = Math.floor((num % 100) / 10);
  const u = num % 10;

  const parts: string[] = [];

  if (c > 0) {
    parts.push(CENTENAS[c]);
  }

  const du = num % 100;
  if (du >= 10 && du <= 19) {
    parts.push(DECENAS_10_19[du - 10]);
  } else if (du >= 20 && du <= 29) {
    parts.push(VEINTIS[du - 20]);
  } else {
    if (d > 0) {
      parts.push(DECENAS[d]);
    }
    if (u > 0) {
      if (d > 2) {
        parts.push('y');
      }
      parts.push(UNIDADES[u]);
    }
  }

  return parts.join(' ');
}

export function numberToSpanishWords(n: number): string {
  if (n === 0) return 'cero';
  if (n < 0) return 'menos ' + numberToSpanishWords(Math.abs(n));

  const num = Math.floor(n);

  // Group by billions, millions, thousands, units
  const billones = Math.floor(num / 1_000_000_000_000);
  const millones = Math.floor((num % 1_000_000_000_000) / 1_000_000);
  const miles = Math.floor((num % 1_000_000) / 1_000);
  const unidades = num % 1_000;

  const result: string[] = [];

  if (billones > 0) {
    if (billones === 1) {
      result.push('un billón');
    } else {
      result.push(convertGroup3Digits(billones) + ' billones');
    }
  }

  if (millones > 0) {
    if (millones === 1) {
      result.push('un millón');
    } else {
      result.push(convertGroup3Digits(millones) + ' millones');
    }
  }

  if (miles > 0) {
    if (miles === 1) {
      result.push('mil');
    } else {
      result.push(convertGroup3Digits(miles) + ' mil');
    }
  }

  if (unidades > 0) {
    result.push(convertGroup3Digits(unidades));
  }

  return result.join(' ').replace(/\s+/g, ' ').trim();
}
