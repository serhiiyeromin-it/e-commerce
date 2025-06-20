import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./admin.css"; // опционально, можно стилизовать

const AdminLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <nav style={{ width: "200px", padding: "1rem", background: "#f3f3f3" }}>
        <h3>Админ-панель</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><Link to="/admin">Главная</Link></li>
          <li><Link to="/admin/users">Пользователи</Link></li>
          <li><Link to="/admin/orders">Заказы</Link></li>
          <li><Link to="/admin/products">Товары</Link></li>
        </ul>
      </nav>
      <main style={{ flexGrow: 1, padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
