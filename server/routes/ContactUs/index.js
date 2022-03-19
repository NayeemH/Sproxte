const router = require('express').Router();

// Authorization
const isAuth = require('../authenticate/isAuth');
const isAdmin = require('../authenticate/isAdmin');


// Import routes
const postInfo = require('./postInfo');
const getInfo = require('./getInfo');


// Routes
router.use('/', postInfo);
router.use('/', isAuth, isAdmin, getInfo);


module.exports = router;