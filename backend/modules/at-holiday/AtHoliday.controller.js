const AtHolidayService = require('./AtHoliday.service');
const AtHolidayModel = require('./AtHoliday.model')

const PersonalStaffModel = require('../personal-staff/PersonalStaff.model'); // Model dosyasının doğru yolunu ekleyin
const { saveHolidayStaff } = require('./AtHoliday.service');

const addHolidayStaff = async (req, res) => {
    try {
        const { selectedStaff, holidayFrom, holidayTo, holidayAt, note } = req.body;

        // ID ile personeli bul
        const staffData = await PersonalStaffModel.findById(selectedStaff);
        if (!staffData) {
            return res.status(404).send('Seçilen personel bulunamadı');
        }

        // Tatil kaydını oluştur
        const newHoliday = new AtHolidayModel({
            name: staffData.name,
            surname: staffData.surname,
            fatherName: staffData.fatherName,
            rank: staffData.rank,
            oppoletNumber: staffData.oppoletNumber,
            division: staffData.division,
            holidayFrom,
            holidayTo,
            holidayAt,
            note,
        });

        await newHoliday.save();
        res.redirect('/at-holiday/all-staff');  // Başarılı kayıttan sonra yönlendirme
    } catch (error) {
        console.error(error);
        res.status(500).send('Bir hata oluştu');
    }
};

const renderAddHolidayPage = async (req, res) => {
    try {
        const personalStaff = await PersonalStaffModel.find({});
        res.render('add-holiday', { personalStaff, user: req.user }); // personalStaff listesini ve user bilgisini şablona gönderin
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Bir hata oluştu.');
    }
};


const getAllAtHolidayPersonalStaff = async (req, res) => {
    try {
        const atHolidayPersonalStaff = await AtHolidayModel.find({});
        res.render('all-staff', { atHolidayPersonalStaff });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Xəta baş verdi.');
    }
};


// Sayfa render işlemleri
const renderAllAtHolidayPersonalStaffPage = (req, res) => {
    res.render('at-holiday');
};


const renderDashboardPage = (req, res) => {
    res.render('index', { user: req.user });
};

module.exports = {
    getAllAtHolidayPersonalStaff,
    renderAllAtHolidayPersonalStaffPage,
    renderAddHolidayPage,
    renderDashboardPage,
    addHolidayStaff
};
