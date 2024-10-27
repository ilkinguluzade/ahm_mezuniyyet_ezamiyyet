const jwt = require('jsonwebtoken');
const User = require('../modules/user/User.model'); // Kullanıcı modelini içe aktar

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token; // Çerezden JWT'yi alıyoruz
    if (!token) {
        return res.status(401).redirect('/auth/login'); // Token yoksa giriş sayfasına yönlendir
    }

    try {
        // Token'ı doğrula
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Kullanıcı bilgilerini req.user'a ata

        // Kullanıcı bilgilerini veritabanından al
        const user = await User.findById(decoded.id);
        req.user.username = user.username; // Kullanıcı adını req.user'a ekle
        req.user.role = user.role;
        console.log(req.user)
        next(); // Bir sonraki middleware veya rota işleyicisine geç
    } catch (error) {
        return res.status(403).redirect('/auth/login'); // Token geçersizse giriş sayfasına yönlendir
    }
};

module.exports = authMiddleware;
