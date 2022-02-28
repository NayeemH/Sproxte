const router = require('express').Router();

const isCoach = require('../authenticate/isCoach');

// Import routes
const getOne = require('./getOne');
const getAll = require('./getAll');
const create = require('./create');
const updateOne = require('./update');
const deleteOne = require('./delete');


// Routes
router.use('/', isCoach(true), getOne);
router.use('/', isCoach(true), getAll);
router.use('/', isCoach(false),create);
router.use('/', isCoach(false), updateOne);
router.use('/', isCoach(false), deleteOne);


module.exports = router;