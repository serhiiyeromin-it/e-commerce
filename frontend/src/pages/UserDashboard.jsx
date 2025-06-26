
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
      .catch((err) => console.error("Ошибка при загрузке данных пользователя", err));

    axios.get("http://localhost:5000/api/orders", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Ошибка при загрузке заказов", err));
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
      <h1 style={{ marginBottom: "10px", fontSize: "28px", color: "#333" }}>Личный кабинет</h1>
      <p style={{ fontSize: "18px", marginBottom: "20px" }}>
        Добро пожаловать, <strong>{user?.name || "пользователь"}</strong>!
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
        Выйти
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
          <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>🧑 Информация о пользователе</h2>
          <p><strong>Имя:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {/* <p><strong>Адрес доставки:</strong> {user.address || "Не указан"}</p> */}
        </div>
      )}

      <div>
        <h2 style={{ fontSize: "20px", marginBottom: "15px" }}>📦 История заказов</h2>
        {orders.length === 0 ? (
          <p>У вас пока нет заказов.</p>
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
              <p><strong>Дата:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              <p><strong>Адрес доставки:</strong> {order.address}</p>
              <ul style={{ paddingLeft: "20px" }}>
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

