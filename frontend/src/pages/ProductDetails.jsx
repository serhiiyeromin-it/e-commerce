

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";

const ProductDetails = () => {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Ошибка загрузки товара:", err));
  }, [id]);

  if (!product) return <p style={{ textAlign: "center" }}>Загрузка...</p>;

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "60px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
        display: "flex",
        gap: "30px",
        backgroundColor: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <img
        src={`http://localhost:5000${product.image}`}
        alt={product.title}
        style={{
          width: "350px",
          height: "350px",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>{product.title}</h2>
        <p style={{ fontSize: "20px", fontWeight: "bold", color: "#38a169" }}>
          💰 {product.price} $
        </p>
        <p style={{ margin: "20px 0", fontSize: "16px", color: "#333" }}>
          {product.description || "Нет описания"}
        </p>
        <button
          onClick={() => addToCart(product)}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: "#3182ce",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#2b6cb0")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#3182ce")}
        >
          🛒 Добавить в корзину
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;

