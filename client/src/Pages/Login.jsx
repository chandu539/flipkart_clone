import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import NavbarLogin from "../Components/NavbarLogin";
import Footer from "../Components/Footer";
import SecondaryNavbar from "../Components/SecondaryNavbar";
import "../Styles/Login.css";

const Login = () => {
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        emailOrMobile,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Fetch user's cart and wishlist after login
      const cartRes = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${res.data.token}` },
      });
      const wishlistRes = await axios.get("http://localhost:5000/api/wishlist", {
        headers: { Authorization: `Bearer ${res.data.token}` },
      });

      localStorage.setItem("cart", JSON.stringify(cartRes.data));
      localStorage.setItem("wishlist", JSON.stringify(wishlistRes.data));

      toast.success("Login successful!");
      navigate("/mobiles");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Invalid credentials");
    }
  };

  return (
    <div>
      <NavbarLogin />
      <SecondaryNavbar />
      <div className="login-container">
        <div className="login-left">
          <h2>Login</h2>
          <p>Get access to your Orders, Wishlist, and Recommendations</p>
        </div>
        <div className="login-right">
          <form onSubmit={handleLogin}>
            <label htmlFor="emailOrMobile">Email or Mobile</label>
            <input
              type="text"
              id="emailOrMobile"
              placeholder="Enter your email or mobile"
              value={emailOrMobile}
              onChange={(e) => setEmailOrMobile(e.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <p className="terms">
              By continuing, you agree to Shopify's <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
            </p>

            <button type="submit" className="login-btn">Login</button>

            <p className="new-account">
              New to Shopify? <a href="/Signup">Create an account</a>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
