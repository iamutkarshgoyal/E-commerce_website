import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Toy-Shop</Link>
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
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <Link className="nav-link active" to="/about">About</Link>
        </ul>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                Men
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/MenTopwear">Top wear</Link></li>
                <li><Link className="dropdown-item" to="/MenBottomwear">Bottom wear</Link></li>
                <li><Link className="dropdown-item" to="/MenGymwear">Gym wear</Link></li>
                <li><Link className="dropdown-item" to="/MenAccessories">Accessories</Link></li>
              </ul>
            </li> 
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                Women
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/WomenTopwear">Top wear</Link></li>
                <li><Link className="dropdown-item" to="/WomenBottomwear">Bottom wear</Link></li>
                <li><Link className="dropdown-item" to="/WomenGymwear">Gym wear</Link></li>
                <li><Link className="dropdown-item" to="/WomenAccessories">Accessories</Link></li>
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
              <Link className="nav-link active" aria-current="page" to="/MyCart">My Cart</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Wishlist">Wish List</Link>
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
                <li><Link className="dropdown-item" to="/MyProfile">My Profile</Link></li>
                <li><Link className="dropdown-item" to="/MyOrders">My Orders</Link></li>
                <li><Link className="dropdown-item" to="/MyAddresses">My Addresses</Link></li>
                <li><Link className="dropdown-item" to="/MyPayments">My Payments</Link></li>
                <li><Link className="dropdown-item" to="/Help">Help</Link></li>
                <li><Link className="dropdown-item" to="/Signout">Sign Out</Link></li>
              </ul>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}
