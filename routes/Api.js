const express = require('express');
const router = express.Router();
const Admin = require('../model/Admin');
const Ca = require('../model/ca');

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

//insert ca's
router.post('/insertca',async (req,res) =>{
    try{
        const { name, department , section, email } = req.body;
        const userexist = await Ca.findOne({email: email});
        if(userexist){
            res.status(400).json('Class Advisor already exists');
        }
        const newCa = new Ca({name, department , section, email});
        await newCa.save();
        res.status(201).json({message: 'Class Advisor inserted Successfully',user: newCa });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
})

//view ca's

module.exports = router;