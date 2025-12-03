export const InfoSection = () => {
  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950/30">
      <h3 className="mb-3 text-lg font-semibold text-blue-900 dark:text-blue-100">
        Opis jak działa
      </h3>
      <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
        <li className="flex items-start">
          <span>
            <strong>Bit znaku (1 bit):</strong> Określa czy liczba jest dodatnia
            (0) czy ujemna (1)
          </span>
        </li>
        <li className="flex items-start">
          <span>
            <strong>Wykładnik (11 bitów):</strong> Określa wielkość liczby,
            przesunięty o 1023
          </span>
        </li>
        <li className="flex items-start">
          <span>
            <strong>Mantysa (52 bity):</strong> Przechowuje dokładną wartość
            liczby
          </span>
        </li>
      </ul>
    </div>
  );
};
