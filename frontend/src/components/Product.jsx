
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
    <div style={{ padding: "20px" }}>
      <h2>🛍️ Каталог товаров</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id} style={{ marginBottom: "10px" }}>
            <strong>{product.title}</strong> — {product.price} ₽
            {product.image && (
              <div>
                <img
                  src={`http://localhost:5000/${product.image}`}
                  alt={product.title}
                  style={{ width: "100px", marginTop: "5px" }}
                />
              </div>
            )}
            <button
              onClick={() =>
                addToCart({
                  id: product._id,
                  name: product.title,
                  price: product.price,
                })
              }
            >
              Добавить в корзину
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Catalog;

