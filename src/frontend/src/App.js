import React, { useState, useEffect } from "react";

export default function ExcuseGenerator() {
    const [excuse, setExcuse] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [moveRight, setMoveRight] = useState(true);
    const [category, setCategory] = useState("school");

    const [allExcuses, setAllExcuses] = useState([]);
    const [newExcuse, setNewExcuse] = useState("");
    const [newCategory, setNewCategory] = useState("");

    useEffect(() => {
        if (!isLoading) return;

    const interval = setInterval(() => {
        setMoveRight((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
    }, [isLoading]);

    const fetchAllExcuses = async () => {
        const res = await fetch("http://localhost:8080/api/excuse");
        const data = await res.json();
        setAllExcuses(data);
    };

    const addExcuse = async (e) => {
        e.preventDefault();
        if (!newExcuse.trim() || !newCategory.trim()) return;
        await fetch("http://localhost:8080/api/excuse", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ excuse: newExcuse, category: newCategory }),
        });
        setNewExcuse("");
        setNewCategory("");
        fetchAllExcuses();
    };

    const deleteExcuse = async (id) => {
        await fetch(`http://localhost:8080/api/excuse/${id}`, { method: "DELETE" });
        fetchAllExcuses();
    };

    const fetchExcuse = async () => {
        setIsLoading(true);
        setExcuse("");

    try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const res = await fetch(`/api/excuse/${category}`);
        const data = await res.json();
        setExcuse(data.excuse);
    } catch {
        setExcuse("Oops! Failed to fetch an excuse.");
    } finally {
        setIsLoading(false);
    }
    };

    useEffect(() => {
        fetchAllExcuses();
    }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          border: "1px solid #ccc",
          padding: 20,
          borderRadius: 10,
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1>Random Excuse</h1>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ marginBottom: 20, padding: 5, fontSize: 16 }}
        >
          <option value="school">School</option>
          <option value="work">Work</option>
          <option value="girlfriend">Girlfriend</option>
        </select>
        {isLoading && (
          <p
            style={{
              margin: "20px 0",
              fontWeight: "bold",
              color: "#4f46e5",
              position: "relative",
              left: moveRight ? 10 : -10,
              transition: "left 0.4s ease-in-out",
            }}
          >
            losu... losu... losu...
          </p>
        )}

        {!isLoading && excuse && <p style={{ margin: "20px 0", fontWeight: "bold" }}>{excuse}</p>}

        <button
          onClick={fetchExcuse}
          disabled={isLoading}
          style={{
            marginTop: 10,
            padding: "10px 20px",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Loading..." : "Generate"}
        </button>
      </div>
      <button
          style={{
              marginTop: 10,
              padding: "10px 20px",
              cursor: isLoading ? "not-allowed" : "pointer",
          }}
        onClick={() => window.location.href = "http://localhost:8080/api/excuse/manage"}
      >
        Manage Excuses
      </button>
      {/* CRUD Panel */}
      <div className="w-full max-w-2xl mt-12">
        <h2 className="text-xl font-bold mb-4">Manage Excuses</h2>
        <form onSubmit={addExcuse} className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            type="text"
            placeholder="Excuse"
            value={newExcuse}
            onChange={(e) => setNewExcuse(e.target.value)}
            className="border p-2 flex-1 rounded"
          />
          <input
            type="text"
            placeholder="Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="border p-2 flex-1 rounded"
          />
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
            Add
          </button>
        </form>
        <ul className="space-y-2">
          {allExcuses.map((ex) => (
            <li
              key={ex.id}
              className="flex justify-between items-center bg-white shadow p-3 rounded"
            >
              <span>
                <strong>{ex.excuse}</strong> ({ex.category})
              </span>
              <button
                onClick={() => deleteExcuse(ex.id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}