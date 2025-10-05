import React from "react";

const ProductCard = ({
  product_name,
  price,
  category,
  subcategory,
  product_images = [],
}) => {
  let images = [];

  if (typeof product_images === "string") {
    try {
      const jsonFixed = product_images.replace(/'/g, '"');
      const parsed = JSON.parse(jsonFixed);
      images = parsed.map((obj) => Object.keys(obj)[0]);
    } catch {
      images = product_images.match(/https?:\/\/[^\s'"]+/g) || [];
    }
  } else if (Array.isArray(product_images)) {
    images = product_images;
  }

  return (
    <div className="product-card-item">
      <a href="#" className="product-link">
        <div className="product-image-gallery">
          {images.length > 0 ? (
            <img
              src={images[0]}
              alt={product_name}
              className="product-image"
              loading="lazy"
            />
          ) : (
            <div className="no-image">No image</div>
          )}
        </div>

        <div className="product-info">
          <h3 className="product-name">{product_name}</h3>
          <p className="subcategory">{subcategory}</p>
          <p className="price">{price}</p>
        </div>
      </a>
    </div>
  );
};

export default ProductCard;
