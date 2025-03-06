import bg from "./assets/bg.png";
import FormCurrencyConverter from "./components/formCurrencyConverter";
import DevLinkedin from "./components/DevLinkedin";

function App() {
  return (
    <>
      <div className="h-screen bg-cover " style={{ backgroundImage: `url(${bg})` }}>
        <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-l from-blue-400 via-purple-500 to-blue-300 drop-shadow-lg">
            Digital Exchange
          </h1>
          <DevLinkedin />

          <FormCurrencyConverter />
        </div>
      </div>      
    </>
  );
}

export default App;
