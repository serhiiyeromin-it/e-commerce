
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });

  const fileInputRef = useRef(null); // ссылка на input type="file"

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/admin/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Ошибка загрузки продуктов:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async () => {
    const token = localStorage.getItem("token");
    const data = new FormData();

    data.append("title", form.title);
    data.append("description", form.description);
    data.append("price", form.price);
    data.append("image", form.image);

    try {
      await axios.post("http://localhost:5000/api/admin/products", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Товар добавлен");
      fetchProducts();

      // Очищаем форму
      setForm({
        title: "",
        description: "",
        price: "",
        image: null,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = null; // очищаем поле выбора файла
      }
    } catch (err) {
      console.error("Ошибка добавления:", err.response?.data || err.message);
    }
  };

  const deleteProduct = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter(p => p._id !== id));
      alert("Товар удалён");
    } catch (err) {
      console.error("Ошибка удаления:", err.response?.data || err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 Товары</h2>
      <ul>
        {products.map((p) => (
          <li key={p._id}>
            {p.title} — {p.price} ₽
            <button onClick={() => deleteProduct(p._id)} style={{ marginLeft: "10px" }}>
              Удалить
            </button>
          </li>
        ))}
      </ul>

      <h3>➕ Добавить товар</h3>
      <input
        placeholder="Название"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
      />
      <input
        placeholder="Описание"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
      />
      <input
        placeholder="Цена"
        type="number"
        value={form.price}
        onChange={e => setForm({ ...form, price: e.target.value })}
      />

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={e => setForm({ ...form, image: e.target.files[0] })}
      />

      <button onClick={addProduct}>Добавить товар</button>
    </div>
  );
};

export default Products;

