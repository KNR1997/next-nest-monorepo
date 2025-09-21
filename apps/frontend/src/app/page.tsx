"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [newTodo, setNewTodo] = useState("");

  // Fetch todos
  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const addTodo = async () => {
    const res = await fetch("http://localhost:4000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTodo }),
    });
    const todo = await res.json();
    setProducts([...products, todo]);
    setNewTodo("");
  };

  const deleteTodo = async (id: number) => {
    await fetch(`http://localhost:4000/products/${id}`, { method: "DELETE" });
    setProducts(products.filter(t => t.id !== id));
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Todos</h1>

      <div className="flex gap-2 mt-4">
        <input
          className="border p-2"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo} className="bg-blue-500 text-white px-3 py-2 rounded">
          Add
        </button>
      </div>

      <ul className="mt-6">
        {products.map(product => (
          <li key={product.id} className="flex justify-between p-2 border-b">
            {product.name}
            <button
              onClick={() => deleteTodo(product.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
