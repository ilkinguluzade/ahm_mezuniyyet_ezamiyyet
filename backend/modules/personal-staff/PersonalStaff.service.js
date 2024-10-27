const PersonalStaffModel = require('./PersonalStaff.model');

// Yeni bir personel ekleme işlevi
const addPersonalStaff = async (staffData) => {
    try {
        const newStaff = new PersonalStaffModel(staffData);
        return await newStaff.save();
    } catch (error) {
        throw new Error('Personel eklenirken bir hata oluştu: ' + error.message);
    }
};

const getAllPersonalStaff = async () => {
    try {
        return await PersonalStaffModel.find({});
    } catch (error) {
        throw new Error('Personeller çekilirken bir hata oluştu: ' + error.message);
    }
};

module.exports = {
    addPersonalStaff,
    getAllPersonalStaff
};
