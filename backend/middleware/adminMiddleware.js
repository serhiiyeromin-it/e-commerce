
// 🔐 Middleware zur Überprüfung der Admin-Rolle
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    // Wenn der Benutzer keine Admin-Rolle hat, Zugriff verweigern
    return res.status(403).json({ message: "Zugriff verweigert" });
  }

  // Wenn Admin, dann nächsten Middleware aufrufen
  next();
};

// 📤 Export des Admin-Middleware
module.exports = { adminMiddleware };
