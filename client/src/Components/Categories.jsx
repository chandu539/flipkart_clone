import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Categories.css"; // Ensure this CSS file exists

const categories = [
  { id: 1, name: "Mobiles", image: "/mobiles.jpg", page: "/mobiles" },
  { id: 2, name: "Laptops", image: "/laptops.jpg", page: "/laptops" },
  { id: 3, name: "Home Appliances", image: "/home-appliances.jpg", page: "/sofas" },
  { id: 4, name: "Furniture", image: "/furniture.jpg", page: "/chairs" },
  { id: 5, name: "Kitchen Store", image: "/kitchen-store.jpg", page: "/wardrobes" },
  { id: 6, name: "Clothing", image: "/clothing.jpg", page: "/menswear" },
  { id: 7, name: "Beauty & Care", image: "/beauty.jpg", page: "/skincare" },
  { id: 8, name: "Toys & Games", image: "/toys.jpg", page: "/sports" },
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (page) => {
    navigate(page); // Navigates to the respective page
  };

  return (
    <div className="categories-container">
      {categories.map((item) => (
        <div key={item.id} className="category-box" onClick={() => handleCategoryClick(item.page)}>
          <img src={item.image} alt={item.name} />
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Categories;
