import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/TopDeals.css";

const topDeals = [
  { id: 1, name: "Fresh Fruits", discount: "Up to 50% OFF", image: "/fruits.jpg", page: "/" },
  { id: 2, name: "Women's Clothing", discount: "Up to 70% OFF", image: "/clothes.jpg", page: "/womenswear" },
  { id: 3, name: "Toys & Games", discount: "Up to 65% OFF", image: "/toys.jpg", page: "/sports" },
  { id: 4, name: "Kitchen Essentials", discount: "Up to 75% OFF", image: "/kitchen.jpg", page: "/chairs" },
  { id: 5, name: "Beauty & Skincare", discount: "Up to 60% OFF", image: "/beauty.jpg", page: "/skincare" },
  { id: 6, name: "Footwear", discount: "Up to 55% OFF", image: "/footwear.jpg", page: "/footwear" },
];

const TopDeals = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 250;
      scrollRef.current.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount;
    }
  };

  const handleClick = (page) => {
    navigate(page);
  };

  return (
    <div className="top-deals-container">
      <h2>Top Deals</h2>
      <button className="top-deals-arrow top-deals-arrow-left" onClick={() => scroll("left")}>
        &#10094;
      </button>
      <div className="top-deals-grid" ref={scrollRef}>
        {topDeals.map((item) => (
          <div key={item.id} className="top-deals-card" onClick={() => handleClick(item.page)}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p className="top-deals-discount">{item.discount}</p>
          </div>
        ))}
      </div>
      <button className="top-deals-arrow top-deals-arrow-right" onClick={() => scroll("right")}>
        &#10095;
      </button>
    </div>
  );
};

export default TopDeals;
