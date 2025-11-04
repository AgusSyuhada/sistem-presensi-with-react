const rateLimit = require('express-rate-limit');

const verifyLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10,
    message: {
        error: 'Terlalu banyak percobaan verifikasi. Coba lagi dalam 1 menit.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
        return req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    }
});

module.exports = { verifyLimiter };