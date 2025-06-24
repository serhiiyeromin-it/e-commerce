import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const deleteOrder = async (id) => {
  const token = localStorage.getItem("token");
  try {
    await axios.delete(`http://localhost:5000/api/admin/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert("Заказ удалён");
    setOrders(orders.filter(o => o._id !== id)); // обновляем
  } catch (err) {
    console.error("Ошибка удаления:", err.response?.data || err.message);
  }
  };



  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:5000/api/admin/orders", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setOrders(res.data))
    .catch(err => console.error("Ошибка при загрузке заказов", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 Все заказы</h2>
      {orders.map(order => (
        <div key={order._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <p><strong>Пользователь:</strong> {order.customer}</p>
          <p><strong>Адрес:</strong> {order.address}</p>
          <p><strong>Дата:</strong> {new Date(order.createdAt).toLocaleDateString("ru-RU")}</p>
          <ul>
            {order.items.map((item, idx) => (
              <li key={idx}>{item.name} — {item.price} $ × {item.quantity || 1}</li>
            ))}
            <button onClick={() => deleteOrder(order._id)}>Удалить заказ</button>

          </ul>
        </div>
      ))}
    </div>
  );
};

export default Orders;

