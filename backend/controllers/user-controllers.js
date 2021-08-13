const multer = require('multer');
// const sharp = require();
const path = require('path');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const ErrorHandler = require('../utils/ErrorHandler');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../', '/images'));
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.user._id}-${Date.now()}.${ext}`);
  }
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new ErrorHandler('Not an image , Please upload only images', 400),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

module.exports.uploadUserPhoto = upload.single('photo');

module.exports.resizeUserPhoto = () => {};

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

module.exports.updateUserInfo = catchAsync(async (req, res, next) => {
  //1) create error if user post password data

  if (req.body.password || req.body.passwordConfirm) {
    return next(new ErrorHandler('This route is not for password update', 400));
  }

  const filteredBody = filterObj(req.body, 'firstName', 'email', 'lastName');

  console.log(filteredBody);

  if (req.file) {
    const photoName = req.file.filename;

    const url = `${req.protocol}://${req.get('host')}/images/${photoName}`;
    filteredBody.photo = url;
  }
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  console.log(updatedUser);

  res.status(200).json({
    status: 'success',
    user: updatedUser
  });
});

module.exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null
  });
});

module.exports.getUserData = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    user: req.user
  });
});
