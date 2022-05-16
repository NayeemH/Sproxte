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
const getAllCategoryAndProductType = require('./getAllByAllCategory');


// Routes
router.use('/category', getAllByCategory);
router.use('/categoryAll', getAllCategoryAndProductType);
router.use('/', getOne);
router.use('/', getAll);
router.use('/', isAuth, isAdmin, create);
router.use('/', isAuth, isAdmin, updateOne);
router.use('/', isAuth, isAdmin, deleteOne);


module.exports = router;