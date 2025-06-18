import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.error(error);
      alert("Ошибка оплаты: " + error.message);
    } else {
      console.log("PaymentMethod:", paymentMethod);
      alert("Оплата прошла успешно!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Оплатить
      </button>
    </form>
  );
};

export default CheckoutForm;
