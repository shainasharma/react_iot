import { useState } from "react";
import ItemList from "./components/ItemList";

const App = () => {
  const [refresh] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6">
      {/* Header */}
      <h1 className="text-5xl font-extrabold mb-8 text-center tracking-wide bg-clip-text text-transparent 
                     bg-gradient-to-r from-green-400 to-blue-500 animate-pulse">
         I O Tech Assesment
      </h1>

      {/* Item List */}
      <div className="mt-8 w-full max-w-6xl">
        <ItemList key={refresh.toString()} />
      </div>
    </div>
  );
};

export default App;
