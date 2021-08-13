const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/user', require('./user'));
router.use('/product', require('./product'));
router.use('/categories', require('./categories'));
router.use('/cart', require('./cart'));
router.use('/bookings', require('./booking'));
router.use('/wish-list', require('./wishList'));

module.exports = router;
