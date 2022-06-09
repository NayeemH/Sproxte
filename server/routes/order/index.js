const router = require('express').Router();

const isAuth = require('../authenticate/isAuth');

// Import routes
const createOrder = require('./createOrder');
const addOrder = require('./addOrder');
const getOrder = require('./getOrder');
const getOneOrder = require('./getOneOrder');
const getPlayerAddInfo = require('./getPlayerAddInfo');


// Routes
router.use('/', isAuth, createOrder);
router.use('/', isAuth,  addOrder);
router.use('/player', isAuth,  getPlayerAddInfo);
router.use('/', isAuth,  getOrder);
router.use('/', getOneOrder);


module.exports = router;