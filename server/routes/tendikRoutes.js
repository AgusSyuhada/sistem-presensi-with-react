const express = require('express');
const router = express.Router();
const tendikController = require('../controllers/tendikController');

router.get('/', tendikController.getAllTendik);
router.get('/:id', tendikController.getTendikById);
router.post('/', tendikController.createTendik);
router.put('/:id', tendikController.updateTendik);
router.delete('/:id', tendikController.deleteTendik);

module.exports = router;