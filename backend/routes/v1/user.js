const router = require('express').Router();
const userControllers = require('../../controllers/user-controllers');
const { isAuth } = require('../../controllers/auth-controllers');

router.patch(
  '/update-user',
  isAuth,
  userControllers.uploadUserPhoto,
  userControllers.updateUserInfo
);

router.delete('/delete-user', isAuth, userControllers.deleteUser);

router
  .route('/')
  .get(isAuth, userControllers.getUserData)
  .patch(isAuth, userControllers.uploadUserPhoto);

module.exports = router;
