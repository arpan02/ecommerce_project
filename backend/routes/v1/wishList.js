const router = require('express').Router();
const wishListControllers = require('../../controllers/wish-list-controllers');
const authControllers = require('../../controllers/auth-controllers');

router
  .route('/')
  .get(authControllers.isAuth, wishListControllers.getWishList)
  .post(authControllers.isAuth, wishListControllers.addToWishList);
// .delete(authControllers.isAuth, cartControllers.removeFromCart);

module.exports = router;
