const router = require('express').Router();

// Import routes
const getOne = require('./getOne');
const addCollection = require('./addCollection');
const addFeedback = require('./addFeedback');
const approveProduct = require('./approveProduct');
const deleteFeedback = require('./deleteFeedback');
const updateFeedback = require('./updateFeedback');

// Routes
router.use('/', getOne);
router.use('/collection', addCollection);
router.use('/feedback', addFeedback);
router.use('/approve', approveProduct);
router.use('/feedback', deleteFeedback);
router.use('/feedback', updateFeedback);


module.exports = router;