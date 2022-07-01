const router = require('express').Router();

// Import routes
const approvedTeam = require('./approvedTeam');
const teamInfo = require('./teamInfo');
const topProduct = require('./topProduct');


// Routes
router.use('/top', topProduct);
router.use('/', approvedTeam);
router.use('/', teamInfo);


module.exports = router;