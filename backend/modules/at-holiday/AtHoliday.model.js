const mongoose = require('mongoose');

const AtHolidayPersonalStaffSchema = new mongoose.Schema({
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
    holidayFrom: {
        type: Date,
        default: Date.now(),
    },
    holidayTo: {
        type: Date,
        required:true,
    },
    holidayAt: {
        type: String,
        required:true,
    },
    note: {
        type: String
    },

});

const AtHolidayPersonalStaff = mongoose.model('AtHolidayPersonalStaff', AtHolidayPersonalStaffSchema);

module.exports = AtHolidayPersonalStaff;
