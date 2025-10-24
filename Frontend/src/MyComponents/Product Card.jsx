import React from "react";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  return (
    <div className="product-card-item">
      <Link to={`/products/${props.id}`} className="product-link">
        <div className="product-image-gallery">
          <img
            src={props.s3_image_url}
            alt={props.productDisplayName}
            className="product-image"
            loading="lazy"
          />
        </div>
        <div className="product-info">
          <h3 className="product-name">{props.productDisplayName}</h3>
          <p className="subcategory">{props.subCategory}</p>
          <p className="price">{props.articleType}</p>
          <p className="color">{props.baseColour}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
