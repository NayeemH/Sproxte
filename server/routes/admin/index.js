const router = require('express').Router();

// Import routes
const addIEP = require('./addIEP');
const getUser = require('./getUser');
const getIEP = require('./getIEP');
const deleteUser = require('./deleteUser');

// Routes
router.use('/createIEP', addIEP);
router.use('/user', getUser);
router.use('/iep', getIEP);
router.use('/user', deleteUser);


module.exports = router;