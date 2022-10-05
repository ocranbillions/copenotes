const express = require('express');
const validateEmail = require('./middleware');
const controller = require('./controller');

const router = express.Router();

router.get('/health', (req, res) => res.send('App is running successfully'));
router.post('/subscribe', validateEmail, controller);

module.exports = router;
