import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/MyProfile.css"; 
import Navbarlogin from "../Components/NavbarLogin"
import { toast } from 'react-hot-toast'; 

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
  
      if (!token) {
        console.warn("No token found, redirecting to login...");
        navigate("/login");
        return;
      }
  
      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` }, // Ensure correct header format
        });
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        if (error.response && error.response.status === 401) {
          console.warn("Unauthorized access, redirecting to login...");
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchUser();
  }, [navigate]);
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");
    toast.success("Logout successfully..")
    navigate("/login");
  };

  return (
    <div>
      <Navbarlogin/>
      <div className="profile-container">
        <div className="profile-card">
          <h2 className="profile-title">My Profile</h2>
          {loading ? (
            <p className="loading-text">Loading...</p>
          ) : user ? (
            <div>
              <p className="profile-info">
                <strong>Name:</strong> {user.name}
              </p>
              <p className="profile-info">
                <strong>Email:</strong> {user.emailOrMobile}
              </p>
              <p className="profile-info">
                <strong>Age:</strong> {user.age}
              </p>
              <p className="profile-info">
                <strong>Gender:</strong> {user.gender}
              </p>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
          ) : (
            <p className="error-text">Failed to load profile.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
