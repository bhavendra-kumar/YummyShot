const express = require("express")
const router = express.Router();
const {
  getAllRestaurants,
  getMenuByRestaurant
} = require("../controllers/restaurantController");

// GET all restaurants
router.get("/", getAllRestaurants);

// GET menu for a restaurant
router.get("/:id/menu", getMenuByRestaurant);

module.exports = router;
