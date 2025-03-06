import { ChevronDown } from 'lucide-react';

interface CurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
  currencies: Record<string, string>;
  label: string;
}

export function CurrencyInput({ value, onChange, currencies, label }: CurrencyInputProps) {
  return (
    <div className="relative mb-4">
      <label className="block text-sm font-medium bg-clip-text text-transparent bg-gradient-to-l from-blue-400 via-purple-500 to-blue-300 mb-1">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md appearance-none bg-white"
        >
          {Object.entries(currencies).map(([code, name]) => (
            <option key={code} value={code}>
              {code.toUpperCase()} - {name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}