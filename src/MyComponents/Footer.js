import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container">
        <div className="row">
          
          {/* Left Section */}
          <div className="col-md-4 mb-3 mb-md-0">
            <h5>Toy-Shop</h5>
            <p className="small">
              Your one-stop shop for toys, games, and fun for all ages.
            </p>
          </div>

          {/* Center Links */}
          <div className="col-md-4 mb-3 mb-md-0 text-center">
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">Home</a></li>
              <li><a href="#" className="text-light text-decoration-none">About</a></li>
              <li><a href="#" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="col-md-4 text-md-end text-center">
            <h6>Follow Us</h6>
            <a href="#" className="text-light me-3"><i className="bi bi-facebook"></i></a>
            <a href="#" className="text-light me-3"><i className="bi bi-instagram"></i></a>
            <a href="#" className="text-light"><i className="bi bi-twitter"></i></a>
          </div>
        </div>

        <hr className="border-light" />
        <div className="text-center small">
          &copy; {new Date().getFullYear()} Toy-Shop. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
