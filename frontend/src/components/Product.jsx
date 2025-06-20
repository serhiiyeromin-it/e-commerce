import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:5000/api/products", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setProducts(res.data))
    .catch(err => console.error("Ошибка при загрузке товаров", err));
  }, []);

  const deleteProduct = async (id) => {
    const token = localStorage.getItem("token");

    if (!window.confirm("Удалить этот товар?")) return;

    await axios.delete(`http://localhost:5000/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setProducts(products.filter(p => p._id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛍️ Управление товарами</h2>
      <ul>
        {products.map(product => (
          <li key={product._id} style={{ marginBottom: "10px" }}>
            <strong>{product.name}</strong> — {product.price} ₽
            <button onClick={() => deleteProduct(product._id)} style={{ marginLeft: "10px" }}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;

