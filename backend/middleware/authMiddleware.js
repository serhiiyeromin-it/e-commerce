

const jwt = require("jsonwebtoken");

// 🔐 Middleware zur Token-Verifizierung (für jeden autorisierten Benutzer)
const authMiddleware = (req, res, next) => {
  console.log("ALLE ÜBERSCHRIFTEN:", req.headers);
  const authHeader = req.headers.authorization;
  console.log("Zugriff:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Kein Token!" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const decoded = jwt.verify(token, "SECRET_KEY");

    console.log("Entschlüsseltes Token:", decoded);
    req.user = decoded; // dekodiert sollte Benutzer-ID, E-Mail, Rolle usw. enthalten.
    next();
  } catch (err) {
    return res.status(403).json({ message: "Ungültiges Token!" });
  }
};

// 👮 Middleware zur Überprüfung der Administratorrolle
const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Zugriff verweigert!" });
  }
  next();
};

// 📤 Exportieren Sie beide Middlewares



module.exports = {
  authMiddleware,
  verifyAdmin,
};