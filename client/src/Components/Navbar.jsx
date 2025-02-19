import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";

const routes = {
  "home": "/",
  "cart": "/cart",
  "login": "/login",
  "mobiles": "/mobiles",
  "phones": "/mobiles",
  "smartphones": "/mobiles",
  "laptops": "/laptops",
  "computers": "/laptops",
  "pcs": "/laptops",
  "tvs": "/tvs",
  "televisions": "/tvs",
  "watches": "/watches",
  "headphones": "/headphones",
  "earphones": "/headphones",
  "airpods": "/headphones",
  "beds": "/beds",
  "furniture": "/beds",
  "chairs": "/chairs",
  "sofas": "/sofas",
  "couches": "/sofas",
  "wardrobes": "/wardrobes",
  "closets": "/wardrobes",
  "footwear": "/footwear",
  "shoes": "/footwear",
  "sneakers": "/footwear",
  "sandals": "/footwear",
  "kidswear": "/kidswear",
  "kids": "/kidswear",
  "childrenswear": "/kidswear",
  "womenswear": "/womenswear",
  "ladies": "/womenswear",
  "women": "/womenswear",
  "menswear": "/menswear",
  "mens": "/menswear",
  "men": "/menswear",
  "fashion": "/menswear",
  "clothing": "/menswear",
  "apparel": "/menswear",
  "makeup": "/makeup",
  "cosmetics": "/makeup",
  "beauty": "/makeup",
  "skincare": "/skincare",
  "skin": "/skincare",
  "haircare": "/haircare",
  "hair": "/haircare",
  "fragrances": "/fragrances",
  "perfumes": "/fragrances",
  "colognes": "/fragrances",
  "grooming": "/grooming",
  "shaving": "/grooming",
  "sports": "/sports",
  "fitness": "/sports",
  "wishlist": "/wishlist",
  "saved": "/wishlist"
};

const Navbar = () => {
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
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="shopify-name">Shopify</Link>

        <form className="search-box" onSubmit={handleSearch}>
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li>
            <Link to="/login"><FaUser className="icon" /> Login</Link>
          </li>
          <li>
            <a href="https://www.flipkart.com/helpcentre" target="_blank" rel="noopener noreferrer">About</a>
          </li>
          <li>
            <Link to="/cart"><FaShoppingCart className="icon" /> Cart</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;