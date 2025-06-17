// src/components/Product.jsx
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div>
      <h3>{product.name}</h3>
      <p>Цена: {product.price} ₽</p>
      <button onClick={() => addToCart(product)}>Добавить в корзину</button>
    </div>
  );
};

export default Product;
