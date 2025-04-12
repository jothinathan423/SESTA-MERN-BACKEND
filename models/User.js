const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "staff"],
    default: "staff"
  }
});

module.exports = mongoose.model("User", userSchema);
