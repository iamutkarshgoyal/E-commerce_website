import React from "react";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  return (
    <div className="product-card-item">
      <Link to={`/products/${props.id}`} className="product-link">
        <div className="product-image-gallery">
          <img
            src={props.s3_image_url}
            alt={props.productName}
            className="product-image"
            loading="lazy"
          />
        </div>
        <div className="product-info">
          <h3 className="product-name">{props.product_name}</h3>
          <p className="gender">{props.gender}</p>
          <p className="price">${props.price/1000}k</p>
          <p className="details">{props.details}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
