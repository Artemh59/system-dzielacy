interface BinaryDisplayProps {
  label: string; // Np. "Dzielna", "Dzielnik", "Wynik"
  value: number; // Wartość dziesiętna np. 10.5
  fullBinary: string; // Pełna reprezentacja binarna (64 bity)
  sign: string; // Bit znaku: "0" lub "1"
  exponent: string; // Wykładnik (11 bitów)
  mantissa: string; // Mantysa (52 bity)
}

export const BinaryDisplay: React.FC<BinaryDisplayProps> = ({
  label,
  value,
  fullBinary,
  sign,
  exponent,
  mantissa,
}) => {
  const isPositive = sign === "0";

  return (
    <div className="space-y-3 rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {label}
        </h3>
        <span className="rounded-lg bg-blue-100 px-3 py-1 text-sm font-mono font-medium text-blue-900 dark:bg-blue-900 dark:text-blue-100">
          {value}
        </span>
      </div>

      <div className="space-y-2">
        {/* Bit znaku */}
        <div className="flex items-start gap-2">
          <span className="min-w-20 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Znak:
          </span>
          <code className="flex-1 rounded bg-red-100 px-2 py-1 font-mono text-sm text-red-900 dark:bg-red-900/30 dark:text-red-200">
            {sign}
          </code>
          <span className="text-xs text-zinc-500">
            ({isPositive ? "dodatnia" : "ujemna"})
          </span>
        </div>

        {/* Wykładnik */}
        <div className="flex items-start gap-2">
          <span className="min-w-20 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Wykładnik:
          </span>
          <code className="flex-1 break-all rounded bg-green-100 px-2 py-1 font-mono text-sm text-green-900 dark:bg-green-900/30 dark:text-green-200">
            {exponent}
          </code>
          <span className="text-xs text-zinc-500">(11 bitów)</span>
        </div>

        {/* Mantysa */}
        <div className="flex items-start gap-2">
          <span className="min-w-20 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Mantysa:
          </span>
          <code className="flex-1 break-all rounded bg-purple-100 px-2 py-1 font-mono text-sm text-purple-900 dark:bg-purple-900/30 dark:text-purple-200">
            {mantissa}
          </code>
          <span className="text-xs text-zinc-500">(52 bity)</span>
        </div>

        {/* Pełna reprezentacja */}
        <div className="mt-3 border-t border-zinc-200 pt-3 dark:border-zinc-700">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Pełne 64 bity:
          </span>
          <code className="mt-1 block break-all rounded bg-zinc-200 px-2 py-2 font-mono text-xs leading-relaxed text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
            {fullBinary}
          </code>
        </div>
      </div>
    </div>
  );
};
