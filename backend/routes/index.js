const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/dashboard.html'));
});

router.get('/users', (req, res) => {
    res.redirect("/dashboard")
});

router.get('/all-personal-staff', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/all.html'));
});

router.get('/holidays', (req, res) => {
    res.send('Məzuniyyətlər');
});

router.get('/official-journeys', (req, res) => {
    res.send('Ezamiyyətlər');
});


// router.use('/categories', require('./categoryRoutes'));
// router.use('/specifications', require('./specificationRoutes'));

module.exports = router;
