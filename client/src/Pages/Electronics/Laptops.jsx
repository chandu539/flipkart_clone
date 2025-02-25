import React , {useState} from "react";
import Layout from "../../Components/Layout";
import "../../Styles/Electronics/Laptops.css";
import axios from 'axios';
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config";


const laptopsData = [
  {
    id: 1,
    name: "Apple MacBook Air M2 (Silver, 256 GB)",
    rating: "4.8",
    reviews: "95,412 Ratings & 4,321 Reviews",
    ram: "8 GB RAM | 256 GB SSD",
    display: "13.6-inch Liquid Retina Display",
    processor: "Apple M2 Chip",
    battery: "Up to 18 Hours Battery Life",
    warranty: "1 Year Manufacturer Warranty",
    price: "₹1,04,999",
    oldPrice: "₹1,14,999",
    discount: "9% off",
    image: "/images/laptops/macbook_air_m2.jpg",
  },
  {
    id: 2,
    name: "Dell XPS 13 (9310) - Platinum Silver, 512 GB SSD",
    rating: "4.7",
    reviews: "78,215 Ratings & 3,987 Reviews",
    ram: "16 GB RAM | 512 GB SSD",
    display: "13.4-inch FHD+ InfinityEdge Touch Display",
    processor: "Intel Core i7 11th Gen",
    battery: "Up to 14 Hours Battery Life",
    warranty: "1 Year Manufacturer Warranty",
    price: "₹1,29,990",
    oldPrice: "₹1,49,990",
    discount: "13% off",
    image: "/images/laptops/dell_xps_13.jpg"
  },
  {
      id: 3,
      name: "HP Spectre x360 (14-ea0547TU) - Nightfall Black, 1TB SSD",
      rating: "4.6",
      reviews: "65,124 Ratings & 2,789 Reviews",
      ram: "16 GB RAM | 1 TB SSD",
      display: "13.5-inch WUXGA+ OLED Touchscreen",
      processor: "Intel Core i7 12th Gen",
      battery: "Up to 17 Hours Battery Life",
      warranty: "1 Year Manufacturer Warranty",
      price: "₹1,45,990",
      oldPrice: "₹1,59,990",
      discount: "9% off",
      image: "/images/laptops/hp_spectre_x360.jpg"
  },
  {
      id: 4,
      name: "ASUS ROG Zephyrus G14 (GA402RJ) - Moonlight White, 1TB SSD",
      rating: "4.9",
      reviews: "89,310 Ratings & 4,652 Reviews",
      ram: "16 GB RAM | 1 TB SSD",
      display: "14-inch QHD+ 120Hz Display",
      processor: "AMD Ryzen 9 6900HS",
      battery: "Up to 12 Hours Battery Life",
      warranty: "1 Year Manufacturer Warranty",
      price: "₹1,58,990",
      oldPrice: "₹1,74,990",
      discount: "9% off",
      image: "/images/laptops/asus_rog_zephyrus_g14.jpg"
  },
  {
    id: 5,
    name: "Dell XPS 15 (Silver, 1TB SSD)",
    rating: "4.7",
    reviews: "65,892 Ratings & 2,945 Reviews",
    ram: "16 GB RAM | 1 TB SSD",
    display: "15.6-inch 4K OLED Touch Display",
    processor: "Intel Core i7 12th Gen",
    battery: "86Whr Battery with Fast Charging",
    warranty: "1 Year Manufacturer Warranty",
    price: "₹1,79,999",
    oldPrice: "₹1,89,999",
    discount: "5% off",
    image: "/images/laptops/dell_xps_15.jpg",
  },
  
];

const convertToIntegerPrice = (price) => {
  return parseInt(price.replace(/[₹,]/g, ''), 10);
};




const Laptops = () => {

  const [likedLaptops, setLikedLaptops] = useState({});
  const navigate = useNavigate();

  const toggleLike = async (laptopItem) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the wishlist.");
      return;
    }

    const wishList = {
      productid: laptopItem.id,
      image: laptopItem.image,
      name: laptopItem.name,
      price: convertToIntegerPrice(laptopItem.price),
      oldPrice: convertToIntegerPrice(laptopItem.oldPrice),
      discount: laptopItem.discount,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/wishlist`, wishList);
      console.log("Item added to wishlist:", response.data);
      toast.success("Item added to wishlist successfully!");
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
      toast.error("Failed to add item to wishlist.");
    }

    setLikedLaptops((prev) => ({
      ...prev,
      [laptopItem.id]: !prev[laptopItem.id],
    }));
  };



  const addToCart = async (laptopItem) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      toast.error("Please log in to add items to the cart.");
      return;
    }
  
    const cartItem = {
      productid: laptopItem.id,
      image: laptopItem.image,
      name: laptopItem.name,
      price: convertToIntegerPrice(laptopItem.price),
      oldPrice: convertToIntegerPrice(laptopItem.oldPrice),
      discount: laptopItem.discount,
    };
  
    try {
      const response = await axios.post(`${API_BASE_URL}/cart`, cartItem, {
        headers: { Authorization: `Bearer ${token}` },
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
      <h2 className="laptops-page-title">Laptops</h2>
      <div className="laptops-container">
        {laptopsData.map((laptopItem) => (
          <div className="laptop-card" key={laptopItem.id}>
            <div className="laptop-content">
              <img src={laptopItem.image} alt={laptopItem.name} className="laptop-image" />
              <div className="laptop-details">
                <h3 className="laptop-name">{laptopItem.name}</h3>
                <p className="laptop-rating">⭐ {laptopItem.rating} ({laptopItem.reviews})</p>
                <ul className="laptop-specs">
                  <li><strong>RAM & Storage:</strong> {laptopItem.ram}</li>
                  <li><strong>Display:</strong> {laptopItem.display}</li>
                  <li><strong>Battery:</strong> {laptopItem.battery}</li>
                  <li><strong>Processor:</strong> {laptopItem.processor}</li>
                  <li><strong>Warranty:</strong> {laptopItem.warranty}</li>
                </ul>
                <p className="laptop-price">
                  <span className="current-price">₹{convertToIntegerPrice(laptopItem.price)}</span>
                  <span className="old-price">₹{convertToIntegerPrice(laptopItem.oldPrice)}</span>
                  <span className="discount">{laptopItem.discount}</span>
                </p>
                <div className="button-container">
                  <button className="add-to-cart" onClick={() => addToCart(laptopItem)}>Add to Cart</button>
                  <button className="buy-now" onClick={() => navigate("/cart")}>Buy Now</button>
                  <button className="like-btn" onClick={() => toggleLike(laptopItem)}>
                    <FaHeart color={likedLaptops[laptopItem.id] ? "red" : "gray"} size={20} />
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

export default Laptops;
