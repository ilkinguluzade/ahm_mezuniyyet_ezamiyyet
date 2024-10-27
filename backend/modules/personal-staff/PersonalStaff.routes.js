const express = require('express');
const router = express.Router();
const PersonalStaffController = require('./PersonalStaff.controller');
const PersonalStaffModel = require('./PersonalStaff.model');
const authMiddleware = require('../../middlewares/authMiddleware');

// Tüm personeli JSON olarak döndürmek için /all-staff rotası
router.get('/all-staff', authMiddleware, async (req, res) => {
    try {
        const personalStaff = await PersonalStaffModel.find({});
        res.render('all-personal-staff', { personalStaff, user: req.user }); // `user` bilgisini şablona ekleyin
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Bir hata oluştu.');
    }
});

// Yeni personel ekleme rotası
router.post('/add', authMiddleware, PersonalStaffController.addPersonalStaff);

// Sayfa render işlemleri için rotalar
router.get('/add-staff', authMiddleware, PersonalStaffController.renderAddPersonalStaffPage);
router.get('/', authMiddleware, PersonalStaffController.renderDashboardPage);
router.get('/all-personal-staff', authMiddleware, PersonalStaffController.renderAllPersonalStaffPage);

module.exports = router;
