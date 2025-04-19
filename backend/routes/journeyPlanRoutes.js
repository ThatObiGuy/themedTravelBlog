const express = require('express'); // Import express
const router = express.Router(); // Make a router
const journeyPlanController = require('../controllers/journeyPlanController'); // Import journeyPlan controller

router.get('/', journeyPlanController.retrieveJourneyPlans);
router.post('/', journeyPlanController.createJourneyPlan);
router.put('/:id', journeyPlanController.updateJourneyPlan);
router.delete('/:id', journeyPlanController.deleteJourneyPlan);

module.exports = router; // Export router