const express = require('express');
const router = express.Router();
const Admin = require('../model/Admin');
const Head = require('../model/Head');




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





//insert heads
router.post('/headinsert', async (req, res) => {
    try {
        const { id, name, email, password, designation } = req.body;
        const userexist = await Head.findOne({ id: id });
        if (userexist) {
            res.status(400).json('Already Exist');
        }
        const newHead = new Head({ id, name, email, password, designation });
        await newHead.save();
        res.status(201).json({message:'head inserted successfully', user: newHead});
    }
    catch (err) {
        res.status(500).json('server error');
    }
})

//get all heads
router.get('/getallheads', async (req, res) => {
    try {
        const heads = await Head.find();
        res.status(200).json(heads);
    }
    catch (err) {
        res.status(500).json('server error');
    }
})


//remove heads by the id
router.delete('/deleteheadbyid', async (req, res) => {
    try {
        const { id } = req.body;
        const head = await Head.findOneAndDelete({ id: id });
        if (!head) {
            return res.status(404).json('head not found');
        } else {
            res.status(200).json({ message: 'head removed successfully', head });
        }
    }
    catch (err) {
        res.status(500).json('server error');
    }
})

module.exports = router;