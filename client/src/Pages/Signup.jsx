import React, { useState } from "react";
import axios from "axios"; // Import axios for API requests
import NavbarLogin from "../Components/NavbarLogin";
import Footer from "../Components/Footer";
import SecondaryNavbar from "../Components/SecondaryNavbar";
import "../Styles/Signup.css";
import { toast } from 'react-hot-toast'; 
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    emailOrMobile: "",
    password: "",
    age: "",
    gender: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
   
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/signup", formData);
      console.log(response.data.message); 
        toast.success("Signed Successfully");
        navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div>
      <NavbarLogin />
      <SecondaryNavbar />
      <div className="signup-container">
        <div className="signup-left">
          <h2>Sign Up</h2>
          <p>Create an account to enjoy a seamless shopping experience.</p>
        </div>
        <div className="signup-right">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" placeholder="Enter your full name" value={formData.name} onChange={handleChange} required />

            <label htmlFor="emailOrMobile">Email or Mobile</label>
            <input type="text" id="emailOrMobile" placeholder="Enter email or phone" value={formData.emailOrMobile} onChange={handleChange} required />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />

            <label htmlFor="age">Age</label>
            <input type="number" id="age" placeholder="Enter your age" value={formData.age} onChange={handleChange} required />

            <label htmlFor="gender">Gender</label>
            <input type="text" id="gender" placeholder="Enter your gender" value={formData.gender} onChange={handleChange} required />

            <p className="terms">
              By signing up, you agree to Flipkart's{" "}
              <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
            </p>

            <button type="submit" className="signup-btn">Sign Up</button>

            <p className="already-account">
              Already have an account? <a href="/login">Login here</a>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
