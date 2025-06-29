
const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");

// ⬇️ Jetzt wird das Modell korrekt importiert
const Order = require("../models/Order");

// ✅ Erstellung einer Bestellung
router.post("/order", authMiddleware, async (req, res) => {
  try {
    const order = new Order({
      ...req.body,
      userId: req.user.id, // 💡Wir sind an die Bestellung des Benutzers gebunden
    });
    await order.save();
    res.status(201).json({ message: "Bestellung erfolgreich erstellt" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fehler bei der Erstellung der Bestellung" });
  }
});

// ✅ Abrufen der Bestellungen des aktuellen Benutzers
router.get("/orders", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Fehler beim Abrufen der Bestellungen:", err);
    res.status(500).json({ error: "Bestellungen konnten nicht abgerufen werden" });
  }
});

module.exports = router;

