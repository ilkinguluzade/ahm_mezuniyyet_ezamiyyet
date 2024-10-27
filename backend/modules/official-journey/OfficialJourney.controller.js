const OfficialJourneyService = require('./OfficialJourney.service');
const OfficialJourneyModel = require('./OfficialJourney.model')

const PersonalStaffModel = require('../personal-staff/PersonalStaff.model'); // Model dosyasının doğru yolunu ekleyin
const { saveJourneyStaff } = require('./OfficialJourney.service');
const {
    getAllPersonalStaffCount,
    getAllAtHolidayPersonStaffCount,
    getAllOfficialJourneyPersonCount,
    getLast5AtHolidayList,
    getLast5MustComeFromHolidayList,
    getNext5MustReturnTomorrow
} = require("../dashboard/Dashboard.controller");

const addJourneyStaff = async (req, res) => {
    try {
        const { selectedStaff, journeyFrom, journeyTo, journeyAt, journeyReason } = req.body;

        // ID ile personeli bul
        const staffData = await PersonalStaffModel.findById(selectedStaff);
        if (!staffData) {
            return res.status(404).send('Seçilen personel bulunamadı');
        }

        // Tatil kaydını oluştur
        const newJourney = new OfficialJourneyModel({
            name: staffData.name,
            surname: staffData.surname,
            fatherName: staffData.fatherName,
            rank: staffData.rank,
            oppoletNumber: staffData.oppoletNumber,
            division: staffData.division,
            journeyFrom,
            journeyTo,
            journeyAt,
            journeyReason,
        });
        await newJourney.save();
        res.redirect('/all-official-journey/all-journey');  // Başarılı kayıttan sonra yönlendirme
    } catch (error) {
        console.error(error);
        res.status(500).send('Bir hata oluştu');
    }
};

const renderAddJourneyPage = async (req, res) => {
    try {
        const personalStaff = await PersonalStaffModel.find({});
        res.render('add-journey', { personalStaff, user: req.user }); // personalStaff listesini ve user bilgisini şablona gönderin
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Bir hata oluştu.');
    }
};


const getAllJourneyPage = async (req, res) => {
    try {
        const atJourneyPersonalStaff = await OfficialJourneyModel.find({});
        res.render('all-journey', { atJourneyPersonalStaff });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Xəta baş verdi.');
    }
};


// Sayfa render işlemleri
const renderAllJourneyPage = (req, res) => {
    res.render('all-official-journey', { user: req.user });
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
    getAllJourneyPage,
    renderAllJourneyPage,
    renderDashboardPage,
    addJourneyStaff,
    renderAddJourneyPage
};
