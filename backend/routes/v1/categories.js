const router = require('express').Router();
const categoryControllers = require('../../controllers/categories.controllers');

router.route('/:id').get();

router.route('/').get(categoryControllers.getAllCategories);

router.get('/get-parent-categories', categoryControllers.getParentCategories);

router.get('/get-sub-categories/:id', categoryControllers.getSubCategories);

module.exports = router;
