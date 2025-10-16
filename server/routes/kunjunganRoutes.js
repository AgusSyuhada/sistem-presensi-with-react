const express = require('express');
const router = express.Router();
const kunjunganController = require('../controllers/kunjunganController');

router.get('/', kunjunganController.getAllKunjungan);
router.get('/:id', kunjunganController.getKunjunganById);
router.post('/', kunjunganController.createKunjungan);
router.put('/:id', kunjunganController.updateKunjungan);
router.delete('/:id', kunjunganController.deleteKunjungan);

module.exports = router;