const router = require('express').Router();
const authControllers = require('../../controllers/auth-controllers');
const bookingControllers = require('../../controllers/booking-controllers');

router.get(
  '/checkout-session/cartId',
  authControllers.isAuth,
  bookingControllers.getCheckOutSession
);

module.exports = router;
