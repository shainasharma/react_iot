import { useState } from "react";
import { updateItem } from "../services/api";
import { EditIcon } from "../assets/Icons";

interface EditItemModalProps {
    item: { id: number; title: string; body: string };
    onClose: () => void;
    onUpdate: (updatedItem: { id: number; title: string; body: string }) => void;
}

const EditItemModal: React.FC<EditItemModalProps> = ({ item, onClose, onUpdate }) => {
    const [title, setTitle] = useState(item.title);
    const [body, setBody] = useState(item.body);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedItem = { ...item, title, body };
        await updateItem(updatedItem);
        onUpdate(updatedItem);
        onClose(); // Close modal after saving
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md 
                        animate-fade-in z-50">
            <div className="bg-white/10 backdrop-blur-2xl p-8 rounded-2xl shadow-2xl border border-gray-700 
                            w-full max-w-md mx-4 relative transform transition-all duration-300 scale-95 hover:scale-100 
                            ring-1 ring-green-500/50 hover:ring-green-400/80">
                
                {/* Modal Header */}
                <div className="flex items-center justify-center space-x-3 mb-6">
                    <EditIcon size={26} color="white" />
                    <h2 className="text-3xl font-extrabold text-white tracking-wide 
                                   text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                        Edit Item
                    </h2>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border border-gray-500 p-3 w-full rounded-lg bg-transparent text-white 
                                       placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 
                                       transition-all duration-300"
                            placeholder="Enter title..."
                            required
                        />
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            className="border border-gray-500 p-3 w-full rounded-lg bg-transparent text-white 
                                       placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 
                                       transition-all duration-300 h-32 resize-none"
                            placeholder="Enter description..."
                            required
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between items-center mt-6">
                        {/* Cancel Button */}
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="bg-gray-700 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-800 
                                       transition-all duration-300 transform hover:scale-105 hover:ring-1 hover:ring-gray-500"
                        >
                            Cancel
                        </button>

                        {/* Save Button */}
                        <button 
                            type="submit" 
                            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 
                                       transition-all duration-300 transform hover:scale-105 hover:ring-1 hover:ring-green-300"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditItemModal;
