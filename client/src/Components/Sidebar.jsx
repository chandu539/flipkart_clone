import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Sidebar.css"; // Import the separate CSS file

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <aside className="sidebar">
      <h3>Filters</h3>

      <div className="filter-section">
        <h4>Categories</h4>
        <ul>
          <li onClick={() => handleNavigation("/laptops")} style={{ cursor: "pointer" }}>Laptops</li>
          <li onClick={() => handleNavigation("/mobiles")} style={{ cursor: "pointer" }}>Tablets</li>
          <li onClick={() => handleNavigation("/sofas")} style={{ cursor: "pointer" }}>Furniture</li>
          <li onClick={() => handleNavigation("/menswear")} style={{ cursor: "pointer" }}>Menswear</li>
          <li onClick={() => handleNavigation("/sports")} style={{ cursor: "pointer" }}>Sports</li>
          <li onClick={() => handleNavigation("/kidswear")} style={{ cursor: "pointer" }}>Kidswear</li>
          <li onClick={() => handleNavigation("/skincare")} style={{ cursor: "pointer" }}>Skincare</li>
        </ul>
      </div>

      <div className="filter-section">
        <h4>Price</h4>
        <input type="text" placeholder="Min" className="input-box" />
        to
        <input type="text" placeholder="Max" className="input-box" />
      </div>

      <div className="filter-section">
        <h4>Brand</h4>
        <input type="text" placeholder="Search Brand" className="input-box" />
        <label><input type="checkbox" onChange={() => handleNavigation("/mobiles")} /> Apple</label>
        <label><input type="checkbox" onChange={() => handleNavigation("/mobiles")} /> Samsung</label>
        <label><input type="checkbox" onChange={() => handleNavigation("/mobiles")} /> Google</label>
        <label><input type="checkbox" onChange={() => handleNavigation("/mobiles")} /> Redmi</label>
        <label><input type="checkbox" onChange={() => handleNavigation("/mobiles")} /> Xiaomi</label>
        <label><input type="checkbox" onChange={() => handleNavigation("/mobiles")} /> Oppo</label>
      </div>

      <div className="filter-section">
        <h4>Select RAM</h4>
        <input type="text" placeholder="Select RAM" className="input-box" />
        <label><input type="checkbox" onChange={() => handleNavigation("/mobiles")} /> 2GB</label>
        <label><input type="checkbox" onChange={() => handleNavigation("/mobiles")} /> 3GB</label>
        <label><input type="checkbox" onChange={() => handleNavigation("/mobiles")} /> 4GB</label>
        <label><input type="checkbox" onChange={() => handleNavigation("/mobiles")} /> 6GB</label>
        <label><input type="checkbox" onChange={() => handleNavigation("/mobiles")} /> 8GB</label>
        <label><input type="checkbox" onChange={() => handleNavigation("/mobiles")} /> 12GB</label>
      </div>

      <div className="filter-section">
        <h4>Customer Ratings</h4>
        <label><input type="checkbox" onChange={() => handleNavigation("/mobiles")} /> 4★ & above</label>
        <label><input type="checkbox" onChange={() => handleNavigation("/mobiles")} /> 3★ & above</label>
      </div>
    </aside>
  );
};

export default Sidebar;
