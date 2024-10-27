const AuthService = require('./Auth.service');

const register = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const result = await AuthService.registerUser(username, password, role);
        return res.status(201).json({ token: result.token, message: result.message });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await AuthService.loginUser(username, password);
        res.cookie('token', result.token, { httpOnly: true });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return res.render('login', { error: error.message });
    }
};



const renderRegisterPage = (req, res) => {
    res.render('register');
};
const renderLoginPage = (req, res) => {
    res.render('login');
};

module.exports = {
    register,
    login,
    renderRegisterPage,
    renderLoginPage,
};
