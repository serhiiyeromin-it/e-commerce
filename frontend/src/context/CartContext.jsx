
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
  setCartItems((prevItems) => {
    const existingItem = prevItems.find(
      (item) => item.id === product.id && item.price === product.price
    );

    if (existingItem) {
      // Если товар с такой же ценой уже есть — увеличиваем количество
      return prevItems.map((item) =>
        item.id === product.id && item.price === product.price
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // Иначе добавляем как новый
      return [...prevItems, { ...product, quantity: 1 }];
    }
  });
  };

 const removeFromCart = (productId) => {
  setCartItems((prevItems) => {
    return prevItems.flatMap((item) => {
      if (item._id === productId || item.id === productId) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 }; // уменьшаем на 1
        } else {
          return []; // удаляем, если 1
        }
      }
      return item; // оставляем без изменений
    });
  });
  };




  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};


