
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
    <div style={{ padding: "20px" }}>
      <h1>Личный кабинет</h1>
      <p>Добро пожаловать, {user?.name || "пользователь"}!</p>
      <button onClick={handleLogout}>Выйти</button>

      {user && (
        <div style={{
          marginTop: "20px",
          border: "1px solid #ccc",
          padding: "15px",
          borderRadius: "8px"
        }}>
          <h2>🧑 Информация о пользователе</h2>
          <p><strong>Имя:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Адрес доставки:</strong> {user.address || "Не указан"}</p>
        </div>
      )}

      <div style={{ marginTop: "30px" }}>
        <h2>📦 История заказов</h2>
        {orders.length === 0 ? (
          <p>У вас пока нет заказов.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              style={{
                border: "1px solid #aaa",
                marginBottom: "15px",
                padding: "10px",
                borderRadius: "6px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <p><strong>Дата:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              <p><strong>Адрес доставки:</strong> {order.address}</p>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} — {item.price} ₽ × {item.quantity || 1}
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


