import React from "react";
import { useCart } from "../../context/CartContext"; 

export default function MyCart() {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">My Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty 🛒</p>
      ) : (
        <>
          <ul>
            {cart.map((item, i) => (
              <li key={i} className="border-b py-2 flex justify-between">
                {item.name} — ₹{item.price}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={clearCart}
            className="mt-3 bg-gray-200 px-3 py-1 rounded"
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}
