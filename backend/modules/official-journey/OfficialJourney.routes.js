const express = require('express');
const router = express.Router();
const OfficialJourneyController = require('./OfficialJourney.controller');
const OfficialJourneyModel = require('./OfficialJourney.model');
const authMiddleware = require('../../middlewares/authMiddleware');


router.get('/all-journey', authMiddleware, async (req, res) => {
    try {
        const personalStaff = await OfficialJourneyModel.find({});
        res.render('all-official-journey', { personalStaff, user: req.user }); // `user` bilgisini şablona ekleyin
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Bir hata oluştu.');
    }
});


router.get('/all-journey', authMiddleware, OfficialJourneyController.renderAllJourneyPage);
router.post('/add-journey', authMiddleware, OfficialJourneyController.addJourneyStaff);

// Sayfa render işlemleri için rotalar
router.get('/add-journey', authMiddleware, OfficialJourneyController.renderAddJourneyPage);
router.get('/', authMiddleware, OfficialJourneyController.renderDashboardPage);

module.exports = router;
