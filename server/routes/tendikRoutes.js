const express = require('express');
const router = express.Router();
const tendikController = require('../controllers/tendikController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// Rute Login (Publik)
router.post('/login', tendikController.loginTendik);

// Rute Registrasi Wajah (BARU)
// (Dilindungi, semua role yang login bisa akses)
router.post('/registrasi-wajah', protect, tendikController.registrasiWajah);

// ============================================
// MENERAPKAN MIDDLEWARE
// ============================================

// Hanya Admin (Operator) yang bisa membuat user baru
router.post('/', protect, isAdmin, tendikController.createTendik);

// Hanya Admin (Operator) yang bisa melihat semua user
router.get('/', protect, isAdmin, tendikController.getAllTendik);

// Hanya Admin (Operator) yang bisa melihat user by ID
router.get('/:id', protect, isAdmin, tendikController.getTendikById);

// Hanya Admin (Operator) yang bisa meng-update user
router.put('/:id', protect, isAdmin, tendikController.updateTendik);

// Hanya Admin (Operator) yang bisa menghapus user
router.delete('/:id', protect, isAdmin, tendikController.deleteTendik);

module.exports = router;