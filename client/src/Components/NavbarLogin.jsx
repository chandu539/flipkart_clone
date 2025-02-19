import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NavbarLogin.css";
import { FaShoppingCart, FaUser, FaSearch, FaUserCircle, FaBox, FaHeart, FaGift } from "react-icons/fa"; 

const routes = {
  "home": "/",
  "cart": "/cart",
  "login": "/login",
  "mobiles": "/mobiles",
  "laptops": "/laptops",
  "tvs": "/tvs",
  "watches": "/watches",
  "headphones": "/headphones",
  "earphones": "/headphones",
  "beds": "/beds",
  "chairs": "/chairs",
  "sofas": "/sofas",
  "wardrobes": "/wardrobes",
  "footwear": "/footwear",
  "shoes": "/footwear",
  "sneakers": "/footwear",
  "kidswear": "/kidswear",
  "womenswear": "/womenswear",
  "menswear": "/menswear",
  "mens": "/menswear",
  "men": "/menswear",
  "women": "/womenswear",
  "ladies": "/womenswear",
  "kids": "/kidswear",
  "kids fashion": "/kidswear",
  "makeup": "/makeup",
  "skincare": "/skincare",
  "haircare": "/haircare",
  "fragrances": "/fragrances",
  "grooming": "/grooming",
  "sports": "/sports",
  "fitness": "/sports",
  "wishlist": "/wishlist",
  "orders": "/orders",
  "profile": "/profile",
  "giftcards": "/giftcards"
};

const NavbarLogin = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = searchTerm.toLowerCase().trim();
    if (keyword && routes[keyword]) {
      navigate(routes[keyword]);
    } else {
      alert("Please enter a relevant keyword");
    }
    setSearchTerm("");
  };

  return (
    <nav className="navbarlogin">
      <div className="nav-containerlogin">
        <Link to="/" className="brand-namelogin">Shopify</Link>

        <form className="search-boxlogin" onSubmit={handleSearch}>
          <FaSearch className="search-iconlogin" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        <ul className="nav-linkslogin">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li 
            className="dropdownlogin" 
            onMouseEnter={() => setShowDropdown(true)} 
            onMouseLeave={() => setShowDropdown(false)}
          >
            <Link to="/login">
              <FaUser className="iconlogin" /> Login
            </Link>
            {showDropdown && (
              <div className="dropdown-menulogin">
                <Link to="/profile"><FaUserCircle className="dropdown-iconlogin" /> My Profile</Link>
                <Link to="/cart"><FaBox className="dropdown-iconlogin" /> Orders</Link>
                <Link to="/wishlist"><FaHeart className="dropdown-iconlogin" /> Wishlist</Link>
                <Link to="/login"><FaGift className="dropdown-iconlogin" /> Gift Cards</Link>
              </div>
            )}
          </li>
          <li>
            <Link to="/wishlist">
              <FaHeart className="wishlistlogo" /> Wishlist
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <FaShoppingCart className="iconlogin" /> Cart
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarLogin;
