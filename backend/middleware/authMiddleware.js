const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Доступ запрещён!" });
  }
  next();
};
module.exports = verifyAdmin;
