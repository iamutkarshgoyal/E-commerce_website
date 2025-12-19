import React, { Component } from "react";

export default class Home extends Component {
  render() {
    return (
      <div className="container my-5">
        <div className="row g-4 justify-content-center">
          {/* Card Data */}
          {[
            {
              img: "/Images/Men Grey Tshirt.jpg",
              title: "Men's Grey T-Shirt",
            },
            {
              img: "/Images/Women Orange Tshirt.jpg",
              title: "Women Classy Orange T-Shirt",
            },
            {
              img: "/Images/Women White Tshirt.jpg",
              title: "Women Everyday White T-Shirt",
            },
            {
              img: "/Images/Men Olive Green Tshirt.jpg",
              title: "Men Aesthetic Green T-Shirt",
            },
            {
              img: "/Images/Men Levendar Tshirt.jpg",
              title: "Men Funky Lavender T-Shirt",
            },
            {
              img: "/Images/Men Red Tshirt.jpg",
              title: "Men Bold Red T-Shirt",
            },
            {
              img: "/Images/Men White Tshirt.jpg",
              title: "Men White T-Shirt",
            },
            {
              img: "/Images/Women Grey Tshirt.jpg",
              title: "Women Grey T-Shirt",
            },
          ].map((item, index) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
              key={index}
            >
              <div className="card shadow-sm" style={{ width: "100%", maxWidth: "18rem" }}>
                <img
                  src={item.img}
                  className="card-img-top"
                  alt={item.title}
                  style={{ height: "80%", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
