const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser'); // Cookie-parser'ı içe aktar
const AuthRoutes = require('./modules/auth/Auth.routes');
const PersonalStaffRoutes = require('./modules/personal-staff/PersonalStaff.routes');
const AtHolidayRoutes = require('./modules/at-holiday/AtHoliday.routes');
const OfficialJourneyRoutes = require('./modules/official-journey/OfficialJourney.routes');
const authMiddleware = require('./middlewares/authMiddleware'); // Middleware'i içe aktar
const formatDate = require('./helpers/formatDate'); // Dosya yolunu kontrol et

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_STRING = process.env.MONGO_URL;
app.locals.formatDate = formatDate;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // URL encoded verileri işlemek için
app.use(cookieParser()); // Cookie-parser'ı middleware olarak ekle

mongoose.connect(MONGO_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log(`Databazaya uğurla bağlanıldı (${MONGO_STRING}).`))
    .catch(err => console.error('Databazaya bağlantı zamanı xəta baş verdi:', err));

// Middleware
app.use('^/assets', express.static('assets'));
app.set('view engine', 'ejs'); // EJS'yi view engine olarak ayarlıyoruz
app.set('views', __dirname + '/views'); // Görünüm dizinini ayarlıyoruz

app.use('/auth', AuthRoutes); // Auth rotalarını ekliyoruz

// Anasayfa rotasında yetkilendirme middleware'ini kullan
app.get('/', authMiddleware, (req, res) => {
    res.render('index', { user: req.user }); // Anasayfayı render ediyor
});
app.use('/personal-staff', authMiddleware, PersonalStaffRoutes);
app.use('/at-holiday', authMiddleware, AtHolidayRoutes);
app.use('/all-official-journey', authMiddleware, OfficialJourneyRoutes);

app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda işləyir.`);
});
