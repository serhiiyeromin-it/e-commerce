
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
// app.use(cors({
//   origin: "http://localhost:5173", // замените на порт вашего фронта
//   credentials: true,
//   allowedHeaders: ["Content-Type", "Authorization"],
// }));
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));


app.use(express.json());

app.use("/api", require("./routes/payment"));


const productRoutes = require("./routes/products");
app.use("/api", productRoutes);

require('dotenv').config();


// ✅ Datenbank verbinden // funktioniert mit Docker
mongoose.connect("mongodb://mongo:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// // ✅ Datenbank verbinden // // das funktioniert ohne Docker
// mongoose.connect("mongodb://localhost:27017/ecommerce", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// ✅ Authentifizierung
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);  // /api/login, /api/register

// ✅ Bestellungen
const orderRoutes = require("./routes/order");
app.use("/api", orderRoutes);  // /api/orders

// ✅ Admin
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);  // /api/admin/users, /api/admin/orders

// ✅ Serverstart
app.listen(5000, () => console.log("Backend läuft auf Port 5000"));

// ✅ Statische Dateien für Bilder
app.use("/uploads", express.static("uploads"));

