import React, { useState, useEffect } from "react";
import ProductCard from "./Product Card"; 

const Home = () => {
  const [topProducts, settopProducts] = useState([]);
  const [popularProduct, setpopularProducts] = useState([]);

useEffect(() => {
  fetch("http://localhost:8000/top_products/")
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched top products:", data);

      // ✅ Normalize response
      if (Array.isArray(data)) {
        settopProducts(data);
      } else if (Array.isArray(data.top_products)) {
        settopProducts(data.top_products);
      } else if (Array.isArray(data.data)) {
        settopProducts(data.data);
      } else {
        settopProducts([]);
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      settopProducts([]);
    });
}, []);

useEffect(() => {
  fetch("http://localhost:8000/popular_products/")
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched popular products:", data);

      // ✅ Normalize response
      if (Array.isArray(data)) {
        setpopularProducts(data);
      } else if (Array.isArray(data.popular_products)) {
        setpopularProducts(data.popular_products);
      } else if (Array.isArray(data.data)) {
        setpopularProducts(data.data);
      } else {
        setpopularProducts([]);
      }
    })
    .catch((error) => {
      console.error("Error fetching popular data:", error);
      setpopularProducts([]);
    });
}, []);

    return (
      <>
        <div className="top-banner">
          <div className="top-banner-content">
            <h1>Biggest New Year Sale</h1>
            <p>This New Year get upto 80% discount on your favourite outfit.</p>
            <div className="Limited_Time">*Limited time New Year offer</div>
            <a href="#top-products" className="shop-now-btn">
              Shop Now
            </a>
          </div>
        </div>


        <div className="product-card" id="top-products">
          <h1>Top Products</h1>
          <div className="product-list">
              {Array.isArray(topProducts) &&
                topProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
              ))}
          </div>
        </div>


        <div className="Newsletter-card">
          <h1>Subscribe for latest updates on fashion</h1>
          <input type="text" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>


        <div className="product-card" id="popular-products">
          <h1>Popular Products</h1>
          <div className="product-list">
              {Array.isArray(popularProduct) &&
                popularProduct.map((product) => (
                  <ProductCard key={product.id} {...product} />
              ))}
          </div>
        </div>

        {/* 🧾 Inline Styles */}
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
}

export default Home;