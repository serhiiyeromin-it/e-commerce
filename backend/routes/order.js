const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customer: String,
  address: String,
  items: [
    {
      productId: String,
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", OrderSchema);

router.post("/order", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: "Заказ создан успешно" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка создания заказа" });
  }
});

module.exports = router;
