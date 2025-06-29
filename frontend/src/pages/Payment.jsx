
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe("pk_test_51RbHKnPxbFsiVLox2O2b3F8Nv9oQzgx8Qp10F4DhFSD6jLaqoNwLp1KLOwOxECpiAZNU378myvvPxyqaKSGDG4NH009CfTbLuQ");

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state?.customer || !location.state?.address || !location.state?.cartItems) {
      navigate("/checkout");
    }
  }, [location, navigate]);

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "30px",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>💳 Zahlung für die Bestellung</h2>

      <Elements stripe={stripePromise}>
        <CheckoutForm orderData={location.state} />
      </Elements>
    </div>
  );
};

export default Payment;
