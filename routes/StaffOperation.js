// In your routes file (e.g., routes/admin.js or routes/Api.js)
const express = require('express');
const router = express.Router();
const Staff = require('../models/Login'); // Assuming you have a Staff model

// Get staff by department
router.get('/staff', async (req, res) => {
  const { department } = req.query; // Get the department from query parameters

  if (!department) {
    return res.status(400).json({ message: 'Department is required' });
  }

  try {
    // Find staff where department matches and role is 'staff'
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

// PATCH route to update staff's class
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
  

module.exports = router;
