
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe("pk_test_51RbHKnPxbFsiVLox2O2b3F8Nv9oQzgx8Qp10F4DhFSD6jLaqoNwLp1KLOwOxECpiAZNU378myvvPxyqaKSGDG4NH009CfTbLuQ");

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // если нет данных — вернуться на форму
  useEffect(() => {
    if (!location.state?.customer || !location.state?.address || !location.state?.cartItems) {
      navigate("/checkout");
    }
  }, [location, navigate]);

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm orderData={location.state} />
    </Elements>
  );
};

export default Payment;
