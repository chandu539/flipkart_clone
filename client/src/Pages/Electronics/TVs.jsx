import React , {useState} from "react";
import Layout from "../../Components/Layout";
import "../../Styles/Electronics/TVs.css";
import axios from 'axios';
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config";

const tvsData = [
  {
    id: 1,
    name: "Samsung 55-inch QLED 4K Smart TV",
    rating: "4.7",
    reviews: "80,310 Ratings & 3,589 Reviews",
    screenSize: "55-inch",
    resolution: "4K UHD",
    smartFeatures: "Yes",
    price: "₹68,990",
    oldPrice: "₹79,990",
    discount: "13% off",
    image: "/images/tvs/samsung_qled_55.jpg",
  },
  {
    id: 2,
    name: "LG 65-inch OLED 4K Smart TV",
    rating: "4.8",
    reviews: "45,211 Ratings & 2,741 Reviews",
    screenSize: "65-inch",
    resolution: "4K UHD",
    smartFeatures: "Yes",
    price: "₹1,39,990",
    oldPrice: "₹1,59,990",
    discount: "13% off",
    image: "/images/tvs/lg_nanocell_50.jpg"
  },
  {
      id: 3,
      name: "Sony 50-inch LED 4K Smart TV",
      rating: "4.6",
      reviews: "50,124 Ratings & 2,249 Reviews",
      screenSize: "50-inch",
      resolution: "4K UHD",
      smartFeatures: "Yes",
      price: "₹54,990",
      oldPrice: "₹64,990",
      discount: "15% off",
      image: "/images/tvs/sony_bravia_oled_65.jpg"
  },
  {
      id: 4,
      name: "OnePlus 55-inch QLED 4K Smart TV",
      rating: "4.7",
      reviews: "35,310 Ratings & 1,980 Reviews",
      screenSize: "55-inch",
      resolution: "4K UHD",
      smartFeatures: "Yes",
      price: "₹63,990",
      oldPrice: "₹74,990",
      discount: "15% off",
      image: "/images/tvs/oneplus_led_43.jpg"
  },
  {
    id: 5,
    name: "TCL 65-inch 4K Ultra HD Smart LED TV",
    rating: "4.5",
    reviews: "38,765 Ratings & 1,215 Reviews",
    screenSize: "65-inch",
    resolution: "4K UHD",
    smartFeatures: "Yes",
    price: "₹72,990",
    oldPrice: "₹84,990",
    discount: "14% off",
    image: "/images/tvs/samsung_qled_55.jpg",
  },
];

const convertToIntegerPrice = (price) => {
  return parseInt(price.replace(/[₹,]/g, ''), 10);
};

const TVs = () => {

  const [likedTvs, setLikedTvs] = useState({});
  const navigate = useNavigate();

  const toggleLike = async (tvItem) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the wishlist.");
      return;
    }

    const wishList = {
      productid: tvItem.id,
      image: tvItem.image,
      name: tvItem.name,
      price: convertToIntegerPrice(tvItem.price),
      oldPrice: convertToIntegerPrice(tvItem.oldPrice),
      discount: tvItem.discount,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/wishlist`, wishList);
      console.log("Item added to wishlist:", response.data);
      toast.success("Item added to wishlist successfully!");
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
      toast.error("Failed to add item to wishlist.");
    }

    setLikedTvs((prev) => ({
      ...prev,
      [tvItem.id]: !prev[tvItem.id],
    }));
  };


  const addToCart = async (tvItem) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the cart.");
      return;
    }

    const cartItem = {
      productid: tvItem.id,
      image: tvItem.image,
      name: tvItem.name,
      price: convertToIntegerPrice(tvItem.price),
      oldPrice: convertToIntegerPrice(tvItem.oldPrice),
      discount: tvItem.discount,
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
      <h2 className="tvs-page-title">TVs</h2>
      <div className="tvs-container">
        {tvsData.map((tvItem) => (
          <div className="tv-card" key={tvItem.id}>
            <div className="tv-content">
              <img src={tvItem.image} alt={tvItem.name} className="tv-image" />
              <div className="tv-details">
                <h3 className="tv-name">{tvItem.name}</h3>
                <p className="tv-rating">⭐ {tvItem.rating} ({tvItem.reviews})</p>
                <ul className="tv-specs">
                  <li><strong>Screen Size:</strong> {tvItem.screenSize}</li>
                  <li><strong>Resolution:</strong> {tvItem.resolution}</li>
                  <li><strong>Smart Features:</strong> {tvItem.smartFeatures}</li>
                </ul>
                <p className="tv-price">
                  <span className="current-price">₹{convertToIntegerPrice(tvItem.price)}</span>
                  <span className="old-price">₹{convertToIntegerPrice(tvItem.oldPrice)}</span>
                  <span className="discount">{tvItem.discount}</span>
                </p>
                <div className="button-container">
                  <button className="add-to-cart" onClick={() => addToCart(tvItem)}>Add to Cart</button>
                  <button className="buy-now" onClick={() => navigate("/cart")}>Buy Now</button>
                  <button className="like-btn" onClick={() => toggleLike(tvItem)}>
                    <FaHeart color={likedTvs[tvItem.id] ? "red" : "gray"} size={20} />
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

export default TVs;
