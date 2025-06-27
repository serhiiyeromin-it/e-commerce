// src/admin/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "30px",
        borderRadius: "12px",
        backgroundColor: "#f9fafb",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>👑 Админ-панель</h1>
      <p style={{ fontSize: "18px", color: "#555" }}>
        Выберите раздел для управления:
      </p>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          marginTop: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <li>
          <Link
            to="/admin/users"
            style={{
              display: "block",
              padding: "12px 20px",
              backgroundColor: "#3182ce",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "8px",
              fontSize: "18px",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#2b6cb0")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#3182ce")}
          >
            👤 Пользователи
          </Link>
        </li>
        <li>
          <Link
            to="/admin/orders"
            style={{
              display: "block",
              padding: "12px 20px",
              backgroundColor: "#38a169",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "8px",
              fontSize: "18px",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#2f855a")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#38a169")}
          >
            📦 Заказы
          </Link>
        </li>
        <li>
          <Link
            to="/admin/products"
            style={{
              display: "block",
              padding: "12px 20px",
              backgroundColor: "#d69e2e",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "8px",
              fontSize: "18px",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#b7791f")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#d69e2e")}
          >
            🛒 Товары
          </Link>
        </li>
      </ul>
    </div>
  );
}

