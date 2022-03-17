const router = require('express').Router();


// Import routes
const getNotification = require('./getNotification');


// Routes
router.use('/', getNotification);


module.exports = router;