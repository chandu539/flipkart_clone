import React , {useState} from "react";
import Layout from "../../Components/Layout";
import "../../Styles/Electronics/Watches.css";
import axios from 'axios';
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";

const watchesData = [
  {
    id: 1,
    name: "Apple Watch Series 8",
    rating: "4.7",
    reviews: "15,214 Ratings & 2,314 Reviews",
    display: "1.9-inch OLED Retina Display",
    smartFeatures: "GPS, Heart Rate Monitor, ECG",
    connectivity: "Wi-Fi, Bluetooth, NFC",
    warranty: "1 Year Manufacturer Warranty",
    price: "₹45,999",
    oldPrice: "₹49,999",
    discount: "8% off",
    image: "/images/watches/apple_watch_series8.jpg",
  },
  {
    id: 2,
    name: "Samsung Galaxy Watch 5",
    rating: "4.8",
    reviews: "18,785 Ratings & 3,421 Reviews",
    display: "1.4-inch Super AMOLED Display",
    smartFeatures: "Sleep Tracker, GPS, Heart Rate Monitoring",
    connectivity: "Wi-Fi, Bluetooth, NFC",
    warranty: "1 Year Manufacturer Warranty",
    price: "₹29,999",
    oldPrice: "₹34,999",
    discount: "14% off",
    image: "/images/watches/samsung_galaxy_watch5.jpg",
  },
  {
    id: 3,
    name: "Garmin Venu 2",
    rating: "4.6",
    reviews: "12,345 Ratings & 1,523 Reviews",
    display: "1.3-inch AMOLED Display",
    smartFeatures: "GPS, Pulse Ox, Body Battery",
    connectivity: "Wi-Fi, Bluetooth",
    warranty: "1 Year Manufacturer Warranty",
    price: "₹32,990",
    oldPrice: "₹36,990",
    discount: "10% off",
    image: "/images/watches/garmin_venu_2.jpg",
  },
  {
    id: 4,
    name: "Fossil Gen 6 Hybrid HR",
    rating: "4.5",
    reviews: "9,876 Ratings & 1,001 Reviews",
    display: "1.1-inch AMOLED Display",
    smartFeatures: "Heart Rate Monitor, Activity Tracking",
    connectivity: "Bluetooth, Wi-Fi",
    warranty: "1 Year Manufacturer Warranty",
    price: "₹19,999",
    oldPrice: "₹22,999",
    discount: "13% off",
    image: "/images/watches/fossil_gen6_hybrid_hr.jpg",
  }
];


const convertToIntegerPrice = (price) => {
  return parseInt(price.replace(/[₹,]/g, ''), 10);
};

const Watches = () => {

  const [likedWatches, setLikedWatches] = useState({});
  const navigate = useNavigate();

  const toggleLike = async (watch) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the wishlist.");
      return;
    }


    const wishList = {
      productid: watch.id,
      image: watch.image,
      name: watch.name,
      price: convertToIntegerPrice(watch.price),
      oldPrice: convertToIntegerPrice(watch.oldPrice),
      discount: watch.discount,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/wishlist", wishList);
      console.log("Item added to wishlist:", response.data);
      toast.success("Item added to wishlist successfully!");
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
      toast.error("Failed to add item to wishlist.");
    }

    setLikedWatches((prev) => ({
      ...prev,
      [watch.id]: !prev[watch.id],
    }));
  };



  const addToCart = async (watch) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the cart.");
      return;
    }

    const cartItem = {
      productid: watch.id,
      image: watch.image,
      name: watch.name,
      price: convertToIntegerPrice(watch.price),  // Convert to integer
      oldPrice: convertToIntegerPrice(watch.oldPrice),  // Convert to integer
      discount: watch.discount,
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
      <h2 className="watches-page-title">Latest Smart Watches</h2>
      <div className="watches-container">
        {watchesData.map((watch) => (
          <div className="watch-card" key={watch.id}>
            <div className="watch-content">
              <img src={watch.image} alt={watch.name} className="watch-image" />
              <div className="watch-details">
                <h3 className="watch-name">{watch.name}</h3>
                <p className="watch-rating">⭐ {watch.rating} ({watch.reviews})</p>
                <ul className="watch-specs">
                  <li><strong>Display:</strong> {watch.display}</li>
                  <li><strong>Smart Features:</strong> {watch.smartFeatures}</li>
                  <li><strong>Connectivity:</strong> {watch.connectivity}</li>
                  <li><strong>Warranty:</strong> {watch.warranty}</li>
                </ul>
                <p className="watch-price">
                  <span className="current-price">₹{convertToIntegerPrice(watch.price)}</span>
                  <span className="old-price">₹{convertToIntegerPrice(watch.oldPrice)}</span>
                  <span className="discount">{watch.discount}</span>
                </p>
                <div className="button-container">
                  <button className="add-to-cart" onClick={() => addToCart(watch)} >Add to Cart</button>
                  <button className="buy-now" onClick={() => navigate("/cart")}>Buy Now</button>
                  <button className="like-btn" onClick={() => toggleLike(watch)}>
                    <FaHeart color={likedWatches[watch.id] ? "red" : "gray"} size={20} />
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

export default Watches;
