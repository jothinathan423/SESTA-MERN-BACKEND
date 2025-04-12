const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  uniqueId: { type: String, required: true },
  qualification: { type: String, required: true },
  gender: { type: String, required: true }
});

module.exports = mongoose.model('Admin', AdminSchema);
