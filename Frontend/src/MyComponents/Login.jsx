import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({ mobile: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch(`http://127.0.0.1:8000/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));
      setMessage(data.message || "Login successful");
    } catch (error) {
      console.error("❌ Network error:", error);
      setMessage("Something went wrong");
      setErrors({ network: "Network error. Please try again later." });
    } finally {
      console.log("✅ Form submitted successfully");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-section right-section">
        <div className="auth-card">
          <h2>Login</h2>
          <p className="subtitle">Welcome back! Please login to your account.</p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-3">
              <input
                type="tel"
                className="form-control"
                id="mobile"
                name="mobile"
                placeholder="Enter your mobile number"
                value={form.mobile}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3 password-wrapper">
              <input
                type={showLoginPassword ? "text" : "password"}
                className="form-control"
                id="login-password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
              >
                {showLoginPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Remember Me */}
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Message */}
            {message && <p className="mt-3 text-muted">{message}</p>}
          </form>

          <div className="links mt-3">
            <Link to="#" className="text-decoration-none me-3">
              Forgot password?
            </Link>
            <Link to="#" className="text-decoration-none">
              Privacy Policy
            </Link>
            <p className="mt-3 text-muted">
              Don't have an account?{" "}
              <Link to="/signup" className="text-decoration-none">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        body {
          background-color: #f8f9fa;
        }

        .auth-section {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .auth-card {
          width: 100%;
          max-width: 420px;
          background: #ffffff;
          border-radius: 15px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          padding: 45px 35px;
          text-align: center;
          transition: transform 0.3s ease;
        }

        .auth-card:hover {
          transform: translateY(-5px);
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
      `}</style>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />
    </>
  );
}
