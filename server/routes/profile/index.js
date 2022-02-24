const router = require('express').Router();

// Import routes
const getProfile = require('./getProfile');
const updateProfile = require('./updateProfile');

// Routes
router.use('/',getProfile);
router.use('/', updateProfile);

module.exports = router;