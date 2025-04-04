const express = require('express');
const router = express.Router();
const Admin = require('../model/Admin');
const Hod = require('../model/Hod');




//admin register
router.post('/adminregister', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userexist = await Admin.findOne({ email: email });
        if (userexist) {
            res.status(400).json('user already exist')
        }
        const newAdmin = new Admin({ name, email, password });
        await newAdmin.save();
        res.status(201).json({ message: 'Admin registered successfully', user: newAdmin });

    }
    catch (err) {
        res.status(500).json('serve error');
    }
})


//Hod register
router.post('/hodregister', async (req, res) => {
try {
    const { name, email, password , department} = req.body;
    const hodexist = await Hod.findOne({ email: email });
    if (hodexist) {
        res.status(400).json('Hod already exist')
    }
    const newHod = new Hod({ name, email, password, department});
    await newHod.save();
    res.status(201).json({ message: 'Hod registered successfully', user: newHod });

}
catch (err) {
    res.status(500).json('serve error');
}
})

module.exports = router;