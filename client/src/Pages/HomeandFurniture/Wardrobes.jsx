import React , {useState} from "react";
import Layout from "../../Components/Layout";
import "../../Styles/Furniture/Wardrobes.css";
import axios from 'axios';
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config";

const wardrobesData = [
  {
    id: 1,
    name: "Wooden Wardrobe with 2 Doors",
    rating: "4.7",
    reviews: "2,150 Ratings & 720 Reviews",
    material: "Wood",
    dimensions: "60 x 24 x 84 inches",
    price: "₹22,990",
    oldPrice: "₹29,990",
    discount: "23% off",
    image: "/images/wardrobes/wooden_wardrobe_2_doors.jpg",
  },
  {
    id: 2,
    name: "Modern Sliding Wardrobe",
    rating: "4.8",
    reviews: "1,890 Ratings & 680 Reviews",
    material: "Wood & Glass",
    dimensions: "72 x 24 x 84 inches",
    price: "₹35,990",
    oldPrice: "₹39,990",
    discount: "10% off",
    image: "/images/wardrobes/modern_sliding_wardrobe.jpg",
  },
  {
    id: 3,
    name: "Double Door Wardrobe with Mirror",
    rating: "4.6",
    reviews: "1,600 Ratings & 540 Reviews",
    material: "Wood & Mirror",
    dimensions: "72 x 24 x 84 inches",
    price: "₹18,990",
    oldPrice: "₹22,990",
    discount: "17% off",
    image: "/images/wardrobes/double_door_wardrobe_with_mirror.jpg",
  },
  {
    id: 4,
    name: "Luxury Wardrobe with LED Lights",
    rating: "4.9",
    reviews: "2,300 Ratings & 780 Reviews",
    material: "Wood & LED",
    dimensions: "78 x 26 x 90 inches",
    price: "₹45,990",
    oldPrice: "₹50,990",
    discount: "10% off",
    image: "/images/wardrobes/luxury_wardrobe_led_lights.jpg",
  }
];

// Function to convert price from string (with ₹ symbol) to integer
const convertToIntegerPrice = (price) => {
  return parseInt(price.replace(/[₹,]/g, ''), 10);
};

const Wardrobes = () => {

  const [likedWardrobes, setLikedWardrobes] = useState({});
  const navigate = useNavigate();

  const toggleLike = async (wardrobe) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the wishlist.");
      return;
    }


    const wishList = {
      productid: wardrobe.id,
      image: wardrobe.image,
      name: wardrobe.name,
      price: convertToIntegerPrice(wardrobe.price),
      oldPrice: convertToIntegerPrice(wardrobe.oldPrice),
      discount: wardrobe.discount,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/wishlist`, wishList);
      console.log("Item added to wishlist:", response.data);
      toast.success("Item added to wishlist successfully!");
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
      toast.error("Failed to add item to wishlist.");
    }

    setLikedWardrobes((prev) => ({
      ...prev,
      [wardrobe.id]: !prev[wardrobe.id],
    }));
  };


  const addToCart = async (wardrobe) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the cart.");
      return;
    }


    const cartItem = {
      productid: wardrobe.id,
      image: wardrobe.image,
      name: wardrobe.name,
      price: convertToIntegerPrice(wardrobe.price),  // Convert to integer
      oldPrice: convertToIntegerPrice(wardrobe.oldPrice),  // Convert to integer
      discount: wardrobe.discount,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/cart`, cartItem);
      console.log("Item added to cart:", response.data);
      toast.success("Item added to cart successfully!");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Failed to add item to cart.");
    }
  };

  return (
    <Layout>
      <h2 className="wardrobes-page-title">Latest Wardrobes</h2>
      <div className="wardrobes-container">
        {wardrobesData.map((wardrobe) => (
          <div className="wardrobe-card" key={wardrobe.id}>
            <div className="wardrobe-content">
              <img src={wardrobe.image} alt={wardrobe.name} className="wardrobe-image" />
              <div className="wardrobe-details">
                <h3 className="wardrobe-name">{wardrobe.name}</h3>
                <p className="wardrobe-rating">⭐ {wardrobe.rating} ({wardrobe.reviews})</p>
                <ul className="wardrobe-specs">
                  <li><strong>Material:</strong> {wardrobe.material}</li>
                  <li><strong>Dimensions:</strong> {wardrobe.dimensions}</li>
                </ul>
                <p className="wardrobe-price">
                  <span className="current-price">₹{convertToIntegerPrice(wardrobe.price)}</span>
                  <span className="old-price">₹{convertToIntegerPrice(wardrobe.oldPrice)}</span>
                  <span className="discount">{wardrobe.discount}</span>
                </p>
                <div className="button-container">
                  <button className="add-to-cart" onClick={() => addToCart(wardrobe)}>Add to Cart</button>
                  <button className="buy-now" onClick={() => navigate("/cart")}>Buy Now</button>
                  <button className="like-btn" onClick={() => toggleLike(wardrobe)}>
                    <FaHeart color={likedWardrobes[wardrobe.id] ? "red" : "gray"} size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Wardrobes;
