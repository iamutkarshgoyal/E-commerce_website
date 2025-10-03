import React, { Component } from "react";

export default class Home extends Component {
  render() {
    return (
      <div className="container my-5">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-5">
          
          {/* Card 1 */}
          <div className="col">
            <div className="card h-100 shadow-sm" style={{ maxWidth: "15rem" }}>
              <img
                src="/Toys_image/32X.jpg"
                className="card-img-fill"
                alt="Card 1"
                style={{ height: "70px", objectFit: "contain" }}
              />
              <div className="card-body">
                </div>
              <div className="card-footer">
                <small className="text-body-secondary">Last updated mins ago</small>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col">
            <div className="card h-100 shadow-sm" style={{ maxWidth: "15rem" }}>
              <img
                src="/Toys_image/A Girl for All Time.jpg"
                className="card-img-top"
                alt="Card 2"
                style={{ height: "70px", objectFit: "contain" }}
              />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Here is your toy
                </p>
              </div>
              <div className="card-footer">
                <small className="text-body-secondary">Last updated 3 mins ago</small>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col">
            <div className="card h-100 shadow-sm" style={{ maxWidth: "15rem" }}>
              <img
                src="/Toys_image/A zoetrope.jpg"
                className="card-img-top"
                alt="Card 3"
                style={{ height: "70px", objectFit: "contain" }}
              />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Here is your toy
                </p>
              </div>
              <div className="card-footer">
                <small className="text-body-secondary">Last updated 3 mins ago</small>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="col">
            <div className="card h-100 shadow-sm" style={{ maxWidth: "15rem" }}>
              <img
                src="/Toys_image/Action Force.jpg"
                className="card-img-top"
                alt="Card 3"
                style={{ height: "70px", objectFit: "contain" }}
              />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Here is your toy
                </p>
              </div>
              <div className="card-footer">
                <small className="text-body-secondary">Last updated 3 mins ago</small>
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="col">
            <div className="card h-100 shadow-sm" style={{ maxWidth: "15rem" }}>
              <img
                src="/Toys_image/Action Jackson toy.jpg"
                className="card-img-top"
                alt="Card 3"
                style={{ height: "70px", objectFit: "contain" }}
              />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Here is your toy
                </p>
              </div>
              <div className="card-footer">
                <small className="text-body-secondary">Last updated 3 mins ago</small>
              </div>
            </div>
          </div>

          {/* Card 6 */}
          <div className="col">
            <div className="card h-100 shadow-sm" style={{ maxWidth: "15rem" }}>
              <img
                src="/Toys_image/Action Max.jpg"
                className="card-img-top"
                alt="Card 3"
                style={{ height: "70px", objectFit: "contain" }}
              />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Here is your toy
                </p>
              </div>
              <div className="card-footer">
                <small className="text-body-secondary">Last updated 3 mins ago</small>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
