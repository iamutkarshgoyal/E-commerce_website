import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const TshirtPage = () => {
  const { addToCart } = useCart();

  const product = {
    id: 1,
    name: "Men’s Classic Cotton T-Shirt",
    price: 599,
    images: {
      black: "/images/Men Grey Tshirt.jpg",
      white: "/images/Men Levendar Tshirt.jpg",
      blue: "/images/Men Red Tshirt.jpg",
    },
    colors: ["black", "white", "blue"],
    sizes: ["S", "M", "L", "XL"],
  };

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [pincode, setPincode] = useState("");
  const [deliveryMsg, setDeliveryMsg] = useState("");

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size!");
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
    });

    alert("Added to cart ✅");
  };

  const checkPincode = () => {
    if (pincode.length !== 6) {
      setDeliveryMsg("❌ Please enter a valid 6-digit pincode");
    } else {
      setDeliveryMsg("✅ Delivery available in your area!");
    }
  };

  const recommended = [
    { id: 2, name: "Polo T-Shirt", price: 799, img: "/images/Women Grey Tshirt.jpg" },
    { id: 3, name: "Graphic Tee", price: 699, img: "/images/Women Orange Tshirt.jpg" },
    { id: 4, name: "Oversized Tee", price: 899, img: "/images/Women White Tshirt.jpg" },
  ];

  // ✅ Everything above is inside the component
  // Now we return the JSX properly below
  return (
    <div className="flex flex-col md:flex-row p-6">
      {/* Image Section */}
      <div className="md:w-1/2 flex justify-center">
        <img
          src={product.images[selectedColor]}
          alt={product.name}
          className="w-80 h-80 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Product Info */}
      <div className="md:w-1/2 p-4">
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-lg font-semibold mb-4 text-green-700">
          ₹{product.price}
        </p>

        {/* Colors */}
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Color:</h3>
          <div className="flex gap-3">
            {product.colors.map((c) => (
              <div
                key={c}
                onClick={() => setSelectedColor(c)}
                className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                  selectedColor === c ? "border-black" : "border-gray-300"
                }`}
                style={{ backgroundColor: c }}
              ></div>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Size:</h3>
          <div className="flex gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`px-3 py-1 border rounded ${
                  selectedSize === s
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleAddToCart}
            className="bg-pink-600 text-white px-5 py-2 rounded hover:bg-pink-700"
          >
            Add to Cart
          </button>
          <button className="border border-gray-400 px-5 py-2 rounded hover:bg-gray-100">
            ❤️ Wishlist
          </button>
        </div>

        {/* Pincode */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Enter Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="border p-2 rounded mr-2"
          />
          <button
            onClick={checkPincode}
            className="bg-gray-800 text-white px-4 py-2 rounded"
          >
            Check
          </button>
          <p className="mt-2 text-sm">{deliveryMsg}</p>
        </div>
      </div>

      {/* Recommended */}
      <div className="mt-10 w-full">
        <h2 className="text-xl font-bold mb-4">Recommended for You</h2>
        <div className="flex flex-wrap gap-4">
          {recommended.map((r) => (
            <div
              key={r.id}
              className="border p-3 rounded-lg w-40 hover:shadow-md cursor-pointer"
            >
              <img
                src={r.img}
                alt={r.name}
                className="w-full h-40 object-cover rounded"
              />
              <h4 className="text-sm mt-1 font-semibold">{r.name}</h4>
              <p className="text-gray-600 text-sm">₹{r.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TshirtPage;
