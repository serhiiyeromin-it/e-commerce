// export default function Dashboard() {
//     return (
//         <div>
//             <h1>Личный кабинет</h1>
//             <p>Добро пожаловать в свою учетную запись!</p>
//             <button onClick={() => {
//                 localStorage.removeItem("token");
//                 window.location.href = "/login";
//             }}>Выйти</button>
//         </div>

//     );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Предполагаем, что токен есть в localStorage
    const token = localStorage.getItem("token");

    // Получение данных пользователя
    axios.get("http://localhost:5000/api/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Ошибка при загрузке данных пользователя", err));

    // Получение истории заказов
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
    <div>
      <h1>Личный кабинет</h1>
      <p>Добро пожаловать в свою учетную запись!</p>
      <button onClick={handleLogout}>Выйти</button>

      {/* Информация о пользователе */}
      {user && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
          <h2>🧑 Информация о пользователе</h2>
          <p><strong>Имя:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Адрес доставки:</strong> {user.address}</p>
        </div>
      )}

      {/* История заказов */}
      <div style={{ marginTop: "30px" }}>
        <h2>📦 История заказов</h2>
        {orders.length === 0 ? (
          <p>У вас пока нет заказов.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} style={{ border: "1px solid #aaa", marginBottom: "10px", padding: "10px" }}>
              <p><strong>Дата:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              <p><strong>Адрес:</strong> {order.address}</p>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>{item.name} — {item.price} ₽ × {item.quantity}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

