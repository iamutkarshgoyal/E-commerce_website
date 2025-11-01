import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const CreateAccount = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    mobile: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch(`http://127.0.0.1:8000/signup/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));
      setMessage(data.message || "Account created successfully!");
    } catch (error) {
      setMessage("Something went wrong");
      console.error("❌ Network error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-page">
        <div className="auth-section left-section">
          <div className="auth-card">
            <h2>Create an Account</h2>
            <p className="subtitle">
              Join our community and get exclusive access to deals.
            </p>

            <form onSubmit={handleSubmit}>
              {/* First + Last Name — Single Row */}
              <div className="name-container mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstname"
                  placeholder="First Name"
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastname"
                  placeholder="Last Name"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="tel"
                  className="form-control"
                  id="mobile"
                  name="mobile"
                  placeholder="Enter your mobile"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="John@example.com"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3 password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {message && <p className="message mt-3">{message}</p>}

            <div className="social-signup">
              <p>Or sign up with</p>
              <div className="social-buttons">
                <button className="social-btn facebook">
                  <i className="fab fa-facebook-f"></i>
                </button>
                <button className="social-btn google">
                  <i className="fab fa-google"></i>
                </button>
                <button className="social-btn apple">
                  <i className="fab fa-apple"></i>
                </button>
              </div>
            </div>
            <div className="links mt-3">
              <p>
                Already have an account?{" "}
                <a href="/login" className="text-decoration-none">
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Inline Styles */}
      <style>
        {`
        body {
          font-family: 'Poppins', sans-serif;
          background: #f2f3f5;
        }

        .auth-page {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          padding: 40px;
        }

        .auth-card {
          width: 85%;
          max-width: 420px;
          background: #fff;
          border-radius: 15px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          padding: 45px 35px;
          text-align: center;
          transition: transform 0.3s ease;
        }

        .auth-card:hover {
          transform: translateY(-5px);
        }

        h2 {
          font-weight: 700;
          color: #222;
          margin-bottom: 15px;
        }

        .subtitle {
          color: #555;
          font-size: 0.95rem;
          margin-bottom: 25px;
        }

        .form-control {
          border-radius: 8px;
          padding: 10px;
          border: 1px solid #ccc;
          width: 100%;
        }

        .form-control:focus {
          border-color: #007bff;
          box-shadow: 0 0 5px rgba(0,123,255,0.3);
          outline: none;
        }

        /* First + Last name row */
        .name-container {
          display: flex;
          gap: 1rem;
        }

        .name-container input {
          flex: 1;
        }

        .password-wrapper {
          position: relative;
        }

        .eye-btn {
          position: absolute;
          top: 50%;
          right: 12px;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #555;
        }

        .eye-btn:hover {
          color: #007bff;
        }

        .btn-primary {
          background-color: #007bff;
          border: none;
          border-radius: 25px;
          padding: 10px 0;
          font-weight: 600;
          transition: all 0.3s ease;
          color: white;
        }

        .btn-primary:hover {
          background-color: #0056b3;
          transform: scale(1.03);
        }

        .social-signup {
          margin-top: 25px;
        }

        .social-buttons {
          display: flex;
          justify-content: space-around;
          gap: 10px;
        }

        .social-btn {
          flex: 1;
          border: none;
          border-radius: 25px;
          padding: 10px 15px;
          font-weight: 600;
          color: white;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .social-btn:hover {
          transform: translateY(-3px);
        }

        .facebook { background-color: #3b5998; }
        .google { background-color: #db4437; }
        .apple { background-color: #000; }

        .message {
          color: green;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .auth-page {
            flex-direction: column;
            height: auto;
            padding: 30px 20px;
          }

          .name-container {
            flex-direction: column;
          }
        }
        `}
      </style>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />
    </>
  );
};

export default CreateAccount;
