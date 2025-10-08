const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

// Place order
router.post("/", async (req, res) => {
  try {
    const { items, totalAmount } = req.body;
    const order = new Order({ items, totalAmount, status: "pending" });
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error placing order" });
  }
});

module.exports = router;
