
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate, NavLink } from "react-router-dom";
import logo from '../assets/E-Commerce.png';

const Header = () => {
  const { totalCount } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <header style={styles.header}>
      {/* ЛОГО */}
      <img
        src={logo}
        alt="E-Commerce Logo"
        onClick={() => navigate("/")}
        style={styles.logo}
      />


      {/* Навигация */}
      <nav style={styles.nav}>
        <NavLink to="/" style={styles.link}>Главная</NavLink>
        <NavLink to="/login" style={styles.link}>login</NavLink>
        <NavLink to="/register" style={styles.link}>register</NavLink>
      </nav>

      {/* Корзина */}
      <div onClick={() => navigate("/cart")} style={styles.cart}>
        🛒
        {totalCount > 0 && (
          <span style={styles.badge}>{totalCount}</span>
        )}
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    background: "#f5f5f5",
  },
  logo: {
    height: "100px",
    cursor: "pointer",
  },
  nav: {
    display: "flex",
    gap: "20px",
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "bold",
  },
  cart: {
    position: "relative",
    fontSize: "24px",
    cursor: "pointer",
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -10,
    background: "red",
    color: "white",
    borderRadius: "50%",
    padding: "2px 6px",
    fontSize: "12px",
  },
};

export default Header;
