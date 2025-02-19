import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "../Styles/CategoryHighlight.css"; // Import CSS for styling

const CategoryHighlight = ({ image, title, description, link }) => {
  const navigate = useNavigate();

  return (
    <div className="category-highlight">
      <div className="image-container">
        <img src={image} alt={title} />
      </div>
      <div className="content">
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={() => navigate(link)}>Explore Now</button>
      </div>
    </div>
  );
};

export default CategoryHighlight;
