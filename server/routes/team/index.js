const router = require('express').Router();

// Import routes
const approvedTeam = require('./approvedTeam');
const teamInfo = require('./teamInfo');


// Routes
router.use('/', approvedTeam);
router.use('/', teamInfo);


module.exports = router;