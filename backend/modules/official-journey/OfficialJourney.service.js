
const OfficialJourneyModel = require('./OfficialJourney.model');

const saveHolidayStaff = async (journeyData) => {
    try {
        const newHolidayStaff = new OfficialJourneyModel(journeyData);
        return await newHolidayStaff.save();
    } catch (error) {
        throw new Error('Veritabanına kaydedilirken bir hata oluştu');
    }
};

module.exports = {
    saveHolidayStaff
};
