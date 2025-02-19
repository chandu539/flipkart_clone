import React , {useState} from "react";
import Layout from "../../Components/Layout";
import "../../Styles/Beauty/Skincare.css";
import axios from 'axios';
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const skincareData = [
  {
    id: 1,
    name: "Moisturizing Cream",
    rating: "4.8",
    reviews: "4,500 Ratings & 2,000 Reviews",
    type: "Hydrating",
    ingredients: "Hyaluronic Acid, Aloe Vera, Vitamin E",
    price: "₹799",
    oldPrice: "₹1,199",
    discount: "33% off",
    image: "/images/skincare/moisturizing_cream.jpg",
  },
  {
    id: 2,
    name: "Sunscreen SPF 50",
    rating: "4.7",
    reviews: "3,800 Ratings & 1,700 Reviews",
    type: "Broad Spectrum",
    ingredients: "Zinc Oxide, Titanium Dioxide, Vitamin C",
    price: "₹599",
    oldPrice: "₹899",
    discount: "33% off",
    image: "/images/skincare/sunscreen.jpg",
  },
  {
    id: 3,
    name: "Vitamin C Serum",
    rating: "4.6",
    reviews: "4,000 Ratings & 1,800 Reviews",
    type: "Brightening",
    ingredients: "Vitamin C, Hyaluronic Acid, Green Tea",
    price: "₹999",
    oldPrice: "₹1,499",
    discount: "33% off",
    image: "/images/skincare/vitamin_c_serum.jpg",
  },
  {
    id: 4,
    name: "Retinol Night Cream",
    rating: "4.7",
    reviews: "4,500 Ratings & 2,100 Reviews",
    type: "Anti-Aging",
    ingredients: "Retinol, Vitamin E, Jojoba Oil",
    price: "₹1,199",
    oldPrice: "₹1,799",
    discount: "33% off",
    image: "/images/skincare/retinol_night_cream.jpg",
  },
  {
    id: 5,
    name: "Aloe Vera Gel",
    rating: "4.6",
    reviews: "5,000 Ratings & 2,500 Reviews",
    type: "Soothing & Hydrating",
    ingredients: "Pure Aloe Vera, Vitamin C, Green Tea Extract",
    price: "₹349",
    oldPrice: "₹599",
    discount: "42% off",
    image: "/images/skincare/aloe_vera_gel.jpg",
  },
  {
    id: 6,
    name: "Charcoal Peel-Off Mask",
    rating: "4.5",
    reviews: "3,900 Ratings & 1,700 Reviews",
    type: "Deep Cleansing",
    ingredients: "Activated Charcoal, Tea Tree Oil, Clay",
    price: "₹599",
    oldPrice: "₹999",
    discount: "40% off",
    image: "/images/skincare/charcoal_peel_off_mask.jpg",
  }

];

const convertToIntegerPrice = (price) => {
  return parseInt(price.replace(/[₹,]/g, ''), 10);
};

const Skincare = () => {

  const [likedSkincare, setLikedSkincare] = useState({});
  const navigate = useNavigate();

  const toggleLike = async (skincareItem) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the wishlist.");
      return;
    }


    const wishList = {
      productid: skincareItem.id,
      image: skincareItem.image,
      name: skincareItem.name,
      price: convertToIntegerPrice(skincareItem.price),
      oldPrice: convertToIntegerPrice(skincareItem.oldPrice),
      discount: skincareItem.discount,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/wishlist", wishList);
      console.log("Item added to wishlist:", response.data);
      toast.success("Item added to wishlist successfully!");
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
      toast.error("Failed to add item to wishlist.");
    }

    setLikedSkincare((prev) => ({
      ...prev,
      [skincareItem.id]: !prev[skincareItem.id],
    }));
  };



  const addToCart = async (skincareItem) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the cart.");
      return;
    }


    const cartItem = {
      productid: skincareItem.id,
      image: skincareItem.image,
      name: skincareItem.name,
      price: convertToIntegerPrice(skincareItem.price),
      oldPrice: convertToIntegerPrice(skincareItem.oldPrice),
      discount: skincareItem.discount,
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
      <h2 className="skincare-page-title">Latest Skincare Collection</h2>
      <div className="skincare-container">
        {skincareData.map((skincareItem) => (
          <div className="skincare-card" key={skincareItem.id}>
            <div className="skincare-content">
              <img src={skincareItem.image} alt={skincareItem.name} className="skincare-image" />
              <div className="skincare-details">
                <h3 className="skincare-name">{skincareItem.name}</h3>
                <p className="skincare-rating">⭐ {skincareItem.rating} ({skincareItem.reviews})</p>
                <ul className="skincare-specs">
                  <li><strong>Type:</strong> {skincareItem.type}</li>
                  <li><strong>Ingredients:</strong> {skincareItem.ingredients}</li>
                </ul>
                <p className="skincare-price">
                  <span className="current-price">₹{convertToIntegerPrice(skincareItem.price)}</span>
                  <span className="old-price">₹{convertToIntegerPrice(skincareItem.oldPrice)}</span>
                  <span className="discount">{skincareItem.discount}</span>
                </p>
                <div className="button-container">
                  <button className="add-to-cart" onClick={() => addToCart(skincareItem)}>Add to Cart</button>
                  <button className="buy-now" onClick={() => navigate("/cart")}>Buy Now</button>
                  <button className="like-btn" onClick={() => toggleLike(skincareItem)}>
                    <FaHeart color={likedSkincare[skincareItem.id] ? "red" : "gray"} size={20} />
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

export default Skincare;