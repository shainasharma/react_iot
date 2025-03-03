import { useState } from "react";
import ItemList from "./components/ItemList";
import AddItem from "./components/AddItem";
import Modal from "./components/CreateFormModal";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6">
      {/* Header */}
      <h1 className="text-5xl font-extrabold mb-8 text-center tracking-wide bg-clip-text text-transparent 
                     bg-gradient-to-r from-green-400 to-blue-500 animate-pulse">
         I O Tech Assesment
      </h1>

      {/* Add Item Button */}
      <button 
        onClick={() => setIsModalOpen(true)} 
        className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-xl 
                   hover:bg-green-600 transition-all duration-300 transform hover:scale-110 hover:shadow-green-400/50"
      >
        ➕ Add Item
      </button>

      {/* Item List */}
      <div className="mt-8 w-full max-w-6xl">
        <ItemList key={refresh.toString()} />
      </div>

      {/* Modal for Adding Items */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddItem 
          onAdd={() => setRefresh(!refresh)} 
          onClose={() => setIsModalOpen(false)} 
        />
      </Modal>
    </div>
  );
};

export default App;
