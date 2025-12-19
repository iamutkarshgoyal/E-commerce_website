import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({
  id,
  product_name,
  price,
  images,
}) {
  return (
    <Link to={`/products/${id}`} className="card-link">
      <div className="product-card-item">
        <div className="image-box">
          <img src={images[0]} alt={product_name} />
        </div>

        <div className="card-info">
          <h4>{product_name}</h4>
          <p>₹{price}</p>
        </div>
      </div>

      <style>{`
        .card-link {
          text-decoration: none;
          color: inherit;
        }

        .product-card-item {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 6px 18px rgba(0,0,0,0.12);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .product-card-item:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 28px rgba(0,0,0,0.18);
        }

        .image-box {
          height: 260px;
          overflow: hidden;
        }

        .image-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-info {
          padding: 14px;
          text-align: center;
        }

        .card-info h4 {
          font-size: 16px;
          margin-bottom: 6px;
        }

        .card-info p {
          font-size: 15px;
          font-weight: 600;
        }
      `}</style>
    </Link>
  );
}


