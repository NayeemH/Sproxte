const router = require('express').Router();

// Import routes
const all = require('./all');
const getOne = require('./getOne');

// Routes
router.use('/',all);
router.use('/', getOne);

module.exports = router;