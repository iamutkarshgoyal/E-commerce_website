import React from "react";
import { Link } from "react-router-dom";

const products = [
  { id: 1, name: "Men’s Classic Cotton T-Shirt", price: 599, img: "/images/Men Grey Tshirt.jpg" },
  { id: 2, name: "Polo T-Shirt", price: 799, img: "/images/Women Grey Tshirt.jpg" },
  { id: 3, name: "Graphic Tee", price: 699, img: "/images/Women Orange Tshirt.jpg" },
  { id: 4, name: "Oversized Tee", price: 899, img: "/images/Women White Tshirt.jpg" },
  { id: 5, name: "Round Neck Tee", price: 499, img: "/images/Men Levendar Tshirt.jpg" },
];

const MenTopwear = () => {
  return (
    <div className="p-2">
      <h1 className="text-lg font-bold mb-2">Men’s Topwear</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1">
        {products.map((item) => (
          <Link
            to={`/tshirt/${item.id}`}
            key={item.id}
            className="border rounded bg-white hover:shadow-sm transition-transform transform hover:-translate-y-0.5"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-28 object-cover rounded-t"
            />
            <div className="px-1 py-1">
              <h2 className="text-[10px] font-medium truncate">{item.name}</h2>
              <p className="text-gray-700 text-[9px] mt-0.5">₹{item.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MenTopwear;
