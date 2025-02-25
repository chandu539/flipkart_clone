import React , {useState} from "react";
import Layout from "../../Components/Layout";
import "../../Styles/Beauty/Grooming.css";
import axios from 'axios';
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config";

const groomingData = [
  {
    id: 1,
    name: "Shaving Kit",
    rating: "4.7",
    reviews: "3,500 Ratings & 1,200 Reviews",
    type: "Complete Shaving Set",
    ingredients: "Razor, Shaving Cream, Aftershave",
    price: "₹799",
    oldPrice: "₹1,199",
    discount: "33% off",
    image: "/images/grooming/shaving_kit.jpg",
  },
  {
    id: 2,
    name: "Beard Care Kit",
    rating: "4.8",
    reviews: "4,000 Ratings & 1,500 Reviews",
    type: "For Beard Growth & Care",
    ingredients: "Beard Oil, Beard Shampoo, Beard Comb",
    price: "₹1,299",
    oldPrice: "₹1,699",
    discount: "24% off",
    image: "/images/grooming/beard_care_kit.jpg",
  },
  {
    id: 3,
    name: "Hair Trimmer",
    rating: "4.6",
    reviews: "2,800 Ratings & 1,000 Reviews",
    type: "Cordless & Adjustable",
    ingredients: "Trimmer, Cleaning Brush, Charger",
    price: "₹1,499",
    oldPrice: "₹1,999",
    discount: "25% off",
    image: "/images/grooming/hair_trimmer.jpg",
  },
  {
    id: 4,
    name: "Facial Scrub",
    rating: "4.5",
    reviews: "3,200 Ratings & 1,100 Reviews",
    type: "Exfoliating & Deep Cleansing",
    ingredients: "Charcoal, Aloe Vera, Vitamin E",
    price: "₹399",
    oldPrice: "₹599",
    discount: "33% off",
    image: "/images/grooming/facial_scrub.jpg",
  }
];

const convertToIntegerPrice = (price) => {
  return parseInt(price.replace(/[₹,]/g, ''), 10);
};

const Grooming = () => {

  const [likedGrooming, setLikedGrooming] = useState({});
  const navigate = useNavigate();

  const toggleLike = async (groomingItem) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the wishlist.");
      return;
    }


    const wishList = {
      productid: groomingItem.id,
      image: groomingItem.image,
      name: groomingItem.name,
      price: convertToIntegerPrice(groomingItem.price),
      oldPrice: convertToIntegerPrice(groomingItem.oldPrice),
      discount: groomingItem.discount,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/wishlist`, wishList);
      console.log("Item added to wishlist:", response.data);
      toast.success("Item added to wishlist successfully!");
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
      toast.error("Failed to add item to wishlist.");
    }

    setLikedGrooming((prev) => ({
      ...prev,
      [groomingItem.id]: !prev[groomingItem.id],
    }));
  };

  const addToCart = async (groomingItem) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the cart.");
      return;
    }

    const cartItem = {
      productid: groomingItem.id,
      image: groomingItem.image,
      name: groomingItem.name,
      price: convertToIntegerPrice(groomingItem.price),
      oldPrice: convertToIntegerPrice(groomingItem.oldPrice),
      discount: groomingItem.discount,
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
      <h2 className="grooming-page-title">Exclusive Grooming Essentials</h2>
      <div className="grooming-container">
        {groomingData.map((groomingItem) => (
          <div className="grooming-card" key={groomingItem.id}>
            <div className="grooming-content">
              <img src={groomingItem.image} alt={groomingItem.name} className="grooming-image" />
              <div className="grooming-details">
                <h3 className="grooming-name">{groomingItem.name}</h3>
                <p className="grooming-rating">⭐ {groomingItem.rating} ({groomingItem.reviews})</p>
                <ul className="grooming-specs">
                  <li><strong>Type:</strong> {groomingItem.type}</li>
                  <li><strong>Ingredients:</strong> {groomingItem.ingredients}</li>
                </ul>
                <p className="grooming-price">
                  <span className="current-price">₹{convertToIntegerPrice(groomingItem.price)}</span>
                  <span className="old-price">₹{convertToIntegerPrice(groomingItem.oldPrice)}</span>
                  <span className="discount">{groomingItem.discount}</span>
                </p>
                <div className="button-container">
                  <button className="add-to-cart" onClick={() => addToCart(groomingItem)}>Add to Cart</button>
                  <button className="buy-now" onClick={() => navigate("/cart")}>Buy Now</button>
                  <button className="like-btn" onClick={() => toggleLike(groomingItem)}>
                    <FaHeart color={likedGrooming[groomingItem.id] ? "red" : "gray"} size={20} />
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

export default Grooming;
