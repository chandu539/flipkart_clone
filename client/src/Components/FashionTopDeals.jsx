import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/FashionTopDeals.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const fashionItems = [
  { id: 1, name: "Puma Shoes", offer: "Up to 40% OFF", image: "/puma_shoes.jpg", page: "/footwear" },
  { id: 2, name: "Best Selling Styles", offer: "Under ₹400", image: "/best_selling.jpg", page: "/footwear" },
  { id: 3, name: "Swim & Beach Wear", offer: "Under ₹300", image: "/swimwear.jpg", page: "/womenswear" },
  { id: 4, name: "Lingerie Sets", offer: "Up to 35% OFF", image: "/lingerie.jpg", page: "/womenswear" },
  { id: 5, name: "Fashion Dream", offer: "Under ₹500", image: "/fashion_dream.jpg", page: "/womenswear" },
  { id: 6, name: "Women Tops", offer: "Up to 40% OFF", image: "/women_tops.jpg", page: "/womenswear" },
  { id: 7, name: "Women Jumpsuits", offer: "Under ₹600", image: "/jumpsuits.jpg", page: "/womenswear" },
  { id: 8, name: "Women T-Shirts", offer: "Up to 30% OFF", image: "/women_tshirts.jpg", page: "/womenswear" },
];

const FashionTopDeals = () => {
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
    <div className="fashion-top-deals-container">
      <h2>Fashion Top Deals</h2>
      <div className="fashion-scroll-wrapper">
        <button
          className="fashion-arrow fashion-left"
          onClick={() => handleScroll("left")}
          disabled={scrollPosition <= 0}
        >
          <FaChevronLeft />
        </button>

        <div className="fashion-top-deals-grid" ref={scrollRef}>
          {fashionItems.map((item) => (
            <div
              key={item.id}
              className="fashion-top-deals-card"
              onClick={() => handleNavigation(item.page)}
              style={{ cursor: "pointer" }}
            >
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p className={`fashion-top-deals-offer ${item.offer.includes("Under") ? "fashion-under-offer" : "fashion-discount-offer"}`}>
                {item.offer}
              </p>
            </div>
          ))}
        </div>

        <button
          className="fashion-arrow fashion-right"
          onClick={() => handleScroll("right")}
          disabled={scrollPosition >= maxScroll}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default FashionTopDeals;
