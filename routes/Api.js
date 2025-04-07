const express = require('express');
const router = express.Router();

// Import sub-route files
const adminRoutes = require('./AdminApi');
const admincaInsert = require('./AdminCa');
// Use those routes
router.use('/admin', adminRoutes);
router.use('/ca', admincaInsert);
  // example

module.exports = router;
