const User = require("../models/User");
const Restaurant = require("../models/Restaurant");

// GET /api/cart
const getCart = async (req, res) => {
  const user = await User.findById(req.user.id).populate("cart.menuItem");
  res.json({ items: user.cart });
};

// POST /api/cart/add
const addToCart = async (req, res) => {
  const { menuItemId, quantity } = req.body;
  const user = await User.findById(req.user.id);
  const existingItem = user.cart.find(item => item.menuItem.toString() === menuItemId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    user.cart.push({ menuItem: menuItemId, quantity });
  }
  await user.save();
  res.json({ items: user.cart });
};

// POST /api/cart/remove
const removeFromCart = async (req, res) => {
  const { menuItemId } = req.body;
  const user = await User.findById(req.user.id);
  user.cart = user.cart.filter(item => item.menuItem.toString() !== menuItemId);
  await user.save();
  res.json({ items: user.cart });
};

// POST /api/cart/order
const placeOrder = async (req, res) => {
  const user = await User.findById(req.user.id).populate("cart.menuItem");
  if (!user.cart.length) return res.status(400).json({ message: "Cart is empty" });

  // Here you can save the order in a separate Order model if you want
  user.cart = []; // clear cart after order
  await user.save();
  res.json({ message: "Order placed successfully" });
};

module.exports = { getCart, addToCart, removeFromCart, placeOrder };
