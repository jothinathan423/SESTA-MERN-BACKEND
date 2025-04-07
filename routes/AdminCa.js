const express = require('express');
const router = express.Router();
const ClassAdvisor = require('../models/ca');
const auth = require('../middleware/auth');

// ✅ Insert Class Advisor (Admin only)
router.post('/insert', auth, async (req, res) => {
    try {
        const { name, department, section, email } = req.body;

        const newCA = new ClassAdvisor({ name, department, section, email });
        await newCA.save();

        res.status(201).json({ message: 'Class Advisor inserted successfully', ca: newCA });
    } catch (error) {
        res.status(500).json({ message: 'Failed to insert Class Advisor', error: error.message });
    }
});

// ✅ Delete Class Advisor (by email, Admin only)
router.delete('/delete/:email', auth, async (req, res) => {
    try {
        const email = req.params.email;
        const deletedCA = await ClassAdvisor.findOneAndDelete({ email });

        if (!deletedCA) {
            return res.status(404).json({ message: 'Class Advisor not found' });
        }

        res.status(200).json({ message: 'Class Advisor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete Class Advisor', error: error.message });
    }
});

module.exports = router;
