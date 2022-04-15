const router = require('express').Router();

// Import routes
const all = require('./all');
const teamAll = require('./teamAll');
const getOne = require('./getOne');
const statusCode = require('./projectStatus');
const addMember = require('./addMember');


// Routes
router.use('/',all);
router.use('/team', teamAll)
router.use('/', getOne);
router.use('/status', statusCode);
router.use('/addPlayer', addMember);


module.exports = router;