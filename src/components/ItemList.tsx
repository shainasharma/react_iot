import { useEffect, useState } from "react";
import { fetchItems, deleteItem } from "../services/api";
import EditItemModal from "./EditModal";
import { EditIcon, DeleteIcon } from "../assets/Icons";

interface Item {
    id: number;
    title: string;
    body: string;
}

const ItemList = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
    const [editingItem, setEditingItem] = useState<Item | null>(null);

    useEffect(() => {
        fetchItems().then(setItems);
    }, []);

    const handleDelete = async (id: number) => {
        await deleteItem(id);
        setItems(items.filter(item => item.id !== id));
    };

    const toggleExpand = (id: number) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
            {items.map(item => (
                <div 
                    key={item.id} 
                    className="p-6 bg-white/10 backdrop-blur-xl shadow-2xl border border-gray-700 rounded-2xl 
                               hover:shadow-green-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105
                               flex flex-col justify-between h-full"
                >
                    {/* Title & Description */}
                    <div>
                        <h2 className="font-bold text-lg text-white mb-2">{item.title}</h2>
                        <p className="text-gray-300 leading-relaxed">
                            {expanded[item.id] 
                                ? item.body 
                                : `${item.body.substring(0, 100)}${item.body.length > 100 ? "..." : ""}`
                            }
                        </p>
                        {item.body.length > 60 && (
                            <button 
                                onClick={() => toggleExpand(item.id)} 
                                className="text-green-400 mt-2 hover:text-green-500 transition font-medium"
                            >
                                {expanded[item.id] ? "Show Less" : "Read More"}
                            </button>
                        )}
                    </div>

                    {/* Buttons at the Bottom */}
                    <div className="flex justify-between items-center mt-auto pt-4">
                        {/* Edit Button */}
                        <button 
                            onClick={() => setEditingItem(item)} 
                            className="text-green-400 bg-green-900/20 p-3 rounded-full shadow-md 
                                       hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-125"
                            aria-label="Edit Item"
                        >
                            <EditIcon size={24} color="currentColor" />
                        </button>

                        {/* Delete Button */}
                        <button 
                            onClick={() => handleDelete(item.id)} 
                            className="text-red-400 bg-red-900/20 p-3 rounded-full shadow-md 
                                       hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-125"
                            aria-label="Delete Item"
                        >
                            <DeleteIcon size={24} color="currentColor" />
                        </button>
                    </div>
                </div>
            ))}

            {/* Edit Modal */}
            {editingItem && (
                <EditItemModal 
                    item={editingItem} 
                    onClose={() => setEditingItem(null)}
                    onUpdate={(updatedItem) => {
                        setItems(items.map(item => (item.id === updatedItem.id ? updatedItem : item)));
                        setEditingItem(null);
                    }}
                />
            )}
        </div>
    );
};

export default ItemList;
