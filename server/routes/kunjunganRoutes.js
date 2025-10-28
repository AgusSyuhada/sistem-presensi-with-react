const express = require('express');
const router = express.Router();
const kunjunganController = require('../controllers/kunjunganController');
const { protect, isAdmin } = require('../middleware/authMiddleware'); // <-- Impor middleware

// Tamu (Publik) boleh membuat kunjungan baru
router.post('/', kunjunganController.createKunjungan);

// Hanya Admin (Operator) yang bisa melihat semua log tamu
router.get('/', protect, isAdmin, kunjunganController.getAllKunjungan);

// Hanya Admin (Operator) yang bisa melihat satu log tamu
router.get('/:id', protect, isAdmin, kunjunganController.getKunjunganById);

// Hanya Admin (Operator) yang bisa menghapus log tamu
router.delete('/:id', protect, isAdmin, kunjunganController.deleteKunjungan);

// (Kita asumsikan update tidak diperlukan untuk log tamu)
// router.put('/:id', protect, isAdmin, kunjunganController.updateKunjungan);

module.exports = router;