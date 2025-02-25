import React , {useState} from "react";
import Layout from "../../Components/Layout";
import "../../Styles/Beauty/Fragrances.css";
import axios from 'axios';
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config";

const fragranceData = [
  {
    id: 1,
    name: "Luxury Oud Perfume",
    rating: "4.9",
    reviews: "6,000 Ratings & 2,800 Reviews",
    type: "Long-lasting & Woody",
    ingredients: "Oud, Amber, Musk",
    price: "₹1,499",
    oldPrice: "₹1,999",
    discount: "25% off",
    image: "/images/fragrances/luxury_oud_perfume.jpg",
  },
  {
    id: 2,
    name: "Floral Bliss Perfume",
    rating: "4.8",
    reviews: "5,200 Ratings & 2,300 Reviews",
    type: "Fresh & Floral",
    ingredients: "Rose, Jasmine, Vanilla",
    price: "₹1,199",
    oldPrice: "₹1,599",
    discount: "30% off",
    image: "/images/fragrances/floral_bliss_perfume.jpg",
  },
  {
    id: 3,
    name: "Citrus Burst Cologne",
    rating: "4.7",
    reviews: "4,800 Ratings & 2,000 Reviews",
    type: "Energizing & Refreshing",
    ingredients: "Lemon, Bergamot, Cedarwood",
    price: "₹899",
    oldPrice: "₹1,299",
    discount: "31% off",
    image: "/images/fragrances/citrus_burst_cologne.jpg",
  },
  {
    id: 4,
    name: "Mystic Night Eau De Parfum",
    rating: "4.8",
    reviews: "5,500 Ratings & 2,600 Reviews",
    type: "Bold & Sensual",
    ingredients: "Patchouli, Vanilla, Sandalwood",
    price: "₹1,399",
    oldPrice: "₹1,899",
    discount: "26% off",
    image: "/images/fragrances/mystic_night_perfume.jpg",
  }
];

const convertToIntegerPrice = (price) => {
  return parseInt(price.replace(/[₹,]/g, ''), 10);
};

const Fragrances = () => {

  const [likedFragrances, setLikedFragrances] = useState({});
  const navigate = useNavigate();

  const toggleLike = async (fragranceItem) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the wishlist.");
      return;
    }


    const wishList = {
      productid: fragranceItem.id,
      image: fragranceItem.image,
      name: fragranceItem.name,
      price: convertToIntegerPrice(fragranceItem.price),
      oldPrice: convertToIntegerPrice(fragranceItem.oldPrice),
      discount: fragranceItem.discount,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/wishlist`, wishList);
      console.log("Item added to wishlist:", response.data);
      toast.success("Item added to wishlist successfully!");
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
      toast.error("Failed to add item to wishlist.");
    }

    setLikedFragrances((prev) => ({
      ...prev,
      [fragranceItem.id]: !prev[fragranceItem.id],
    }));
  };

  const addToCart = async (fragranceItem) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the cart.");
      return;
    }


    const cartItem = {
      productid: fragranceItem.id,
      image: fragranceItem.image,
      name: fragranceItem.name,
      price: convertToIntegerPrice(fragranceItem.price),
      oldPrice: convertToIntegerPrice(fragranceItem.oldPrice),
      discount: fragranceItem.discount,
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
      <h2 className="fragrance-page-title">Exclusive Fragrance Collection</h2>
      <div className="fragrance-container">
        {fragranceData.map((fragranceItem) => (
          <div className="fragrance-card" key={fragranceItem.id}>
            <div className="fragrance-content">
              <img src={fragranceItem.image} alt={fragranceItem.name} className="fragrance-image" />
              <div className="fragrance-details">
                <h3 className="fragrance-name">{fragranceItem.name}</h3>
                <p className="fragrance-rating">⭐ {fragranceItem.rating} ({fragranceItem.reviews})</p>
                <ul className="fragrance-specs">
                  <li><strong>Type:</strong> {fragranceItem.type}</li>
                  <li><strong>Ingredients:</strong> {fragranceItem.ingredients}</li>
                </ul>
                <p className="fragrance-price">
                  <span className="current-price">₹{convertToIntegerPrice(fragranceItem.price)}</span>
                  <span className="old-price">₹{convertToIntegerPrice(fragranceItem.oldPrice)}</span>
                  <span className="discount">{fragranceItem.discount}</span>
                </p>
                <div className="button-container">
                  <button className="add-to-cart" onClick={() => addToCart(fragranceItem)}>Add to Cart</button>
                  <button className="buy-now" onClick={() => navigate("/cart")}>Buy Now</button>
                  <button className="like-btn" onClick={() => toggleLike(fragranceItem)}>
                    <FaHeart color={likedFragrances[fragranceItem.id] ? "red" : "gray"} size={20} />
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

export default Fragrances;