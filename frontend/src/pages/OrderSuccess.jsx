// src/pages/OrderSuccess.jsx
import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div>
      <h2>✅ Спасибо за заказ!</h2>
      <p>Ваш заказ был успешно оформлен.</p>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
};

export default OrderSuccess;
