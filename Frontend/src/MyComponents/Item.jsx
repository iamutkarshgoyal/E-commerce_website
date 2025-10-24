import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDisplay from './product';

const Item = () => {
  const { id } = useParams();
  const [productId, setProductId] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/products/${id}`)
    .then ((res) => {
      if (!res.ok) throw new Error("Failed to fetch product");
      return res.json();
    })
    .then ((data) => {
      setProductId(data[0]);
    })
    .catch((err) => {
      console.log(err);
    });
  },[id])

  if (!productId) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-page">
      <ProductDisplay product={productId} />
    </div>
  );
};

export default Item;
