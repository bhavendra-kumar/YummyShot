const express = require("express");
const Order = require("../models/Order.js");
const authMiddleware = require("../Middleware/authMiddleware.js");

const router = express.Router();

// Mark order as paid
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = "paid";
    await order.save();

    res.json({ success: true, message: "Payment successful", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
