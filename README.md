# 🔢 Symulator Dzielenia Binarnego 64-bitowego

Aplikacja webowa do wizualizacji dzielenia liczb zmiennoprzecinkowych w formacie **IEEE 754 Double Precision** (64-bit).

![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![React](https://img.shields.io/badge/React-19.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8)

## 📋 Opis

Symulator pozwala na:

- ✅ Wprowadzenie dwóch liczb dziesiętnych
- ✅ Wykonanie dzielenia
- ✅ Wizualizację reprezentacji binarnej w formacie IEEE 754
- ✅ Wyświetlenie każdego komponentu:
  - **Bit znaku** (1 bit)
  - **Wykładnik** (11 bitów)
  - **Mantysa** (52 bity)
- ✅ Pełną 64-bitową reprezentację

## 🚀 Szybki start

### Instalacja

```bash
# Sklonuj repozytorium
git clone <url-repo>
cd system-dzielacy

# Zainstaluj zależności
npm install

# Uruchom serwer deweloperski
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce.

### Produkcja

```bash
# Zbuduj aplikację
npm run build

# Uruchom serwer produkcyjny
npm start
```

## 📚 Dokumentacja

**📖 [PRZEJDŹ DO PEŁNEJ DOKUMENTACJI](./DOKUMENTACJA.md)**

Dokumentacja zawiera:

- 📐 Szczegółowe wyjaśnienie formatu IEEE 754
- 🧮 Formuły matematyczne konwersji
- 📊 Przykłady z pełnymi obliczeniami
- 💻 Wyjaśnienie implementacji
- 🔍 Specjalne przypadki (zero, nieskończoność, NaN)

### Krótki przykład

Liczba **10.5** w formacie IEEE 754:

```
┌─┬───────────┬────────────────────────────────────────────────────┐
│0│10000000010│0101000000000000000000000000000000000000000000000000│
└─┴───────────┴────────────────────────────────────────────────────┘
 S      E                            M

Gdzie:
S = 0 (dodatnia)
E = 1026 (wykładnik: 3 + 1023)
M = 0.3125 (mantysa)

Wartość = (-1)⁰ × 2^(1026-1023) × (1 + 0.3125)
        = 1 × 2³ × 1.3125
        = 10.5 ✓
```

## 🏗️ Struktura projektu

```
system-dzielacy/
├── src/
│   └── app/
│       ├── components/
│       │   ├── BinaryDisplay.tsx    # Wyświetlanie reprezentacji binarnej
│       │   └── InfoSection.tsx      # Sekcja informacyjna
│       ├── utils/
│       │   └── ieee754.ts          # Logika konwersji i obliczeń
│       ├── page.tsx                # Główna strona
│       ├── layout.tsx              # Layout aplikacji
│       └── globals.css             # Style globalne
├── DOKUMENTACJA.md                 # Szczegółowa dokumentacja techniczna
├── README.md                       # Ten plik
└── package.json                    # Zależności projektu
```

## 🎯 Funkcjonalności

### 1. Kalkulator dzielenia

- Dwa pola do wprowadzania liczb
- Przycisk "Oblicz Dzielenie"
- Walidacja danych wejściowych
- Ochrona przed dzieleniem przez zero

### 2. Wizualizacja binarna

Dla każdej liczby (dzielna, dzielnik, wynik) wyświetlane są:

- 🔴 **Bit znaku** - określa czy liczba jest dodatnia czy ujemna
- 🟢 **Wykładnik** - określa wielkość liczby (11 bitów)
- 🟣 **Mantysa** - przechowuje precyzyjną wartość (52 bity)
- 📊 **Pełna reprezentacja** - wszystkie 64 bity

### 3. Informacje edukacyjne

Panel z wyjaśnieniem formatu IEEE 754 i jego składników.

## 🛠️ Technologie

- **Next.js 16** - Framework React z server-side rendering
- **React 19** - Biblioteka UI
- **TypeScript 5** - Typowanie statyczne
- **Tailwind CSS 4** - Stylowanie utility-first
- **IEEE 754** - Standard reprezentacji liczb zmiennoprzecinkowych

## 🧮 Format IEEE 754

Format **Double Precision** (64-bit) składa się z:

| Składnik      | Bity | Opis                        |
| ------------- | ---- | --------------------------- |
| Znak (S)      | 1    | 0 = dodatnia, 1 = ujemna    |
| Wykładnik (E) | 11   | Przesunięty o 1023          |
| Mantysa (M)   | 52   | Część ułamkowa z domyślną 1 |

### Formuła:

```
Wartość = (-1)^S × 2^(E-1023) × (1 + M)
```

## 🧪 Testowanie

Aplikacja automatycznie obsługuje:

- ✅ Walidację liczb wejściowych
- ✅ Dzielenie przez zero
- ✅ Liczby ujemne
- ✅ Bardzo małe i bardzo duże liczby
- ✅ Specjalne wartości (0, infinity)

## 🔗 Linki

- [Pełna dokumentacja techniczna](./DOKUMENTACJA.md)
