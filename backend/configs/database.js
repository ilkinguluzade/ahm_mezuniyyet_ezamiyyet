const mongoose = require('mongoose');
const dotenv = require("dotenv");
const MONGO_STRING = process.env.MONGO_URL;
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log(`Databazaya uğurla qoşuldu (${process.env.MONGO_URL})`))
    .catch(err => console.error('Databazaya qoşulma zamanı xəta baş verdi:', err));

module.exports = mongoose;
