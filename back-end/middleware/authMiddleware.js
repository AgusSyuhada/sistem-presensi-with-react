const jwt = require('jsonwebtoken');
const pool = require('../db');
require('dotenv').config();

exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = decoded.user;

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

exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 1) {
        next();
    } else {
        res.status(403).json({ error: 'Akses ditolak. Memerlukan peran Admin.' });
    }
};