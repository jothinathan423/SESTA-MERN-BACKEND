const express = require('express');
const router = express.Router();

// Import sub-route files
const adminRoutes = require('./AdminApi');
const admincaInsert = require('./AdminCa');
const adminHodInsert = require('./AdminHod');
// Use those routes
router.use('/admin', adminRoutes);
router.use('/ca', admincaInsert);
router.use('/Hod',adminHodInsert);
  // example

module.exports = router;
