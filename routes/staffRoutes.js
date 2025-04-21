const express = require('express');
const Staff = require('../models/staffModel'); // Adjust the path if needed

const router = express.Router();

// Endpoint to fetch all staff data
router.get('/getstaffs', async (req, res) => {
  try {
    const staffs = await Staff.find(); // Fetch staff data from DB
    res.json(staffs);
  } catch (error) {
    console.error('Error fetching staff data:', error);
    res.status(500).json({ message: 'Error fetching staff data' });
  }
});

// Update staff details by ID
router.put('/admin/update-staff/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
      const updatedStaff = await Staff.findByIdAndUpdate(id, updatedData, { new: true });
      res.json(updatedStaff);
  } catch (error) {
      res.status(400).send("Error updating staff data.");
  }
});

// Delete staff by ID
router.delete('/admin/delete-staff/:id', async (req, res) => {
  const { id } = req.params;

  try {
      await Staff.findByIdAndDelete(id);
      res.json({ message: "Staff deleted successfully" });
  } catch (error) {
      res.status(400).send("Error deleting staff data.");
  }
});

// Search staff by name, role, or department
router.get('/admin/search-staff', async (req, res) => {
  const { name, role, department } = req.query;
  const filters = {};

  if (name) filters.name = { $regex: name, $options: 'i' };
  if (role) filters.role = role;
  if (department) filters.department = department;

  try {
      const staffList = await Staff.find(filters);
      res.json(staffList);
  } catch (error) {
      res.status(400).send("Error fetching staff data.");
  }
});


module.exports = router;