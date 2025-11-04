const express = require('express');
const router = express.Router();
const jabatanController = require('../controllers/jabatanController');

router.get('/', jabatanController.getAllJabatan);
router.get('/:id', jabatanController.getJabatanById);
router.post('/', jabatanController.createJabatan);
router.put('/:id', jabatanController.updateJabatan);
router.delete('/:id', jabatanController.deleteJabatan);

module.exports = router;