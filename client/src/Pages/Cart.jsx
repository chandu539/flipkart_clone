import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';  
import NavbarLogin from '../Components/NavbarLogin';
import '../Styles/Cart.css';
import API_BASE_URL from "../config";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const placeOrder = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please log in to place an order.");
      return;
    }

    try {
      setOrderPlaced(true);
      toast.success("Order placed successfully!");

      // Redirect to home page after 2 seconds
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order.");
    }
  };

  const [priceDetails, setPriceDetails] = useState({
    price: 0,
    discount: 0,
    delivery: 0,
    protectFee: 9,
    total: 0,
    savings: 0
  });

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/cart`);  
        const items = response.data.data || [];
        
        const validItems = items.map(item => ({
          ...item,
          oldPrice: Number(item.oldPrice) || 0,
          price: Number(item.price) || 0,
          quantity: Number(item.quantity) || 1
        }));

        setCartItems(validItems);
        calculatePriceDetails(validItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        toast.error("Failed to fetch cart items.");
      }
    };
    fetchCartItems();
  }, []); 

  const calculatePriceDetails = (items) => {
    let price = 0, discount = 0;
    items.forEach(item => {
      price += (item.oldPrice * item.quantity);
      discount += ((item.oldPrice - item.price) * item.quantity);
    });

    const total = Math.round(price - discount + 9);
    const savings = Math.round(discount);
    
    setPriceDetails({ 
      price: Math.round(price),
      discount: Math.round(discount),
      delivery: "Free", 
      protectFee: 9, 
      total, 
      savings 
    });
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/cart/${id}`);
      const updatedCart = cartItems.filter(item => item._id !== id);
      setCartItems(updatedCart);
      calculatePriceDetails(updatedCart);
      toast.success("Item removed successfully!");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item.");
    }
  };

  return (
    <div className="cart-container">
      <NavbarLogin />
      
      {/* Cart Header */}
      <header className="cart-header">
        Shopping Cart
      </header>

      <div className="cart-content">
        {/* Left side - Cart Items */}
        <div className="cart-items-container">
          {cartItems.length > 0 ? (
            <div>
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item._id} className="cart-item">
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
              <button className="place-order-btn" onClick={placeOrder}>Place Order</button>
            </div>
          ) : (
            <p className="empty-cart">Your cart is empty!</p>
          )}
        </div>

        {/* Right side - Price Details */}
        {cartItems.length > 0 && (
          <div className="price-details">
            <h3>Price Details</h3>
            <div className="price-row">
              <span>Price ({cartItems.length} item{cartItems.length > 1 ? 's' : ''})</span>
              <span>₹{priceDetails.price}</span>
            </div>
            <div className="price-row">
              <span>Discount</span>
              <span className="discount-amount">− ₹{priceDetails.discount}</span>
            </div>
            <div className="price-row">
              <span>Delivery Charges</span>
              <span className="delivery-charge">₹40 <span className="free">Free</span></span>
            </div>
            <div className="price-row">
              <span>Protect Promise Fee</span>
              <span>₹{priceDetails.protectFee}</span>
            </div>
            <hr />
            <div className="price-row total">
              <span>Total Amount</span>
              <span>₹{priceDetails.total}</span>
            </div>
            <p className="savings-msg">You will save ₹{priceDetails.savings} on this order</p>
          </div>
        )}

        {/* Order Success Message */}
        {orderPlaced && (
        <div className="order-success">
          <i className="fas fa-check-circle success-icon"></i>
          <p>Your order has been placed successfully!</p>
        </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
