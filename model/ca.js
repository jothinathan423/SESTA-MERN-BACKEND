const mongoose = require('mongoose');

const CaSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    department: {
        type: String,
        required : true
    },
    section: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required : true
    },

});
module.exports = mongoose.model('ClassAdvisor',CaSchema);