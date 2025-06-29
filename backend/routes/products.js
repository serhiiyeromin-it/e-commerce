// routes/products.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product"); // Produktmodell

// GET /api/products — alle Produkte abrufen
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("Fehler beim Abrufen der Produkte:", err);
    res.status(500).json({ message: "Serverfehler" });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Produkt nicht gefunden" });
    res.json(product);
  } catch (err) {
    console.error("Fehler beim Abrufen des Produkts:", err);
    res.status(500).json({ message: "Serverfehler" });
  }
});

module.exports = router;
