const express = require('express');
const router = express.Router();
const presensiController = require('../controllers/presensiController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.post('/', presensiController.createPresensi);
router.get('/', protect, isAdmin, presensiController.getAllPresensi);
router.get('/laporan', protect, isAdmin, presensiController.getLaporanPresensi);
router.put('/:id_presensi', protect, isAdmin, presensiController.updateStatusByAdmin);
router.post('/manual', protect, isAdmin, presensiController.createManualPresensiByAdmin);
router.get('/user/:id_tendik', protect, presensiController.getPresensiByUserId);

module.exports = router;