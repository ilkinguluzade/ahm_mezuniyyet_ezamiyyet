const mongoose = require('mongoose');

const PersonalStaffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    surname: {
        type: String,
        required: true,
    },
    fatherName: {
        type: String,
        required: true,
    },
    rank: {
        type: String,
        required: true,
    },
    oppoletNumber: {
        type: String,
        required: true,
    },
    division: {
        type: String,
        required: true,
    },

});

const PersonalStaff = mongoose.model('PersonalStaff', PersonalStaffSchema);

module.exports = PersonalStaff;
