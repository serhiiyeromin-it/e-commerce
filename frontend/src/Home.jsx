
// import React, { useContext, useEffect, useState } from "react";
// import { CartContext } from "./context/CartContext";
// import axios from "axios";
// import ProductList from "./components/ProductList";

// const Home = () => {
//   const { addToCart } = useContext(CartContext);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/products")
//       .then((res) => {
//         setProducts(res.data);
//       })
//       .catch((err) => {
//         console.error("Ошибка загрузки товаров:", err);
//       });
//   }, []);

//   return (
//     <div>
//       {/* <ProductList products={products} /> */}
//       <ProductList products={products} addToCart={addToCart} />

//       <h1>Каталог товаров</h1>
//       <div>
//         {products.map((p) => (
          
//           <div key={p._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
//             <h3>{p.title}</h3>
//             <img
//               src={`http://localhost:5000${p.image}`}
//               alt={p.title}
//               style={{ width: 150, height: 150, objectFit: 'cover' }}
//             />
//             <p>{p.price} $</p>
//             <button onClick={() => addToCart(p)}>Добавить в корзину</button>
//           </div>

//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./context/CartContext";
import axios from "axios";

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
        setFilteredProducts(res.data); // по умолчанию — все товары
      })
      .catch((err) => {
        console.error("Ошибка загрузки товаров:", err);
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

    // Применим сортировку к уже отфильтрованным
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
      <h1>Каталог товаров</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Поиск по названию"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>🔍 Найти</button>

        <select onChange={handleSortChange} value={sortOrder}>
          <option value="">Сортировка</option>
          <option value="asc">Цена ↑</option>
          <option value="desc">Цена ↓</option>
        </select>
      </div>

      <div>
        {filteredProducts.map((p) => (
          <div key={p._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h3>{p.title}</h3>
            <img
              src={`http://localhost:5000${p.image}`}
              alt={p.title}
              style={{ width: 150, height: 150, objectFit: 'cover' }}
            />
            <p>{p.price} $</p>
            <button onClick={() => addToCart(p)}>Добавить в корзину</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;







