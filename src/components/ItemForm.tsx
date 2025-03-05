import { useState } from "react";
import { Item } from "../types";

interface ItemFormProps {
    initialData?: Item;
    onSave: (item: Omit<Item, "id"> | Item) => void; // Allow adding without an ID
    onClose: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ initialData, onSave, onClose }) => {
    const [title, setTitle] = useState(initialData?.title || "");
    const [body, setBody] = useState(initialData?.body || "");
    const [userId, setUserId] = useState(initialData?.userId.toString() || "1");
    const [userIdError, setUserIdError] = useState("");

    const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUserId(value);
        setUserIdError(Number(value) < 1 ? "User ID must be 1 or greater." : "");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !userId.trim() || Number(userId) < 1) return;

        const newItem = {
            title,
            body,
            userId: Number(userId),
        };

        if (initialData?.id) {
            onSave({ id: initialData.id, ...newItem }); // Editing (ID exists)
        } else {
            onSave(newItem); // Adding (API will assign an ID)
        }

        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md z-50">
            <div className="bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-700 w-full max-w-md mx-4">
                <h2 className="text-3xl font-extrabold text-white text-center mb-6 flex items-center justify-center gap-2">
                    {initialData ? "Edit Item" : "Add New Item"}
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <label className="text-white font-medium">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-green-500"
                    />

                    <label className="text-white font-medium">Description:</label>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                        className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-green-500"
                    />

                    <label className="text-white font-medium">User ID:</label>
                    <input
                        type="number"
                        value={userId}
                        onChange={handleUserIdChange}
                        required
                        className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-green-500"
                    />
                    {userIdError && <p className="text-red-500 text-sm">{userIdError}</p>}

                    <div className="flex justify-between mt-4">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ItemForm;
