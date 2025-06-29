
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ orderData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Wir berechnen den Gesamtbetrag
    const total = orderData.cartItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );

    // Wir erhalten das clientSecret
    const getClientSecret = async () => {
      const res = await axios.post("http://localhost:5000/api/create-payment-intent", {
        amount: total * 100, // Stripe akzeptiert Cent-Beträge
      });
      setClientSecret(res.data.clientSecret);
    };

    getClientSecret();
  }, [orderData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        console.error("Payment failed:", error);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        const token = localStorage.getItem("token");

        await axios.post(
          "http://localhost:5000/api/order",
          {
            customer: orderData.customer,
            address: orderData.address,
            items: orderData.cartItems.map((item) => ({
              productId: item._id || item.id,
              name: item.title || item.name,
              price: item.price,
              quantity: item.quantity || 1,
            })),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        clearCart();
        navigate("/success");
      }
    } catch (err) {
      console.error("Fehler bei der Zahlung oder Bestellung:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || !clientSecret}>
        Оплатить
      </button>
    </form>
  );
};

export default CheckoutForm;

