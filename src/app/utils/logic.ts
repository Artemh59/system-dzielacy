// Narzędzia do pracy z IEEE 754 (64-bitowe liczby zmiennoprzecinkowe)

/**
 * Konwertuje liczbę na 64-bitową reprezentację binarną
 * Np. 10.5 -> "0100000000100101000000000000000000000000000000000000000000000000"
 */
export const toBinary64 = (num: number): string => {
  // Tworzymy bufor 8 bajtów (64 bity)
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);

  // Zapisujemy liczbę jako 64-bitową liczbę zmiennoprzecinkową
  view.setFloat64(0, num, false);

  // Konwertujemy każdy bajt na binarną reprezentację
  let binary = "";
  for (let i = 0; i < 8; i++) {
    const byte = view.getUint8(i).toString(2).padStart(8, "0");
    binary += byte;
  }

  return binary;
};

/**
 * Rozdziela binarną reprezentację na 3 części:
 * - Znak (1 bit): 0 = dodatnia, 1 = ujemna
 * - Wykładnik (11 bitów): informacja o wielkości liczby
 * - Mantysa (52 bity): dokładna wartość liczby
 */
export const getBinaryParts = (binary: string) => {
  return {
    sign: binary[0], // Bit 0
    exponent: binary.slice(1, 12), // Bity 1-11
    mantissa: binary.slice(12), // Bity 12-63
    fullBinary: binary,
  };
};

/**
 * Pobiera komponenty IEEE 754 bezpośrednio z liczby
 */
export const getIEEE754Components = (num: number) => {
  const binary = toBinary64(num);
  return getBinaryParts(binary);
};

/**
 * Dzieli dwie liczby
 */
export const divideBinary = (dzielna: number, dzielnik: number): number => {
  if (dzielnik === 0) {
    throw new Error("Nie można dzielić przez zero");
  }
  return dzielna / dzielnik;
};

/**
 * Sprawdza czy tekst jest poprawną liczbą
 */
export const isValidNumber = (value: string): boolean => {
  const num = parseFloat(value);
  return !isNaN(num);
};
