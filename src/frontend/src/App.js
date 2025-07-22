import React, { useState, useEffect } from "react";

export default function ExcuseGenerator() {
  const [excuse, setExcuse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [moveRight, setMoveRight] = useState(true);
  const [category, setCategory] = useState("school");

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setMoveRight((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, [isLoading]);

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

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
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
    </div>
  );
}