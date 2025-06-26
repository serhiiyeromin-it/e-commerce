

import React, { useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleGoToPayment = () => {
    navigate("/payment", {
      state: {
        customer,
        address,
        cartItems,
      },
    });
  };

  const handleOrder = async () => {
    try {
      const orderItems = cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
      }));

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/order",
        {
          customer,
          address,
          items: orderItems,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Заказ создан!");
      clearCart();
      setCustomer("");
      setAddress("");
      navigate("/success");
      window.location.reload();
    } catch (error) {
      console.error("Ошибка при заказе", error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "30px",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>📝 Оформление заказа</h2>

      <input
        type="text"
        placeholder="Имя"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <input
        type="text"
        placeholder="Адрес"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <h3 style={{ marginBottom: "10px" }}>🛍️ Товары в корзине:</h3>
      <ul style={{ paddingLeft: "20px", marginBottom: "20px" }}>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.title} — <strong>{item.price} $</strong>
          </li>
        ))}
      </ul>

      <button
        onClick={handleGoToPayment}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        💳 Перейти к оплате
      </button>
    </div>
  );
};

export default Checkout;


