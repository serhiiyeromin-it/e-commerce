
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const location = useLocation();

  const navItems = [
    { to: "/admin", label: "🏠 Heim" },
    { to: "/admin/users", label: "👤 Benutzer" },
    { to: "/admin/orders", label: "📦 Bestellungen" },
    { to: "/admin/products", label: "🛒 Produkte" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* Sidebar */}
      <nav
        style={{
          width: "220px",
          background: "#2d3748",
          color: "white",
          padding: "20px",
        }}
      >
        <h2 style={{ fontSize: "22px", marginBottom: "20px" }}>👑 Admin-Panel</h2>
        <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                style={{
                  textDecoration: "none",
                  color: location.pathname === item.to ? "#63b3ed" : "white",
                  fontWeight: location.pathname === item.to ? "bold" : "normal",
                  backgroundColor: location.pathname === item.to ? "#1a202c" : "transparent",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  display: "block",
                  transition: "all 0.2s",
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main
        style={{
          flexGrow: 1,
          padding: "30px",
          backgroundColor: "#f7fafc",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;


