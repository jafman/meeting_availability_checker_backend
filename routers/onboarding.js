const express = require('express');
const router = express.Router();
const controller = require('../controllers/onboarding');

router.post('/', controller.onboarding);


module.exports = router;