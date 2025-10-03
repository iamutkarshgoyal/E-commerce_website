import React from "react";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Toy-Shop</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Category
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Cars</a></li>
                <li><a className="dropdown-item" href="#">Teddy Bears</a></li>
                <li><a className="dropdown-item" href="#">Puzzle Game</a></li>
                <li><a className="dropdown-item" href="#">Board Game</a></li>
              </ul>
            </li>
          </ul>

          {/* 🔥 Center Search Bar */}
          <form className="d-flex mx-auto" role="search">
            <input
              className="form-control me-2 search-input"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />  
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>

          {/* Right side links */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Cart</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Wish List</a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Profile
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" href="#">My Profile</a></li>
                <li><a className="dropdown-item" href="#">My Orders</a></li>
                <li><a className="dropdown-item" href="#">My Addresses</a></li>
                <li><a className="dropdown-item" href="#">My Payments</a></li>
                <li><a className="dropdown-item" href="#">Help</a></li>
                <li><a className="dropdown-item" href="#">Sign Out</a></li>
              </ul>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}
