const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const validator = require('validator');

const _loadsh = require('lodash');
const { promisify } = require('util');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const env = require('../config/environment');
const ErrorHandler = require('../utils/ErrorHandler');
const Email = require('./../utils/email');
const validateUtils = require('../utils/validate');

const createToken = id => {
  return jwt.sign({ _id: id }, env.jwt_secret, {
    expiresIn: '90d'
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = createToken(user._id);
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    data: {
      user,
      token
    }
  });
};

module.exports.register = catchAsync(async (req, res, next) => {
  let newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  };

  const errors = validateUtils.validateRegistration(newUser);
  if (!_loadsh.isEmpty(errors)) {
    console.log('here dude');
    return res.status(400).json({ errors });
  }

  const email = await User.findOne({ email: req.body.email });

  if (email) {
    console.log('here dude-------------------');
    console.log(email);
    errors.email = 'Email already exist';
    return res.status(400).json({ errors });
  }

  newUser = await User.create(newUser);

  const url = 'http://localhost:3000/profile';
  await new Email(newUser, url).sendWelcome();

  // const url = 'http://localhost:3000/profile';
  // await new Email(newUser, url).sendWelcome();
  return createSendToken(newUser, 201, res);
});

module.exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // check if email and password exist
  if (!email || !password) {
    return next(new ErrorHandler('Please Provide email and password', 400));
  }

  // check if user exist
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new ErrorHandler('Incorrect email or password', 401));
  }

  // const token = createToken(user._id);
  return createSendToken(user, 200, res);
});

module.exports.isAuth = catchAsync(async (req, res, next) => {
  let token;

  // 1) Getting token and check if it's there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorHandler('Please Login to get excess', 401));
  }

  // 2) Verify token
  const decodedToken = await promisify(jwt.verify)(token, env.jwt_secret);

  // 3) Check if user still exist
  const user = await User.findById(decodedToken._id);

  if (!user) {
    return next(
      new ErrorHandler('The user belongs to token no longer exist', 401)
    );
  }
  // 4) check if user change password after jwt was issued
  if (user.changePasswordAfter(decodedToken.iat)) {
    return next(
      new ErrorHandler(
        'User recently changed password, Please Login again',
        401
      )
    );
  }

  // allow access
  req.user = user;
  next();
});

module.exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new ErrorHandler(
          `You don't have permission to perform this action`,
          403
        )
      );
    next();
  };
};

module.exports.forgotPassword = catchAsync(async (req, res, next) => {
  if (!req.body.email) {
    return next(new ErrorHandler('Please Provide email address', 401));
  }

  //
  const user = await User.findOne({
    email: req.body.email
  });

  if (!validator.isEmail(req.body.email)) {
    return next(new ErrorHandler('Please provide valid email address', 400));
  }

  if (!user) {
    return next(
      new ErrorHandler('There is no user associated with email address', 404)
    );
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // const resetUrl = `${req.protocol}://${req.get(
  // 'host'
  // )}/api/v1/auth/reset-password/${resetToken}`;

  const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

  const message = `Forgot your password? Submit patch request with new password to: ${resetUrl}.\n if you didn't requested than ignore this message`;

  try {
    await new Email(user, resetUrl).send(
      'forgot_password',
      'Reset your password'
    );
    // await sendEmail({
    //   email: user.email,
    //   subject: 'your password reset token(valid for 10 min)',
    //   message
    // });
    res.status(200).json({
      status: 'success',
      message: 'Token to sent to mail'
    });
  } catch (error) {
    user.createPasswordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    console.log(error);
    return next(
      new ErrorHandler('Their is error in sending Message , Try again later'),
      500
    );
  }
});

module.exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) get the uer based on token
  console.log('here i am dude');
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  // 2) if tokens has not expired and there is user set the new password
  if (!user) {
    return next(new ErrorHandler('Token is invalid or has expired', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  // 3) update changedPassword at property for the user

  // better to insist user to login again

  return createSendToken(user, 201, res);
});

module.exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) get the user from the collection
  const user = await User.findById(req.user._id).select('+password');

  console.log(req.body);

  // 2) check if posted password is correct
  if (!(await user.checkPassword(req.body.passwordCurrent, user.password))) {
    return next(new ErrorHandler('Your current password is wrong', 401));
  }

  // 3) if so update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  return createSendToken(user, 200, res);
});
