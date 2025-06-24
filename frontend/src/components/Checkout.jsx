import React, { useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const [customer, setCustomer] = useState("");
    const [address, setAddress] = useState("");
    const { cartItems, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleGoToPayment = () => {
        navigate("/payment", {
            state: {
                customer,
                address,
                cartItems,
            },
        });
    };


    const handleOrder = async () => {
        try {
            const orderItems = cartItems.map((item) => ({
                productId: item.id, // или item._id, в зависимости от источника
                name: item.name,
                price: item.price,
                quantity: 1, // 👈 если нет выбора количества
            }));

            console.log("cartItems", cartItems);

            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:5000/api/order",
                {
                    customer,
                    address,
                    items: orderItems,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            alert("Заказ создан!");
            clearCart();
            setCustomer("");
            setAddress("");
            navigate("/success");
            window.location.reload();
        } catch (error) {
            console.error("Ошибка при заказе", error);
        }
    };


    return (
        <div>
            <h2>Оформление заказа</h2>

            <input
                type="text"
                placeholder="Имя"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
            />

            <input
                type="text"
                placeholder="Адрес"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />

            <h3>Товары в корзине:</h3>
            <ul>
                {cartItems.map((item) => (
                    <li key={item.id}>
                        {item.title} - {item.price} $
                    </li>
                ))}
            </ul>

            {/* <button onClick={handleOrder}>Оплатить</button> */}
            <button onClick={handleGoToPayment}>Оплатить</button>

        </div>
    );
};

export default Checkout;

