// const ErrorHandler = require('../utils/ErrorHandler');
const mongoose = require('mongoose');
const catchAsync = require('../utils/catchAsync');
const WishList = require('../models/WhishList');

module.exports.addToWishList = catchAsync(async (req, res, next) => {
  let { productId } = req.body;

  const { user } = req;

  productId = mongoose.Types.ObjectId(productId);

  let wishList = await WishList.findOne({ user: user });

  if (wishList) {
    wishList = await WishList.updateOne({
      user: user._id,
      $addToSet: { wishListItems: productId }
    });
  } else {
    wishList = await WishList.create({
      user: user._id,
      wishListItems: [productId]
    });
  }

  res.status(200).json({
    status: 'success',
    wishList
  });
});

module.exports.getWishList = catchAsync(async (req, res, next) => {
  const { user } = req;
  const wishList = await WishList.findOne({ user: user._id })
    .populate('wishListItems')
    .exec();

  res.status(200).json({
    status: 'success',
    wishList
  });
});

module.exports.deleteItem = catchAsync(async (req, res, next) => {});
