const express = require('express');
const router = express.Router();
const tendikController = require('../controllers/tendikController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.post('/login', tendikController.loginTendik);
router.post('/registrasi-wajah', protect, tendikController.registrasiWajah);
router.post('/', protect, isAdmin, tendikController.createTendik);
router.get('/', protect, isAdmin, tendikController.getAllTendik);
router.get('/:id', protect, isAdmin, tendikController.getTendikById);
router.put('/:id', protect, isAdmin, tendikController.updateTendik);
router.delete('/:id', protect, isAdmin, tendikController.deleteTendik);

module.exports = router;