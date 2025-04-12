const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: {
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
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    }

});
module.exports = mongoose.model('Student', StudentSchema);