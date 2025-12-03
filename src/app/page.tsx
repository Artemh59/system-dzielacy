"use client";

import { useState } from "react";
import {
  getIEEE754Components,
  isValidNumber,
  divideBinary,
} from "./utils/logic";
import { BinaryDisplay } from "./components/BinaryDisplay";
import { InfoSection } from "./components/InfoSection";

export default function Home() {
  // Stan - przechowuje dane wprowadzone przez użytkownika
  const [num1, setNum1] = useState<string>("10.5");
  const [num2, setNum2] = useState<string>("2.0");

  // Wynik obliczeń - null oznacza że jeszcze nie obliczaliśmy
  const [result, setResult] = useState<number | null>(null);

  // Funkcja wywoływana po kliknięciu przycisku "Oblicz Dzielenie"
  const handleCalculate = () => {
    // KROK 1: Sprawdź czy wprowadzone wartości są poprawnymi liczbami
    if (!isValidNumber(num1) || !isValidNumber(num2)) {
      alert("Proszę wprowadzić poprawne liczby");
      return;
    }

    // KROK 2: Konwertuj tekst na liczby
    const dzielna = parseFloat(num1);
    const dzielnik = parseFloat(num2);

    // KROK 3: Sprawdź czy nie dzielimy przez zero
    if (dzielnik === 0) {
      alert("Nie można dzielić przez zero");
      return;
    }

    // KROK 4: Wykonaj dzielenie i zapisz wynik
    try {
      const wynik = divideBinary(dzielna, dzielnik);
      setResult(wynik);
    } catch (error) {
      alert("Wystąpił błąd podczas obliczeń");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
            Symulator Dzielenia Binarnego 64-bitowego
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Standard IEEE 754 – podwójna precyzja zmiennoprzecinkowa
          </p>
        </div>

        <div className="mb-8 rounded-2xl border border-zinc-200 bg-white p-8 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
          <div className="space-y-6">
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

            <button
              onClick={handleCalculate}
              className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-xl active:scale-[0.98]"
            >
              Oblicz Dzielenie
            </button>
          </div>
        </div>

        {result !== null && (
          <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="grid gap-6 lg:grid-cols-2">
              <BinaryDisplay
                label="Dzielna"
                value={parseFloat(num1)}
                {...getIEEE754Components(parseFloat(num1))}
              />
              <BinaryDisplay
                label="Dzielnik"
                value={parseFloat(num2)}
                {...getIEEE754Components(parseFloat(num2))}
              />
            </div>

            <div className="flex justify-center">
              <div className="rounded-full bg-blue-100 p-4 dark:bg-blue-900/30">
                <div className="flex h-8 w-8 items-center justify-center text-3xl font-bold text-blue-600 dark:text-blue-400">
                  ÷
                </div>
              </div>
            </div>

            {/* Wynik dzielenia */}
            <BinaryDisplay
              label="Wynik"
              value={result}
              {...getIEEE754Components(result)}
            />

            <InfoSection />
          </div>
        )}
      </main>
    </div>
  );
}
