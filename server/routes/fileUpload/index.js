const router = require('express').Router();

const isAuth = require('../authenticate/isAuth');
const isAdmin = require('../authenticate/isAdmin')

const create = require('./create');
const getOne = require('./getOne');
const getAll = require('./getAll');
const update = require('./update');
const deleteOne = require('./delete');


router.use('/', create);
router.use('/', getOne);
router.use('/', getAll);
router.use('/', update);
router.use('/', deleteOne);


module.exports = router;