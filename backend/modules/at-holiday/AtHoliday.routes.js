const express = require('express');
const router = express.Router();
const AtHolidayController = require('./AtHoliday.controller');
const AtHolidayModel = require('./AtHoliday.model');
const PersonalStaffModel = require('../personal-staff/PersonalStaff.model');
const authMiddleware = require('../../middlewares/authMiddleware');

// Tüm personeli JSON olarak döndürmek için /all-staff rotası
router.get('/all-staff', authMiddleware, async (req, res) => {
    try {
        const personalStaff = await AtHolidayModel.find({});
        res.render('at-holiday', { personalStaff, user: req.user }); // `user` bilgisini şablona ekleyin
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Bir hata oluştu.');
    }
});

// PersonalStaff.routes.js

router.get('/add-holiday', authMiddleware, async (req, res) => {
    try {
        const personalStaff = await PersonalStaffModel.find({});
        res.render('add-personal-staff', { personalStaff, user: req.user }); // `personalStaff` ve `user` bilgisini şablona ekleyin
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Bir hata oluştu.');
    }
});


router.get('/at-holiday', authMiddleware, AtHolidayController.renderAllAtHolidayPersonalStaffPage);
// router.get('/add-holiday', authMiddleware, AtHolidayController.renderAddHolidayPage);
router.get('/add-staff', authMiddleware, AtHolidayController.renderAddHolidayPage);
router.post('/add-staff', authMiddleware, AtHolidayController.addHolidayStaff);
router.get('/', authMiddleware, AtHolidayController.renderDashboardPage);

module.exports = router;
