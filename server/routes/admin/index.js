const router = require('express').Router();

// Import routes
const addIEP = require('./addIEP');
const getUser = require('./getUser');
const getIEP = require('./getIEP');
const deleteUser = require('./deleteUser');
const getDashboard = require('./getDashboard');


// Routes
router.use('/createIEP', addIEP);
router.use('/user', getUser);
router.use('/iep', getIEP);
router.use('/user', deleteUser);
router.use('/dashboard', getDashboard);


module.exports = router;