import React , {useState} from "react";
import Layout from "../../Components/Layout";
import "../../Styles/Furniture/Sofas.css";
import axios from 'axios';
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const sofasData = [
  {
    id: 1,
    name: "Luxury Leather Sofa",
    rating: "4.8",
    reviews: "5,214 Ratings & 1,235 Reviews",
    type: "3-Seater",
    material: "Genuine Leather",
    dimensions: "80 x 35 x 30 inches",
    price: "₹59,990",
    oldPrice: "₹69,990",
    discount: "14% off",
    image: "/images/sofas/luxury_leather_sofa.jpg",
  },
  {
    id: 2,
    name: "Modern Fabric Sofa",
    rating: "4.7",
    reviews: "4,532 Ratings & 1,089 Reviews",
    type: "2-Seater",
    material: "Fabric",
    dimensions: "60 x 30 x 28 inches",
    price: "₹39,990",
    oldPrice: "₹49,990",
    discount: "20% off",
    image: "/images/sofas/modern_fabric_sofa.jpg",
  },
  {
    id: 3,
    name: "Recliner Sofa Set",
    rating: "4.9",
    reviews: "8,762 Ratings & 2,435 Reviews",
    type: "3-Seater",
    material: "Microfiber",
    dimensions: "85 x 36 x 32 inches",
    price: "₹99,990",
    oldPrice: "₹1,19,990",
    discount: "16% off",
    image: "/images/sofas/recliner_sofa_set.jpg",
  },
  {
    id: 4,
    name: "L-Shaped Sectional Sofa",
    rating: "4.6",
    reviews: "6,523 Ratings & 1,987 Reviews",
    type: "L-Shaped",
    material: "Velvet",
    dimensions: "95 x 35 x 34 inches",
    price: "₹79,990",
    oldPrice: "₹89,990",
    discount: "11% off",
    image: "/images/sofas/l_shaped_sectional_sofa.jpg",
  }
];


const convertToIntegerPrice = (price) => {
  return parseInt(price.replace(/[₹,]/g, ''), 10);
};

const Sofas = () => {

  const [likedSofas, setLikedSofas] = useState({});
  const navigate = useNavigate();

  const toggleLike = async (sofa) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the wishlist.");
      return;
    }


    const wishList = {
      productid: sofa.id,
      image: sofa.image,
      name: sofa.name,
      price: convertToIntegerPrice(sofa.price),
      oldPrice: convertToIntegerPrice(sofa.oldPrice),
      discount: sofa.discount,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/wishlist", wishList);
      console.log("Item added to wishlist:", response.data);
      toast.success("Item added to wishlist successfully!");
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
      toast.error("Failed to add item to wishlist.");
    }

    setLikedSofas((prev) => ({
      ...prev,
      [sofa.id]: !prev[sofa.id],
    }));
  };

  const addToCart = async (sofa) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the cart.");
      return;
    }


    const cartItem = {
      productid: sofa.id,
      image: sofa.image,
      name: sofa.name,
      price: convertToIntegerPrice(sofa.price),  
      oldPrice: convertToIntegerPrice(sofa.oldPrice),  
      discount: sofa.discount,
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
      <h2 className="sofas-page-title">Latest Sofas</h2>
      <div className="sofas-container">
        {sofasData.map((sofa) => (
          <div className="sofa-card" key={sofa.id}>
            <div className="sofa-content">
              <img src={sofa.image} alt={sofa.name} className="sofa-image" />
              <div className="sofa-details">
                <h3 className="sofa-name">{sofa.name}</h3>
                <p className="sofa-rating">⭐ {sofa.rating} ({sofa.reviews})</p>
                <ul className="sofa-specs">
                  <li><strong>Type:</strong> {sofa.type}</li>
                  <li><strong>Material:</strong> {sofa.material}</li>
                  <li><strong>Dimensions:</strong> {sofa.dimensions}</li>
                </ul>
                <p className="sofa-price">
                  <span className="current-price">₹{convertToIntegerPrice(sofa.price)}</span>
                  <span className="old-price">₹{convertToIntegerPrice(sofa.oldPrice)}</span>
                  <span className="discount">{sofa.discount}</span>
                </p>
                <div className="button-container">
                  <button className="add-to-cart" onClick={() => addToCart(sofa)}>Add to Cart</button>
                  <button className="buy-now" onClick={() => navigate("/cart")}>Buy Now</button>
                  <button className="like-btn" onClick={() => toggleLike(sofa)}>
                    <FaHeart color={likedSofas[sofa.id] ? "red" : "gray"} size={20} />
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

export default Sofas;
