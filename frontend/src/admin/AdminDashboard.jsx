// src/admin/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>👑 Админ-панель</h1>
      <p>Выберите раздел для управления:</p>

      <ul style={{ listStyle: "none", paddingLeft: 0, marginTop: "20px" }}>
        <li>
          <Link to="/admin/users">👤 Пользователи</Link>
        </li>
        <li>
          <Link to="/admin/orders">📦 Заказы</Link>
        </li>
        <li>
          <Link to="/admin/products">🛒 Товары</Link>
        </li>
      </ul>
    </div>
  );
}
