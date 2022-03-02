const router = require('express').Router();
const isAuth = require('../authenticate/isAuth');

// Import routes
const login = require('./login');
const emailRegister = require('./emailRegister');
const refreshToken = require('./refreshToken');
const logout = require('./logout');
const resetPassword = require('./resetPassword');
const switchUserType = require('./switchUserType');


// Routes
router.use('/login',login);
router.use('/signup', emailRegister);
router.use('/refreshToken', refreshToken);
router.use('/resetPassword',resetPassword);
router.use('/logout', logout);
router.use('/switch', switchUserType);


module.exports = router;