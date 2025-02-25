import React , {useState} from "react";
import Layout from "../../Components/Layout";
import "../../Styles/Beauty/Makeup.css";
import axios from 'axios';
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config";

const makeupData = [
  {
    id: 1,
    name: "Matte Lipstick",
    rating: "4.8",
    reviews: "5,000 Ratings & 2,000 Reviews",
    type: "Long-lasting",
    shades: "Red, Pink, Nude, Plum",
    price: "₹599",
    oldPrice: "₹899",
    discount: "33% off",
    image: "/images/makeup/matte_lipstick.jpg",
  },
  {
    id: 2,
    name: "Waterproof Mascara",
    rating: "4.7",
    reviews: "3,500 Ratings & 1,500 Reviews",
    type: "Smudge-proof",
    shades: "Black, Brown",
    price: "₹499",
    oldPrice: "₹799",
    discount: "38% off",
    image: "/images/makeup/waterproof_mascara.jpg",
  },
  {
    id: 3,
    name: "Foundation",
    rating: "4.6",
    reviews: "4,200 Ratings & 1,800 Reviews",
    type: "Full Coverage",
    shades: "Ivory, Beige, Honey, Tan",
    price: "₹999",
    oldPrice: "₹1,499",
    discount: "33% off",
    image: "/images/makeup/foundation.jpg",
  },

  {
    id: 4,
    name: "Lipstick",
    rating: "4.7",
    reviews: "5,000 Ratings & 2,200 Reviews",
    type: "Matte Finish",
    shades: "Ruby Red, Nude Pink, Coral, Plum",
    price: "₹599",
    oldPrice: "₹899",
    discount: "33% off",
    image: "/images/makeup/lipstick.jpg",
  },
  {
    id: 5,
    name: "Eyeliner",
    rating: "4.5",
    reviews: "3,800 Ratings & 1,500 Reviews",
    type: "Waterproof",
    shades: "Black, Brown, Blue, Green",
    price: "₹349",
    oldPrice: "₹599",
    discount: "42% off",
    image: "/images/makeup/eyeliner.jpg",
  },
  {
    id: 6,
    name: "Compact Powder",
    rating: "4.6",
    reviews: "3,500 Ratings & 1,400 Reviews",
    type: "Oil Control",
    shades: "Ivory, Beige, Sand, Bronze",
    price: "₹499",
    oldPrice: "₹799",
    discount: "38% off",
    image: "/images/makeup/compact_powder.jpg",
  }

];

const convertToIntegerPrice = (price) => {
  return parseInt(price.replace(/[₹,]/g, ''), 10);
};

const Makeup = () => {

  const [likedMakeup, setLikedMakeup] = useState({});
  const navigate = useNavigate();

  const toggleLike = async (makeupItem) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the wishlist.");
      return;
    }


    const wishList = {
      productid: makeupItem.id,
      image: makeupItem.image,
      name: makeupItem.name,
      price: convertToIntegerPrice(makeupItem.price),
      oldPrice: convertToIntegerPrice(makeupItem.oldPrice),
      discount: makeupItem.discount,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/wishlist`, wishList);
      console.log("Item added to wishlist:", response.data);
      toast.success("Item added to wishlist successfully!");
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
      toast.error("Failed to add item to wishlist.");
    }

    setLikedMakeup((prev) => ({
      ...prev,
      [makeupItem.id]: !prev[makeupItem.id],
    }));
  };


  const addToCart = async (makeupItem) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the cart.");
      return;
    }


    const cartItem = {
      productid: makeupItem.id,
      image: makeupItem.image,
      name: makeupItem.name,
      price: convertToIntegerPrice(makeupItem.price),
      oldPrice: convertToIntegerPrice(makeupItem.oldPrice),
      discount: makeupItem.discount,
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
      <h2 className="makeup-page-title">Latest Makeup Collection</h2>
      <div className="makeup-container">
        {makeupData.map((makeupItem) => (
          <div className="makeup-card" key={makeupItem.id}>
            <div className="makeup-content">
              <img src={makeupItem.image} alt={makeupItem.name} className="makeup-image" />
              <div className="makeup-details">
                <h3 className="makeup-name">{makeupItem.name}</h3>
                <p className="makeup-rating">⭐ {makeupItem.rating} ({makeupItem.reviews})</p>
                <ul className="makeup-specs">
                  <li><strong>Type:</strong> {makeupItem.type}</li>
                  <li><strong>Shades:</strong> {makeupItem.shades}</li>
                </ul>
                <p className="makeup-price">
                  <span className="current-price">₹{convertToIntegerPrice(makeupItem.price)}</span>
                  <span className="old-price">₹{convertToIntegerPrice(makeupItem.oldPrice)}</span>
                  <span className="discount">{makeupItem.discount}</span>
                </p>
                <div className="button-container">
                  <button className="add-to-cart" onClick={() => addToCart(makeupItem)}>Add to Cart</button>
                  <button className="buy-now" onClick={() => navigate("/cart")}>Buy Now</button>
                  <button className="like-btn" onClick={() => toggleLike(makeupItem)}>
                    <FaHeart color={likedMakeup[makeupItem.id] ? "red" : "gray"} size={20} />
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

export default Makeup;
