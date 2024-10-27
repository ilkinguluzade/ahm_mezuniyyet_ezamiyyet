const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../user/User.model');

const registerUser = async (username, password, role) => {
    if (!username || !password) {
        throw new Error('İstifadəçi adı və şifrə vacibdir.');
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new Error('Bu istifadəçi adı istifadə olunur.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        username,
        password: hashedPassword,
        role
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { token, message: 'Uğurla qeydiyyatdan keçdiniz!' };
};

const loginUser = async (username, password) => {
    if (!username || !password) {
        throw new Error('İstifadəçi adı və şifrə vacibdir.');
    }

    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('İstifadəçi adı və ya şifrə yanlışdır.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('İstifadəçi adı və ya şifrə yanlışdır.');
    }

    const token = jwt.sign({ id: user._id, role:user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { token, message: 'Uğurlu giriş!' };
};

module.exports = {
    registerUser,
    loginUser,
};
