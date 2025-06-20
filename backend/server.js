// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const orderRoutes = require("./routes/order");
// app.use("/api", orderRoutes);

// app.use("/api/admin", require("./routes/adminRoutes"));


// mongoose.connect("mongodb://localhost:27017/ecommerce"); // замени при необходимости

// const authRoutes = require("./routes/auth");
// app.use("/api", authRoutes);

// app.listen(5000, () => console.log("Backend запущен на порту 5000"));

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Datenbank verbinden
mongoose.connect("mongodb://localhost:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
