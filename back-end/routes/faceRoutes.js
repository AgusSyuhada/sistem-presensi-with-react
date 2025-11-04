const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const { verifyLimiter } = require('../middleware/rateLimiter');
const { registerWajah, verifyPresensi } = require('../controllers/faceController');

const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Hanya file gambar yang diizinkan'));
        }
        cb(null, true);
    }
});

router.post('/register', protect, upload.single('foto'), registerWajah);

router.post('/verify', verifyLimiter, upload.single('foto'), verifyPresensi);

module.exports = router;