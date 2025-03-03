const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchItems = async () => {
    const response = await fetch(API_URL);
    return response.json();
};

export const createItem = async (item: { title: string; body: string }) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
    });
    return response.json();
};

export const deleteItem = async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};

export const updateItem = async (item: { id: number; title: string; body: string }) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
    });
    return response.json();
};

