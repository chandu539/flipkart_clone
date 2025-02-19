const express = require("express");
const WishList = require("../models/wishlistModel");

const router = express.Router();

// POST: Add item to wishlist
router.post("/", async (req, res) => {
  try {
    const newWishList = new WishList(req.body);
    await newWishList.save();
    res.status(201).json({ message: "Item added to wishlist successfully!", data: newWishList });
  } catch (error) {
    console.error("Error adding item to wishlist:", error);
    res.status(500).json({ message: "Failed to add item to wishlist." });
  }
});

// GET: Fetch wishlist items
router.get("/", async (req, res) => {
  try {
    const wishLists = await WishList.find(); 
    res.status(200).json({ message: "Wishlist items fetched successfully", data: wishLists });
  } catch (error) {
    console.error("Error fetching wishlist items:", error);
    res.status(500).json({ message: "Failed to fetch wishlist items" });
  }
});

// DELETE: Remove item from wishlist
router.delete('/:id', async (req, res) => {
  try {
    await WishList.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Item removed from wishlist" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
