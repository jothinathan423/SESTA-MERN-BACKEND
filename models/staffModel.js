const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  phoneNumber: String,
  uniqueId: String,
  qualification: String,
  gender: String,
  department: String,
  class: String,
});

module.exports = mongoose.model('Staff', staffSchema);