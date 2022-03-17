const router = require('express').Router();

// Import routes
const all = require('./all');
const getOne = require('./getOne');
const statusCode = require('./projectStatus');


// Routes
router.use('/',all);
router.use('/', getOne);
router.use('/status', statusCode);


module.exports = router;