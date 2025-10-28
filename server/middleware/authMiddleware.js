const jwt = require('jsonwebtoken');
const pool = require('../db');
require('dotenv').config();

/**
 * Middleware untuk memverifikasi token JWT.
 * Ini akan mengambil token dari header 'Authorization',
 * memverifikasinya, dan menambahkan data user (dari payload token)
 * ke objek 'req' agar bisa digunakan oleh controller selanjutnya.
 */
exports.protect = async (req, res, next) => {
    let token;

    // Token biasanya dikirim di header seperti ini: "Bearer <token>"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 1. Ambil token dari header
            token = req.headers.authorization.split(' ')[1];

            // 2. Verifikasi token menggunakan secret key Anda
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Ambil payload 'user' dari token (yang kita buat saat login)
            //    dan tambahkan ke 'req.user'
            req.user = decoded.user;

            // 4. Lanjutkan ke fungsi controller berikutnya
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ error: 'Tidak terotorisasi, token gagal.' });
        }
    }

    if (!token) {
        res.status(401).json({ error: 'Tidak terotorisasi, tidak ada token.' });
    }
};

/**
 * Middleware untuk mengecek apakah user adalah Admin (Operator).
 * HARUS digunakan SETELAH middleware 'protect'.
 */
exports.isAdmin = (req, res, next) => {
    // Kita asumsikan id_jabatan 1 adalah 'Operator' (Admin)
    // Sesuai data dummy Anda.
    if (req.user && req.user.role === 1) {
        next();
    } else {
        res.status(403).json({ error: 'Akses ditolak. Memerlukan peran Admin.' });
    }
};