const express = require('express');
const router = express.Router();
const controller = require('../controllers/meeting');

router.post('/', controller.meeting);


module.exports = router;