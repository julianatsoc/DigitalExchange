import { useState, useEffect } from "react";
import bg from "./assets/bg.png";
import FormCurrencyConverter from "./components/formCurrencyConverter.tsx";
import DevLinkedin from "./components/DevLinkedin.tsx";
import { Loader2 } from "lucide-react";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100); 
  }, []);

  return (
    <>
      <div className="h-screen bg-cover " style={{ backgroundImage: `url(${bg})` }}>
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-l from-blue-400 via-purple-500 to-blue-300 drop-shadow-lg">
            Digital Exchange
          </h1>

          <DevLinkedin />

          {isLoading ? (
            <div className="flex items-center justify-center mt-10">
              <Loader2 className="animate-spin h-10 w-10 text-[#582BB8]" />
            </div>
          ) : (
            <FormCurrencyConverter />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
