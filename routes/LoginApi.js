// AdminApi.js
const express = require('express');
const router = express.Router();
const Admin = require('../models/Login');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = process.env.JWT_SECRET;

// Register Admin
router.post('/adminregister', async (req, res) => {
    try {
      const { name, email, password, role, phoneNumber, uniqueId, qualification, gender,department } = req.body;
  
      const userexist = await Admin.findOne({ email: email });
      if (userexist) return res.status(400).json('User already exists');
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = new Admin({
        name,
        email,
        password: hashedPassword,
        role,
        phoneNumber,
        uniqueId,
        qualification,
        gender,
        department
      });
  
      await newAdmin.save();
      res.status(201).json({ message: 'Admin registered successfully', user: newAdmin });
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  });

// Login Admin
router.post('/adminlogin', async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email, password);

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: admin._id }, SECRET_KEY, { expiresIn: '1h' });

    // ✅ Now sending department too
    res.json({
      message: "Login successful",
      token,
      role: admin.role,
      department: admin.department,
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
