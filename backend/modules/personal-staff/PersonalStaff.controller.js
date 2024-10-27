const PersonalStaffService = require('./PersonalStaff.service');
const PersonalStaffModel = require('./PersonalStaff.model')
const {
    getAllPersonalStaffCount,
    getAllAtHolidayPersonStaffCount,
    getAllOfficialJourneyPersonCount,
    getLast5AtHolidayList,
    getLast5MustComeFromHolidayList,
    getNext5MustReturnTomorrow
} = require("../dashboard/Dashboard.controller");
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

const renderDashboardPage = async (req, res) => {
    try {
        const allStaff = await getAllPersonalStaffCount();
        const onHolidayCount = await getAllAtHolidayPersonStaffCount();
        const officialJourneyCount = await getAllOfficialJourneyPersonCount();
        const last5Holidays = await getLast5AtHolidayList();
        const last5MustCome = await getLast5MustComeFromHolidayList();
        const next5MustReturnTomorrow = await getNext5MustReturnTomorrow(); // Yeni fonksiyon
        // Render the dashboard and pass all necessary data
        res.render('dashboard', {
            user: req.user,
            allStaff: allStaff || [], // Ensure allStaff is defined
            onHolidayCount: onHolidayCount || 0,
            officialJourneyCount,
            last5Holidays,
            next5MustReturnTomorrow,
            last5MustCome
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Bir hata oluştu');
    }
};

module.exports = {
    addPersonalStaff,
    getAllPersonalStaff,
    renderAllPersonalStaffPage,
    renderAddPersonalStaffPage,
    renderDashboardPage
};
