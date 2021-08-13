const router = require('express').Router();
const { isAuth, restrictTo } = require('../controllers/auth-controllers');
// for testing
router.get('/', isAuth, restrictTo('admin'), (req, res) => {
  res.json({ msg: 'hello' });
});

router.use('/v1', require('./v1'));

module.exports = router;
