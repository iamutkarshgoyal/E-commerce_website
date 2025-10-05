import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const Wishlist = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (item) => {
    setWishlist((prev) => [...prev, item]);
  };

  return (
    <Wishlist.Provider value={{ wishlist, addToWishlist }}>
      {children}
    </Wishlist.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
