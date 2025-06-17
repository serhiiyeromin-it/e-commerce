// src/Home.jsx
import React, { useContext } from "react";
import { CartContext } from "./context/CartContext"; // поправь путь если CartContext лежит глубже

const products = [
  { id: 1, name: "Футболка", price: 1200 },
  { id: 2, name: "Кроссовки", price: 4500 },
  { id: 3, name: "Кепка", price: 800 },
];

const Home = () => {
  const { addToCart } = useContext(CartContext);

  return (
    <div>
      <h1>Каталог товаров</h1>
      <div>
        {products.map((p) => (
          <div key={p.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h3>{p.name}</h3>
            <p>{p.price} $</p>
            <button onClick={() => addToCart(p)}>Добавить в корзину</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

