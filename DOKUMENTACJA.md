# 📚 Dokumentacja - Symulator Dzielenia Binarnego 64-bitowego

## Spis treści

1. [Wprowadzenie](#wprowadzenie)
2. [Format IEEE 754 Double Precision](#format-ieee-754-double-precision)
3. [Struktura 64-bitowa](#struktura-64-bitowa)
4. [Formuły matematyczne](#formuły-matematyczne)
5. [Przykłady konwersji](#przykłady-konwersji)
6. [Dzielenie liczb zmiennoprzecinkowych](#dzielenie-liczb-zmiennoprzecinkowych)
7. [Implementacja w kodzie](#implementacja-w-kodzie)

---

## Wprowadzenie

Standard **IEEE 754** to międzynarodowy standard reprezentacji liczb zmiennoprzecinkowych w systemach komputerowych. Format **Double Precision (64-bit)** pozwala na przechowywanie liczb z bardzo dużym zakresem i precyzją.

### Po co nam ten format?

Komputery rozumieją tylko **0** i **1**, ale my chcemy operować na liczbach jak:

- 10.5
- -273.15
- 3.14159
- 0.000001

Format IEEE 754 pozwala przekształcić takie liczby na sekwencję 64 bitów, które komputer może przechować w pamięci.

---

## Format IEEE 754 Double Precision

### Struktura 64-bitowa

Każda liczba w formacie IEEE 754 Double Precision składa się z **64 bitów** podzielonych na 3 części:

```
┌─────┬───────────────┬────────────────────────────────────────────────────┐
│  S  │   Exponent    │                    Mantissa                        │
│     │   (Wykładnik) │                    (Mantysa)                       │
├─────┼───────────────┼────────────────────────────────────────────────────┤
│ 1   │      11       │                       52                           │
│ bit │     bitów     │                      bitów                         │
└─────┴───────────────┴────────────────────────────────────────────────────┘
  0      1    ...   11   12   13   ...   ...   ...   ...   ...   ...    63
```

### 1. **Bit znaku (S)** - 1 bit

- **S = 0** → liczba **dodatnia** (+)
- **S = 1** → liczba **ujemna** (−)

### 2. **Wykładnik (E)** - 11 bitów

- Przechowuje informację o **wielkości** liczby (rząd wielkości)
- Zakres: 0 do 2047 (2¹¹ − 1)
- Używa **przesunięcia** (bias) = **1023**
- Rzeczywisty wykładnik = E − 1023

### 3. **Mantysa (M)** - 52 bity

- Przechowuje **precyzyjną wartość** liczby
- Ma domyślną wiodącą **1** (nie zapisaną w bitach)
- Reprezentuje ułamek w zakresie [1.0, 2.0)

---

## Formuły matematyczne

### Główna formuła konwersji

Wartość liczby w formacie IEEE 754 oblicza się według wzoru:

```
Wartość = (−1)^S × 2^(E−1023) × (1 + M)
```

Gdzie:

- **S** = bit znaku (0 lub 1)
- **E** = wykładnik zapisany w bitach (0-2047)
- **M** = mantysa jako ułamek binarny

### Rozbicie mantysy

Mantysa to suma:

```
M = b₁×2^(−1) + b₂×2^(−2) + b₃×2^(−3) + ... + b₅₂×2^(−52)
```

Gdzie każde **bᵢ** to bit (0 lub 1).

### Przykład szczegółowy: liczba 10.5

#### Krok 1: Konwersja na binarną

```
10.5₁₀ = 1010.1₂
```

#### Krok 2: Normalizacja (notacja naukowa binarna)

```
1010.1₂ = 1.0101₂ × 2³
```

#### Krok 3: Wyznaczenie składników

**Bit znaku (S):**

```
10.5 > 0  →  S = 0
```

**Wykładnik (E):**

```
Rzeczywisty wykładnik = 3
E = 3 + 1023 = 1026₁₀ = 10000000010₂
```

**Mantysa (M):**

```
1.0101₂  →  zapisujemy tylko część po przecinku:
M = 0101000000000000000000000000000000000000000000000000₂
```

#### Krok 4: Złożenie w 64 bity

```
┌─┬───────────┬────────────────────────────────────────────────────┐
│0│10000000010│0101000000000000000000000000000000000000000000000000│
└─┴───────────┴────────────────────────────────────────────────────┘
 S      E                            M
```

**Pełna reprezentacja:**

```
0100000000100101000000000000000000000000000000000000000000000000
```

#### Weryfikacja:

```
Wartość = (−1)⁰ × 2^(1026−1023) × (1 + 0.3125)
        = 1 × 2³ × 1.3125
        = 8 × 1.3125
        = 10.5 ✓
```

---

## Przykłady konwersji

### Przykład 1: Liczba 2.0

#### Analiza:

```
2.0₁₀ = 10₂ = 1.0₂ × 2¹
```

**Składniki:**

- S = 0 (dodatnia)
- Rzeczywisty wykładnik = 1
- E = 1 + 1023 = 1024₁₀ = 10000000000₂
- M = 0000000...0 (52 zera)

**64-bitowa reprezentacja:**

```
┌─┬───────────┬────────────────────────────────────────────────────┐
│0│10000000000│0000000000000000000000000000000000000000000000000000│
└─┴───────────┴────────────────────────────────────────────────────┘
```

**Weryfikacja:**

```
Wartość = (−1)⁰ × 2^(1024−1023) × (1 + 0)
        = 1 × 2¹ × 1
        = 2.0 ✓
```

---

### Przykład 2: Liczba -0.5

#### Analiza:

```
0.5₁₀ = 0.1₂ = 1.0₂ × 2^(−1)
```

**Składniki:**

- S = 1 (ujemna!)
- Rzeczywisty wykładnik = −1
- E = −1 + 1023 = 1022₁₀ = 01111111110₂
- M = 0000000...0

**64-bitowa reprezentacja:**

```
┌─┬───────────┬────────────────────────────────────────────────────┐
│1│01111111110│0000000000000000000000000000000000000000000000000000│
└─┴───────────┴────────────────────────────────────────────────────┘
```

**Weryfikacja:**

```
Wartość = (−1)¹ × 2^(1022−1023) × (1 + 0)
        = −1 × 2^(−1) × 1
        = −0.5 ✓
```

---

### Przykład 3: Liczba 5.25

#### Analiza:

```
5.25₁₀ = 101.01₂ = 1.0101₂ × 2²
```

**Składniki:**

- S = 0 (dodatnia)
- Rzeczywisty wykładnik = 2
- E = 2 + 1023 = 1025₁₀ = 10000000001₂
- M = 0101000...0

**Mantysa szczegółowo:**

```
1.0101₂ = 1 + 0×2^(−1) + 1×2^(−2) + 0×2^(−3) + 1×2^(−4)
        = 1 + 0.25 + 0.0625
        = 1.3125

Zapisujemy: 0101 0000 0000 ... 0000
```

**64-bitowa reprezentacja:**

```
┌─┬───────────┬────────────────────────────────────────────────────┐
│0│10000000001│0101000000000000000000000000000000000000000000000000│
└─┴───────────┴────────────────────────────────────────────────────┘
```

**Weryfikacja:**

```
Wartość = (−1)⁰ × 2^(1025−1023) × (1 + 0.3125)
        = 1 × 2² × 1.3125
        = 4 × 1.3125
        = 5.25 ✓
```

---

## Dzielenie liczb zmiennoprzecinkowych

### Formuła dzielenia w IEEE 754

Dzielenie dwóch liczb w formacie IEEE 754:

```
A / B = [(−1)^Sa × 2^(Ea−1023) × (1 + Ma)] / [(−1)^Sb × 2^(Eb−1023) × (1 + Mb)]
```

#### Uproszczenie:

```
Znak wyniku:     Sr = Sa ⊕ Sb  (XOR bitów znaku)
Wykładnik wyniku: Er = (Ea − 1023) − (Eb − 1023) + 1023 = Ea − Eb + 1023
Mantysa wyniku:   Mr = (1 + Ma) / (1 + Mb) − 1
```

### Przykład: 10.5 ÷ 2.0

#### Dane wejściowe:

**Liczba A = 10.5:**

- Sa = 0
- Ea = 1026
- Ma = 0.3125 → (1 + Ma) = 1.3125

**Liczba B = 2.0:**

- Sb = 0
- Eb = 1024
- Mb = 0 → (1 + Mb) = 1.0

#### Obliczenia:

**1. Znak:**

```
Sr = 0 ⊕ 0 = 0  (dodatnia)
```

**2. Wykładnik:**

```
Er = 1026 − 1024 + 1023 = 1025
```

**3. Mantysa:**

```
1 + Mr = (1.3125) / (1.0) = 1.3125
Mr = 0.3125 = 0101000...0₂
```

#### Wynik: 5.25

```
┌─┬───────────┬────────────────────────────────────────────────────┐
│0│10000000001│0101000000000000000000000000000000000000000000000000│
└─┴───────────┴────────────────────────────────────────────────────┘
```

**Weryfikacja:**

```
Wartość = (−1)⁰ × 2^(1025−1023) × 1.3125
        = 1 × 2² × 1.3125
        = 4 × 1.3125
        = 5.25 ✓
```

---

## Implementacja w kodzie

### Jak JavaScript przechowuje liczby?

W JavaScript wszystkie liczby są przechowywane w formacie **IEEE 754 Double Precision**. Możemy "zajrzeć" do wewnętrznej reprezentacji używając `ArrayBuffer` i `DataView`.

### Algorytm konwersji

```typescript
function toBinary64(num: number): string {
  // Krok 1: Tworzenie bufora 8 bajtów (64 bity)
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);

  // Krok 2: Zapis liczby w formacie IEEE 754
  view.setFloat64(0, num, false); // false = big-endian

  // Krok 3: Odczyt każdego bajtu i konwersja na binarny
  let binary = "";
  for (let i = 0; i < 8; i++) {
    const byte = view.getUint8(i); // Odczytaj bajt (0-255)
    const binaryByte = byte.toString(2); // Konwertuj na binarny
    binary += binaryByte.padStart(8, "0"); // Dopełnij do 8 bitów
  }

  return binary; // 64-bitowy string "0100000..."
}
```

### Podział na komponenty

```typescript
function parseIEEE754(binary: string) {
  return {
    sign: binary[0], // Bit 0
    exponent: binary.slice(1, 12), // Bity 1-11
    mantissa: binary.slice(12), // Bity 12-63
  };
}
```

### Przykład użycia

```typescript
const num = 10.5;
const binary = toBinary64(num);
// "0100000000100101000000000000000000000000000000000000000000000000"

const parts = parseIEEE754(binary);
// {
//   sign: "0",
//   exponent: "10000000010",
//   mantissa: "0101000000000000000000000000000000000000000000000000"
// }
```

---

## Specjalne przypadki

### 1. Zero

```
+0.0: 0 00000000000 0000000000000000000000000000000000000000000000000000
−0.0: 1 00000000000 0000000000000000000000000000000000000000000000000000
```

### 2. Nieskończoność

```
+∞:   0 11111111111 0000000000000000000000000000000000000000000000000000
−∞:   1 11111111111 0000000000000000000000000000000000000000000000000000
```

### 3. NaN (Not a Number)

```
NaN:  x 11111111111 xxxx...xxxx (mantysa ≠ 0)
```

### 4. Liczby zdenormalizowane

Gdy wykładnik = 0:

```
Wartość = (−1)^S × 2^(−1022) × (0 + M)
```
