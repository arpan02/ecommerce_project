const stripe = require('stripe')('sk_test_B0A3pFojx2jIReTmcZai4ceB009RqOA9C6');
const { v4: uuid } = require('uuid');
const catchAsync = require('../utils/catchAsync');
const Cart = require('../models/Cart');

// implement later
module.exports.getCheckOutSession = catchAsync(async (req, res, next) => {
  // get current cart
  // stripe;
  // token can contain anything from front end
  const { token, product, cart } = req.body;
  const idempotencyKey = uuid();

  // return stripe.customers.create();
});
