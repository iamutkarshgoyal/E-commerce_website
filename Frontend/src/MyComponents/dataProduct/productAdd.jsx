import React, { useState } from "react";
import API_BASE_URL from "../../config";

const ProductAdd = () => {
  const [addProduct, setAddProduct] = useState({
    id:  "",
    product_name: "",
    gender: "",
    price: "",
    details: "",
    total_images: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setAddProduct({
      ...addProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/add_product/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addProduct),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      console.log("✅ Product added successfully:", data);

      setAddProduct({
        id:  "",
        product_name: "",
        gender: "",
        price: "",
        details: "",
        total_images: ""
      });
    } catch (err) {
      console.error("❌ Error adding product:", err);
      setError("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="add-product-container">
        <div className="card">
          <h2 className="title">🛍️ Add New Product</h2>

          <form onSubmit={handleSubmit}>
            {Object.keys(addProduct).map((key) => (
              <div key={key} className="form-group">
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={addProduct[key]}
                  placeholder={`Enter ${key.replace(/([A-Z])/g, " $1")}`}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            <button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Product"}
            </button>

            {error && <div className="error-message">{error}</div>}
          </form>
        </div>
      </div>

      <style>
        {`
          /* Page Layout */
          .add-product-container {
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

          /* Form Styles */
          form {
            display: flex;
            flex-direction: column;
            gap: 18px;
          }

          .form-group {
            display: flex;
            flex-direction: column;
          }

          label {
            font-size: 14px;
            font-weight: 500;
            color: #555;
            margin-bottom: 6px;
            text-transform: capitalize;
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

          /* Button */
          button {
            margin-top: 10px;
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

          /* Error message */
          .error-message {
            background: #fee2e2;
            color: #991b1b;
            text-align: center;
            padding: 10px;
            border-radius: 8px;
            margin-top: 10px;
            font-weight: 500;
          }

          /* Responsive Design */
          @media (max-width: 600px) {
            .card {
              padding: 25px;
            }
            .title {
              font-size: 22px;
            }
          }
        `}
      </style>
    </>
  );
};

export default ProductAdd;
