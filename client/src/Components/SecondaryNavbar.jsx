import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa"; 
import "../Styles/SecondaryNavbar.css";

const categories = [
  {
    name: "Electronics",
    links: ["Mobiles", "Laptops", "TVs", "Watches", "Headphones"],
  },
  {
    name: "Home & Furniture",
    links: ["Sofas", "Beds",  "Chairs", "Wardrobes"],
  },
  {
    name: "Fashion",
    links: ["MensWear", "WomensWear", "KidsWear", "Footwear"],
  },
  {
    name: "Beauty & Personal Care",
    links: ["Makeup", "Skincare", "Haircare", "Fragrances", "Grooming"],
  },
  {
    name: "Sports & Fitness",
    links: ["sports"],
  },
  {
    name: "Flights",
    links:["/"],
    
  },
  {
    name: "Offer Zone",
    links: ["/"],
  },
];

const SecondaryNavbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <nav className="secondary-navbar">
      <ul className="category-list">
        {categories.map((category, index) => (
          <li
            key={index}
            className="category-item"
            onMouseEnter={() => setOpenDropdown(index)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <div className="category-name">
              {category.name}
              {openDropdown === index ? <FaAngleUp className="arrow-icon" /> : <FaAngleDown className="arrow-icon" />}
            </div>

            {/* Dropdown Menu */}
            {openDropdown === index && (
              <div className="dropdown-menu">
                {category.links.map((link, subIndex) => (
                  <Link key={subIndex} to={`/${link.toLowerCase().replace(/\s/g, "-")}`} className="dropdown-item">
                    {link}
                  </Link>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SecondaryNavbar;
