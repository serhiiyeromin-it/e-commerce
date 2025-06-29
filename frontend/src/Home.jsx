
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./context/CartContext";
import axios from "axios"; 
import Banner from "./components/Banner";
import { Link } from "react-router-dom";

const Home = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products") 
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch((err) => {
        console.error("Fehler beim Laden der Produkte:", err);
      });
  }, []);

  const handleSearch = () => {
    let filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  };

  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);

    let sorted = [...filteredProducts];
    if (order === "asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (order === "desc") {
      sorted.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(sorted);
  };

  return (
    <div>
      <Banner />
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="🔎 Suche nach Titel"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>
          Finden
        </button>

        <select onChange={handleSortChange} value={sortOrder} style={styles.select}>
          <option value="">Sortierung</option>
          <option value="asc">Preis ↑</option>
          <option value="desc">Preis ↓</option>
        </select>
      </div>

      <div style={styles.productGrid}>
        {filteredProducts.map((p) => (
          <div key={p._id} style={styles.card}>
            <Link to={`/product/${p._id}`} style={{ textDecoration: "none", color: "black" }}>
              <h3>{p.title}</h3>
              <img
                src={`http://localhost:5000${p.image}`}
                alt={p.title}
                style={{ width: 150, height: 150, objectFit: 'cover' }}
              />
              <p>{p.price} $</p>
            </Link>
            <button onClick={() => addToCart(p)}>
              In den Warenkorb legen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  searchContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "30px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "200px",
    outline: "none",
    fontSize: "14px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  button: {
    padding: "10px 15px",
    borderRadius: "8px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },
  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
    background: "#fff",
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px",
  },
  card: {
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
  },
};


export default Home;







