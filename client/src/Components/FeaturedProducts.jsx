import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/FeaturedProducts.css"; 

const products = [
  { id: 1, name: "iPhone 15", price: "₹79,999", image: "/iphone15.jpg", page: "/mobiles" },
  { id: 2, name: "Samsung TV", price: "₹45,999", image: "/tv.jpg", page: "/tvs" },
  { id: 3, name: "Gaming Laptop", price: "₹1,05,999", image: "/gaming_laptop.jpg", page: "/laptops" },
  { id: 4, name: "Sofa Set", price: "₹25,499", image: "/sofa.jpg", page: "/sofas" },
  { id: 5, name: "Smartwatch", price: "₹4,999", image: "/smartwatch.jpg", page: "/watches" },
  { id: 6, name: "Headphones", price: "₹2,499", image: "/headphones.jpg", page: "/headphones" },
];

const FeaturedProducts = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 550; 
      if (direction === "left") {
        scrollRef.current.scrollLeft -= scrollAmount;
      } else {
        scrollRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  const handleProductClick = (page) => {
    navigate(page); 
  };

  return (  
    <div className="featured-container">
      <h2>Featured Products</h2>

      {/* Left Arrow */}
      <button className="arrow arrow-left" onClick={() => scroll("left")}>&#10094;</button>

      <div className="products-grid" ref={scrollRef}>
        {products.map((item) => (
          <div key={item.id} className="product-card" onClick={() => handleProductClick(item.page)}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p className="price">{item.price}</p>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button className="arrow arrow-right" onClick={() => scroll("right")}>&#10095;</button>
    </div>
  );
};

export default FeaturedProducts;
