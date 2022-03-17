const router = require('express').Router();


// Import routes
const createOrder = require('./createOrder');
const addOrder = require('./addOrder');
const getOrder = require('./getOrder');


// Routes
router.use('/', createOrder);
router.use('/', addOrder);
router.use('/', getOrder);


module.exports = router;