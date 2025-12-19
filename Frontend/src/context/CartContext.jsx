import React, { createContext, useContext, useState } from "react";

// Create Context
const CartContext = createContext();

// Cart Provider — wraps your whole app
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Add item to cart
<<<<<<< HEAD
  const addToCart = (item) => {
  setCart((prev) => {
    const existing = prev.find(
      (p) => p.id === item.id && p.size === item.size
    );

    if (existing) {
      return prev.map((p) =>
        p.id === item.id && p.size === item.size
          ? { ...p, quantity: p.quantity + 1 }
          : p
      );
    }

    return [...prev, item];
  });
};
=======
  const addToCart = (item) => setCart((prev) => [...prev, item]);
>>>>>>> cleanup-pycache

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

