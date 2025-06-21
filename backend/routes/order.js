
const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");

// ⬇️ Теперь модель импортируется корректно
const Order = require("../models/Order");

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

