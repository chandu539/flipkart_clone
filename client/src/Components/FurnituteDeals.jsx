import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/FurnitureDeals.css"; 
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const furnitureItems = [
  { id: 1, name: "Mattress", offer: "Up to 50% OFF", image: "/mattress.jpg", page: "/beds" },
  { id: 2, name: "Sofa & Sectionals", offer: "Up to 40% OFF", image: "/sofa.jpg", page: "/sofas" },
  { id: 3, name: "Office & Study Chairs", offer: "Up to 30% OFF", image: "/chair.jpg", page: "/chairs" },
  { id: 4, name: "Beds", offer: "Up to 45% OFF", image: "/beds.jpg", page: "/beds" },
  { id: 5, name: "TV Units", offer: "Up to 35% OFF", image: "/tv.jpg", page: "/tvs" },
  { id: 6, name: "Sofa Beds", offer: "Up to 60% OFF", image: "/sofabed.jpg", page: "/sofas" },
];

const FurnitureDeals = () => {
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      setMaxScroll(container.scrollWidth - container.clientWidth);
    }
  }, []);

  const handleScroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = 250;
      const newScrollPosition =
        direction === "left"
          ? Math.max(container.scrollLeft - scrollAmount, 0)
          : Math.min(container.scrollLeft + scrollAmount, maxScroll);

      container.scrollTo({ left: newScrollPosition, behavior: "smooth" });
      setScrollPosition(newScrollPosition);
    }
  };

  const handleNavigation = (page) => {
    navigate(page);
  };

  return (
    <div className="furniture-deals-container">
      <h2>Furniture Deals</h2>
      <div className="furniture-scroll-wrapper">
        <button
          className="furniture-arrow left"
          onClick={() => handleScroll("left")}
          disabled={scrollPosition <= 0}
        >
          <FaChevronLeft />
        </button>

        <div className="furniture-items-container" ref={scrollRef}>
          {furnitureItems.map((item) => (
            <div
              key={item.id}
              className="furniture-item-card"
              onClick={() => handleNavigation(item.page)}
              style={{ cursor: "pointer" }}
            >
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p className="furniture-offer">{item.offer}</p>
            </div>
          ))}
        </div>

        <button
          className="furniture-arrow right"
          onClick={() => handleScroll("right")}
          disabled={scrollPosition >= maxScroll}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default FurnitureDeals;
