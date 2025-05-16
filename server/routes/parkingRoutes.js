const express = require('express');
const router = express.Router();
const controller = require('../controllers/parkingController');

router.post('/entry', controller.entry);
router.post('/exit', controller.exit);
router.get('/getTypes', controller.vehicleTypes);
router.get('/report', controller.report);

module.exports = router;
