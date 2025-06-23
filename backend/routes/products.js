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

module.exports = router;
