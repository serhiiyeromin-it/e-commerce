
import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const deleteOrder = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/admin/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Bestellung gelöscht");
      setOrders(orders.filter((o) => o._id !== id));
    } catch (err) {
      console.error("Fehler beim Löschen:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/admin/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Fehler beim Laden der Bestellungen:", err));
  }, []);

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "20px" }}>📦 Alle Bestellungen</h2>

      {orders.length === 0 ? (
        <p>Keine Bestellungen.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "20px",
              backgroundColor: "#f9fafb",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            }}
          >
            <p><strong>👤 Benutzer:</strong> {order.customer}</p>
            <p><strong>📍 Adresse:</strong> {order.address}</p>
            <p><strong>📅 Datum:</strong> {new Date(order.createdAt).toLocaleDateString("de-DE")}</p>

            <h4 style={{ marginTop: "15px", marginBottom: "8px" }}>🛒 Produkte:</h4>
            <ul style={{ paddingLeft: "20px", listStyle: "none", }}>
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} — {item.price} $ × {item.quantity || 1}
                </li>
              ))}
            </ul>

            <button
              onClick={() => deleteOrder(order._id)}
              style={{
                marginTop: "15px",
                backgroundColor: "#e53e3e",
                color: "white",
                border: "none",
                padding: "8px 14px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              ❌ Auftrag löschen
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
