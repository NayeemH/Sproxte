const router = require('express').Router();

// Import routes
const addIEP = require('./addIEP');
const getUser = require('./getUser');
const getIEP = require('./getIEP');
const deleteUser = require('./deleteUser');
const getDashboard = require('./getDashboard');
const adminOrder = require('./makeOrder');
const adminOrderPaid = require('./makeOrderPaid');


// Routes
router.use('/createIEP', addIEP);
router.use('/user', getUser);
router.use('/iep', getIEP);
router.use('/user', deleteUser);
router.use('/dashboard', getDashboard);
router.use('/order', adminOrder);
router.use('/orderPaid', adminOrderPaid);


module.exports = router;