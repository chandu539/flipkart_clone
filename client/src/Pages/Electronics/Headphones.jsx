import React , {useState} from "react";
import Layout from "../../Components/Layout";
import "../../Styles/Electronics/Headphones.css";
import axios from 'axios';
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const headphonesData = [
  {
    id: 1,
    name: "Sony WH-1000XM5",
    rating: "4.9",
    reviews: "23,214 Ratings & 5,321 Reviews",
    type: "Over-Ear",
    connectivity: "Bluetooth, NFC",
    batteryLife: "30 Hours Battery Life",
    price: "₹29,990",
    oldPrice: "₹34,990",
    discount: "14% off",
    image: "/images/headphones/sony_wh1000xm5.jpg",
  },
  {
    id: 2,
    name: "Bose QuietComfort 45",
    rating: "4.8",
    reviews: "18,765 Ratings & 3,215 Reviews",
    type: "Over-Ear",
    connectivity: "Bluetooth, Wired",
    batteryLife: "24 Hours Battery Life",
    price: "₹27,990",
    oldPrice: "₹32,990",
    discount: "15% off",
    image: "/images/headphones/bose_qc45.jpg",
  },
  {
    id: 3,
    name: "Sennheiser Momentum 3",
    rating: "4.7",
    reviews: "12,345 Ratings & 1,567 Reviews",
    type: "Over-Ear",
    connectivity: "Bluetooth, Wired",
    batteryLife: "17 Hours Battery Life",
    price: "₹34,990",
    oldPrice: "₹39,990",
    discount: "12% off",
    image: "/images/headphones/sennheiser_momentum3.jpg",
  },
  {
    id: 4,
    name: "JBL Tune 750BTNC",
    rating: "4.5",
    reviews: "9,876 Ratings & 1,001 Reviews",
    type: "Over-Ear",
    connectivity: "Bluetooth",
    batteryLife: "15 Hours Battery Life",
    price: "₹7,990",
    oldPrice: "₹9,990",
    discount: "20% off",
    image: "/images/headphones/jbl_tune750btnc.jpg",
  }
];

// Function to convert price from string (with ₹ symbol) to integer
const convertToIntegerPrice = (price) => {
  return parseInt(price.replace(/[₹,]/g, ''), 10);
};

const Headphones = () => {

  const [likedHeadphones, setLikedHeadphones] = useState({});
  const navigate = useNavigate();

  const toggleLike = async (headphone) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the wishlist.");
      return;
    }


    const wishList = {
      productid: headphone.id,
      image: headphone.image,
      name: headphone.name,
      price: convertToIntegerPrice(headphone.price),
      oldPrice: convertToIntegerPrice(headphone.oldPrice),
      discount: headphone.discount,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/wishlist", wishList);
      console.log("Item added to wishlist:", response.data);
      toast.success("Item added to wishlist successfully!");
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
      toast.error("Failed to add item to wishlist.");
    }

    setLikedHeadphones((prev) => ({
      ...prev,
      [headphone.id]: !prev[headphone.id],
    }));
  };



  const addToCart = async (headphone) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the cart.");
      return;
    }


    const cartItem = {
      productid: headphone.id,
      image: headphone.image,
      name: headphone.name,
      price: convertToIntegerPrice(headphone.price),  // Convert to integer
      oldPrice: convertToIntegerPrice(headphone.oldPrice),  // Convert to integer
      discount: headphone.discount,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/cart", cartItem);
      console.log("Item added to cart:", response.data);
      toast.success("Item added to cart successfully!");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Failed to add item to cart.");
    }
  };

  return (
    <Layout>
      <h2 className="headphones-page-title">Latest Headphones</h2>
      <div className="headphones-container">
        {headphonesData.map((headphone) => (
          <div className="headphone-card" key={headphone.id}>
            <div className="headphone-content">
              <img src={headphone.image} alt={headphone.name} className="headphone-image" />
              <div className="headphone-details">
                <h3 className="headphone-name">{headphone.name}</h3>
                <p className="headphone-rating">⭐ {headphone.rating} ({headphone.reviews})</p>
                <ul className="headphone-specs">
                  <li><strong>Type:</strong> {headphone.type}</li>
                  <li><strong>Connectivity:</strong> {headphone.connectivity}</li>
                  <li><strong>Battery Life:</strong> {headphone.batteryLife}</li>
                </ul>
                <p className="headphone-price">
                  <span className="current-price">₹{convertToIntegerPrice(headphone.price)}</span>
                  <span className="old-price">₹{convertToIntegerPrice(headphone.oldPrice)}</span>
                  <span className="discount">{headphone.discount}</span>
                </p>
                <div className="button-container">
                  <button className="add-to-cart" onClick={() => addToCart(headphone)} >Add to Cart</button>
                  <button className="buy-now" onClick={() => navigate("/cart")}>Buy Now</button>
                  <button className="like-btn" onClick={() => toggleLike(headphone)}>
                    <FaHeart color={likedHeadphones[headphone.id] ? "red" : "gray"} size={20} />
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

export default Headphones;
