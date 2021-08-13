const Product = require('../models/Product');
const catchAsync = require('../utils/catchAsync');

module.exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      product
    }
  });
});

function getQuery(
  slug,
  child,
  slugs,
  allSlugs,
  skip,
  limit,
  brands,
  priceRange
) {
  const aggregateArray = [
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'categories'
      }
    },
    {
      $match: {
        $or: [
          {
            $and: [
              {
                'categories.slug': child
              },
              {
                'categories.0.ancestors.slug': { $in: slugs }
              }
            ]
          },
          {
            'categories.0.ancestors.slug': { $all: allSlugs }
          }
        ]
      }
    },
    {
      $project: {
        name: 1,
        brand: 1,
        retail_price: 1,
        image: 1,
        discounted_price: 1,
        categories: 1,
        category: 1
      }
    },
    {
      $facet: {
        products: [{ $skip: skip }, { $limit: limit }],
        count: [
          {
            $count: 'totalCount'
          }
        ]
      }
    }
  ];

  if (slugs.length === 0) {
    aggregateArray[1] = {
      $match: {
        $or: [
          { 'categories.slug': slug },
          { 'categories.0.ancestors.slug': slug }
        ]
      }
    };
  }

  let isBrand = false;

  if (Array.isArray(brands) && brands.length > 0) {
    const temp = {
      $match: {
        brand: { $in: brands }
      }
    };
    aggregateArray.splice(2, 0, temp);
    isBrand = true;
  }

  if (priceRange !== null && typeof priceRange === 'object') {
    if (!priceRange.min && !priceRange.max) {
      return aggregateArray;
    }
    const temp = {
      $match: {
        discounted_price: { $gte: priceRange.min, $lte: priceRange.max }
      }
    };

    if (isBrand) {
      aggregateArray.splice(3, 0, temp);
    } else {
      aggregateArray.splice(2, 0, temp);
    }
  }

  return aggregateArray;
}

module.exports.getAllProduct = catchAsync(async (req, res, next) => {
  let { brands, priceRange } = req.query;
  const { slug } = req.query;
  let { page, limit } = req.query;
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const slugs = slug.split('/');
  const child = slugs[slugs.length - 1];
  slugs.pop();
  const allSlugs = slug.split('/');

  const skip = (page - 1) * limit;
  if (brands) {
    brands = JSON.parse(brands);
  }
  if (priceRange) {
    priceRange = JSON.parse(priceRange);
  }
  // console.log('slug-->', slug);
  // console.log('child-->', child);
  // console.log('slugs-->', slugs);
  // console.log('allSlugs-->', allSlugs);
  // console.log('skip-->', skip);
  // console.log('limit-->', limit);
  // console.log('brands-->', brands);
  // console.log('priceRange-->', priceRange);
  // console.log('-----------------------------------');
  const query = Product.aggregate(
    getQuery(slug, child, slugs, allSlugs, skip, limit, brands, priceRange)
  );

  const result = await query;

  const { products } = result[0];
  let { count } = result[0];

  if (count[0]) {
    count = count[0].totalCount;
  } else {
    count = 0;
  }

  //
  return res.status(200).json({
    status: 'success',
    products,
    count
  });
});

module.exports.getFilters = catchAsync(async (req, res, next) => {
  const { slug } = req.query;

  const slugs = slug.split('/');
  const child = slugs[slugs.length - 1];
  slugs.pop();
  const allSlugs = slug.split('/');

  let query;
  // console.log(slug);
  // console.log(allSlugs);

  if (slug && slugs.length >= 1) {
    console.log('here dude');
    query = await Product.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'categories'
        }
      },
      {
        $match: {
          $or: [
            {
              $and: [
                {
                  'categories.slug': child
                },
                {
                  'categories.0.ancestors.slug': { $in: slugs }
                }
              ]
            },
            {
              'categories.0.ancestors.slug': { $all: allSlugs }
            }
          ]
        }
      },
      {
        $facet: {
          price: [
            {
              $sort: { discounted_price: -1 }
            },
            {
              $project: {
                discounted_price: 1
              }
            },
            {
              $limit: 1
            }
          ],
          brands: [
            {
              $match: {
                brand: { $ne: null }
              }
            },
            {
              $group: {
                _id: '$brand'
              }
            }
          ]
        }
      }
    ]);
  } else {
    query = await Product.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'categories'
        }
      },
      {
        $match: {
          $or: [
            { 'categories.slug': slug },
            { 'categories.0.ancestors.slug': slug }
          ]
        }
      },
      {
        $facet: {
          price: [
            {
              $sort: { discounted_price: -1 }
            },
            {
              $project: {
                discounted_price: 1
              }
            },
            {
              $limit: 1
            }
          ],
          brands: [
            {
              $match: {
                brand: { $ne: null }
              }
            },
            {
              $group: {
                _id: '$brand'
              }
            }
          ]
        }
      }
    ]);
  }

  let maxPrice = query[0].price[0];

  if (maxPrice) {
    maxPrice = maxPrice.discounted_price;
  } else {
    maxPrice = null;
  }
  const { brands } = query[0];

  res.status(200).json({
    status: 'success',
    maxPrice,
    brands
    // query
  });
});

module.exports.getFilteredProducts = catchAsync(async (req, res, next) => {
  const { slug } = req.query;
  let { brands, priceRange } = req.query;

  let query;
  if (brands) {
    brands = JSON.parse(brands);
  }

  if (priceRange) {
    priceRange = JSON.parse(priceRange);
  }

  const slugs = slug.split('/');
  const child = slugs[slugs.length - 1];
  slugs.pop();
  const allSlugs = slug.split('/');

  if (slug && slugs.length >= 2) {
    if (brands.length > 0) {
      query = await Product.aggregate([
        {
          $lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'categories'
          }
        },
        {
          $match: {
            $or: [
              {
                $and: [
                  {
                    'categories.slug': child
                  },
                  {
                    'categories.0.ancestors.slug': { $in: slugs }
                  }
                ]
              },
              {
                'categories.0.ancestors.slug': { $all: allSlugs }
              }
            ]
          }
        },
        {
          $match: {
            brand: { $in: brands }
          }
        },
        {
          $match: {
            discounted_price: { $gt: priceRange.min, $lt: priceRange.max }
          }
        },
        {
          $facet: {
            products: [
              {
                $project: {
                  brand: 1,
                  name: 1,
                  image: 1,
                  discounted_price: 1,
                  retail_price: 1
                }
              }
            ],
            count: [
              {
                $count: 'totalCount'
              }
            ]
          }
        }
      ]).limit(9);
    } else {
      query = await Product.aggregate([
        {
          $lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'categories'
          }
        },
        {
          $match: {
            $or: [
              {
                $and: [
                  {
                    'categories.slug': child
                  },
                  {
                    'categories.0.ancestors.slug': { $in: slugs }
                  }
                ]
              },
              {
                'categories.0.ancestors.slug': { $all: allSlugs }
              }
            ]
          }
        },
        {
          $match: {
            discounted_price: { $gt: priceRange.min, $lt: priceRange.max }
          }
        }
      ]).limit(9);
    }
  }

  res.status(200).json({
    status: 'success',
    query
  });
});
