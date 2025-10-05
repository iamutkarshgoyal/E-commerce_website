import React from "react";

const Item = ({ product_name, price, category, subcategory, productimages }) => {
  let firstImage = "";

  try {
    // 🧩 Parse the image field (stored as a stringified list of dicts)
    const parsed = JSON.parse(productimages.replace(/'/g, '"'));
    firstImage = Object.keys(parsed[0])[0]; // Get first image URL
  } catch (err) {
    console.error("Image parse error for", product_name, err);
  }

  return (
    <div className="item">
      {/* 🖼️ Product Image */}
      {firstImage ? (
        <img src={firstImage} alt={product_name} className="item-image" />
      ) : (
        <div className="image-placeholder">No Image</div>
      )}

      {/* 📛 Product Details */}
      <p className="item-name">{product_name}</p>
      <p className="item-category">{subcategory}</p>
      <p className="item-price">{price}</p>
      <p className="item-category">{category}</p>

      <style>{`
        .item {
          width: 220px;
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          text-align: center;
          padding: 10px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          display: inline-block;
          margin: 10px;
        }

        .item:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .item-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
          border-radius: 10px;
        }

        .item-name {
          font-size: 1rem;
          font-weight: 600;
          color: #333;
          margin-top: 10px;
        }

        .item-category {
          font-size: 0.9rem;
          color: #555;
          margin: 4px 0;
        }

        .item-price {
          font-size: 0.9rem;
          color: #ff6f61;
          font-weight: 500;
        }

        .image-placeholder {
          width: 100%;
          height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #eee;
          color: #999;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default Item;
