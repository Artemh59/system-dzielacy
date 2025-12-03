"use client";

import { useState } from "react";

export default function Home() {
  const [num1, setNum1] = useState<string>("10.5");
  const [num2, setNum2] = useState<string>("2.0");
  const [result, setResult] = useState<number | null>(null);

  // Convert number to IEEE 754 64-bit binary representation
  const toBinary64 = (num: number): string => {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setFloat64(0, num, false); // big-endian

    let binary = "";
    for (let i = 0; i < 8; i++) {
      binary += view.getUint8(i).toString(2).padStart(8, "0");
    }
    return binary;
  };

  // Parse IEEE 754 components
  const parseIEEE754 = (binary: string) => {
    const sign = binary[0];
    const exponent = binary.slice(1, 12);
    const mantissa = binary.slice(12);

    return { sign, exponent, mantissa };
  };

  const handleDivide = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      alert("Proszę wprowadzić poprawne liczby");
      return;
    }

    if (n2 === 0) {
      alert("Nie można dzielić przez zero");
      return;
    }

    setResult(n1 / n2);
  };

  const renderBinaryWithLabels = (num: number, label: string) => {
    const binary = toBinary64(num);
    const { sign, exponent, mantissa } = parseIEEE754(binary);

    return (
      <div className="space-y-3 rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {label}
          </h3>
          <span className="rounded-lg bg-blue-100 px-3 py-1 text-sm font-mono font-medium text-blue-900 dark:bg-blue-900 dark:text-blue-100">
            {num}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <span className="min-w-20 text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Znak:
            </span>
            <code className="flex-1 rounded bg-red-100 px-2 py-1 font-mono text-sm text-red-900 dark:bg-red-900/30 dark:text-red-200">
              {sign}
            </code>
            <span className="text-xs text-zinc-500 dark:text-zinc-500">
              ({sign === "0" ? "dodatnia" : "ujemna"})
            </span>
          </div>

          <div className="flex items-start gap-2">
            <span className="min-w-20 text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Wykładnik:
            </span>
            <code className="flex-1 break-all rounded bg-green-100 px-2 py-1 font-mono text-sm text-green-900 dark:bg-green-900/30 dark:text-green-200">
              {exponent}
            </code>
            <span className="text-xs text-zinc-500 dark:text-zinc-500">
              (11 bitów)
            </span>
          </div>

          <div className="flex items-start gap-2">
            <span className="min-w-20 text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Mantysa:
            </span>
            <code className="flex-1 break-all rounded bg-purple-100 px-2 py-1 font-mono text-sm text-purple-900 dark:bg-purple-900/30 dark:text-purple-200">
              {mantissa}
            </code>
            <span className="text-xs text-zinc-500 dark:text-zinc-500">
              (52 bity)
            </span>
          </div>

          <div className="mt-3 border-t border-zinc-200 pt-3 dark:border-zinc-700">
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Pełne 64 bity:
            </span>
            <code className="mt-1 block break-all rounded bg-zinc-200 px-2 py-2 font-mono text-xs leading-relaxed text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
              {binary}
            </code>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
            Symulator Dzielenia Binarnego 64-bitowego
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Standard IEEE 754 – podwójna precyzja zmiennoprzecinkowa
          </p>
        </div>

        {/* Calculator Card */}
        <div className="mb-8 rounded-2xl border border-zinc-200 bg-white p-8 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
          <div className="space-y-6">
            {/* Input Fields */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Dzielna (Liczba 1)
                </label>
                <input
                  type="text"
                  value={num1}
                  onChange={(e) => setNum1(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 font-mono text-lg text-zinc-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-blue-400"
                  placeholder="Wprowadź liczbę"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Dzielnik (Liczba 2)
                </label>
                <input
                  type="text"
                  value={num2}
                  onChange={(e) => setNum2(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 font-mono text-lg text-zinc-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-blue-400"
                  placeholder="Wprowadź liczbę"
                />
              </div>
            </div>

            {/* Divide Button */}
            <button
              onClick={handleDivide}
              className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-xl active:scale-[0.98]"
            >
              Oblicz Dzielenie
            </button>
          </div>
        </div>

        {/* Results */}
        {result !== null && (
          <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
            {/* Operands */}
            <div className="grid gap-6 lg:grid-cols-2">
              {renderBinaryWithLabels(parseFloat(num1), "Dzielna")}
              {renderBinaryWithLabels(parseFloat(num2), "Dzielnik")}
            </div>

            {/* Operation Symbol */}
            <div className="flex justify-center">
              <div className="rounded-full bg-blue-100 p-4 dark:bg-blue-900/30">
                <svg
                  className="h-8 w-8 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m0-16c0 0 0 0 0 0m0 16c0 0 0 0 0 0M4 12h16"
                  />
                </svg>
              </div>
            </div>

            {/* Result */}
            {renderBinaryWithLabels(result, "Wynik")}

            {/* Additional Info */}
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950/30">
              <h3 className="mb-3 text-lg font-semibold text-blue-900 dark:text-blue-100">
                Informacje o formacie IEEE 754
              </h3>
              <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    <strong>Bit znaku (1 bit):</strong> 0 dla liczb dodatnich, 1
                    dla ujemnych
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    <strong>Wykładnik (11 bitów):</strong> Przesunięty o 1023,
                    zakres od -1022 do +1023
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    <strong>Mantysa (52 bity):</strong> Część ułamkowa z
                    domyślną wiodącą jedynką
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    <strong>Razem:</strong> 64 bity (8 bajtów) dla podwójnej
                    precyzji
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
