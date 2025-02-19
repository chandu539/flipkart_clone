const express = require("express");
const CartItem = require("../models/cartItemModel");

const router = express.Router();

// POST: Add item to cart
router.post("/", async (req, res) => {
  try {
    const newCartItem = new CartItem(req.body);
    await newCartItem.save();
    res.status(201).json({ message: "Item added to cart successfully!", data: newCartItem });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Failed to add item to cart." });
  }
});

// GET: Fetch cart items
router.get("/", async (req, res) => {
  try {
    const cartItems = await CartItem.find(); 
    res.status(200).json({ message: "Cart items fetched successfully", data: cartItems });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Failed to fetch cart items" });
  }
});

// DELETE: Remove item from cart
router.delete('/:id', async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
