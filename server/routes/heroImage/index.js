const router = require('express').Router();

const isAuth = require('../authenticate/isAuth');
const isAdmin = require('../authenticate/isAdmin')

const uploadImage = require('./uploadImage');
const getImage = require('./getImage');


router.use('/', getImage);
router.use('/', isAuth, isAdmin, uploadImage);

module.exports = router;