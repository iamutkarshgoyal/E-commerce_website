import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import ProductCard from "./Product Card";

const ProductDisplay = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [popularProducts, setPopularProducts] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [error, setError] = useState(null);

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    fetch(`http://localhost:8000/products/${id}/`)
      .then((res) => res.json())
      .then(setProduct)
      .catch(() => setError("Product Error"));
  }, [id]);

  /* ================= FETCH POPULAR PRODUCTS ================= */
  useEffect(() => {
    fetch("http://localhost:8000/popular_products/")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPopularProducts(data);
        else if (Array.isArray(data.popular_products))
          setPopularProducts(data.popular_products);
        else setPopularProducts([]);
      })
      .catch(() => setPopularProducts([]));
  }, []);

  if (error) return <h3>{error}</h3>;
  if (!product) return <h3>Loading...</h3>;

  const isOutOfStock = product.availability === false;

  /* ================= ADD TO CART ================= */
  const handleAddToCart = () => {
    if (isOutOfStock) return;

    addToCart({
      id: product.id,
      name: product.product_name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      quantity: 1,
      in_stock: product.availability,
    });
  };

  return (
    <>
      {/* ================= PRODUCT SECTION ================= */}
      <div className="product-wrapper">

        {/* LEFT — IMAGE CARD */}
        <div className={`image-card`}>
          <div className="image-container">
            <img
              src={product.images[activeImage]}
              alt={product.product_name}
              className="product-image"
            />

            {isOutOfStock && (
              <div className="stock-badge">OUT OF STOCK</div>
            )}
          </div>

          <div className="thumbnail-row">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                className={`thumbnail ${activeImage === i ? "active" : ""}`}
                onClick={() => setActiveImage(i)}
                alt=""
              />
            ))}
          </div>
        </div>

        {/* RIGHT — DETAILS */}
        <div className="product-details">
          <h2 className="product-name">{product.product_name}</h2>
          <p className="gender">{product.gender}</p>
          <p className="price">₹{product.price}</p>

          {/* SIZE */}
          <div className="size-selector">
            {["S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                disabled={isOutOfStock}
                className={`size ${selectedSize === size ? "active" : ""} ${
                  isOutOfStock ? "disabled" : ""
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          {/* ACTIONS */}
          {!isOutOfStock ? (
            <>
              <Link to="/MyCart">
                <button className="btn primary" onClick={handleAddToCart}>
                  Add to Cart
                </button>
              </Link>

              <button className="btn secondary">Buy Now</button>
            </>
          ) : (
            <div className="out-text">
              This product is currently unavailable
            </div>
          )}

          {/* WISHLIST & SHARE ALWAYS VISIBLE */}
          <div className="action-row">
            <button className="btn outline">❤️ Wishlist</button>
            <button className="btn outline">🔗 Share</button>
          </div>

          {/* DESCRIPTION */}
          <div className="description">
            <h4>Description</h4>
            <p>{product.details}</p>
          </div>
        </div>
      </div>

      {/* ================= POPULAR PRODUCTS ================= */}
      <div className="popular-section">
        <h2 className="popular-title">Popular Products</h2>

        <div className="product-list">
          {popularProducts.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      </div>

      {/* ================= STYLES ================= */}
      <style>{`
        .product-wrapper {
          display: flex;
          gap: 40px;
          max-width: 1100px;
          margin: 40px auto;
          padding: 20px;
        }

        .image-card {
          width: 420px;
          padding: 16px;
          border-radius: 18px;
          background: #fff;
          box-shadow: 0 12px 30px rgba(0,0,0,0.12);
          position: relative;
        }

        .image-card.blurred img {
          filter: grayscale(1) blur(2px);
        }

        .image-container {
          height: 460px;
          overflow: hidden;
          border-radius: 14px;
          position: relative;
        }

        .stock-badge {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0,0,0,0.75);
          color: #fff;
          padding: 12px 22px;
          border-radius: 30px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .thumbnail-row {
          display: flex;
          gap: 10px;
          margin-top: 14px;
          justify-content: center;
        }

        .thumbnail {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          opacity: 0.6;
          cursor: pointer;
        }

        .thumbnail.active {
          opacity: 1;
          outline: 2px solid #000;
        }

        .product-details {
          flex: 1;
        }

        .product-name {
          font-size: 28px;
        }

        .gender {
          color: #777;
        }

        .price {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .size-selector {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
        }

        .size {
          padding: 10px 16px;
          border-radius: 24px;
          border: 1px solid #ccc;
          cursor: pointer;
        }

        .size.disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .size.active {
          background: #000;
          color: #fff;
        }

        .btn {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          margin-bottom: 12px;
          cursor: pointer;
        }

        .primary {
          background: #000;
          color: #fff;
        }

        .secondary {
          background: #ff9800;
          color: #fff;
        }

        .outline {
          border: 1px solid #ccc;
          background: #fff;
          flex: 1;
        }

        .action-row {
          display: flex;
          gap: 12px;
        }

        .out-text {
          color: #d32f2f;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .popular-section {
          max-width: 1200px;
          margin: 80px auto;
        }

        .product-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 30px;
        }
      `}</style>
    </>
  );
};

export default ProductDisplay;