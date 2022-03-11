const router = require('express').Router();


// Import routes
const createOrder = require('./createOrder');
const addOrder = require('./addOrder');


// Routes
router.use('/', createOrder);
router.use('/', addOrder);


module.exports = router;