

const express = require("express");
const router = express.Router();
const { authMiddleware, verifyAdmin } = require("../middleware/authMiddleware");

const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");

const multer = require("multer");
const path = require("path");

// Speicherort und Dateiname für hochgeladene Bilder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // ⬅️ Zielordner im Projektverzeichnis
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });


// 🔐 Nur für Administratoren

// ✅ Alle Benutzer abrufen
router.get("/users", authMiddleware, verifyAdmin, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// ✅ Löschen eines Benutzers
router.delete("/users/:id", authMiddleware, verifyAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Benutzer gelöscht" });
});

// ✅ Alle Bestellungen abrufen
router.get("/orders", authMiddleware, verifyAdmin, async (req, res) => {
  const orders = await Order.find().populate("userId", "email username");
  res.json(orders);
});

// ✅ Löschen einer Bestellung
router.delete("/orders/:id", authMiddleware, verifyAdmin, async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: "Bestellung gelöscht" });
});

// ✅ Ändern der Rolle eines Benutzers
router.put("/user/:id/role", authMiddleware, verifyAdmin, async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { role: req.body.role });
  res.json({ message: "Rolle aktualisiert" });
});

// ✅ Alle Produkte abrufen
router.get("/products", authMiddleware, verifyAdmin, async (req, res) => {
  const products = await Product.find();
  res.json(products);
});


// ✅ Hinzufügen eines neuen Produkts (mit Bild!)
router.post(
  "/products",
  authMiddleware,
  verifyAdmin,
  upload.single("image"), // ⬅️ multer!
  async (req, res) => {
    const { title, description, price } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const newProduct = new Product({
      title,
      description,
      price,
      image,
    });

    await newProduct.save();
    res.json({ message: "Produkt hinzugefügt", product: newProduct });
  }
);


// ✅ Aktualisierung des Produkts
router.put("/products/:id", authMiddleware, verifyAdmin, async (req, res) => {
  const { title, description, price, image } = req.body;

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { title, description, price, image },
    { new: true }
  );

  res.json({ message: "Produkt aktualisiert", product: updatedProduct });
});

// ✅ Löschen eines Produkts (blieb bei dir - lassen wir es so)
router.delete("/products/:id", authMiddleware, verifyAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Produkt gelöscht!" });
});

module.exports = router;

