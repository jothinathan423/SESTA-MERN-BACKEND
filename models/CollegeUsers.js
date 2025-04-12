const mongoose = require('mongoose');

const CollegeUsersSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    username: {  
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['staff', 'hod', 'dean', 'principal'],
        required: true
    },
    department: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('CollegeUser', CollegeUsersSchema);
