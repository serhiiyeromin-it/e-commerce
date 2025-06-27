

import React, { useContext } from "react";
import { CartContext } from "./context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>🛒 Корзина</h2>

      {cartItems.length === 0 ? (
        <p style={{ fontSize: "18px", color: "#888" }}>Корзина пуста</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cartItems.map((item) => (
            <li
              key={item.id}
              style={{
                borderBottom: "1px solid #eee",
                paddingBottom: "15px",
                marginBottom: "15px",
              }}
            >
              <strong style={{ fontSize: "18px" }}>
                📦 {item.title || "Без названия"}
              </strong>
              <div style={{ marginTop: "5px", fontSize: "16px" }}>
                Цена: {item.price} $ × {item.quantity} ={" "}
                <strong>{item.price * item.quantity} $</strong>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                style={{
                  marginTop: "10px",
                  background: "#e74c3c",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Удалить 1 шт
              </button>
            </li>
          ))}
        </ul>
      )}

      <h3 style={{ marginTop: "30px", fontSize: "20px" }}>
        💰 Итого: <span style={{ color: "#2c3e50" }}>{total} $</span>
      </h3>

      <button
        onClick={() => navigate("/checkout")}
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          fontSize: "16px",
          backgroundColor: "#3498db",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        🧾 Оформить заказ
      </button>
    </div>
  );
};

export default Cart;


