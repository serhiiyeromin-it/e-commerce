// import { useState } from "react";

// const ProductList = ({ products }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOrder, setSortOrder] = useState(""); // "asc" или "desc"

//   // Фильтрация по названию
//   let filteredProducts = products.filter((product) =>
//     product.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Сортировка по цене
//   if (sortOrder === "asc") {
//     filteredProducts.sort((a, b) => a.price - b.price);
//   } else if (sortOrder === "desc") {
//     filteredProducts.sort((a, b) => b.price - a.price);
//   }

//   return (
//     <div>
//       <h2>Товары</h2>

//       <input
//         type="text"
//         placeholder="Поиск по названию"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       <select onChange={(e) => setSortOrder(e.target.value)}>
//         <option value="">Сортировка по</option>
//         <option value="asc">Цена ↑</option>
//         <option value="desc">Цена ↓</option>
//       </select>

//       <div className="product-grid">
//         {filteredProducts.map((product) => (
//           <div key={product.id} className="product">
//             <h3>{product.title}</h3>
//             <p>Цена: {product.price} ₽</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductList;

import { useState } from "react";

const ProductList = ({ products, addToCart }) => {
  const [inputValue, setInputValue] = useState("");  // текст в поле ввода
  const [searchTerm, setSearchTerm] = useState("");  // подтверждённый запрос
  const [sortOrder, setSortOrder] = useState("");    // "asc" или "desc"

  // Фильтрация
  let filteredProducts = products;

  if (searchTerm) {
    filteredProducts = filteredProducts.filter((product) =>
      product.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Сортировка по цене
  if (sortOrder === "asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div>
      <h2>Товары</h2>

      <input
        type="text"
        placeholder="Поиск по названию"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <button onClick={() => setSearchTerm(inputValue)}>🔍 Поиск</button>

      <select onChange={(e) => setSortOrder(e.target.value)}>
        <option value="">Сортировка по</option>
        <option value="asc">Цена ↑</option>
        <option value="desc">Цена ↓</option>
      </select>

      {/* Только если есть результат поиска, показываем товары */}
      {searchTerm && (
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="product">
                <h3>{product.title}</h3>
                <p>Цена: {product.price} $</p>
                {addToCart && (
                  <button onClick={() => addToCart(product)}>Добавить в корзину</button>
                )}
              </div>
            ))
          ) : (
            <p>Ничего не найдено.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;

