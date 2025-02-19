import React , {useState} from "react";
import Layout from "../../Components/Layout";
import "../../Styles/Fashion/Womenswear.css";
import axios from 'axios';
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const womensWearData = [
  {
    id: 1,
    name: "Floral Print Dress",
    rating: "4.6",
    reviews: "1,200 Ratings & 500 Reviews",
    material: "Cotton",
    dimensions: "S, M, L, XL",
    price: "₹1,799",
    oldPrice: "₹2,499",
    discount: "28% off",
    image: "/images/womenswear/floral_print_dress.jpg",
  },
  {
    id: 2,
    name: "Leather Biker Jacket",
    rating: "4.8",
    reviews: "2,300 Ratings & 700 Reviews",
    material: "Leather",
    dimensions: "S, M, L",
    price: "₹3,799",
    oldPrice: "₹4,999",
    discount: "24% off",
    image: "/images/womenswear/leather_biker_jacket.jpg",
  },
  {
    id: 3,
    name: "Denim Skirt",
    rating: "4.5",
    reviews: "1,600 Ratings & 400 Reviews",
    material: "Denim",
    dimensions: "S, M, L, XL",
    price: "₹1,299",
    oldPrice: "₹1,799",
    discount: "28% off",
    image: "/images/womenswear/denim_skirt.jpg",
  },
  {
    id: 4,
    name: "White Blouse",
    rating: "4.7",
    reviews: "1,900 Ratings & 650 Reviews",
    material: "Cotton",
    dimensions: "S, M, L",
    price: "₹999",
    oldPrice: "₹1,399",
    discount: "28% off",
    image: "/images/womenswear/white_blouse.jpg",
  },
  {
    id: 5,
    name: "Black High-Waist Pants",
    rating: "4.6",
    reviews: "1,700 Ratings & 600 Reviews",
    material: "Polyester",
    dimensions: "28, 30, 32, 34",
    price: "₹1,499",
    oldPrice: "₹2,099",
    discount: "28% off",
    image: "/images/womenswear/black_highwaist_pants.jpg",
  },
  
];


const convertToIntegerPrice = (price) => {
  return parseInt(price.replace(/[₹,]/g, ''), 10);
};

const WomensWear = () => {

  const [likedWomenswear, setLikedWomenswear] = useState({});
  const navigate = useNavigate();

  const toggleLike = async (womensWearItem) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the wishlist.");
      return;
    }


    const wishList = {
      productid: womensWearItem.id,
      image: womensWearItem.image,
      name: womensWearItem.name,
      price: convertToIntegerPrice(womensWearItem.price),
      oldPrice: convertToIntegerPrice(womensWearItem.oldPrice),
      discount: womensWearItem.discount,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/wishlist", wishList);
      console.log("Item added to wishlist:", response.data);
      toast.success("Item added to wishlist successfully!");
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
      toast.error("Failed to add item to wishlist.");
    }

    setLikedWomenswear((prev) => ({
      ...prev,
      [womensWearItem.id]: !prev[womensWearItem.id],
    }));
  };

  const addToCart = async (womensWearItem) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the cart.");
      return;
    }


    const cartItem = {
      productid: womensWearItem.id,
      image: womensWearItem.image,
      name: womensWearItem.name,
      price: convertToIntegerPrice(womensWearItem.price),  // Convert to integer
      oldPrice: convertToIntegerPrice(womensWearItem.oldPrice),  // Convert to integer
      discount: womensWearItem.discount,
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
      <h2 className="womenswear-page-title">Latest Womenswear</h2>
      <div className="wardrobes-container">
        {womensWearData.map((womensWearItem) => (
          <div className="wardrobe-card" key={womensWearItem.id}>
            <div className="wardrobe-content">
              <img src={womensWearItem.image} alt={womensWearItem.name} className="wardrobe-image" />
              <div className="wardrobe-details">
                <h3 className="wardrobe-name">{womensWearItem.name}</h3>
                <p className="wardrobe-rating">⭐ {womensWearItem.rating} ({womensWearItem.reviews})</p>
                <ul className="wardrobe-specs">
                  <li><strong>Material:</strong> {womensWearItem.material}</li>
                  <li><strong>Dimensions:</strong> {womensWearItem.dimensions}</li>
                </ul>
                <p className="wardrobe-price">
                  <span className="current-price">₹{convertToIntegerPrice(womensWearItem.price)}</span>
                  <span className="old-price">₹{convertToIntegerPrice(womensWearItem.oldPrice)}</span>
                  <span className="discount">{womensWearItem.discount}</span>
                </p>
                <div className="button-container">
                  <button className="add-to-cart" onClick={() => addToCart(womensWearItem)}>Add to Cart</button>
                  <button className="buy-now" onClick={() => navigate("/cart")}>Buy Now</button>
                  <button className="like-btn" onClick={() => toggleLike(womensWearItem)}>
                    <FaHeart color={likedWomenswear[womensWearItem.id] ? "red" : "gray"} size={20} />
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

export default WomensWear;
