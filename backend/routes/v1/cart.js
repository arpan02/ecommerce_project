const router = require('express').Router();
const cartControllers = require('../../controllers/cart-controllers');
const authControllers = require('../../controllers/auth-controllers');

router.get(
  '/toggle-quantity',
  authControllers.isAuth,
  cartControllers.toggleQuantity
);

router
  .route('/')
  .get(authControllers.isAuth, cartControllers.getCart)
  .post(authControllers.isAuth, cartControllers.addToCart)
  .delete(authControllers.isAuth, cartControllers.removeFromCart);

module.exports = router;
