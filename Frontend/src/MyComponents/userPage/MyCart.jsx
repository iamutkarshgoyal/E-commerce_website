import React from "react";
import { useCart } from "../../context/CartContext";

export default function MyCart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

return (
  <div className="cart-wrapper">
    <h2 className="cart-title">🛒 My Cart</h2>

    {cart.length === 0 ? (
      <div className="empty-cart">
        <p>Your cart is empty</p>
        <span>🛍️</span>
      </div>
    ) : (
      <div className="cart-layout">

        {/* LEFT : PRODUCTS */}
        <div className="cart-products">
          {cart.map((item) => (
            <div key={`${item.id}-${item.size}`} className="product-wrapper">

              {/* IMAGE CARD */}
              <div className="image-card">
                <div className="image-container">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="product-image"
                  />
                </div>
              </div>

              {/* DETAILS */}
              <div className="product-details">
                <h2 className="product-name">{item.name}</h2>
                <p className="price">₹{item.price}</p>

                <p className="meta">
                  Size: <b>{item.size}</b>
                </p>

                <p className="meta">
                  Quantity: <b>{item.quantity}</b>
                </p>

                <p className="total">
                  Total: ₹{item.price * item.quantity}
                </p>

                <button
                  className="btn danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT : ORDER SUMMARY */}
        <div className="summary-wrapper">
          <div className="summary-card">
            <h3>Order Summary</h3>

            <p>
              Subtotal <span>₹{subtotal}</span>
            </p>
            <p>
              Shipping <span>Free</span>
            </p>

            <hr />

            <p className="grand-total">
              Total <span>₹{subtotal}</span>
            </p>

            <button className="btn primary">Proceed to Checkout</button>

            <button className="btn clear" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    )}

    {/* STYLES */}
    <style>{`
      .cart-wrapper {
        max-width: 1200px;
        margin: 40px auto;
        padding: 20px;
      }

      .cart-title {
        font-size: 26px;
        margin-bottom: 30px;
      }

      /* LAYOUT */
      .cart-layout {
        display: flex;
        gap: 32px;
        align-items: flex-start;
      }

      .cart-products {
        flex: 2;
      }

      .summary-wrapper {
        flex: 1;
        position: sticky;
        top: 100px;
      }

      /* PRODUCT CARD */
      .product-wrapper {
        display: flex;
        gap: 24px;
        margin-bottom: 24px;
        padding: 20px;
        border-radius: 18px;
        background: #fff;
        box-shadow: 0 10px 25px rgba(0,0,0,0.08);
      }

      .image-card {
        width: 260px;
        padding: 14px;
        border-radius: 18px;
        background: #fff;
        box-shadow: 0 8px 20px rgba(0,0,0,0.12);
      }

      .image-container {
        height: 320px;
        border-radius: 14px;
        overflow: hidden;
      }

      .product-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      /* DETAILS */
      .product-details {
        flex: 1;
      }

      .product-name {
        font-size: 22px;
        margin-bottom: 8px;
      }

      .price {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 10px;
      }

      .meta {
        color: #666;
        margin-bottom: 6px;
      }

      .total {
        font-weight: 600;
        margin: 14px 0;
      }

      /* SUMMARY */
      .summary-card {
        padding: 24px;
        border-radius: 18px;
        background: #fff;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      }

      .summary-card p {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
      }

      .grand-total {
        font-size: 20px;
        font-weight: 600;
      }

      /* BUTTONS */
      .btn {
        width: 100%;
        padding: 14px;
        border-radius: 12px;
        font-size: 16px;
        margin-top: 12px;
        cursor: pointer;
        border: none;
      }

      .primary {
        background: #000;
        color: #fff;
      }

      .danger {
        background: #ffeded;
        color: #c00;
      }

      .clear {
        background: none;
        color: #666;
      }

      /* MOBILE */
      @media (max-width: 900px) {
        .cart-layout {
          flex-direction: column;
        }

        .summary-wrapper {
          position: static;
        }

        .image-card {
          width: 100%;
        }
      }
    `}</style>
  </div>
);
}
