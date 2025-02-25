import React, { useState } from "react";
import Layout from "../../Components/Layout";
import "../../Styles/Electronics/Mobiles.css";
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa"; 
import API_BASE_URL from "../../config";

const mobilesData = [
  {
    id: 1,
    name: "iPhone 15 (Yellow, 128 GB)",
    rating: "4.7",
    reviews: "125,495 Ratings & 5,784 Reviews",
    ram: "128 GB ROM",
    display: "6.1-inch Super Retina XDR Display",
    camera: "48MP + 12MP | 12MP Front Camera",
    battery: "Fast Charging, MagSafe Wireless Charging",
    processor: "A16 Bionic Chip",
    warranty: "1 Year Manufacturer Warranty",
    price: "₹75,999",
    oldPrice: "₹79,900",
    discount: "5% off",
    image: "/images/mobiles/iphone15.jpg",
  },
  {
    id: 2,
    name: "iPhone 14 (Midnight, 128 GB)",
    rating: "4.6",
    reviews: "98,495 Ratings & 4,211 Reviews",
    ram: "128 GB ROM",
    display: "6.1-inch Super Retina XDR Display",
    camera: "12MP + 12MP | 12MP Front Camera",
    battery: "Fast Charging, MagSafe Wireless Charging",
    processor: "A15 Bionic Chip",
    warranty: "1 Year Manufacturer Warranty",
    price: "₹65,999",
    oldPrice: "₹69,900",
    discount: "6% off",
    image: "/images/mobiles/iphone14.jpg",
  },

  {
    id: 3,
    name: "Samsung Galaxy S23 Ultra (Phantom Black, 256 GB)",
    rating: "4.8",
    reviews: "200,412 Ratings & 10,231 Reviews",
    ram: "12 GB RAM | 256 GB ROM",
    display: "6.8-inch Dynamic AMOLED 2X Display",
    camera: "200MP + 12MP + 10MP | 12MP Front Camera",
    battery: "5000mAh Battery with 45W Fast Charging",
    processor: "Snapdragon 8 Gen 2",
    warranty: "1 Year Manufacturer Warranty",
    price: "₹1,24,999",
    oldPrice: "₹1,34,999",
    discount: "7% off",
    image: "/images/mobiles/samsung_s23_ultra.jpg",
},
{
    id: 4,
    name: "OnePlus 11 5G (Titan Black, 256 GB)",
    rating: "4.7",
    reviews: "95,875 Ratings & 4,732 Reviews",
    ram: "16 GB RAM | 256 GB ROM",
    display: "6.7-inch 120Hz QHD+ AMOLED Display",
    camera: "50MP + 48MP + 32MP | 16MP Front Camera",
    battery: "5000mAh Battery with 100W Fast Charging",
    processor: "Snapdragon 8 Gen 2",
    warranty: "1 Year Manufacturer Warranty",
    price: "₹61,999",
    oldPrice: "₹64,999",
    discount: "5% off",
    image: "/images/mobiles/oneplus_11.jpg",
},
{
    id: 5,
    name: "Google Pixel 7 Pro (Hazel, 128 GB)",
    rating: "4.6",
    reviews: "80,912 Ratings & 3,556 Reviews",
    ram: "12 GB RAM | 128 GB ROM",
    display: "6.7-inch LTPO OLED 120Hz Display",
    camera: "50MP + 48MP + 12MP | 10.8MP Front Camera",
    battery: "5000mAh Battery with 30W Fast Charging",
    processor: "Google Tensor G2",
    warranty: "1 Year Manufacturer Warranty",
    price: "₹74,999",
    oldPrice: "₹79,999",
    discount: "6% off",
    image: "/images/mobiles/pixel_7_pro.jpg",
},
{
  id: 6,
  name: "Xiaomi 14 Civi (Shadow Black, 256 GB)",
  rating: "4.6",
  reviews: "72,512 Ratings & 3,125 Reviews",
  ram: "12 GB RAM | 256 GB ROM",
  display: "6.55-inch 120Hz AMOLED Display",
  camera: "50MP + 50MP + 12MP | 32MP Dual Front Camera",
  battery: "4700mAh Battery with 67W Fast Charging",
  processor: "Snapdragon 8s Gen 3",
  warranty: "1 Year Manufacturer Warranty",
  price: "₹49,999",
  oldPrice: "₹54,999",
  discount: "9% off",
  image: "/images/mobiles/xiaomi_14_civi.jpg",
},

{
    id: 7,
    name: "Realme GT Neo 3 (Nitro Blue, 256 GB)",
    rating: "4.4",
    reviews: "50,632 Ratings & 1,795 Reviews",
    ram: "12 GB RAM | 256 GB ROM",
    display: "6.7-inch 120Hz AMOLED Display",
    camera: "50MP + 8MP + 2MP | 16MP Front Camera",
    battery: "5000mAh Battery with 150W Fast Charging",
    processor: "MediaTek Dimensity 8100",
    warranty: "1 Year Manufacturer Warranty",
    price: "₹42,999",
    oldPrice: "₹44,999",
    discount: "4% off",
    image: "/images/mobiles/realme_gt_neo_3.jpg",
},
{
    id: 8,
    name: "Vivo X90 Pro (Legendary Black, 256 GB)",
    rating: "4.7",
    reviews: "72,245 Ratings & 2,889 Reviews",
    ram: "12 GB RAM | 256 GB ROM",
    display: "6.78-inch 120Hz AMOLED Display",
    camera: "50MP + 50MP + 12MP | 32MP Front Camera",
    battery: "4870mAh Battery with 120W Fast Charging",
    processor: "MediaTek Dimensity 9200",
    warranty: "1 Year Manufacturer Warranty",
    price: "₹84,999",
    oldPrice: "₹89,999",
    discount: "6% off",
    image: "/images/mobiles/vivo_x90_pro.jpg",
},
{
    id: 9,
    name: "Nothing Phone 2 (White, 256 GB)",
    rating: "4.5",
    reviews: "40,582 Ratings & 1,612 Reviews",
    ram: "12 GB RAM | 256 GB ROM",
    display: "6.7-inch 120Hz OLED Display",
    camera: "50MP + 50MP | 32MP Front Camera",
    battery: "4700mAh Battery with 45W Fast Charging",
    processor: "Snapdragon 8+ Gen 1",
    warranty: "1 Year Manufacturer Warranty",
    price: "₹49,999",
    oldPrice: "₹54,999",
    discount: "9% off",
    image: "/images/mobiles/nothing_phone_2.jpg",
},
{
    id: 10,
    name: "iQOO 11 5G (Alpha, 256 GB)",
    rating: "4.6",
    reviews: "55,742 Ratings & 2,356 Reviews",
    ram: "16 GB RAM | 256 GB ROM",
    display: "6.78-inch 144Hz AMOLED Display",
    camera: "50MP + 13MP + 8MP | 16MP Front Camera",
    battery: "5000mAh Battery with 120W Fast Charging",
    processor: "Snapdragon 8 Gen 2",
    warranty: "1 Year Manufacturer Warranty",
    price: "₹59,999",
    oldPrice: "₹64,999",
    discount: "8% off",
    image: "/images/mobiles/iqoo_11.jpg",
},

];


