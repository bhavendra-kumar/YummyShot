const Restaurant = require("../models/Restaurant");

// Get all restaurants
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({}, "-menu"); // exclude menu in list
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch restaurants", error });
  }
};

// Get menu for a restaurant
const getMenuByRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
    res.json(restaurant.menu);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch menu", error });
  }
};

module.exports = {
  getAllRestaurants,
  getMenuByRestaurant
};
