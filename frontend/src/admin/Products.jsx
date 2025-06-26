
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
  const fileInputRef = useRef(null);

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
      setForm({ title: "", description: "", price: "", image: null });
      if (fileInputRef.current) fileInputRef.current.value = null;
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
      setProducts(products.filter((p) => p._id !== id));
      alert("Товар удалён");
    } catch (err) {
      console.error("Ошибка удаления:", err.response?.data || err.message);
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "20px" }}>📦 Управление товарами</h2>

      <div style={{ marginBottom: "40px" }}>
        {products.length === 0 ? (
          <p>Нет добавленных товаров.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {products.map((p) => (
              <li
                key={p._id}
                style={{
                  padding: "15px",
                  marginBottom: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <strong>{p.title}</strong> — {p.price} $
                </div>
                <button
                  onClick={() => deleteProduct(p._id)}
                  style={{
                    backgroundColor: "#e53e3e",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <h3 style={{ marginBottom: "15px" }}>➕ Добавить товар</h3>
      <div
        style={{
          display: "grid",
          gap: "10px",
          maxWidth: "400px",
          marginBottom: "20px",
        }}
      >
        <input
          placeholder="Название"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <input
          placeholder="Описание"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <input
          type="number"
          placeholder="Цена"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          style={{ padding: "6px" }}
        />
        <button
          onClick={addProduct}
          style={{
            padding: "10px",
            backgroundColor: "#3182ce",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Добавить товар
        </button>
      </div>
    </div>
  );
};

export default Products;
