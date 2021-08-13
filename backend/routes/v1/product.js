const router = require('express').Router();

const productControllers = require('../../controllers/product-controllers');

// router.get(
//   '/get-product-by-categories',
//   productControllers.getProductByCategories
// );

router.get('/get-filters', productControllers.getFilters);

router.get('/get-filtered-products', productControllers.getFilteredProducts);

// router.get('/get-product-by-slug', productControllers.getProductBySlug);

router
  .route('/')
  .get(productControllers.getAllProduct)
  .post();

router
  .route('/:id')
  .get(productControllers.getProduct)
  .post()
  .patch()
  .delete();

module.exports = router;
