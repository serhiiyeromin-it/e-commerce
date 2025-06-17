// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const router = express.Router();

// router.post("/register", async (req, res) => {
//   const { username, email, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = new User({ username, email, password: hashedPassword });
//   await user.save();
//   res.status(201).json({ message: "Пользователь создан!" });
// });

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user || !await bcrypt.compare(password, user.password)) {
//     return res.status(400).json({ message: "Неверные данные" });
//   }
//   const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1h" });
//   res.json({ token, user });
// });

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.get("/register", (req, res) => {
  res.send("Зарегистрируйтесь через POST-запрос.");
});

// Регистрация
// router.post("/register", async (req, res) => {
//   const { username, email, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = new User({ username, email, password: hashedPassword });
//   await user.save();
//   res.status(201).json({ message: "Пользователь создан!" });
// });

router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword, role: role || "user" });
  await user.save();
  res.json({ message: "Пользователь зарегистрирован!", user });
});

// Вход
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(400).json({ message: "Неверные данные" });
//   }
//   const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1h" });
//   res.json({ token });
// });

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(400).json({ message: "Неверные данные" });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, "SECRET_KEY", { expiresIn: "1h" });
  res.json({ token, user });
});


module.exports = router;

