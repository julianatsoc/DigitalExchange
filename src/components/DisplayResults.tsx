import { motion } from 'framer-motion';

interface ResultDisplayProps {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  convertedAmount: number;
  rate: number;
  lastUpdate: string;
}

export function ResultDisplay({
  fromCurrency,
  toCurrency,
  amount,
  convertedAmount,
  rate,
  lastUpdate,
}: ResultDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-6 rounded-lg shadow-lg mt-6"
    >
      <div className="text-center">
        <p className="text-3xl font-bold text-gray-800">
          {amount.toLocaleString()} {fromCurrency} =
        </p>
        <p className="text-4xl font-bold text-blue-600 mt-2">
          {convertedAmount.toLocaleString()} {toCurrency}
        </p>
      </div>
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>1 {fromCurrency} = {rate.toFixed(6)} {toCurrency}</p>
        <p className="mt-1">Last updated: {new Date(lastUpdate).toLocaleString()}</p>
      </div>
    </motion.div>
  );
}