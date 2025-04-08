const express = require('express');
const router = express.Router();
const Hod = require('../models/Hod');
const auth = require('../middleware/auth');

// ✅ Insert Hod (Admin only)
router.post('/insert', auth, async (req, res) => {
    try {
        const { name, department, email } = req.body;

        const newHod = new Hod({ name, department, email });
        await newHod.save();

        res.status(201).json({ message: 'Hod inserted successfully', Hod: newHod });
    } catch (error) {
        res.status(500).json({ message: 'Failed to insert Hod', error: error.message });
    }
});

// ✅ Delete Hod (by email, Admin only)
router.delete('/delete/:email', auth, async (req, res) => {
    try {
        const email = req.params.email;
        const deletedHod = await Hod.findOneAndDelete({ email });

        if (!deletedHod) {
            return res.status(404).json({ message: 'Hod not found' });
        }

        res.status(200).json({ message: 'Hod deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete Class Hod', error: error.message });
    }
});

module.exports = router;
