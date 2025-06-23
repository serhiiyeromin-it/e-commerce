// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Products = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     axios.get("http://localhost:5000/api/products", {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//     .then(res => setProducts(res.data))
//     .catch(err => console.error("Ошибка при загрузке товаров", err));
//   }, []);

//   const deleteProduct = async (id) => {
//     const token = localStorage.getItem("token");

//     if (!window.confirm("Удалить этот товар?")) return;

//     await axios.delete(`http://localhost:5000/api/products/${id}`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });

//     setProducts(products.filter(p => p._id !== id));
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>🛍️ Управление товарами</h2>
//       <ul>
//         {products.map(product => (
//           <li key={product._id} style={{ marginBottom: "10px" }}>
//             <strong>{product.name}</strong> — {product.price} ₽
//             <button onClick={() => deleteProduct(product._id)} style={{ marginLeft: "10px" }}>Удалить</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Products;

import React, { useEffect, useState } from "react";
import axios from "axios";

const Catalog = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Ошибка при загрузке каталога", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛍️ Каталог товаров</h2>
      <ul>
        {products.map(product => (
          <li key={product._id} style={{ marginBottom: "10px" }}>
            <strong>{product.title}</strong> — {product.price} ₽
            {/* если нужно изображение */}
            {product.image && (
              <div>
                <img
                  src={`http://localhost:5000/${product.image}`}
                  alt={product.title}
                  style={{ width: "100px", marginTop: "5px" }}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Catalog;


