import React from "react";
import { Link } from "react-router-dom";
import createaccount from "./CreateAccount";

export default function Login() {
  return (
      <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center mb-4">Login</h2>
                <form>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="Enter your username" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter your password" />
                  </div>
                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                <div className="text-center mt-3">
                  <a href="#" className="text-decoration-none">Forgot password?</a>
                </div>
                <div className="text-center mt-3">
                  <Link to="/createaccount" className="text-decoration-none">Create an account</Link>
                </div>
                <div className="text-center mt-3">
                  <a href="#" className="text-decoration-none">Privacy Policy</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          body {
            background-color: #f8f9fa;
          }

          .card {
            border: none;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-top: 50px;
            background-color: #fff;
            margin-bottom: 50px;

          }

          .card-body {
            padding: 40px;
          }

          .btn-primary {
            background-color: #007bff;
            border-color: #007bff;
          }

          .btn-primary:hover {
            background-color: #0056b3;
            border-color: #0056b3;
          }

          .btn-primary:focus {
            box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
          }

        .form-label:hover {
          color: #0056b3;
          cursor: pointer;
        }
        `}
      </style>
</>
  );
}
