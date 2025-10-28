const express = require('express');
const router = express.Router();
const presensiController = require('../controllers/presensiController');
const { protect, isAdmin } = require('../middleware/authMiddleware'); // Impor middleware

// ============================================
// RUTE PUBLIK (Sesuai Use Case Diagram)
// ============================================

// Endpoint utama untuk guru melakukan presensi (masuk/pulang)
// Tanpa 'protect', karena validasi menggunakan Wajah + Geofence
router.post('/', presensiController.createPresensi);


// ============================================
// RUTE KHUSUS ADMIN (Operator)
// ============================================

// Admin: Melihat semua data presensi
router.get('/', protect, isAdmin, presensiController.getAllPresensi);

// Admin: Membuat Laporan (KF-ADM-04)
router.get('/laporan', protect, isAdmin, presensiController.getLaporanPresensi);

// Admin: Mengubah status presensi menjadi Sakit/Izin (KF-ADM-02)
router.put('/:id_presensi', protect, isAdmin, presensiController.updateStatusByAdmin);

// Admin: MEMBUAT presensi manual Sakit/Izin (BARU)
router.post('/manual', protect, isAdmin, presensiController.createManualPresensiByAdmin);


module.exports = router;