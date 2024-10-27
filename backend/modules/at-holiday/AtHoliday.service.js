
const AtHolidayPersonalStaff = require('./AtHoliday.model');

const saveHolidayStaff = async (holidayData) => {
    try {
        const newHolidayStaff = new AtHolidayPersonalStaff(holidayData);
        return await newHolidayStaff.save();
    } catch (error) {
        throw new Error('Veritabanına kaydedilirken bir hata oluştu');
    }
};

module.exports = {
    saveHolidayStaff
};