const Mobiles = () => {
  const navigate = useNavigate();
  const [likedMobiles, setLikedMobiles] = useState({});

  const convertPriceToInt = (price) => {
    return parseInt(price.replace(/[₹,]/g, ""), 10);
  };

  const redirect_page = () => {
    navigate("/cart");
  };

  const toggleLike = async (mobile) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the wishlist.");
      return;
    }

    const wishList = {
      productid: mobile.id,
      image: mobile.image,
      name: mobile.name,
      price: convertPriceToInt(mobile.price),
      oldPrice: convertPriceToInt(mobile.oldPrice),
      discount: mobile.discount,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/wishlist`, wishList);
      console.log("Item added to wishlist:", response.data);
      toast.success("Item added to wishlist successfully!");
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
      toast.error("Failed to add item to wishlist.");
    }

    setLikedMobiles((prev) => ({
      ...prev,
      [mobile.id]: !prev[mobile.id],
    }));
  };

  const addToCart = async (mobile) => {
    const token = localStorage.getItem("token"); // Retrieve token

    if (!token) {
      toast.error("You need to log in to add items to the cart!");
      return;
    }

    const cartItem = {
      productid: mobile.id,
      image: mobile.image,
      name: mobile.name,
      price: convertPriceToInt(mobile.price),
      oldPrice: convertPriceToInt(mobile.oldPrice),
      discount: mobile.discount,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/cart`, cartItem, {
        headers: { Authorization: `Bearer ${token}` }, // Send token with request
      });
      console.log("Item added to cart:", response.data);
      toast.success("Item added to cart successfully!");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Failed to add item to cart.");
    }
  };

  return (
    <Layout>
      <h2 className="page-title">Latest Mobile Phones</h2>
      <div className="mobiles-container">
        {mobilesData.map((mobile) => (
          <div className="mobile-card" key={mobile.id}>
            <div className="mobile-content">
              <img src={mobile.image} alt={mobile.name} className="mobile-image" />
              <div className="mobile-details">
                <h3 className="mobile-name">{mobile.name}</h3>
                <p className="mobile-rating">⭐ {mobile.rating} ({mobile.reviews})</p>
                <ul className="mobile-specs">
                  <li><strong>RAM & Storage:</strong> {mobile.ram}</li>
                  <li><strong>Display:</strong> {mobile.display}</li>
                  <li><strong>Camera:</strong> {mobile.camera}</li>
                  <li><strong>Battery:</strong> {mobile.battery}</li>
                  <li><strong>Processor:</strong> {mobile.processor}</li>
                  <li><strong>Warranty:</strong> {mobile.warranty}</li>
                </ul>
                <p className="mobile-price">
                  <span className="current-price">₹{convertPriceToInt(mobile.price).toLocaleString()}</span>
                  <span className="old-price">₹{convertPriceToInt(mobile.oldPrice).toLocaleString()}</span>
                  <span className="discount">{mobile.discount}</span>
                </p>
                <div className="button-container">
                  <button className="add-to-cart" onClick={() => addToCart(mobile)}>Add to Cart</button>
                  <button className="buy-now" onClick={redirect_page}>Buy Now</button>
                  <button className="like-btn" onClick={() => toggleLike(mobile)}>
                    <FaHeart color={likedMobiles[mobile.id] ? "red" : "gray"} size={20} />
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

export default Mobiles;
