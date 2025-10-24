import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [cleaned_zara_all_data, setCleanedZaraAllData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/products/")
      .then((res) => res.json())
      .then((data) => setCleanedZaraAllData(data))
      .catch((err) => console.error("Error fetching product data:", err));
  }, []);

  return (
  <ShopContext.Provider value={{ cleaned_zara_all_data, setCleanedZaraAllData }}>
    {children}
  </ShopContext.Provider>
)}

export default ShopContextProvider;
