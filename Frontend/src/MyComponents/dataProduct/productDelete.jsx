import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductDelete = () => {
  const navigate = useNavigate();

  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // 🔍 Fetch product details
  const handleFetch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8000/products/${productId}`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      const productData = Array.isArray(data) ? data[0] : data;
      if (!productData) throw new Error("Product not found");
      setProduct(productData);
    } catch (err) {
      console.error(err);
      setError("❌ Product not found. Please check the ID and try again.");
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  // ❌ Delete product
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    setActionLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8000/delete_product/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      alert("✅ Product deleted successfully!");
      setProduct(null);
      setProductId("");
    } catch (err) {
      console.error(err);
      setError("❌ Failed to delete product. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

    const handleUpdateClick = () => {
        if (!productId) {
            alert("Please fetch a product first!");
            return;
        }
        navigate("/update_product/", { state: { productId } });
    };

  return (
    <>
      <div className="delete-product-container">
        <div className="card">
          <h2 className="title">🛍️ Product Management</h2>

          {/* Fetch Form */}
          <form onSubmit={handleFetch}>
            <div className="form-group">
              <input
                type="text"
                id="productId"
                name="productId"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="Enter product ID"
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Fetching..." : "Fetch Product"}
            </button>
          </form>

          {/* Error Message */}
          {error && <div className="error-message">{error}</div>}

          {/* Product Details */}
          {product && (
            <div className="product-details">
              <h3>Product Details</h3>
              {Object.entries(product).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}:</strong> {String(value)}
                </p>
              ))}

              <div className="action-buttons">
                <button
                  className="delete-btn"
                  onClick={handleDelete}
                  disabled={actionLoading}
                >
                  {actionLoading ? "Deleting..." : "Delete Product"}
                </button>

                <button className="update-btn" onClick={handleUpdateClick}>
                  ✏️ Update Product
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          /* Layout */
          .delete-product-container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #f8f9fa, #eef2f7);
            padding: 20px;
          }

          .card {
            background: #fff;
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 600px;
            transition: all 0.3s ease-in-out;
          }

          .card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
          }

          .title {
            text-align: center;
            margin-bottom: 30px;
            font-size: 28px;
            font-weight: 600;
            color: #333;
          }

          /* Form */
          form {
            display: flex;
            flex-direction: column;
            gap: 18px;
          }

          input {
            padding: 10px 14px;
            border: 1px solid #ccc;
            border-radius: 8px;
            font-size: 15px;
            transition: all 0.2s ease;
          }

          input:focus {
            outline: none;
            border-color: #4f46e5;
            box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
          }

          button {
            background: #4f46e5;
            color: white;
            padding: 12px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.3s ease;
          }

          button:hover {
            background: #4338ca;
          }

          button:disabled {
            background: #a5a5a5;
            cursor: not-allowed;
          }

          /* Product Info */
          .product-details {
            margin-top: 30px;
            padding: 20px;
            background: #f9fafb;
            border-radius: 12px;
            border: 1px solid #eee;
          }

          .product-details h3 {
            margin-bottom: 15px;
            font-size: 20px;
            color: #333;
          }

          .product-details p {
            margin: 6px 0;
            font-size: 15px;
            color: #444;
          }

          /* Buttons */
          .action-buttons {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            gap: 10px;
          }

          .delete-btn {
            background: #dc2626;
          }

          .delete-btn:hover {
            background: #b91c1c;
          }

          .update-btn {
            background: #2563eb;
          }

          .update-btn:hover {
            background: #1e40af;
          }

          .error-message {
            background: #fee2e2;
            color: #991b1b;
            text-align: center;
            padding: 10px;
            border-radius: 8px;
            margin-top: 10px;
            font-weight: 500;
          }

          @media (max-width: 600px) {
            .card {
              padding: 25px;
            }
            .title {
              font-size: 22px;
            }
            .action-buttons {
              flex-direction: column;
            }
          }
        `}
      </style>
    </>
  );
};

export default ProductDelete;
