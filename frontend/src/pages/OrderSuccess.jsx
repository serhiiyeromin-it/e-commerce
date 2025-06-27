

import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "80px auto",
        padding: "30px",
        textAlign: "center",
        backgroundColor: "#f0fff4",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ fontSize: "28px", color: "#38a169", marginBottom: "15px" }}>
        ✅ Спасибо за заказ!
      </h2>
      <p style={{ fontSize: "18px", marginBottom: "30px" }}>
        Ваш заказ был успешно оформлен.
      </p>
      <Link
        to="/"
        style={{
          display: "inline-block",
          backgroundColor: "#38a169",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        ⬅ Вернуться на главную
      </Link>
    </div>
  );
};

export default OrderSuccess;
