import { motion } from 'framer-motion';

interface ResultDisplayProps {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  convertedAmount: number;
  rate: number;
}

export function ResultDisplay({
  fromCurrency,
  toCurrency,
  amount,
  convertedAmount,
  rate,
}: ResultDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white/6 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-0 border border-[#582BB8] rounded-lg p-6 mt-6 w-full"
    >
      <div className="text-center ">
        <p className="text-1xl text-white">
          {amount.toLocaleString()} {fromCurrency} =
        </p>
        <p className="text-3xl font-bold text-[#582BB8] mt-2">
          {convertedAmount.toLocaleString()} {toCurrency}
        </p>
      </div>
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>1 {fromCurrency} = {rate.toFixed(6)} {toCurrency}</p>
      </div>
    </motion.div>
  );
}