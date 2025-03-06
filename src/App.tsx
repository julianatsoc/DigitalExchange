import bg from "./assets/bg.png";

function App() {
  return (
    <>
      <div className="h-screen bg-cover " style={{ backgroundImage: `url(${bg})` }}>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Hello World</h1>
            <p className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </div>      
    </>
  );
}

export default App;
