import React from "react";
import "../Styles/Singlerow.css";

const singleBox = {
  title: "Best Deals",
  products: [
    { id: 1, name: "Headphones", image: "/headphones.jpg" },
    { id: 2, name: "Tablet", image: "/tablet.jpg" },
    { id: 3, name: "Camera", image: "/camera.jpg" },
    { id: 4, name: "Speakers", image: "/speakers.jpg" },
  ],
};

const Singlerow = () => {
  return (
    <div className="single-box-container">
      {/* Single Box */}
      <div className="single-product-box">
        <h3 className="box-title">{singleBox.title}</h3>
        <div className="grid-container">
          {singleBox.products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <p className="product-name">{product.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Image Section */}
      <div className="image-container">
        <img src="/deal-banner.jpg" alt="Best Deals" />
      </div>
    </div>
  );
};

export default Singlerow;
