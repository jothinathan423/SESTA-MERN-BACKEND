const express = require('express');
const router = express.Router();
const Admin = require('../model/Admin');
const Hod = require('../model/Hod');
const Head = require('../model/Head');



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
router.get('/viewca',async (req, res) =>{
    try{
        const cas = await Ca.find();
        res.status(200).json(cas);
    }
    catch (err) {
        res.status(500).json('error');
    }
})

//deleting ca's

router.delete('/removecabyid/:id', async (req, res) => {
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