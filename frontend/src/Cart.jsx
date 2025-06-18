import React, { useContext } from "react";
import { CartContext } from "./context/CartContext";


const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

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
    <h3>Итого: {total} $</h3>
    </div>
  );
};

export default Cart;
