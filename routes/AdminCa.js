const express = require('express');
const router = express.Router();
const ClassAdvisor = require('../models/ca');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET_KEY = process.env.JWT_sECRET;
//Class advisor login
router.post('/calogin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const ca = await ClassAdvisor.findOne({ email });
        if (!ca)
            return res.status(401).json({ message: 'Invalid' });

        const isMatch = await bcrypt.compare(password, ca.password);
        if (!isMatch)
            return res.status(401).json({ message: 'Invalid pass' });
        const token = jwt.sign({ email: ca.email, id: ca.id }, SECRET_KEY, { expiresIn: '10m' });
        res.status(200).json({ message: 'Login Successful', token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Insert Class Advisor (Admin only)
router.post('/insert', auth, async (req, res) => {
    try {
        const { name, department, section, email, password } = req.body;

        const existingCA = await ClassAdvisor.findOne({ email });
        if (existingCA) {
            return res.status(400).json({ message: 'Class Advisor already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newCA = new ClassAdvisor({ name, department, section, email, password: hashedPassword });

        await newCA.save();

        res.status(201).json({ message: 'Class Advisor inserted successfully', ca: newCA });
    } catch (error) {
        res.status(500).json({ message: 'Failed to insert Class Advisor', error: error.message });
    }
});


//  Delete Class Advisor (by email, Admin only)
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
//view Class Advisors
router.get('/viewCas', auth, async (req, res) => {
    try {
        const cas = await ClassAdvisor.find();
        res.status(200).json(cas);
    }
    catch (err) {
        res.status(500).json('server error');
    }



})

// Filter Class Advisors by Department 
router.get('/filterByDepartment/:department', auth, async (req, res) => {
    try {
        const { department } = req.params;

        const cas = await ClassAdvisor.find({ department });

        if (cas.length === 0) {
            return res.status(404).json({ message: ` No Class Advisors found in ${department} department` });
        }

        res.status(200).json(cas);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});



module.exports = router;