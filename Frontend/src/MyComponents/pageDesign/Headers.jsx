import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">My-Shop</Link>

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
              <Link className="nav-link" to="/Menwear">Men</Link>
            </li>
<<<<<<< HEAD
            {/* <li className="nav-item">
=======
            <li className="nav-item">
>>>>>>> cleanup-pycache
              <Link className="nav-link" to="/Womenwear">Woman</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Kidswear">Kids</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Unisexwear">Unisex</Link>
<<<<<<< HEAD
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to="/about">About Us</Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/delete_product">Delete Product</Link>
            </li> */}
          </ul>

          {/* Center Search Bar */}
          {/* <form className="d-flex" role="search">
=======
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/delete_product">Delete Product</Link>
            </li>
          </ul>

          {/* Center Search Bar */}
          <form className="d-flex" role="search">
>>>>>>> cleanup-pycache
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
<<<<<<< HEAD
          </form> */}
=======
          </form>
>>>>>>> cleanup-pycache

          {/* Right-side links */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/MyCart">My Cart</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Wishlist">Wish List</Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                My Profile
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="dropdown-item" to="/MyProfile">My Profile</Link></li>
                <li><Link className="dropdown-item" to="/MyOrders">My Orders</Link></li>
                <li><Link className="dropdown-item" to="/MyAddresses">My Addresses</Link></li>
                <li><Link className="dropdown-item" to="/MyPayments">My Payments</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
