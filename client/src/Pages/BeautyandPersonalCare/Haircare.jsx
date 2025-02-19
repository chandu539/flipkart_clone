import React , {useState} from "react";
import Layout from "../../Components/Layout";
import "../../Styles/Beauty/Haircare.css";
import axios from 'axios';
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const haircareData = [
  {
    id: 1,
    name: "Argan Oil Shampoo",
    rating: "4.8",
    reviews: "5,000 Ratings & 2,200 Reviews",
    type: "Nourishing & Strengthening",
    ingredients: "Argan Oil, Keratin, Vitamin E",
    price: "₹899",
    oldPrice: "₹1,299",
    discount: "31% off",
    image: "/images/haircare/argan_oil_shampoo.jpg",
  },
  {
    id: 2,
    name: "Biotin Hair Serum",
    rating: "4.7",
    reviews: "4,200 Ratings & 1,900 Reviews",
    type: "Hair Growth & Repair",
    ingredients: "Biotin, Aloe Vera, Green Tea Extract",
    price: "₹799",
    oldPrice: "₹1,199",
    discount: "33% off",
    image: "/images/haircare/biotin_hair_serum.jpg",
  },
  {
    id: 3,
    name: "Coconut Hair Mask",
    rating: "4.6",
    reviews: "3,800 Ratings & 1,700 Reviews",
    type: "Deep Conditioning",
    ingredients: "Coconut Oil, Shea Butter, Keratin",
    price: "₹599",
    oldPrice: "₹999",
    discount: "40% off",
    image: "/images/haircare/coconut_hair_mask.jpg",
  },
  {
    id: 4,
    name: "Onion Hair Oil",
    rating: "4.7",
    reviews: "4,500 Ratings & 2,100 Reviews",
    type: "Anti-Hairfall",
    ingredients: "Onion Extract, Castor Oil, Bhringraj",
    price: "₹699",
    oldPrice: "₹1,099",
    discount: "36% off",
    image: "/images/haircare/onion_hair_oil.jpg",
  }
];

const convertToIntegerPrice = (price) => {
  return parseInt(price.replace(/[₹,]/g, ''), 10);
};

const Haircare = () => {

  const [likedHaircare, setLikedHaircare] = useState({});
  const navigate = useNavigate();

  const toggleLike = async (haircareItem) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the wishlist.");
      return;
    }

    const wishList = {
      productid: haircareItem.id,
      image: haircareItem.image,
      name: haircareItem.name,
      price: convertToIntegerPrice(haircareItem.price),
      oldPrice: convertToIntegerPrice(haircareItem.oldPrice),
      discount: haircareItem.discount,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/wishlist", wishList);
      console.log("Item added to wishlist:", response.data);
      toast.success("Item added to wishlist successfully!");
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
      toast.error("Failed to add item to wishlist.");
    }

    setLikedHaircare((prev) => ({
      ...prev,
      [haircareItem.id]: !prev[haircareItem.id],
    }));
  };

  const addToCart = async (haircareItem) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the cart.");
      return;
    }


    const cartItem = {
      productid: haircareItem.id,
      image: haircareItem.image,
      name: haircareItem.name,
      price: convertToIntegerPrice(haircareItem.price),
      oldPrice: convertToIntegerPrice(haircareItem.oldPrice),
      discount: haircareItem.discount,
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
      <h2 className="haircare-page-title">Latest Haircare Collection</h2>
      <div className="haircare-container">
        {haircareData.map((haircareItem) => (
          <div className="haircare-card" key={haircareItem.id}>
            <div className="haircare-content">
              <img src={haircareItem.image} alt={haircareItem.name} className="haircare-image" />
              <div className="haircare-details">
                <h3 className="haircare-name">{haircareItem.name}</h3>
                <p className="haircare-rating">⭐ {haircareItem.rating} ({haircareItem.reviews})</p>
                <ul className="haircare-specs">
                  <li><strong>Type:</strong> {haircareItem.type}</li>
                  <li><strong>Ingredients:</strong> {haircareItem.ingredients}</li>
                </ul>
                <p className="haircare-price">
                  <span className="current-price">₹{convertToIntegerPrice(haircareItem.price)}</span>
                  <span className="old-price">₹{convertToIntegerPrice(haircareItem.oldPrice)}</span>
                  <span className="discount">{haircareItem.discount}</span>
                </p>
                <div className="button-container">
                  <button className="add-to-cart" onClick={() => addToCart(haircareItem)}>Add to Cart</button>
                  <button className="buy-now" onClick={() => navigate("/cart")}>Buy Now</button>
                  <button className="like-btn" onClick={() => toggleLike(haircareItem)}>
                    <FaHeart color={likedHaircare[haircareItem.id] ? "red" : "gray"} size={20} />
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

export default Haircare;