const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/User");

const adminRouter = require('./auth');
const CollegeLoginApi = require('./LoginApi');
const principal = require('./PrincipalOperation');
const staff = require('./StaffOperation');
const admincaInsert = require('./AdminCa');
const studentInsert = require('./studentroute');

// Ensure this matches the file name

// Use those routes

router.use('/ca', admincaInsert);
router.use('/student', studentInsert);



router.use('/admin', adminRouter);
router.use('/admin',CollegeLoginApi, principal, staff);;
//router.use('/admin', staffRouter);
// router.use('/admin', principal);


module.exports = router;
