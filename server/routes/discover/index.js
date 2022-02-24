const router = require('express').Router();

// Import routes
const overview = require('./overview');
const getAll = require('./all');
const feature = require('./feature');
const popular = require('./popular');


// Routes
router.use('/', overview);
router.use('/', getAll);
router.use('/', feature);
router.use('/', popular);


module.exports = router;