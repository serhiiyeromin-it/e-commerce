import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";

const ProductDetails = () => {
    const { addToCart } = useContext(CartContext);
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/products/${id}`)
            .then((res) => setProduct(res.data))
            .catch((err) => console.error("Ошибка загрузки товара:", err));
    }, [id]);

    if (!product) return <p>Загрузка...</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h2>{product.title}</h2>
            <img
                src={`http://localhost:5000${product.image}`}
                alt={product.title}
                style={{ width: 300, height: 300, objectFit: "cover" }}
            />
            <p><strong>Цена:</strong> {product.price} $</p>
            <p><strong>Описание:</strong> {product.description || "Нет описания"}</p>
            <button
                onClick={() => addToCart(product)}
                style={{ padding: "10px 20px", fontSize: "16px", marginTop: "10px", cursor: "pointer" }}
            >
                🛒 Добавить в корзину
            </button>
        </div>
    );
};

export default ProductDetails;

