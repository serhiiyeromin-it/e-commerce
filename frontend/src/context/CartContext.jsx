
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
      (item) => item._id === product._id && item.price === product.price
    );

    if (existingItem) {
      // Wenn es bereits ein Produkt mit dem gleichen Preis gibt, erhöhen wir die Menge
      return prevItems.map((item) =>
        item._id === product._id && item.price === product.price
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // Andernfalls fügen wir es als neues Produkt hinzu
      return [...prevItems, { ...product, quantity: 1 }];
    }
  });
  };

 const removeFromCart = (productId) => {
  setCartItems((prevItems) => {
    return prevItems.flatMap((item) => {
      if (item._id === productId || item.id === productId) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 }; // Wir verringern die Menge um 1
        } else {
          return []; // Wir entfernen das Produkt, wenn die Menge 1 ist
        }
      }
      return item; // Wir lassen das Produkt unverändert
    });
  });
  };




  const clearCart = () => setCartItems([]);

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);


  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, totalCount }}
    >
      {children}
    </CartContext.Provider>
  );
};


