const router = require('express').Router();


// Import routes
const getNotification = require('./getNotification');
const gurdianNotification = require('./getGurdianNotification');


// Routes
router.use('/', getNotification);
router.use('/gurdian', gurdianNotification);


module.exports = router;