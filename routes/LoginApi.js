const express = require('express');
const router = express.Router();
const Admin = require('../models/Login');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config(); // 💡 Force dotenv config here again

// DEBUG: log to make sure env is loaded
console.log("JWT_SECRET inside LoginApi.js:", process.env.JWT_SECRET);

// Register Admin
router.post('/adminregister', async (req, res) => {
  try {
    const { name, email, password, role, phoneNumber, uniqueId, qualification, gender, department } = req.body;

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

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET, // ✅ Use directly here
      { expiresIn: '1h' }
    );

    res.json({
      message: "Login successful",
      token,
      role: admin.role,
      department: admin.department,
      id:admin._id
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all staff users
router.get('/getstaffs', async (req, res) => {
  try {
    const staffs = await Admin.find();
    res.json(staffs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a staff by ID
router.put('/updatestaff/:id', async (req, res) => {
  try {
    const updatedStaff = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStaff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a staff by ID
router.delete('/deletestaff/:id', async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.json({ message: 'Staff deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;