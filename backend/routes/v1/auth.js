const router = require('express').Router();
const authControllers = require('../../controllers/auth-controllers');

router.post('/register', authControllers.register);
router.post('/login', authControllers.login);
router.post('/forgot-password', authControllers.forgotPassword);
router.post('/reset-password/:token', authControllers.resetPassword);
router.patch(
  '/update-password',
  authControllers.isAuth,
  authControllers.updatePassword
);
module.exports = router;
