import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API_BASE_URL from "../../config";

const UpdateProduct = () => {
  const location = useLocation();
  const [productId, setProductId] = useState(location.state?.productId || "");
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  

  // Fetch product details
  const fetchProduct = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      setProductData(Array.isArray(data) ? data[0] : data);
    } catch (err) {
      console.error(err);
      setError("Product not found.");
    } finally {
      setLoading(false);
    }
  };

  // Auto fetch if navigated from delete page
  useEffect(() => {
    if (productId) fetchProduct(productId);
  }, [productId]);

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("Update button clicked!")
    setUpdating(true);
    try {
        const cleanData = { ...productData };
        delete cleanData.id; // ✅ backend expects id in URL only
        delete cleanData.s3_image_url;
        console.log("Updating product:", productId, cleanData);
        const response = await fetch(`${API_BASE_URL}/update_product/${productId}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanData),
        });
    console.log("Response status:", response.status);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      alert("✅ Product updated successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to update product.");
    } finally {
      setUpdating(false);
    }
  };

  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };
console.log("Rendered productData:", productData);

  return (
    <div className="update-container">
      <div className="update-card">
        <h2>✏️ Update Product</h2>

        {/* Case 1: Ask for Product ID */}
        {!productData && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchProduct(productId);
            }}
          >
            <input
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="Enter product ID"
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Fetching..." : "Fetch Product"}
            </button>
          </form>
        )}

            {productData && (
            <form onSubmit={handleUpdate} className="update-form">
                {Object.keys(productData)
                .filter((key) => key !== "id")
                .map((key) => (
                    <div className="form-group" key={key}>
                    <label>{key}</label>
                    <input
                        type="text"
                        name={key}
                        value={productData[key] || ""}
                        onChange={handleInputChange}
                    />
                    </div>
                ))}
                <button type="submit" disabled={updating}>
                {updating ? "Updating..." : "Update Product"}
                </button>
            </form>
            )}


        {error && <div className="error">{error}</div>}
      </div>

      <style>
        {`
          .update-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #eef2ff, #f8fafc);
            padding: 20px;
          }

          .update-card {
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.1);
            width: 100%;
            max-width: 600px;
          }

          h2 {
            text-align: center;
            margin-bottom: 20px;
            color: #1e3a8a;
          }

          form {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }

          .form-group {
            display: flex;
            flex-direction: column;
          }

          label {
            font-weight: 500;
            margin-bottom: 5px;
            color: #374151;
          }

          input {
            padding: 10px 12px;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            font-size: 15px;
          }

          input:focus {
            border-color: #4f46e5;
            outline: none;
            box-shadow: 0 0 0 3px rgba(79,70,229,0.2);
          }

          button {
            background: #4f46e5;
            color: white;
            border: none;
            border-radius: 8px;
            padding: 10px 14px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
          }

          button:hover {
            background: #4338ca;
          }

          .error {
            margin-top: 15px;
            background: #fee2e2;
            color: #991b1b;
            padding: 10px;
            border-radius: 8px;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
};

export default UpdateProduct;
