import React , {useState} from "react";
import Layout from "../../Components/Layout";
import "../../Styles/Sports/Sports.css";
import axios from 'axios';
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const sportsData = [
  {
    id: 1,
    name: "Football",
    rating: "4.8",
    reviews: "5,000 Ratings & 2,500 Reviews",
    type: "Outdoor Sports",
    ingredients: "Synthetic Leather, Rubber Bladder",
    price: "₹799",
    oldPrice: "₹1,199",
    discount: "33% off",
    image: "/images/sports/football.jpg",
  },
  {
    id: 2,
    name: "Basketball",
    rating: "4.7",
    reviews: "4,200 Ratings & 1,800 Reviews",
    type: "Indoor & Outdoor",
    ingredients: "Rubber, Leather Cover",
    price: "₹1,299",
    oldPrice: "₹1,599",
    discount: "19% off",
    image: "/images/sports/basketball.jpg",
  },
  {
    id: 3,
    name: "Tennis Racket",
    rating: "4.6",
    reviews: "3,800 Ratings & 1,600 Reviews",
    type: "Professional",
    ingredients: "Graphite Frame, Synthetic Strings",
    price: "₹2,199",
    oldPrice: "₹2,999",
    discount: "27% off",
    image: "/images/sports/tennis_racket.jpg",
  },
  {
    id: 4,
    name: "Badminton Racket",
    rating: "4.5",
    reviews: "3,200 Ratings & 1,200 Reviews",
    type: "For Casual Play",
    ingredients: "Carbon Fiber, Nylon Strings",
    price: "₹499",
    oldPrice: "₹799",
    discount: "38% off",
    image: "/images/sports/badminton_racket.jpg",
  },
  {
    id: 5,
    name: "Cricket Bat",
    rating: "4.9",
    reviews: "6,000 Ratings & 3,000 Reviews",
    type: "Professional Cricket",
    ingredients: "Willow Wood",
    price: "₹3,499",
    oldPrice: "₹4,299",
    discount: "19% off",
    image: "/images/sports/cricket_bat.jpg",
  },
  {
    id: 6,
    name: "Yoga Mat",
    rating: "4.7",
    reviews: "4,500 Ratings & 2,000 Reviews",
    type: "Fitness & Exercise",
    ingredients: "PVC, Rubber",
    price: "₹799",
    oldPrice: "₹1,199",
    discount: "33% off",
    image: "/images/sports/yoga_mat.jpg",
  },
  {
    id: 7,
    name: "Running Shoes",
    rating: "4.8",
    reviews: "4,800 Ratings & 2,200 Reviews",
    type: "Sports Footwear",
    ingredients: "Mesh Fabric, Rubber Sole",
    price: "₹1,499",
    oldPrice: "₹2,299",
    discount: "35% off",
    image: "/images/sports/running_shoes.jpg",
  },
  {
    id: 8,
    name: "Dumbbells",
    rating: "4.6",
    reviews: "2,900 Ratings & 1,400 Reviews",
    type: "Home Gym Equipment",
    ingredients: "Cast Iron",
    price: "₹1,199",
    oldPrice: "₹1,599",
    discount: "25% off",
    image: "/images/sports/dumbbells.jpg",
  },
  {
    id: 9,
    name: "Table Tennis Bat",
    rating: "4.5",
    reviews: "3,000 Ratings & 1,500 Reviews",
    type: "Indoor Sports",
    ingredients: "Wood, Rubber",
    price: "₹699",
    oldPrice: "₹999",
    discount: "30% off",
    image: "/images/sports/table_tennis_bat.jpg",
  },
  {
    id: 10,
    name: "Golf Set",
    rating: "4.9",
    reviews: "3,500 Ratings & 2,000 Reviews",
    type: "Golf Accessories",
    ingredients: "Steel, Graphite",
    price: "₹8,499",
    oldPrice: "₹9,999",
    discount: "15% off",
    image: "/images/sports/golf_set.jpg",
  }
];

const convertToIntegerPrice = (price) => {
  return parseInt(price.replace(/[₹,]/g, ''), 10);
};

const Sports = () => {

  const [likedSports, setLikedSports] = useState({});
  const navigate = useNavigate();

  const toggleLike = async (sportsItem) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the wishlist.");
      return;
    }


    const wishList = {
      productid: sportsItem.id,
      image: sportsItem.image,
      name: sportsItem.name,
      price: convertToIntegerPrice(sportsItem.price),
      oldPrice: convertToIntegerPrice(sportsItem.oldPrice),
      discount: sportsItem.discount,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/wishlist", wishList);
      console.log("Item added to wishlist:", response.data);
      toast.success("Item added to wishlist successfully!");
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
      toast.error("Failed to add item to wishlist.");
    }

    setLikedSports((prev) => ({
      ...prev,
      [sportsItem.id]: !prev[sportsItem.id],
    }));
  };

  const addToCart = async (sportsItem) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the cart.");
      return;
    }


    const cartItem = {
      productid: sportsItem.id,
      image: sportsItem.image,
      name: sportsItem.name,
      price: convertToIntegerPrice(sportsItem.price),
      oldPrice: convertToIntegerPrice(sportsItem.oldPrice),
      discount: sportsItem.discount,
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
      <h2 className="sports-page-title">Sports Equipment</h2>
      <div className="sports-container">
        {sportsData.map((sportsItem) => (
          <div className="sports-card" key={sportsItem.id}>
            <div className="sports-content">
              <img src={sportsItem.image} alt={sportsItem.name} className="sports-image" />
              <div className="sports-details">
                <h3 className="sports-name">{sportsItem.name}</h3>
                <p className="sports-rating">⭐ {sportsItem.rating} ({sportsItem.reviews})</p>
                <ul className="sports-specs">
                  <li><strong>Type:</strong> {sportsItem.type}</li>
                  <li><strong>Ingredients:</strong> {sportsItem.ingredients}</li>
                </ul>
                <p className="sports-price">
                  <span className="current-price">₹{convertToIntegerPrice(sportsItem.price)}</span>
                  <span className="old-price">₹{convertToIntegerPrice(sportsItem.oldPrice)}</span>
                  <span className="discount">{sportsItem.discount}</span>
                </p>
                <div className="button-container">
                  <button className="add-to-cart" onClick={() => addToCart(sportsItem)}>Add to Cart</button>
                  <button className="buy-now" onClick={() => navigate("/cart")}>Buy Now</button>
                  <button className="like-btn" onClick={() => toggleLike(sportsItem)}>
                    <FaHeart color={likedSports[sportsItem.id] ? "red" : "gray"} size={20} />
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

export default Sports;
