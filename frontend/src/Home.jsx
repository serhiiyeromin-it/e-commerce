
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./context/CartContext";
import axios from "axios";

const Home = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Ошибка загрузки товаров:", err);
      });
  }, []);

  return (
    <div>
      <h1>Каталог товаров</h1>
      <div>
        {products.map((p) => (
          
          <div key={p._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h3>{p.title}</h3>
            <img
              src={`http://localhost:5000${p.image}`}
              alt={p.title}
              style={{ width: 150, height: 150, objectFit: 'cover' }}
            />
            <p>{p.price} ₽</p>
            <button onClick={() => addToCart(p)}>Добавить в корзину</button>
          </div>

        ))}
      </div>
    </div>
  );
};

export default Home;
