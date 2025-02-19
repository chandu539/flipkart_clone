import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "../Styles/ImageSlider.css"; // Add CSS for styling

const ImageSlider = () => {
  const images = [
    "/slide1.jpg",
    "/slide2.jpg",
    "/slide3.jpg",
    "/slide4.jpg",
  ];

  const settings = {
    dots: true,         // Show navigation dots
    infinite: true,     // Infinite loop
    speed: 500,        // Transition speed
    slidesToShow: 1,   // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true,    // Auto-slide
    autoplaySpeed: 3000, // Time between slides
    arrows: true,      // Show left/right arrows
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index} className="slide">
            <img src={src} alt={`slide-${index}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
