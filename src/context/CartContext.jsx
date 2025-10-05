import React, { createContext, useContext, useState } from "react";

// Create Context
const CartContext = createContext();

// Cart Provider — wraps your whole app
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Add item to cart
  const addToCart = (item) => setCart((prev) => [...prev, item]);

  // Remove item by id
  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((item) => item.id !== id));

  // Clear all items
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook for easy access
export function useCart() {
  return useContext(CartContext);
}

