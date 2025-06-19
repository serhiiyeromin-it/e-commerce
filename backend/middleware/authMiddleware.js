// const verifyAdmin = (req, res, next) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ message: "Доступ запрещён!" });
//   }
//   next();
// };
// module.exports = verifyAdmin;


const jwt = require("jsonwebtoken");

// 🔐 Middleware для проверки токена (для любого авторизованного пользователя)
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Заголовки:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Нет токена!" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const decoded = jwt.verify(token, "SECRET_KEY");

    console.log("Расшифрованный токен:", decoded);
    req.user = decoded; // decoded должен включать userId, email, role и т.д.
    next();
  } catch (err) {
    return res.status(403).json({ message: "Неверный токен!" });
  }
};

// 👮 Middleware для проверки роли администратора
const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Доступ запрещён!" });
  }
  next();
};

// 📤 Экспортируем оба middleware



module.exports = {
  authMiddleware,
  verifyAdmin,
};
