// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { signupUser, loginUser, getUserProfile } = require("../controllers/authControllers");
const { protect } = require("../Middleware/authMiddleware");

// Register user
router.post("/signup", signupUser);

// Login user
router.post("/login", loginUser);

// Get current logged-in user profile
router.get("/me", protect, getUserProfile);


module.exports = router;
