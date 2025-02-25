import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';  
import NavbarLogin from '../Components/NavbarLogin';
import '../Styles/WishList.css';
import API_BASE_URL from "../config";

function WishList() {
  const [wishListItems, setWishListItems] = useState([]);
  const token = localStorage.getItem("token"); // Check if user is logged in

  useEffect(() => {
    const fetchWishListItems = async () => {
      if (!token) {
        toast.error("Please log in to view your wishlist.");
        return;
      }
      try {
        const response = await axios.get(`${API_BASE_URL}/wishlist`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const items = response.data.data || [];
        setWishListItems(items);
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
        toast.error("Failed to fetch wishlist items.");
      }
    };
    fetchWishListItems();
  }, [token]);

  const removeItem = async (id) => {
    if (!token) {
      toast.error("Please log in to remove items from your wishlist.");
      return;
    }
    try {
      await axios.delete(`${API_BASE_URL}/wishlist/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const updatedWishList = wishListItems.filter(item => item._id !== id);
      setWishListItems(updatedWishList);
      toast.success("Item removed from wishlist!");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item.");
    }
  };

  return (
    <div className="wishlist-container">
      <NavbarLogin />
      
      {/* Wishlist Card Header */}
      <div className="wishlist-card">
        <header className="wishlist-card-header">
          <h2>My Wishlist</h2>
        </header>
      </div>

      <div className="wishlist-content">
        <div className="wishlist-items-container">
          {wishListItems.length > 0 ? (
            <ul className="wishlist-items">
              {wishListItems.map((item) => (
                <li key={item._id} className="wishlist-item">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <p className="item-name">{item.name}</p>
                    <div className="price-section">
                      <span className="new-price">₹{Math.round(item.price)}</span>
                      <span className="old-price">₹{Math.round(item.oldPrice)}</span>
                      <span className="discount">{Math.round((item.oldPrice - item.price) / item.oldPrice * 100)}% Off</span>
                    </div>
                    <button className="remove-btn" onClick={() => removeItem(item._id)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-wishlist">Your wishlist is empty!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WishList;
