const express = require('express');
const router = express.Router();
const Head = require('../models/Head');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretkey = process.env.JWT_SECRET;


//insert heads
router.post('/headinsert', auth, async (req, res) => {
    try {
        const { id, name, email, password, designation } = req.body;
        const userexist = await Head.findOne({ id: id });
        if (userexist) {
            return res.status(400).json('Already Exist');
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        const newHead = new Head({ id, name, email, password:hashedpassword, designation });
        await newHead.save();
        res.status(201).json({ message: 'head inserted successfully', user: newHead });
    }
    catch (err) {
        res.status(500).json('server errors');
    }
})


router.get('/getallheads', auth, async (req, res) => {
    try {
        const heads = await Head.find();
        res.status(200).json(heads);
    }
    catch (err) {
        res.status(500).json('server error');
    }
})


//remove heads by the id
router.delete('/deleteheadbyid/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
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

//login the the head
router.post('/headlogin', async(req, res) => {
    const { email, password } = req.body;
    try {
        const head = await Head.findOne({ email: email });
        if (!head) {
            return res.status(404).json('head not found');
        }
        const isMatch = await bcrypt.compare(password, head.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'invalid password' });
        }
        const token = jwt.sign({ id: head.id, email: head.email }, secretkey, { expiresIn: '1h' });
        res.status(200).json({ message: 'head logged in successfully', token });
    }
    catch (err) {
        res.status(500).json({ Error: err.message });
    }
})

module.exports = router;
