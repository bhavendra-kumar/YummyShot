const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String }
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String },
  image: { type: String },
  menu: [menuItemSchema]
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
