const OfficialJourneyService = require('./OfficialJourney.service');
const OfficialJourneyModel = require('./OfficialJourney.model')

const PersonalStaffModel = require('../personal-staff/PersonalStaff.model'); // Model dosyasının doğru yolunu ekleyin
const { saveJourneyStaff } = require('./OfficialJourney.service');

const addJourneyStaff = async (req, res) => {
    try {
        const { selectedStaff, journeyFrom, journeyTo, journeyAt, journeyReason } = req.body;

        // ID ile personeli bul
        const staffData = await PersonalStaffModel.findById(selectedStaff);
        if (!staffData) {
            return res.status(404).send('Seçilen personel bulunamadı');
        }
        console.log(staffData)

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
        console.log(newJourney)
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

const renderDashboardPage = (req, res) => {
    res.render('index', { user: req.user });
};

module.exports = {
    getAllJourneyPage,
    renderAllJourneyPage,
    renderDashboardPage,
    addJourneyStaff,
    renderAddJourneyPage
};
