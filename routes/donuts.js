const express = require('express');
const router = express.Router();
const donutsController = require('../controllers/donuts');

router.get('/', donutsController.getAllDonuts);
router.get('/:id', donutsController.getDonutById);
router.post('/create', donutsController.create);
router.put('/:id', donutsController.updateDonutById);
router.delete('/:id', donutsController.deleteDonutById);

module.exports = router;