const express = require('express');
const router = express.Router();
const presensiController = require('../controllers/presensiController');

router.get('/', presensiController.getAllPresensi);
router.get('/:id', presensiController.getPresensiById);
router.post('/', presensiController.createPresensi);
router.put('/:id', presensiController.updatePresensi);
router.delete('/:id', presensiController.deletePresensi);

module.exports = router;