const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
require("dotenv").config();

const router = express.Router();

// Signup Route
router.post("/", async (req, res) => {
  try {
    const { name, emailOrMobile, password, age, gender } = req.body;

    const existingUser = await User.findOne({ emailOrMobile });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      emailOrMobile,
      password: hashedPassword,
      age,
      gender,
    });

    await newUser.save();
    res.status(201).json({ message: "Signup successful!" });

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { emailOrMobile, password } = req.body;

    const user = await User.findOne({ emailOrMobile });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
        { userId: user._id, emailOrMobile: user.emailOrMobile },
        process.env.JWT_SECRET,  // Using the secret key from .env
        { expiresIn: "1h" }
    );
      
    res.json({ message: "Login successful!", token });

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Profile Route
router.get("/profile", authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.user.userId).select("-password");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  

module.exports = router;
