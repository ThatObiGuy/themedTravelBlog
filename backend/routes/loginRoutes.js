const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Login routes
router.post('/', loginController.loginUser);
router.get('/:id', loginController.getUserDetails);


module.exports = router;