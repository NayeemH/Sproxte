const router = require('express').Router();

// Import routes
const addIEP = require('./addIEP');

// Routes
router.use('/createIEP', addIEP);

module.exports = router;