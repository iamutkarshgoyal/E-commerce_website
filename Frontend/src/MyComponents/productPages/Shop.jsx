import React, { useState, useEffect } from "react";
import ProductCard from "./Product Card"; // ✅ Ensure filename matches
import API_BASE_URL from "./config";

const Shop = ({ gender }) => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const productsPerPage = 20;

  // ✅ Fetch products whenever gender or page changes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      const skip = (currentPage - 1) * productsPerPage;
      const url = `${API_BASE_URL}/products/?skip=${skip}&limit=${productsPerPage}&gender=${gender}`;

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

        const data = await res.json();
        console.log("✅ Products fetched:", data);

        setProducts(data.data || []);
        setTotalPages(data.pages || 1);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [gender, currentPage]);

  // ✅ Reset to page 1 when gender changes
  useEffect(() => {
    setCurrentPage(1);
  }, [gender]);

  const handlePageChange = (event) => {
    setCurrentPage(Number(event.target.value));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <>
      <div className="shop-container">
        <h1 className="shop-title">{gender} Collection</h1>

        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : products.length > 0 ? (
          <div className="product-list">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <p>No products found for {gender}.</p>
        )}

        {/* 🧭 Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination-container">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              ⬅ Prev
            </button>

            <label htmlFor="page-select">Page:</label>
            <select
              id="page-select"
              value={currentPage}
              onChange={handlePageChange}
            >
              {Array.from({ length: totalPages }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <span>&nbsp;of {totalPages}</span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Next ➡
            </button>
          </div>
        )}
      </div>

        <style>{`
        .top-banner {
          position: relative;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 40px;
          border-radius: 15px;
          margin: 40px auto;
          width: 95%;
          height: 300px;
          background-image: 
            linear-gradient(to right, rgba(245, 233, 221, 0.85), rgba(222, 220, 220, 0.7)),
            url("/Data/Images/Diwali.jpg");
          background-size: 100% 200%; /* This ensures we show only half vertically */
          background-position: top center; /* show the top half */
          background-repeat: no-repeat;

          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .top-banner-content {
          flex: 1;
          z-index: 1;
          text-align: left;
        }

        .top-banner-content h1 {
          font-size: 2.5rem;
          color: #222;
          margin-bottom: 10px;
          font-weight: 700;
        }

        .top-banner-content p {
          font-size: 1.1rem;
          color: #333;
          margin-bottom: 15px;
        }

        .Limited_Time {
          font-size: 0.9rem;
          color: #1f0301;
          margin-bottom: 20px;
          font-weight: 600;
        }

        .shop-now-btn {
          background-color: #3b3b3b;
          color: white;
          padding: 10px 25px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: bold;
          transition: all 0.3s ease;
        }

        .shop-now-btn:hover {
          background-color: #000;
          transform: scale(1.05);
        }

          .banner-image {
            width: 100%;
            max-width: 400px;
            border-radius: 15px;
            object-fit: cover;
            object-position: center top; /* <– this “cuts” from the top */
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            max-height: 100%;
          }

          .Newsletter-card {
            text-align: center;
            background-image: linear-gradient(to right, rgba(245, 233, 221, 0.85), rgba(222, 220, 220, 0.7)),
            url("/Data/Images/Diwali.jpg");
            padding: 30px;
            border-radius: 15px;
            width: 80%;
            margin: 40px auto;
          }

          .Newsletter-card input {
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
            width: 250px;
            margin-right: 10px;
          }

          .Newsletter-card button {
            background-color: #000000ff;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 10px 20px;
            font-weight: bold;
            cursor: pointer;
          }

          .Newsletter-card button:hover {
            background-color: #525252ff;
          }

          .product-card-item {
            width: 300px;
            border-radius: 15px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            text-align: center;
            cursor: pointer;
            text-decoration: none;
          }

          .product-card-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
          }

          .product-image-gallery {
            width: 100%;
            height: 280px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .product-image-gallery img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .product-info {
            padding: 12px 16px;
          }

          .product-name {
            font-family: 'Times Roman', sans-serif;
            width: 100%;
            padding: 10px;
            border-radius: 5px;
            color: #000000ff;
            font-weight: bold;
            font-size: 1rem;
            text-decoration: none;
            transition: background-color 0.3s ease, transform 0.3s ease;
            cursor: pointer;
          }

          .subcategory {
            font-size: 0.85rem;
            color: #666;
            margin-bottom: 4px;
          }

          .category {
            font-size: 0.8rem;
            color: #999;
            margin-bottom: 8px;
          }

          .price {
            font-size: 1rem;
            font-weight: bold;
            color: #000000ff;
          }

          /* 🧱 Container Adjustments */
          .product-card {
            text-align: center;
            padding: 40px 0;
            flex-direction: column;
          }

          .product-card h1 {
            margin-bottom: 20px;
            font-size: 2rem;
          }

          .product-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 25px;
          }
        `}</style>
        </>
  );
};

export default Shop;
