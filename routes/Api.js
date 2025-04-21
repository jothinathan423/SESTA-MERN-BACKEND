const express = require("express");
const router = express.Router();

const adminRouter = require('./auth');
const CollegeLoginApi = require('./LoginApi');
const principal = require('./PrincipalOperation');
const staff = require('./StaffOperation');
const admincaInsert = require('./AdminCa');
const studentInsert = require('./studentroute');

// Register Routes
router.use('/admin/ca', admincaInsert);         // ex: /admin/ca/insert
router.use('/admin/student', studentInsert);    // ex: /admin/student/add

router.use('/admin', adminRouter);              // Admin auth, etc.
router.use('/admin', CollegeLoginApi);          // Login API
router.use('/admin', principal);                // Principal operations
router.use('/admin', staff);                    // Staff operations

module.exports = router;