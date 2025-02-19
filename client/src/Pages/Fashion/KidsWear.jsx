import React , {useState} from "react";
import Layout from "../../Components/Layout";
import "../../Styles/Fashion/Kidswear.css";
import axios from 'axios';
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const kidsWearData = [
  {
    id: 1,
    name: "Cartoon Print T-Shirt",
    rating: "4.7",
    reviews: "1,000 Ratings & 400 Reviews",
    material: "Cotton",
    dimensions: "2-3Y, 4-5Y, 6-7Y",
    price: "₹599",
    oldPrice: "₹899",
    discount: "33% off",
    image: "/images/kidswear/cartoon_print_tshirt.jpg",
  },
  {
    id: 2,
    name: "Denim Shorts",
    rating: "4.6",
    reviews: "1,500 Ratings & 500 Reviews",
    material: "Denim",
    dimensions: "2-3Y, 4-5Y, 6-7Y",
    price: "₹799",
    oldPrice: "₹1,199",
    discount: "33% off",
    image: "/images/kidswear/denim_shorts.jpg",
  },
  {
    id: 3,
    name: "Unicorn Print Dress",
    rating: "4.8",
    reviews: "1,800 Ratings & 700 Reviews",
    material: "Cotton",
    dimensions: "2-3Y, 4-5Y, 6-7Y",
    price: "₹999",
    oldPrice: "₹1,499",
    discount: "33% off",
    image: "/images/kidswear/unicorn_print_dress.jpg",
  },
  {
    id: 4,
    name: "Cartoon Printed T-Shirt & Shorts Set",
    rating: "4.7",
    reviews: "1,500 Ratings & 600 Reviews",
    material: "Cotton Blend",
    dimensions: "1-2Y, 3-4Y, 5-6Y",
    price: "₹799",
    oldPrice: "₹1,199",
    discount: "33% off",
    image: "/images/kidswear/cartoon_printed_set.jpg",
  },

  {
    id: 5,
    name: "Floral Party Frock",
    rating: "4.9",
    reviews: "2,200 Ratings & 900 Reviews",
    material: "Net & Satin",
    dimensions: "2-3Y, 4-5Y, 6-7Y, 8-9Y",
    price: "₹1,299",
    oldPrice: "₹1,999",
    discount: "35% off",
    image: "/images/kidswear/floral_party_frock.jpg",
  },

];

const convertToIntegerPrice = (price) => {
  return parseInt(price.replace(/[₹,]/g, ''), 10);
};

const KidsWear = () => {

  const [likedKidswear, setLikedKidswear] = useState({});
  const navigate = useNavigate();

  const toggleLike = async (kidsWearItem) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the wishlist.");
      return;
    }


    const wishList = {
      productid: kidsWearItem.id,
      image: kidsWearItem.image,
      name: kidsWearItem.name,
      price: convertToIntegerPrice(kidsWearItem.price),
      oldPrice: convertToIntegerPrice(kidsWearItem.oldPrice),
      discount: kidsWearItem.discount,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/wishlist", wishList);
      console.log("Item added to wishlist:", response.data);
      toast.success("Item added to wishlist successfully!");
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
      toast.error("Failed to add item to wishlist.");
    }

    setLikedKidswear((prev) => ({
      ...prev,
      [kidsWearItem.id]: !prev[kidsWearItem.id],
    }));
  };


  const addToCart = async (kidsWearItem) => {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to the cart.");
      return;
    }


    const cartItem = {
      productid: kidsWearItem.id,
      image: kidsWearItem.image,
      name: kidsWearItem.name,
      price: convertToIntegerPrice(kidsWearItem.price),
      oldPrice: convertToIntegerPrice(kidsWearItem.oldPrice),
      discount: kidsWearItem.discount,
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
      <h2 className="kidswear-page-title">Latest Kidswear</h2>
      <div className="kidswear-container">
        {kidsWearData.map((kidsWearItem) => (
          <div className="kidswear-card" key={kidsWearItem.id}>
            <div className="kidswear-content">
              <img src={kidsWearItem.image} alt={kidsWearItem.name} className="kidswear-image" />
              <div className="kidswear-details">
                <h3 className="kidswear-name">{kidsWearItem.name}</h3>
                <p className="kidswear-rating">⭐ {kidsWearItem.rating} ({kidsWearItem.reviews})</p>
                <ul className="kidswear-specs">
                  <li><strong>Material:</strong> {kidsWearItem.material}</li>
                  <li><strong>Size:</strong> {kidsWearItem.dimensions}</li>
                </ul>
                <p className="kidswear-price">
                  <span className="current-price">₹{convertToIntegerPrice(kidsWearItem.price)}</span>
                  <span className="old-price">₹{convertToIntegerPrice(kidsWearItem.oldPrice)}</span>
                  <span className="discount">{kidsWearItem.discount}</span>
                </p>
                <div className="button-container">
                  <button className="add-to-cart" onClick={() => addToCart(kidsWearItem)}>Add to Cart</button>
                  <button className="buy-now" onClick={() => navigate("/cart")}>Buy Now</button>
                  <button className="like-btn" onClick={() => toggleLike(kidsWearItem)}>
                    <FaHeart color={likedKidswear[kidsWearItem.id] ? "red" : "gray"} size={20} />
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

export default KidsWear;
