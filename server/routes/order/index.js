const router = require('express').Router();


// Import routes
const createOrder = require('./createOrder');
const addOrder = require('./addOrder');
const getOrder = require('./getOrder');
const getOneOrder = require('./getOneOrder');


// Routes
router.use('/', createOrder);
router.use('/', addOrder);
router.use('/', getOrder);
router.use('/', getOneOrder);


module.exports = router;