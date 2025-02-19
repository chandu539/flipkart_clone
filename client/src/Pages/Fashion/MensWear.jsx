import React , {useState} from "react";
import Layout from "../../Components/Layout";
import "../../Styles/Fashion/Menswear.css";
import axios from 'axios';
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const mensWearData = [
  {
    id: 1,
    name: "Slim Fit Black Shirt",
    rating: "4.5",
    reviews: "1,500 Ratings & 420 Reviews",
    material: "Cotton",
    dimensions: "M, L, XL, XXL",
    price: "₹1,499",
    oldPrice: "₹2,199",
    discount: "32% off",
    image: "/images/menswear/slim_fit_black_shirt.jpg",
  },
  {
    id: 2,
    name: "Blue Denim Jeans",
    rating: "4.7",
    reviews: "1,800 Ratings & 600 Reviews",
    material: "Denim",
    dimensions: "28, 30, 32, 34, 36",
    price: "₹2,199",
    oldPrice: "₹2,999",
    discount: "26% off",
    image: "/images/menswear/blue_denim_jeans.jpg",
  },
  {
    id: 3,
    name: "White Casual T-shirt",
    rating: "4.6",
    reviews: "2,200 Ratings & 800 Reviews",
    material: "Cotton",
    dimensions: "S, M, L, XL",
    price: "₹799",
    oldPrice: "₹1,199",
    discount: "33% off",
    image: "/images/menswear/white_casual_tshirt.jpg",
  },
  {
    id: 4,
    name: "Grey Chino Pants",
    rating: "4.8",
    reviews: "1,500 Ratings & 500 Reviews",
    material: "Cotton",
    dimensions: "30, 32, 34, 36",
    price: "₹1,599",
    oldPrice: "₹2,199",
    discount: "27% off",
    image: "/images/menswear/grey_chino_pants.jpg",
  },
  {
    id: 5,
    name: "Black Leather Jacket",
    rating: "4.9",
    reviews: "2,100 Ratings & 750 Reviews",
    material: "Leather",
    dimensions: "M, L, XL, XXL",
    price: "₹4,999",
    oldPrice: "₹6,499",
    discount: "23% off",
    image: "/images/menswear/black_leather_jacket.jpg",
  },
  {
    id: 6,
    name: "Red Checkered Shirt",
    rating: "4.4",
    reviews: "1,700 Ratings & 650 Reviews",
    material: "Cotton",
    dimensions: "M, L, XL",
    price: "₹1,199",
    oldPrice: "₹1,699",
    discount: "29% off",
    image: "/images/menswear/red_checkered_shirt.jpg",
  },
  {
    id: 7,
    name: "Navy Blue Suit Blazer",
    rating: "4.8",
    reviews: "2,050 Ratings & 700 Reviews",
    material: "Wool",
    dimensions: "S, M, L, XL",
    price: "₹7,499",
    oldPrice: "₹9,999",
    discount: "25% off",
    image: "/images/menswear/navy_blue_suit_blazer.jpg",
  }
];


const convertToIntegerPrice = (price) => {
  return parseInt(price.replace(/[₹,]/g, ''), 10);
};

const MensWear = () => {

  const [likedMenswear, setLikedMenswear] = useState({});
  const navigate = useNavigate();

  const toggleLike = async (mensWearItem) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the wishlist.");
      return;
    }


    const wishList = {
      productid: mensWearItem.id,
      image: mensWearItem.image,
      name: mensWearItem.name,
      price: convertToIntegerPrice(mensWearItem.price),
      oldPrice: convertToIntegerPrice(mensWearItem.oldPrice),
      discount: mensWearItem.discount,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/wishlist", wishList);
      console.log("Item added to wishlist:", response.data);
      toast.success("Item added to wishlist successfully!");
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
      toast.error("Failed to add item to wishlist.");
    }

    setLikedMenswear((prev) => ({
      ...prev,
      [mensWearItem.id]: !prev[mensWearItem.id],
    }));
  };

  const addToCart = async (mensWearItem) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the cart.");
      return;
    }


    const cartItem = {
      productid: mensWearItem.id,
      image: mensWearItem.image,
      name: mensWearItem.name,
      price: convertToIntegerPrice(mensWearItem.price),  // Convert to integer
      oldPrice: convertToIntegerPrice(mensWearItem.oldPrice),  // Convert to integer
      discount: mensWearItem.discount,
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
      <h2 className="menswear-page-title">Latest Menswear</h2>
      <div className="wardrobes-container">
        {mensWearData.map((mensWearItem) => (
          <div className="wardrobe-card" key={mensWearItem.id}>
            <div className="wardrobe-content">
              <img src={mensWearItem.image} alt={mensWearItem.name} className="wardrobe-image" />
              <div className="wardrobe-details">
                <h3 className="wardrobe-name">{mensWearItem.name}</h3>
                <p className="wardrobe-rating">⭐ {mensWearItem.rating} ({mensWearItem.reviews})</p>
                <ul className="wardrobe-specs">
                  <li><strong>Material:</strong> {mensWearItem.material}</li>
                  <li><strong>Dimensions:</strong> {mensWearItem.dimensions}</li>
                </ul>
                <p className="wardrobe-price">
                  <span className="current-price">₹{convertToIntegerPrice(mensWearItem.price)}</span>
                  <span className="old-price">₹{convertToIntegerPrice(mensWearItem.oldPrice)}</span>
                  <span className="discount">{mensWearItem.discount}</span>
                </p>
                <div className="button-container">
                  <button className="add-to-cart" onClick={() => addToCart(mensWearItem)}>Add to Cart</button>
                  <button className="buy-now" onClick={() => navigate("/cart")}>Buy Now</button>
                  <button className="like-btn" onClick={() => toggleLike(mensWearItem)}>
                    <FaHeart color={likedMenswear[mensWearItem.id] ? "red" : "gray"} size={20} />
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

export default MensWear;
