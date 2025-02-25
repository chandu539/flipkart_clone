import React , {useState} from "react";
import Layout from "../../Components/Layout";
import "../../Styles/Fashion/Footwear.css";
import axios from 'axios';
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config";

const footWearData = [
  {
    id: 1,
    name: "Running Shoes",
    rating: "4.8",
    reviews: "2,000 Ratings & 800 Reviews",
    material: "Mesh",
    size: "UK 6, UK 7, UK 8, UK 9, UK 10",
    price: "₹1,999",
    oldPrice: "₹2,999",
    discount: "33% off",
    image: "/images/footwear/running_shoes.jpg",
  },
  {
    id: 2,
    name: "Casual Sneakers",
    rating: "4.7",
    reviews: "1,500 Ratings & 600 Reviews",
    material: "Synthetic Leather",
    size: "UK 6, UK 7, UK 8, UK 9, UK 10",
    price: "₹1,499",
    oldPrice: "₹2,299",
    discount: "35% off",
    image: "/images/footwear/casual_sneakers.jpg",
  },
  {
    id: 3,
    name: "Formal Leather Shoes",
    rating: "4.6",
    reviews: "1,200 Ratings & 500 Reviews",
    material: "Genuine Leather",
    size: "UK 6, UK 7, UK 8, UK 9, UK 10",
    price: "₹2,499",
    oldPrice: "₹3,499",
    discount: "28% off",
    image: "/images/footwear/formal_leather_shoes.jpg",
  }
];

const convertToIntegerPrice = (price) => {
  return parseInt(price.replace(/[₹,]/g, ''), 10);
};

const FootWear = () => {

  const [likedFootwear, setLikedFootwear] = useState({});
  const navigate = useNavigate();

  const toggleLike = async (footWearItem) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the wishlist.");
      return;
    }

    const wishList = {
      productid: footWearItem.id,
      image: footWearItem.image,
      name: footWearItem.name,
      price: convertToIntegerPrice(footWearItem.price),
      oldPrice: convertToIntegerPrice(footWearItem.oldPrice),
      discount: footWearItem.discount,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/wishlist`, wishList);
      console.log("Item added to wishlist:", response.data);
      toast.success("Item added to wishlist successfully!");
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
      toast.error("Failed to add item to wishlist.");
    }

    setLikedFootwear((prev) => ({
      ...prev,
      [footWearItem.id]: !prev[footWearItem.id],
    }));
  };

  const addToCart = async (footWearItem) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the cart.");
      return;
    }


    const cartItem = {
      productid: footWearItem.id,
      image: footWearItem.image,
      name: footWearItem.name,
      price: convertToIntegerPrice(footWearItem.price),
      oldPrice: convertToIntegerPrice(footWearItem.oldPrice),
      discount: footWearItem.discount,
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
      <h2 className="footwear-page-title">Latest Footwear Collection</h2>
      <div className="footwear-container">
        {footWearData.map((footWearItem) => (
          <div className="footwear-card" key={footWearItem.id}>
            <div className="footwear-content">
              <img src={footWearItem.image} alt={footWearItem.name} className="footwear-image" />
              <div className="footwear-details">
                <h3 className="footwear-name">{footWearItem.name}</h3>
                <p className="footwear-rating">⭐ {footWearItem.rating} ({footWearItem.reviews})</p>
                <ul className="footwear-specs">
                  <li><strong>Material:</strong> {footWearItem.material}</li>
                  <li><strong>Size:</strong> {footWearItem.size}</li>
                </ul>
                <p className="footwear-price">
                  <span className="current-price">₹{convertToIntegerPrice(footWearItem.price)}</span>
                  <span className="old-price">₹{convertToIntegerPrice(footWearItem.oldPrice)}</span>
                  <span className="discount">{footWearItem.discount}</span>
                </p>
                <div className="button-container">
                  <button className="add-to-cart" onClick={() => addToCart(footWearItem)}>Add to Cart</button>
                  <button className="buy-now" onClick={() => navigate("/cart")}>Buy Now</button>
                  <button className="like-btn" onClick={() => toggleLike(footWearItem)}>
                    <FaHeart color={likedFootwear[footWearItem.id] ? "red" : "gray"} size={20} />
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

export default FootWear;