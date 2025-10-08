const Order = require("../models/Order");
const Cart = require("../models/Cart");

// Place order
const placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.menuItem");
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: "Cart is empty" });

    const totalPrice = cart.items.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
    const order = await Order.create({
      user: req.user._id,
      items: cart.items,
      totalPrice,
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("items.menuItem");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { placeOrder, getOrders };
