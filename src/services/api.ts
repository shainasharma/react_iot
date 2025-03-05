const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const deleteItem = async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};

