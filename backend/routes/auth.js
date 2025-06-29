

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { authMiddleware } = require("../middleware/authMiddleware"); // 🔐 Middleware hinzufügen

const router = express.Router();

router.get("/register", (req, res) => {
  res.send("Registrieren Sie sich über eine POST-Anfrage.");
});

router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword, role: role || "user" });
  await user.save();
  res.json({ message: "Benutzer registriert!", user });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(400).json({ message: "Ungültige Anmeldedaten" });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, "SECRET_KEY", { expiresIn: "1h" });
  res.json({ token, user });
});


// ✅ Neuer Route: Benutzerdaten über Token abrufen
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("username email role address");
    if (!user) return res.status(404).json({ message: "Benutzer nicht gefunden" });
    res.json(user);
  } catch (err) {
    console.error("Fehler beim Abrufen des Benutzers", err);
    res.status(500).json({ error: "Serverfehler" });
  }
});

module.exports = router;


