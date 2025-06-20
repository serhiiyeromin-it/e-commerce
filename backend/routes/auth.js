
// module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { authMiddleware } = require("../middleware/authMiddleware"); // 🔐 добавим мидлвару

const router = express.Router();

router.get("/register", (req, res) => {
  res.send("Зарегистрируйтесь через POST-запрос.");
});

router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword, role: role || "user" });
  await user.save();
  res.json({ message: "Пользователь зарегистрирован!", user });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(400).json({ message: "Неверные данные" });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, "SECRET_KEY", { expiresIn: "1h" });
  res.json({ token, user });
});


// ✅ Новый маршрут: получить данные пользователя по токену
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("username email address");
    if (!user) return res.status(404).json({ message: "Пользователь не найден" });
    res.json(user);
  } catch (err) {
    console.error("Ошибка получения пользователя", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

module.exports = router;


