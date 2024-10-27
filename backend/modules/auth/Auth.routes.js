const express = require('express');
const router = express.Router();
const AuthController = require('./Auth.controller');

router.get('/register', AuthController.renderRegisterPage);
router.get('/login', AuthController.renderLoginPage);

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;
