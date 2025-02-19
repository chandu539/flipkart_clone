const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    
    // Check if Authorization header is missing or formatted incorrectly
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Access Denied. No token provided." });
    }

    // Extract token from header
    const token = authHeader.split(" ")[1];

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach userId to request for use in routes
    req.user = { userId: decoded.userId };

    next();
  } catch (error) {
    console.error("JWT Verification Failed:", error);
    res.status(401).json({ error: "Invalid or expired token." });
  }
};

module.exports = authMiddleware;
