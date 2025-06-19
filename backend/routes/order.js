// const express = require("express");
// const router = express.Router();
// const mongoose = require("mongoose");

// const OrderSchema = new mongoose.Schema({
//   customer: String,
//   address: String,
//   items: [
//     {
//       productId: String,
//       name: String,
//       quantity: Number,
//       price: Number,
//     },
//   ],
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Order = mongoose.model("Order", OrderSchema);

// router.post("/order", async (req, res) => {
//   try {
//     const order = new Order(req.body);
//     await order.save();
//     res.status(201).json({ message: "Заказ создан успешно" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Ошибка создания заказа" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const authMiddleware = require("../middleware/authMiddleware"); // 🔐 добавляем мидлвар
const { authMiddleware } = require("../middleware/authMiddleware");

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 💡 сохраняем владельца заказа
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

// ✅ Создание заказа
router.post("/order", authMiddleware, async (req, res) => {
  
  try {
    const order = new Order({
      ...req.body,
      userId: req.user.id, // 💡 привязываем заказ к пользователю
    });
    await order.save();
    res.status(201).json({ message: "Заказ создан успешно" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка создания заказа" });
  }
});

// ✅ Получение заказов текущего пользователя
router.get("/orders", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Ошибка получения заказов:", err);
    res.status(500).json({ error: "Не удалось получить заказы" });
  }
});

module.exports = router;

