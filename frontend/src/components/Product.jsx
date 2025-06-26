
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "./context/CartContext";

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Ошибка при загрузке каталога", err));
  }, []);

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ fontSize: "28px", marginBottom: "30px", textAlign: "center" }}>
        🛍️ Каталог товаров
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              backgroundColor: "#fff",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {product.image && (
              <img
                src={`http://localhost:5000/${product.image}`}
                alt={product.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />
            )}

            <h3 style={{ fontSize: "18px", margin: "10px 0" }}>
              {product.title}
            </h3>
            <p style={{ fontWeight: "bold", color: "#38a169" }}>
              💰 {product.price} $
            </p>

            <button
              onClick={() =>
                addToCart({
                  id: product._id,
                  name: product.title,
                  price: product.price,
                })
              }
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                backgroundColor: "#3182ce",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#2b6cb0")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#3182ce")}
            >
              🛒 Добавить в корзину
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
