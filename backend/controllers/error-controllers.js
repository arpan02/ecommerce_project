const env = require('../config/environment');
const ErrorHandler = require('../utils/ErrorHandler');

const HandleDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err
  });
};

const handleCastError = err => {
  const message = `Invalid ${err.path}:${err.value}`;
  return new ErrorHandler(message, 400);
};

const handleJwtError = () => new ErrorHandler('Invalid token', 401);

const handleJwtExpirerError = () => new ErrorHandler('Token expired', 401);

const HandleDuplicateField = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value:${value}`;
  return new ErrorHandler(message, 400);
};

const handleValidationError = err => {
  // const errors = Object.values(err.errors).map(el => el.message);
  // will fix the alogrithm later
  const errors = Object.keys(err.errors);
  const obj = {};
  let e;
  for (e of errors) {
    obj[e] = err.errors[e].properties.message;
  }
  const message = 'Invalid Data';
  return new ErrorHandler(message, 400, obj);
};

const HandleProductionError = (err, res) => {
  if (err.isOperational) {
    console.log(err);
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      data: err.data
    });
  } else {
    // Unknown error

    res.status(500).json({
      status: 'error',
      message: 'Something went wrong try again'
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // console.log('here');
  console.log(err);

  if (env.name === 'development') {
    HandleDevError(err, res);
  } else if (env.name === 'production') {
    let error = err;
    // do later
    // let error = { ...err };

    if (error.name === 'CartError') {
      error = handleCastError(error);
    }

    if (err.code === 11000) {
      error = HandleDuplicateField(error);
    }

    if (error.name === 'ValidationError') {
      error = handleValidationError(error);
    }

    if (error.name === 'JsonWebTokenError') {
      error = handleJwtError(error);
    }

    if (error.name === 'TokenExpiredError') {
      error = handleJwtExpirerError(error);
    }

    HandleProductionError(error, res);
  }
};
