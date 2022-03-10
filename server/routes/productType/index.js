const router = require('express').Router();

const isAuth = require('../authenticate/isAuth');
const isAdmin = require('../authenticate/isAdmin');

// Import routes
const getOne = require('./getOne');
const getAll = require('./getAll');
const getAllByCategory = require('./getAllByCategory');
const create = require('./create');
const updateOne = require('./update');
const deleteOne = require('./delete');


// Routes
router.use('/', getOne);
router.use('/', getAll);
router.use('/category', getAllByCategory);
router.use('/', isAuth, isAdmin, create);
router.use('/', isAuth, isAdmin, updateOne);
router.use('/', isAuth, isAdmin, deleteOne);


module.exports = router;