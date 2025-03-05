import { useCallback, useEffect, useState } from "react";
import { deleteItem } from "../services/api";
import { EditIcon, DeleteIcon } from "../assets/Icons";
import ItemForm from "./ItemForm";
import { Item } from "../types";

const ItemList = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [allItems, setAllItems] = useState<Item[]>([]);
    const [userIds, setUserIds] = useState<number[]>([]);
    const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
    const [editingItem, setEditingItem] = useState<Item | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
    const [userId, setUserId] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch all items or filtered items based on userId
    const fetchItems = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const url = userId 
                ? `https://jsonplaceholder.typicode.com/posts?userId=${userId}` 
                : "https://jsonplaceholder.typicode.com/posts";

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }

            const data: Item[] = await response.json();
            setAllItems(data);
            setItems(data.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase())));

            // Extract unique userIds
            if (!userId) {
                const uniqueUserIds = Array.from(new Set(data.map((item) => item.userId)));
                setUserIds(uniqueUserIds);
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "An unknown error occurred.");
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchItems();
    }, [userId]);

    // Search filtering
    useEffect(() => {
        setItems(allItems.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase())));
    }, [searchTerm, allItems]);

    const showMessage = (text: string, type: "success" | "error") => {
        setMessage({ text, type });
        setTimeout(() => setMessage(null), 3000);
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteItem(id);
            setAllItems(allItems.filter((item) => item.id !== id));
            showMessage("Item deleted successfully!", "success");
        } catch (error) {
            showMessage("Failed to delete item. Please try again.", "error");
        }
    };

    const handleSave = async (item: Partial<Item>) => {
        try {
            let savedItem: Item;

            if (item.id) {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${item.id}`, {
                    method: "PUT",
                    body: JSON.stringify(item),
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                });
                if (!response.ok) throw new Error(`Failed to update item. Status: ${response.status}`);
                savedItem = await response.json();
                setAllItems(allItems.map((existingItem) => (existingItem.id === savedItem.id ? savedItem : existingItem)));
                showMessage("✅ Item updated successfully!", "success");
            } else {
                const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
                    method: "POST",
                    body: JSON.stringify(item),
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                });
                if (!response.ok) throw new Error(`Failed to add item. Status: ${response.status}`);
                savedItem = await response.json();
                setAllItems([savedItem, ...allItems]);
                setUserIds(Array.from(new Set([...userIds, savedItem.userId])));
                showMessage("Item added successfully!", "success");
            }

            setEditingItem(null);
            setIsAdding(false);
        } catch (error) {
            console.error("Error saving item:", error);
            showMessage("Failed to save item. Please try again.", "error");
        }
    };   
    
    const toggleExpand = (id: number) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="container mx-auto px-4">
            {message && (
                <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 
                                ${message.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                    {message.text}
                </div>
            )}

            {/* Search & Filter */}
            <div className="flex flex-wrap justify-between items-center mb-6 p-4 bg-gray-900 rounded-xl shadow-lg">
                <input 
                    type="text" 
                    placeholder="Search items..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 rounded-lg text-white bg-gray-800 w-full sm:w-64"
                />
                <select 
                    value={userId} 
                    onChange={(e) => setUserId(e.target.value)}
                    className="px-4 py-2 rounded-lg text-white bg-gray-800 w-full sm:w-64 mt-2 sm:mt-0"
                >
                    <option value="">All Users</option>
                    {userIds.map((id) => (
                        <option key={id} value={id}>User {id}</option>
                    ))}
                </select>
            </div>

            {/* Error Handling */}
            {error && (
                <div className="text-red-500 text-center mb-6">
                    <DeleteIcon size={20} /> {error}
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="text-gray-300 text-center mb-6">
                    ⏳ Loading items...
                </div>
            )}

            {/* Add Item Button */}
            <div className="text-center mb-6">
                <button 
                    onClick={() => setIsAdding(true)}
                    className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-xl hover:bg-green-600"
                >
                     Add New Item
                </button>
            </div>

            {/* Items List */}
            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
                    {items.map((item) => (
                        <div 
                            key={item.id} 
                            className="p-6 bg-white/10 shadow-2xl border border-gray-700 rounded-2xl flex flex-col h-full"
                        >
                            <h2 className="font-bold text-lg text-white mb-2">{item.title}</h2>
                            <p className="text-gray-300">User ID: {item.userId}</p>
                            <div className="flex-grow">
                                <p>
                                    {expanded[item.id] ? item.body : `${item.body.substring(0, 100)}${item.body.length > 100 ? "..." : ""}`}
                                </p>
                                {item.body.length > 100 && (
                                    <button 
                                        onClick={() => toggleExpand(item.id)} 
                                        className="text-blue-500 mt-1 underline"
                                    >
                                        {expanded[item.id] ? "Show Less" : "Read More"}
                                    </button>
                                )}
                            </div>
                            <div className="flex justify-between mt-4">
                                <button onClick={() => setEditingItem(item)} className="text-blue-500 bg-blue-100 p-3 rounded-full">
                                    <EditIcon size={22} />
                                </button>
                                <button onClick={() => handleDelete(item.id)} className="text-red-500 bg-red-100 p-3 rounded-full">
                                    <DeleteIcon size={22} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Forms for Adding/Editing */}
            {isAdding && <ItemForm onSave={handleSave} onClose={() => setIsAdding(false)} />}
            {editingItem && <ItemForm initialData={editingItem} onSave={handleSave} onClose={() => setEditingItem(null)} />}
        </div>
    );
};

export default ItemList;
