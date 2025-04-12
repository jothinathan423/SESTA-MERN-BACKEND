const express = require('express');
const router = express.Router();
const Admin = require('../models/student');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = process.env.JWT_SECRET;

router.get("/getallstudents", async (req, res) => {
    try {
        const students = await Admin.find();
        res.status(200).json(students);
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
})


module.exports = router;