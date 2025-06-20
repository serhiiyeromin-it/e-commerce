import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Товары</h2>
      <ul>
        {products.map((p) => (
          <li key={p._id}>{p.name} — {p.price} ₽</li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
