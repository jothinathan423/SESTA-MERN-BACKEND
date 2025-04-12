const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ['Admin', 'Hod', 'Principal', 'Ca'], // optional but good
    required: true
  }
});

module.exports = mongoose.model('Admin', adminSchema);
