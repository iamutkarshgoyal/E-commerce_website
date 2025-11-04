import React, { useState, useEffect } from 'react';

const ProductDisplay = ({ id }) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  console.log(id);
  

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:8000/products/${id}/`);
        if (!res.ok) throw new Error("Failed to fetch product");

        const data = await res.json();

        // If data is an array, pick the first element
        if (Array.isArray(data) && data.length > 0) {
          setProduct(data[0]);
        } else if (data) {
          setProduct(data); // if API returns single object
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch product");
      }
    };

    fetchProduct();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h2>{product.productDisplayName}</h2>
      <h5>{product.subCategory}</h5>
      <img src={product.s3_image_url} alt={product.productDisplayName} />
    </div>
  );
};

export default ProductDisplay;
