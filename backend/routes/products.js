// routes/products.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product"); // модель товара

// GET /api/products — получить все товары
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("Ошибка получения продуктов:", err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Товар не найден" });
    res.json(product);
  } catch (err) {
    console.error("Ошибка получения товара:", err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

module.exports = router;
