const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
  quantity: Number,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  cart: [cartItemSchema],
});

module.exports = mongoose.model("User", userSchema);
