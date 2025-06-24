// components/Footer.jsx
const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div>© {new Date().getFullYear()} E-Commerce. Все права защищены.</div>
      <div style={styles.links}>
        <a href="/about" style={styles.link}>О нас</a>
        <a href="/contacts" style={styles.link}>Контакты</a>
        <a href="/privacy" style={styles.link}>Политика конфиденциальности</a>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    marginTop: "40px",
    padding: "20px",
    backgroundColor: "#f5f5f5",
    textAlign: "center",
    color: "#555",
    fontSize: "14px"
  },
  links: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
    gap: "15px"
  },
  link: {
    color: "#0077cc",
    textDecoration: "none"
  }
};

export default Footer;
