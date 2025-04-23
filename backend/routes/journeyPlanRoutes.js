const express = require('express'); // Import express
const router = express.Router(); // Make a router
const journeyPlanController = require('../controllers/journeyPlanController'); // Import journeyPlan controller

router.get('/:user_id', journeyPlanController.retrieveJourneyPlans);
router.post('/:user_id', journeyPlanController.createJourneyPlan);
router.put('/:plan_id', journeyPlanController.updateJourneyPlan);
router.delete('/:plan_id', journeyPlanController.deleteJourneyPlan);

module.exports = router; // Export router