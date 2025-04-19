const express = require('express'); // Import express
const router = express.Router(); // Make a router
const travelLogController = require('../controllers/travelLogController'); // Import travelLog controller

router.get('/', travelLogController.retrieveTravelLogs);
router.post('/', travelLogController.createTravelLog);
router.put('/:id', travelLogController.updateTravelLog);
router.delete('/:id', travelLogController.deleteTravelLog);

module.exports = router; // Export router
