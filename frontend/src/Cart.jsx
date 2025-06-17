import React, { useContext } from "react";
import { CartContext } from "./context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <div style={{ border: "2px solid black", padding: "10px", marginBottom: "20px" }}>
      <h2>🛒 Корзина</h2>
      {cartItems.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} — {item.price} $
              <button onClick={() => removeFromCart(item.id)}>Удалить</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
