const router = require('express').Router();

// Import routes
const resetPassword = require('./resetPassword');
const emailActivate = require('./emailActivate');

// Routes
router.use('/', emailActivate);
router.use('/resetPassword', resetPassword);


module.exports = router;