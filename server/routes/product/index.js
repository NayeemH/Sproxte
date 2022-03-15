const router = require('express').Router();

// Import routes
const getOne = require('./getOne');

// Routes
router.use('/', getOne);

module.exports = router;