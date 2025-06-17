const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

const orderRoutes = require("./routes/order");
app.use("/api", orderRoutes);


mongoose.connect("mongodb://localhost:27017/ecommerce"); // замени при необходимости

const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

app.listen(5000, () => console.log("Backend запущен на порту 5000"));
