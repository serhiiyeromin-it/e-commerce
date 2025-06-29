
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" }, // Standardmäßig „Benutzer“, kann in „Administrator“ geändert werden
  address: { type: String } // 🆕 Hinzufügen einer Lieferadresse
});

module.exports = mongoose.model("User", UserSchema);



