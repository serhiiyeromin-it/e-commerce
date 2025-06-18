import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm"; // создашь чуть ниже

// 👇 заменишь на свой публичный ключ с dashboard.stripe.com
const stripePromise = loadStripe("pk_test_51RbHKnPxbFsiVLox2O2b3F8Nv9oQzgx8Qp10F4DhFSD6jLaqoNwLp1KLOwOxECpiAZNU378myvvPxyqaKSGDG4NH009CfTbLuQ");

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Payment;
