
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:5000/api/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Fehler beim Laden der Benutzerdaten", err));

    axios.get("http://localhost:5000/api/orders", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Fehler beim Laden der Bestellungen", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "50px auto",
        padding: "30px",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "10px", fontSize: "28px", color: "#333" }}>Benutzer-Dashboard</h1>
      <p style={{ fontSize: "18px", marginBottom: "20px" }}>
        Willkommen, <strong>{user?.name || "Benutzer"}</strong>!
      </p>

      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          backgroundColor: "#f44336",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "30px",
        }}
      >
        Abmelden
      </button>

      {user && (
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#f7f7f7",
            marginBottom: "40px",
          }}
        >
          <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>🧑 Benutzerinformationen</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {/* <p><strong>Lieferadresse:</strong> {user.address || "Nicht angegeben"}</p> */}
        </div>
      )}

      <div>
        <h2 style={{ fontSize: "20px", marginBottom: "15px" }}>📦 Bestellverlauf</h2>
        {orders.length === 0 ? (
          <p>Sie haben noch keine Bestellungen.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              style={{
                border: "1px solid #ccc",
                marginBottom: "20px",
                padding: "15px",
                borderRadius: "8px",
                backgroundColor: "#fdfdfd",
              }}
            >
              <p><strong>Datum:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              <p><strong>Lieferadresse:</strong> {order.address}</p>
              <ul style={{ paddingLeft: "20px", listStyle: "none", }}>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} — {item.price} $ × {item.quantity || 1}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

