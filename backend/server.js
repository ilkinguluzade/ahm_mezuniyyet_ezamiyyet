const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session'); // express-session'ı ekleyin

const AuthRoutes = require('./modules/auth/Auth.routes');
const PersonalStaffRoutes = require('./modules/personal-staff/PersonalStaff.routes');
const DashboardRoutes = require('./modules/dashboard/Dashboard.routes');
const AtHolidayRoutes = require('./modules/at-holiday/AtHoliday.routes');
const OfficialJourneyRoutes = require('./modules/official-journey/OfficialJourney.routes');
const authMiddleware = require('./middlewares/authMiddleware');
const logoutMiddleware = require('./middlewares/logoutMiddleware');
const formatDate = require('./helpers/formatDate');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_STRING = process.env.MONGO_URL;
app.locals.formatDate = formatDate;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// express-session yapılandırması
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'secret-key', // Güvenlik için environment variable kullanın
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false } // true yapmanız için https üzerinden çalıştırmanız gerekir
    })
);

mongoose.connect(MONGO_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log(`Databazaya uğurla bağlanıldı (${MONGO_STRING}).`))
    .catch(err => console.error('Databazaya bağlantı zamanı xəta baş verdi:', err));

// Middleware
app.use('^/assets', express.static('assets'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Routes
app.use('/auth', AuthRoutes);
app.use('/personal-staff', authMiddleware, PersonalStaffRoutes);
app.use('/', authMiddleware, DashboardRoutes);
app.use('/at-holiday', authMiddleware, AtHolidayRoutes);
app.use('/all-official-journey', authMiddleware, OfficialJourneyRoutes);
app.use('/logout', logoutMiddleware);

app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda işləyir.`);
});
