import { useState, useEffect } from 'react';
import { ArrowUpDown, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { CurrencyInput } from './CurrencyInput.tsx';
import { ResultDisplay } from './ResultDisplay.tsx';
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
    useEffect(() => {
        async function updateConversion() {
          if (!amount || isNaN(parseFloat(amount))) return;
      
          setLoading(true);
          setError('');
      
          try {
            const data = await fetchExchangeRates(fromCurrency);
            const rate = data[fromCurrency.toLowerCase()][toCurrency.toLowerCase()];
            const convertedAmount = parseFloat(amount) * rate;
      
            setConversionResult({ convertedAmount, rate });
          } catch (err) {
            setError('Failed to update conversion. Please try again later.');
            setConversionResult(null);
          } finally {
            setLoading(false);
          }
        }
      
        updateConversion();
      }, [amount, fromCurrency, toCurrency]);
      
  
    return (
      <div className=" flex flex-col items-center justify-center">
  
            <form onSubmit={handleConvert}>
              <div className="space-y-4">
                <div>
                <label className="block text-sm font-medium bg-clip-text text-transparent bg-gradient-to-l from-blue-400 via-purple-500 to-blue-300 mb-1">
     Amount
      </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0"
                    step="any"
                    className="block w-full px-3 py-2 bg-white/6 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-0 border border-[#582BB8] rounded-lg text-white outline-none"
                    required
                  />
                </div>
  
                <div className="relative gap-4">
                
                  <CurrencyInput
                    value={fromCurrency}
                    onChange={setFromCurrency}
                    currencies={currencies}
                    label='From'
                  />
  
                  <div className="absolute left-1/2 -translate-x-1/2 z-10">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleSwapCurrencies}
                      className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shado bg-white/6 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-0 border border-[#582BB8] rounded-lg"
                    >
                      <ArrowUpDown className="h-5 w-5 text-[#582BB8]" />
                    </motion.button>
                  </div>
                  <div className="mt-10">
                    <CurrencyInput
                      value={toCurrency}
                      onChange={setToCurrency}
                      currencies={currencies}
                      label='To'
                    />
                  </div>
                </div>
  
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className="w-full mt-6 px-4 py-2 border border-transparent rounded-md font-bold shadow-sm text-white bg-[#582bb8]"
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
              />
            )}
          </div>
    );
  }