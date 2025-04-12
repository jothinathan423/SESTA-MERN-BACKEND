const express = require('express');
const router = express.Router();
const CollegeUsers = require('../models/CollegeUsers');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretkey = process.env.JWT_SECRET;


router.post('/CollegeusersInsert', auth, async (req, res) => {
    try {
        const { id, username, password, role,department, phone,qualification,gender } = req.body;
        const userexist = await CollegeUsers.findOne({ id: id });
        if (userexist) {
            return res.status(400).json('Already Exist');
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        const newHead = new CollegeUsers({ id, username, password:hashedpassword, role, department, phone, qualification, gender });
        await newHead.save();
        res.status(201).json({ message: 'head inserted successfully', user: newHead });
    }
    catch (err) {
        console.error(err);
        res.status(500).json('server errors');
    }
})


module.exports = router;