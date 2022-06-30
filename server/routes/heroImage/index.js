const router = require('express').Router();

const isAuth = require('../authenticate/isAuth');
const isAdmin = require('../authenticate/isAdmin')

const uploadImage = require('./uploadImage');
const getImage = require('./getImage');
const getAllImages = require('./getAllImage');


router.use('/', getImage);
router.use('/all', isAuth, isAdmin, getAllImages);
router.use('/', isAuth, isAdmin, uploadImage);

module.exports = router;