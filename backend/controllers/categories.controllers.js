const Category = require('../models/Category');
const catchAsync = require('../utils/catchAsync');
const ApiFeatures = require('../utils/ApiFeatures');

module.exports.getAllCategories = catchAsync(async (req, res, next) => {
  let categories = new ApiFeatures(Category.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  categories = await categories.query;

  return res.status(200).json({
    status: 'success',
    data: {
      categories
    }
  });
});

module.exports.getParentCategories = catchAsync(async (req, res, next) => {
  if (req.query.id) {
    const categories = await Category.aggregate([
      {
        $project: {
          ancestor: { $slice: ['$ancestors', -1] },
          name: 1
        }
      }
    ]).limit(10);

    res.json(categories);
  }
  const categories = await Category.find({ parent: null })
    .select('name')
    .select('slug')
    .sort('name');

  res.status(200).json({
    status: 'success',
    categories
  });
});

module.exports.getSubCategories = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const subCategories = await Category.find({ parent: id }).sort('name');

  res.status(200).json({
    status: 'success',
    subCategories
  });
});
