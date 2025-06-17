const express = require("express");
const Product = require("../models/Product");
const verifyAdmin = require("../middleware/authMiddleware");
const router = express.Router();

router.delete("/products/:id", verifyAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Товар удалён!" });
});

module.exports = router;
