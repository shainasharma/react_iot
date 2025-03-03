import { useState } from "react";
import { createItem } from "../services/api";

const AddItem = ({ onAdd, onClose }: { onAdd: () => void; onClose: () => void }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createItem({ title, body });
    onAdd();
    setTitle("");
    setBody("");
    onClose(); // Close modal after adding
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl font-bold mb-2">Add New Item</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <textarea
        placeholder="Description"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Item
      </button>
    </form>
  );
};

export default AddItem;
