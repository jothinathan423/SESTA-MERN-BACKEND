const express = require('express');
const router = express.Router();
const Admin = require('../model/Admin');
const Hod = require('../model/Hod');
const Head = require('../model/Head');
const Ca = require('../model/ca');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const SECRET_KEY =  process.env.JWT_SECRET; 

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


// hod login
router.post('/hodlogin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const hod = await Hod.findOne({ email });
        if (!hod || hod.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ email: hod.email, id: hod._id }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//view hod's
router.get('/viewhod',async (req, res) =>{
    try{
        const hods = await Hod.find();
        res.status(200).json(hods);
    }
    catch (err) {
        res.status(500).json('error');
    }
})


//deleting hod's

router.delete('/removehodbyid/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Correct usage of findByIdAndDelete
        const hod = await Hod.findByIdAndDelete(id);

        if (!hod) {
            return res.status(404).json({ message: "hod not found" });
        }

        res.status(200).json({ message: "hod removed", hod });
    } catch (err) {
        console.error("Error deleting hod:", err);
        res.status(500).json({ error: err.message });
    }
});


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
router.delete('/deleteheadbyid/:id', async (req, res) => {
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

//insert ca's
router.post('/insertca',auth,async (req,res) =>{
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
router.get('/viewca',auth,async (req, res) =>{
    try{
        const cas = await Ca.find();
        res.status(200).json(cas);
    }
    catch (err) {
        res.status(500).json('error');
    }
})

//deleting ca's

router.delete('/removecabyid/:id',auth, async (req, res) => {
    try {
        const { id } = req.params;

        // Correct usage of findByIdAndDelete
        const ca = await Ca.findByIdAndDelete(id);

        if (!ca) {
            return res.status(404).json({ message: "Ca not found" });
        }

        res.status(200).json({ message: "CA removed", ca });
    } catch (err) {
        console.error("Error deleting CA:", err);
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
