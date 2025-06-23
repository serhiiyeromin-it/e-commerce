
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
  console.log("cartItems:", cartItems);


  return (
    <div
      style={{
        border: "2px solid black",
        padding: "10px",
        marginBottom: "20px",
        maxWidth: "500px",
      }}
    >
      <h2>🛒 Корзина</h2>

      {cartItems.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cartItems.map((item) => (
            <li key={item.id} style={{ marginBottom: "10px" }}>
              <strong>📦 {item.title || "Без названия"}</strong>
              <div>
                Цена: {item.price} ₽ × {item.quantity} ={" "}
                <strong>{item.price * item.quantity} ₽</strong>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                style={{
                  marginTop: "5px",
                  background: "#ff4d4d",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                Удалить 1 шт
              </button>
            </li>

          ))}
        </ul>
      )}

      <h3>Итого: {total} ₽</h3>
      <button onClick={() => navigate("/checkout")}>
        🧾 Оформить заказ
      </button>
    </div>
  );
};

export default Cart;

