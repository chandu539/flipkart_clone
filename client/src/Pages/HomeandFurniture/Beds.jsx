import React , {useState} from "react";
import Layout from "../../Components/Layout";
import "../../Styles/Furniture/Beds.css";
import axios from 'axios';
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const bedsData = [
  {
    id: 1,
    name: "King Size Bed",
    rating: "4.9",
    reviews: "3,120 Ratings & 1,056 Reviews",
    type: "King Size",
    material: "Solid Wood",
    dimensions: "80 x 76 inches",
    price: "₹49,990",
    oldPrice: "₹59,990",
    discount: "17% off",
    image: "/images/beds/king_size_bed.jpg",
  },
  {
    id: 2,
    name: "Queen Size Bed",
    rating: "4.7",
    reviews: "2,423 Ratings & 899 Reviews",
    type: "Queen Size",
    material: "Wood & Fabric",
    dimensions: "80 x 60 inches",
    price: "₹39,990",
    oldPrice: "₹49,990",
    discount: "20% off",
    image: "/images/beds/queen_size_bed.jpg",
  },
  {
    id: 3,
    name: "Storage Bed",
    rating: "4.8",
    reviews: "4,532 Ratings & 1,234 Reviews",
    type: "Double Bed",
    material: "Pinewood",
    dimensions: "75 x 72 inches",
    price: "₹59,990",
    oldPrice: "₹69,990",
    discount: "14% off",
    image: "/images/beds/storage_bed.jpg",
  },
  {
    id: 4,
    name: "Metal Frame Bed",
    rating: "4.6",
    reviews: "3,923 Ratings & 1,546 Reviews",
    type: "Single Bed",
    material: "Metal & Fabric",
    dimensions: "72 x 36 inches",
    price: "₹19,990",
    oldPrice: "₹24,990",
    discount: "20% off",
    image: "/images/beds/metal_frame_bed.jpg",
  }
];

// Function to convert price from string (with ₹ symbol) to integer
const convertToIntegerPrice = (price) => {
  return parseInt(price.replace(/[₹,]/g, ''), 10);
};

const Beds = () => {

  const [likedBeds, setLikedBeds] = useState({});
  const navigate = useNavigate();

  const toggleLike = async (bed) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the wishlist.");
      return;
    }

    const wishList = {
      productid: bed.id,
      image: bed.image,
      name: bed.name,
      price: convertToIntegerPrice(bed.price),
      oldPrice: convertToIntegerPrice(bed.oldPrice),
      discount: bed.discount,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/wishlist", wishList);
      console.log("Item added to wishlist:", response.data);
      toast.success("Item added to wishlist successfully!");
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
      toast.error("Failed to add item to wishlist.");
    }

    setLikedBeds((prev) => ({
      ...prev,
      [bed.id]: !prev[bed.id],
    }));
  };


  const addToCart = async (bed) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the cart.");
      return;
    }

    const cartItem = {
      productid: bed.id,
      image: bed.image,
      name: bed.name,
      price: convertToIntegerPrice(bed.price),  // Convert to integer
      oldPrice: convertToIntegerPrice(bed.oldPrice),  // Convert to integer
      discount: bed.discount,
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
      <h2 className="beds-page-title">Latest Beds</h2>
      <div className="beds-container">
        {bedsData.map((bed) => (
          <div className="bed-card" key={bed.id}>
            <div className="bed-content">
              <img src={bed.image} alt={bed.name} className="bed-image" />
              <div className="bed-details">
                <h3 className="bed-name">{bed.name}</h3>
                <p className="bed-rating">⭐ {bed.rating} ({bed.reviews})</p>
                <ul className="bed-specs">
                  <li><strong>Type:</strong> {bed.type}</li>
                  <li><strong>Material:</strong> {bed.material}</li>
                  <li><strong>Dimensions:</strong> {bed.dimensions}</li>
                </ul>
                <p className="bed-price">
                  <span className="current-price">₹{convertToIntegerPrice(bed.price)}</span>
                  <span className="old-price">₹{convertToIntegerPrice(bed.oldPrice)}</span>
                  <span className="discount">{bed.discount}</span>
                </p>
                <div className="button-container">
                  <button className="add-to-cart" onClick={() => addToCart(bed)}>Add to Cart</button>
                  <button className="buy-now" onClick={() => navigate("/cart")}>Buy Now</button>
                  <button className="like-btn" onClick={() => toggleLike(bed)}>
                    <FaHeart color={likedBeds[bed.id] ? "red" : "gray"} size={20} />
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

export default Beds;
