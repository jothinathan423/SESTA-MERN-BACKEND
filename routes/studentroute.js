const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const bcrypt = require('bcrypt');

// router.post('/insert', async (req, res) => {
//   try {
//     const newStudent = new Student(req.body);
//     await newStudent.save();
//     res.status(201).json({ message: 'Student created successfully!' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
router.post('/insert', async (req, res) => {
    try {
        const {
            name, username, password, role, phonenumber,
            department, id, batch, gender, year, section
        } = req.body;

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newStudent = new Student({
            name,
            username,
            password: hashedPassword,  // store hashed password
            role,
            phonenumber,
            department,
            id,
            batch,
            gender,
            year,
            section
        });

        await newStudent.save();
        res.status(201).json({ message: 'Student Inserted Successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/view', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;