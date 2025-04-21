const express = require('express');
const router = express.Router();
const Staff = require('../models/Login'); // Assuming Staff model is in models/Login.js

// 1. ✅ Get staff by department
router.get('/staff', async (req, res) => {
  const { department } = req.query;

  if (!department) {
    return res.status(400).json({ message: 'Department is required' });
  }

  try {
    const staffList = await Staff.find({ department, role: 'staff' });

    if (staffList.length === 0) {
      return res.status(404).json({ message: 'No staff found for the given department' });
    }

    res.status(200).json(staffList);
  } catch (err) {
    console.error('Error fetching staff:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 2. ✅ PATCH route to update class by name
router.patch('/update-class', async (req, res) => {
  const { staffName, className } = req.body;

  if (!staffName || !className) {
    return res.status(400).json({ error: "Missing staff name or class" });
  }

  try {
    const updated = await Staff.findOneAndUpdate(
      { name: staffName },
      { class: className },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Staff not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error('Error updating class:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 3. ✅ New GET: fetch all registered staff
router.get('/staffs', async (req, res) => {
  try {
    const allStaffs = await Staff.find({ role: 'staff' }); // you can remove `role: 'staff'` if not needed
    res.status(200).json(allStaffs);
  } catch (err) {
    console.error("Failed to fetch staff:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 4. ✅ DELETE: delete a staff by ID
router.delete('/staffs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Staff.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Staff not found" });
    }
    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (err) {
    console.error("Error deleting staff:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 5. ✅ PATCH: edit/update staff by ID
router.patch('/staffs/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedStaff = await Staff.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedStaff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    res.status(200).json(updatedStaff);
  } catch (err) {
    console.error("Error updating staff:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Delete Staff
router.delete('/deletestaff/:id', async (req, res) => {
  try {
    const deleted = await Staff.findByIdAndDelete(req.params.id);
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ message: "Error deleting staff" });
  }
});

// Update Staff
router.put('/updatestaff/:id', async (req, res) => {
  try {
    const updated = await Staff.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating staff" });
  }
});


module.exports = router;
