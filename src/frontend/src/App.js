import React, { useState, useEffect } from "react";

export default function ExcuseGenerator() {
  const [excuse, setExcuse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [moveRight, setMoveRight] = useState(true);

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

      const res = await fetch("/api/excuse/random");
      const data = await res.json();

      //TODO: Fix the API response
      setExcuse(data.excuse); // API should return { text: "Your excuse here" } and it is not doing that
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
