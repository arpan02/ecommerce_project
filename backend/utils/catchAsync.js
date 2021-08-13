const catchAsync = func => {
  return (req, res, next) => {
    // func(req, res, next).catch(err => next(err));
    // pass function and it will called automatically with parameter the function receive
    func(req, res, next).catch(next);
  };
};

module.exports = catchAsync;
