import React, { useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";

const Checkout = () => {
    const [customer, setCustomer] = useState("");
    const [address, setAddress] = useState("");
    const { cartItems, clearCart } = useContext(CartContext);

    //   const handleOrder = async () => {
    //     try {
    //       const response = await axios.post("http://localhost:5000/api/order", {
    //         customer,
    //         address,
    //         items: cartItems,
    //       });

    //       alert("Заказ создан!");
    //       clearCart();
    //       setCustomer("");
    //       setAddress("");
    //     } catch (error) {
    //       console.error("Ошибка при заказе", error);
    //     }
    //   };
    const handleOrder = async () => {
        try {
            const orderItems = cartItems.map((item) => ({
                productId: item.id, // или item._id, в зависимости от источника
                name: item.name,
                price: item.price,
                quantity: 1, // 👈 если нет выбора количества
            }));

            console.log("cartItems", cartItems);


            const response = await axios.post("http://localhost:5000/api/order", {
                customer,
                address,
                items: orderItems,
            });

            alert("Заказ создан!");
            clearCart();
            setCustomer("");
            setAddress("");
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
                        {item.name} - {item.price} ₽
                    </li>
                ))}
            </ul>

            <button onClick={handleOrder}>Оплатить</button>
        </div>
    );
};

export default Checkout;

