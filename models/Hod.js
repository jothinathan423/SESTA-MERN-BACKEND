const mongoose = require('mongoose');

const HodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Hod', HodSchema);