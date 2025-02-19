import React , {useState} from "react";
import Layout from "../../Components/Layout";
import "../../Styles/Furniture/Chairs.css";
import axios from 'axios';
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const chairsData = [
  {
    id: 1,
    name: "Ergonomic Office Chair",
    rating: "4.8",
    reviews: "1,230 Ratings & 540 Reviews",
    type: "Office Chair",
    material: "Mesh & Leather",
    dimensions: "20 x 18 x 40 inches",
    price: "₹9,990",
    oldPrice: "₹12,990",
    discount: "23% off",
    image: "/images/chairs/ergonomic_office_chair.jpg",
  },
  {
    id: 2,
    name: "Recliner Chair",
    rating: "4.6",
    reviews: "980 Ratings & 420 Reviews",
    type: "Recliner",
    material: "Fabric & Wood",
    dimensions: "35 x 30 x 45 inches",
    price: "₹14,990",
    oldPrice: "₹18,990",
    discount: "21% off",
    image: "/images/chairs/recliner_chair.jpg",
  },
  {
    id: 3,
    name: "Rocking Chair",
    rating: "4.7",
    reviews: "1,100 Ratings & 550 Reviews",
    type: "Rocking Chair",
    material: "Wood & Cushion",
    dimensions: "40 x 35 x 38 inches",
    price: "₹7,990",
    oldPrice: "₹9,990",
    discount: "20% off",
    image: "/images/chairs/rocking_chair.jpg",
  },
  {
    id: 4,
    name: "Dining Chair Set",
    rating: "4.5",
    reviews: "1,500 Ratings & 650 Reviews",
    type: "Dining Chair",
    material: "Wood & Fabric",
    dimensions: "20 x 20 x 40 inches",
    price: "₹11,990",
    oldPrice: "₹15,990",
    discount: "25% off",
    image: "/images/chairs/dining_chair_set.jpg",
  }
];

// Function to convert price from string (with ₹ symbol) to integer
const convertToIntegerPrice = (price) => {
  return parseInt(price.replace(/[₹,]/g, ''), 10);
};

const Chairs = () => {

  const [likedChairs, setLikedChairs] = useState({});
  const navigate = useNavigate();

  const toggleLike = async (chair) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the wishlist.");
      return;
    }


    const wishList = {
      productid: chair.id,
      image: chair.image,
      name: chair.name,
      price: convertToIntegerPrice(chair.price),
      oldPrice: convertToIntegerPrice(chair.oldPrice),
      discount: chair.discount,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/wishlist", wishList);
      console.log("Item added to wishlist:", response.data);
      toast.success("Item added to wishlist successfully!");
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
      toast.error("Failed to add item to wishlist.");
    }

    setLikedChairs((prev) => ({
      ...prev,
      [chair.id]: !prev[chair.id],
    }));
  };

  const addToCart = async (chair) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the cart.");
      return;
    }


    const cartItem = {
      productid: chair.id,
      image: chair.image,
      name: chair.name,
      price: convertToIntegerPrice(chair.price),  // Convert to integer
      oldPrice: convertToIntegerPrice(chair.oldPrice),  // Convert to integer
      discount: chair.discount,
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
      <h2 className="chairs-page-title">Latest Chairs</h2>
      <div className="chairs-container">
        {chairsData.map((chair) => (
          <div className="chair-card" key={chair.id}>
            <div className="chair-content">
              <img src={chair.image} alt={chair.name} className="chair-image" />
              <div className="chair-details">
                <h3 className="chair-name">{chair.name}</h3>
                <p className="chair-rating">⭐ {chair.rating} ({chair.reviews})</p>
                <ul className="chair-specs">
                  <li><strong>Type:</strong> {chair.type}</li>
                  <li><strong>Material:</strong> {chair.material}</li>
                  <li><strong>Dimensions:</strong> {chair.dimensions}</li>
                </ul>
                <p className="chair-price">
                  <span className="current-price">₹{convertToIntegerPrice(chair.price)}</span>
                  <span className="old-price">₹{convertToIntegerPrice(chair.oldPrice)}</span>
                  <span className="discount">{chair.discount}</span>
                </p>
                <div className="button-container">
                  <button className="add-to-cart" onClick={() => addToCart(chair)}>Add to Cart</button>
                  <button className="buy-now" onClick={() => navigate("/cart")}>Buy Now</button>
                  <button className="like-btn" onClick={() => toggleLike(chair)}>
                    <FaHeart color={likedChairs[chair.id] ? "red" : "gray"} size={20} />
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

export default Chairs;
