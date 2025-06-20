
const express = require("express");
const router = express.Router();
const { authMiddleware, verifyAdmin } = require("../middleware/authMiddleware");
const User = require("../models/User");
const Order = require("../models/Order");
// const Product = require("../models/Product");

// 🔐 Только для админов

// Все пользователи
router.get("/users", authMiddleware, verifyAdmin, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// Все заказы
router.get("/orders", authMiddleware, verifyAdmin, async (req, res) => {
  const orders = await Order.find().populate("userId", "email username");
  res.json(orders);
});

// Изменение роли пользователя
router.put("/user/:id/role", authMiddleware, verifyAdmin, async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { role: req.body.role });
  res.json({ message: "Роль обновлена" });
});

// Удаление товара
router.delete("/products/:id", authMiddleware, verifyAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Товар удалён!" });
});

module.exports = router;

