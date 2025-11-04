const express = require('express');
const router = express.Router();
const kunjunganController = require('../controllers/kunjunganController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.post('/', kunjunganController.createKunjungan);
router.get('/', protect, isAdmin, kunjunganController.getAllKunjungan);
router.get('/:id', protect, isAdmin, kunjunganController.getKunjunganById);
router.delete('/:id', protect, isAdmin, kunjunganController.deleteKunjungan);

module.exports = router;