import React, { useState, useMemo, useEffect, useRef } from "react";
import ProductCard from "./Product Card"; 
import cleaned_zara_all_data from "../Data/cleaned_zara_all_data";

const Shop = ({ category }) => {
  const [sortBy, setSortBy] = useState("Featured");
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    subcategories: [],
    priceRange: []
  });

  // ---------- helper to safely parse price ----------
  const parsePrice = (p) => {
    if (typeof p === "number" && Number.isFinite(p)) return p;
    if (!p) return 0;
    try {
      const s = String(p);
      const cleaned = s.replace(/[,₹\s\u00A0]/g, "");
      const onlyNumDot = cleaned.replace(/[^\d.]/g, "");
      const n = parseFloat(onlyNumDot);
      return Number.isFinite(n) ? n : 0;
    } catch {
      return 0;
    }
  };

  // ---------- filter data ----------
  const filteredData = useMemo(() => {
    let data = [...cleaned_zara_all_data];

    // Filter by category page
    if (category) data = data.filter((item) => item.category === category);

    // Filter by subcategory
    if (selectedFilters.subcategories.length > 0) {
      data = data.filter((item) =>
        selectedFilters.subcategories.includes(item.subcategory)
      );
    }

    // Filter by price
    if (selectedFilters.priceRange.length > 0) {
      data = data.filter((item) => {
        const priceVal = parsePrice(item.price);
        return selectedFilters.priceRange.some((range) => {
          if (range === "Below ₹1000") return priceVal < 1000;
          if (range === "₹1000 - ₹3000") return priceVal >= 1000 && priceVal <= 3000;
          if (range === "Above ₹3000") return priceVal > 3000;
          return false;
        });
      });
    }

    return data;
  }, [category, selectedFilters]);

  // ---------- sort data ----------
  const sortedData = useMemo(() => {
    let data = [...filteredData];
    if (sortBy === "PriceAsc") data.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    if (sortBy === "PriceDesc") data.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    if (sortBy === "NameAsc") data.sort((a, b) => (a.product_name || "").localeCompare(b.product_name || ""));
    if (sortBy === "NameDesc") data.sort((a, b) => (b.product_name || "").localeCompare(a.product_name || ""));
    return data;
  }, [filteredData, sortBy]);

  // ---------- pagination ----------
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // ---------- handle filter selection ----------
  const toggleSubcategory = (sub) => {
    setSelectedFilters((prev) => {
      const subs = prev.subcategories.includes(sub)
        ? prev.subcategories.filter((s) => s !== sub)
        : [...prev.subcategories, sub];
      return { ...prev, subcategories: subs };
    });
  };

  const togglePriceRange = (range) => {
    setSelectedFilters((prev) => {
      const ranges = prev.priceRange.includes(range)
        ? prev.priceRange.filter((r) => r !== range)
        : [...prev.priceRange, range];
      return { ...prev, priceRange: ranges };
    });
  };

  const filterPanelRef = useRef(null);

    useEffect(() => {
  if (filterPanelOpen) {
    let timeoutId;

    const startTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setFilterPanelOpen(false);
      }, 3000); // auto close after 3 seconds
    };

    const handleMouseEnter = () => {
      clearTimeout(timeoutId); // pause timer when hovering inside
    };

    const handleMouseLeave = () => {
      startTimer(); // restart timer when leaving panel
    };

    const panel = filterPanelRef.current;
    if (panel) {
      panel.addEventListener("mouseenter", handleMouseEnter);
      panel.addEventListener("mouseleave", handleMouseLeave);
    }

    // start timer initially
    startTimer();

    return () => {
      clearTimeout(timeoutId);
      if (panel) {
        panel.removeEventListener("mouseenter", handleMouseEnter);
        panel.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }
}, [filterPanelOpen]);

  return (


  <div className="shop-container">
    <div className="Banner-container">
      <div className="banner">
        <img src="/images/ShopBanner.jpg" alt="Banner" />
        <div className="banner-text">
          <h1>{category || "Shop"}</h1>
        </div>  
        <div className="overlay"></div>
        <div className="overlay-text">
          <h1>{category || "Shop"}</h1>
        </div>
        <div className="overlay-text2">
          <h1>{category || "Shop"}</h1>
        </div>
        <button className= "Shop-Button">Shop Now</button>
      </div>
      </div>
    {/* Left Filter Panel */}
    <div ref={filterPanelRef} className={`filter-panel ${filterPanelOpen ? "open" : ""}`}>
      <h3>Filters</h3>

      {/* Clear Filters Button */}
      <button 
        className="clear-filters-btn"
        onClick={() => setSelectedFilters({ subcategories: [], priceRange: [] })}
      >
        Clear Filters
      </button>

      <div>
        <h4>Subcategories</h4>
        {Array.from(new Set(cleaned_zara_all_data.map((d) => d.subcategory))).map((sub) => (
          <label key={sub}>
            <input
              type="checkbox"
              checked={selectedFilters.subcategories.includes(sub)}
              onChange={() => toggleSubcategory(sub)}
            />
            {sub}
          </label>
        ))}
      </div>

      <div>
        <h4>Price Range</h4>
        {["Below ₹1000", "₹1000 - ₹3000", "Above ₹3000"].map((range) => (
          <label key={range}>
            <input
              type="checkbox"
              checked={selectedFilters.priceRange.includes(range)}
              onChange={() => togglePriceRange(range)}
            />
            {range}
          </label>
        ))}
      </div>

      <button onClick={() => setFilterPanelOpen(false)}>Apply Filters</button>
    </div>

    {/* Main Content */}
    <div className="main-content">
      {/* Top Controls */}
      <div className="controls">
        <button onClick={() => setFilterPanelOpen(!filterPanelOpen)}>Filters</button>
        <div className="sort">
          <label>Sort By: </label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="Featured">Featured</option>
            <option value="PriceAsc">Price Low to High</option>
            <option value="PriceDesc">Price High to Low</option>
            <option value="NameAsc">Name A-Z</option>
            <option value="NameDesc">Name Z-A</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="product-list">
        {paginatedData.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

{/* Pagination & Items per page */}
<div className="pagination">
  <span>Total Products: {sortedData.length}</span>

  {/* Items per page */}
  <div>
    <label>Items per page:</label>
    {[16, 20, 24].map((num) => (
      <button key={num} onClick={() => { setItemsPerPage(num); setCurrentPage(1); }}>
        {num}
      </button>
    ))}
  </div>

  {/* Page selection dropdown */}
  <div>
    <label>Page:</label>
    <select
      value={currentPage}
      onChange={(e) => setCurrentPage(Number(e.target.value))}
    >
      {Array.from({ length: totalPages }, (_, i) => (
        <option key={i} value={i + 1}>
          {i + 1}
        </option>
      ))}
    </select>
  </div>
</div>

    </div>

    {/* Styles */}
    <style>{`
      .shop-container { 
      display: flex; gap: 20px; 
      padding: 20px;
      font-family: 'Times Roman';
      }

      /* Hide filter panel by default (desktop + mobile) */
      .filter-panel {
        transform: translateX(-100%);
        opacity: 0;
        visibility: hidden;
        transition: transform 0.3s ease, opacity 0.3s ease, visibility 0.3s ease;
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 300px;
        background: #fff;
        padding: 20px;
        z-index: 100;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
      }

      /* When open — show smoothly */
      .filter-panel.open {
        transform: translateX(0);
        opacity: 1;
        visibility: visible;
      }


      @media (max-width: 768px) {
        .filter-panel {
          position: fixed;
          left: 0;
          top: 0;
          height: 100%;
          z-index: 100;
          width: 80%;
          max-width: 300px;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
          background: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
        }


        .main-content {
          margin-left: 0;
          width: 100%;
        }
      }

      .Shop-Button {
        background: linear-gradient(45deg, #001f4d, #007bff);
        color: white;
        border: none;
        border-radius: 25px;
        padding: 12px 24px;
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        font-family: 'Times Roman';
        cursor: pointer;
        transition: background 0.3s ease, transform 0.2s ease;
      }

      .Shop-Button:hover {
        background: linear-gradient(45deg, #0040ff, #00bfff);
        transform: translate(-50%, -3px);
      }

      .filter-panel h3, .filter-panel h4 { 
      margin-bottom: 10px; 
      font-family: 'Times Roman'
      }

      .filter-panel input[type="checkbox"] { 
      margin-right: 10px; 
      font-family: 'Times Roman';
      font-size: 16px;
      }

      .filter-panel label { 
      display: block; 
      margin-bottom: 5px; 
      font-family: 'Times Roman';
      font-size: 16px;
      }

      .filter-panel button { 
      margin-top: 20px; 
      padding: 8px 15px; 
      border: none;
      border-radius: 5px;
      background: #f1f1f1; color: #001f4d; 
      cursor: pointer; 
      font-family: 'Times Roman';
      font-size: 16px;
      transition: background-color 0.3s ease;
      }

      .filter-panel button:hover {
      background-color: #ddd;
      font-family: 'Times Roman';
      font-size: 16px;
      transition: background-color 0.3s ease;
      }

      .sort { 
      margin-top: 20px; 
      display: flex;
      font-family: 'Times Roman';
      font-size: 16px;
      }

      .sort:hover {
      background-color: #ddd;
      font-family: 'Times Roman';
      font-size: 16px;
      transition: background-color 0.3s ease;
      }

      .clear-filters-btn { 
      background-color: #ff4d4d; 
      color: white; 
      border: none;
      padding: 10px 20px;
      margin-bottom: 15px; 
      border-radius: 5px;
      cursor: pointer;
      font-family: 'Times Roman';
      font-size: 16px;
      transition: background-color 0.3s ease;
      }

      .clear-filters-btn:hover {
      background-color: #ff1a1a;
      font-family: 'Times Roman';
      font-size: 16px;
      transition: background-color 0.3s ease;
      }

      .main-content { 
      flex: 1; 
      display: flex;
      font-family: 'Times Roman';
      flex-direction: column;
      }

      .controls { 
      display: flex; 
      font-family: 'Times Roman';
      justify-content: space-between; 
      align-items: center;
      margin-bottom: 20px; 
      }

      .controls button,
      .filter-panel button,
      .pagination button {
        background: linear-gradient(45deg, #001f4d, #007bff);
        color: white;
        border: none;
        border-radius: 25px;
        padding: 10px 18px;
        cursor: pointer;
        transition: transform 0.2s ease, background 0.3s ease;
      }

      .controls button:hover,
      .filter-panel button:hover,
      .pagination button:hover {
        transform: translateY(-2px);
        background: linear-gradient(45deg, #0040ff, #00bfff);
      }

      .controls select {
      padding: 8px;
      border-radius: 5px;
      border: 1px solid #ccc;
      font-family: 'Times Roman';
      font-size: 16px;
      }

      .controls select:hover {
      background-color: #ddd;
      font-family: 'Times Roman';
      font-size: 16px;
      transition: background-color 0.3s ease;
      }

      .controls select:focus {
      outline: none;
      border-color: #007bff;
      font-family: 'Times Roman';
      font-size: 16px;
      }

      .controls select option {
      font-family: 'Times Roman';
      font-size: 16px;
      }

      .product-list { 
      display: grid; 
      grid-template-columns: repeat(4, 1fr); 
      gap: 15px; 
      padding: 20px;
      font-family: 'Times Roman';
      }
      @media (max-width: 1200px) {
        .product-list {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      @media (max-width: 900px) {
          .product-list {
            grid-template-columns: repeat(2, 1fr);
          }
        }

      .pagination select:hover {
      background-color: #ddd;
      font-family: 'Times Roman';
      font-size: 16px;
      transition: background-color 0.3s ease;
      }

      .pagination select:focus {
      outline: none;
      border-color: #007bff;
      font-family: 'Times Roman';
      font-size: 16px;
      }

      .pagination select option {
      font-family: 'Times Roman';
      font-size: 16px;
      }

      .pagination button:hover {
      background-color: #ddd;
      font-family: 'Times Roman';
      font-size: 16px;
      transition: background-color 0.3s ease;
      }

      .pagination button:focus {
      outline: none;
      font-family: 'Times Roman';
      font-size: 16px;
      }

      .pagination button:active {
      background-color: #ddd;
      font-family: 'Times Roman';
      font-size: 16px;
      transition: background-color 0.3s ease;
      }

      .pagination button:visited {
      background-color: #ddd;
      font-family: 'Times Roman';
      font-size: 16px;
      transition: background-color 0.3s ease;
      }

      .pagination button:link {
      background-color: #ddd;
      font-family: 'Times Roman';
      font-size: 16px;
      transition: background-color 0.3s ease;
      }

      .pagination button:target {
      background-color: #ddd;
      font-family: 'Times Roman';
      font-size: 16px;
      transition: background-color 0.3s ease;
      }

      .pagination button:visited {
      background-color: #ddd;
      font-family: 'Times Roman';
      font-size: 16px;
      transition: background-color 0.3s ease;
      }

      .pagination button:active {
      background-color: #ddd;
      font-family: 'Times Roman';
      font-size: 16px;
      transition: background-color 0.3s ease;
      }

      .pagination span {
      font-family: 'Times Roman';
      font-size: 16px;
      margin-left: 50px; 
      margin-right: 50px; 
      margin-bottom: 20px; 
      margin-top:50px;
      }

      .pagination button { 
      background-color: #f1f1f1; color: #001f4d;
      border: none;
      border-radius: 5px;
      padding: 8px 15px;
      cursor: pointer;
      font-family: 'Times Roman';
      font-size: 16px;
      transition: background-color 0.3s ease;
      margin: 0 2px; 
      margin-left: 50px; 
      margin-right: 50px; 
      margin-bottom: 20px; 
      margin-top:50px;
      }

      .product-card-item {
            width: 300px;
            border-radius: 15px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            text-align: center;
            cursor: pointer;
            text-decoration: none;
            font-family: 'Times Roman';
            font-size: 16px;
          }

          .product-card-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
            font-family: 'Times Roman';
          }

          .product-image-gallery {
            width: 100%;
            height: 280px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Times Roman';
          }

          .product-image-gallery img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            font-family: 'Times Roman';
          }

          .product-info {
            padding: 12px 16px;
          }

          .product-name {
            font-family: 'Times Roman', sans-serif;
            width: 100%;
            padding: 10px;
            border-radius: 5px;
            color: #000000ff;
            font-weight: bold;
            font-size: 1rem;
            text-decoration: none;
            transition: background-color 0.3s ease, transform 0.3s ease;
            cursor: pointer;
          }

          .subcategory {
            font-size: 0.85rem;
            color: #666;
            margin-bottom: 4px;
            font-family: 'Times Roman';
          }

          .category {
            font-size: 0.8rem;
            color: #999;
            margin-bottom: 8px;
            font-family: 'Times Roman';
          }

          .price {
            font-size: 1rem;
            font-weight: bold;
            color: #000000ff;
            font-family: 'Times Roman';
          }

          /* 🧱 Container Adjustments */
          .product-card {
            text-align: center;
            padding: 40px 0;
            flex-direction: column;
          }

          .product-card h1 {
            margin-bottom: 20px;
            font-size: 2rem;
            font-family: 'Times Roman';
          }

          .product-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 25px;
          }
    `}</style>
  </div>
);
}

export default Shop
