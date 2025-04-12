const express = require('express');
const router = express.Router();

// Import sub-route files
const adminRoutes = require('./AdminApi');
const admincaInsert = require('./AdminCa');
const adminheadInsert = require('./AdminHead');
const collegeUsers = require('./CollegeUser')
// Use those routes
router.use('/admin', adminRoutes);
router.use('/admin-ca', admincaInsert);
router.use('/admin-head', adminheadInsert);
router.use('/collegeusers', collegeUsers);



module.exports = router;
