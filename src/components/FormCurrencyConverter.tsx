import { useState, useEffect } from 'react';
import { ArrowUpDown, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { CurrencyInput } from './CurrencyInput.tsx';
import { ResultDisplay } from './DisplayResults.tsx';
import { fetchCurrencies, fetchExchangeRates } from '../services/api';


export default function FormCurrencyConverter() {
    const [currencies, setCurrencies] = useState<Record<string, string>>({});
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [amount, setAmount] = useState('1');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [conversionResult, setConversionResult] = useState<{
      convertedAmount: number;
      rate: number;
      lastUpdate: string;
    } | null>(null);
  
    useEffect(() => {
      loadCurrencies();
    }, []);
  
    async function loadCurrencies() {
      try {
        const data = await fetchCurrencies();
        setCurrencies(data);
      } catch (err) {
        setError('Failed to load currencies. Please try again later.');
      }
    }
  
    async function handleConvert(e: React.FormEvent) {
      e.preventDefault();
      setLoading(true);
      setError('');
      
      try {
        const data = await fetchExchangeRates(fromCurrency);
        const rate = data[fromCurrency.toLowerCase()][toCurrency.toLowerCase()];
        const convertedAmount = parseFloat(amount) * rate;
        
        setConversionResult({
          convertedAmount,
          rate,
          lastUpdate: data.date,
        });
      } catch (err) {
        setError('Failed to convert currency. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
  
    function handleSwapCurrencies() {
      setFromCurrency(toCurrency);
      setToCurrency(fromCurrency);
    }
  
    return (
      <div className=" flex items-center justify-center p-4">
  
            <form onSubmit={handleConvert}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0"
                    step="any"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
  
                <div className="relative">
                  <CurrencyInput
                    value={fromCurrency}
                    onChange={setFromCurrency}
                    currencies={currencies}
                    label="From"
                  />
  
                  <div className="absolute left-1/2 -translate-x-1/2 z-10">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleSwapCurrencies}
                      className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
                    >
                      <ArrowUpDown className="h-5 w-5 text-blue-600" />
                    </motion.button>
                  </div>
  
                  <div className="mt-4">
                    <CurrencyInput
                      value={toCurrency}
                      onChange={setToCurrency}
                      currencies={currencies}
                      label="To"
                    />
                  </div>
                </div>
  
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className="w-full mt-6 px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="animate-spin h-5 w-5 mx-auto" />
                  ) : (
                    'Convert'
                  )}
                </motion.button>
              </div>
            </form>
  
            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
  
            {conversionResult && !error && (
              <ResultDisplay
                fromCurrency={fromCurrency}
                toCurrency={toCurrency}
                amount={parseFloat(amount)}
                convertedAmount={conversionResult.convertedAmount}
                rate={conversionResult.rate}
                lastUpdate={conversionResult.lastUpdate}
              />
            )}
          </div>
    );
  }