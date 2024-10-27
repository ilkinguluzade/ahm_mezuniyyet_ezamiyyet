const mongoose = require('mongoose');

const OfficialJourneySchema = new mongoose.Schema({
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
    journeyFrom: {
        type: Date,
        default: Date.now(),
    },
    journeyTo: {
        type: Date
    },
    journeyAt: {
        type: String,
        required:true,
    },
    note: {
        type: String
    },

});

const OfficialJourney = mongoose.model('OfficialJourney', OfficialJourneySchema);

module.exports = OfficialJourney;
