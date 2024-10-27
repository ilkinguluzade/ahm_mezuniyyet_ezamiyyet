const PersonalStaffService = require('./PersonalStaff.service');
const PersonalStaffModel = require('./PersonalStaff.model')
// Yeni personel ekleme
const addPersonalStaff = async (req, res) => {
    try {
        const { name, surname, fatherName, rank, oppoletNumber, division } = req.body;
        const staffData = { name, surname, fatherName, rank, oppoletNumber, division };

        await PersonalStaffService.addPersonalStaff(staffData);
        res.redirect('/personal-staff/all-staff');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Xəta baş verdi.');
    }
};

const getAllPersonalStaff = async (req, res) => {
    try {
        const personalStaff = await PersonalStaffModel.find({});
        res.render('all-staff', { personalStaff });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Xəta baş verdi.');
    }
};


// Sayfa render işlemleri
const renderAllPersonalStaffPage = (req, res) => {
    res.render('all-personal-staff');
};

const renderAddPersonalStaffPage = (req, res) => {
    res.render('add-personal-staff', { user: req.user });
};

const renderDashboardPage = (req, res) => {
    res.render('index', { user: req.user });
};

module.exports = {
    addPersonalStaff,
    getAllPersonalStaff,
    renderAllPersonalStaffPage,
    renderAddPersonalStaffPage,
    renderDashboardPage
};
