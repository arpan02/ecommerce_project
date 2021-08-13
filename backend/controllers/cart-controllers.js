const Cart = require('../models/Cart');
const catchAsync = require('../utils/catchAsync');

module.exports.addToCart = catchAsync(async (req, res, next) => {
  const { id } = req.body;
  const { user } = req;

  const product = {
    quantity: 1,
    product: id
  };

  // look if cart exist for user
  let cart = await Cart.findOne({ user: user._id });

  // if cart not exist than create new cart and add product
  if (!cart) {
    cart = await Cart.create({
      user: user._id,
      cartItems: [product]
    });
  } else {
    // add item to the cart
    cart = await Cart.updateOne(
      { user: user._id, 'cartItems.product': { $ne: id } },
      { $addToSet: { cartItems: product } }
    );
  }

  // const cart = await Cart.findOne({ user: user._id });
  res.status(200).json({
    status: 'success',
    cart
  });
});

// get cart
module.exports.getCart = catchAsync(async (req, res, next) => {
  // get cart using aggregation framework
  const cart = await Cart.aggregate([
    // look for cart by user
    {
      $match: { user: req.user._id }
    },
    // unwind by each cart items which will create separate document for each cart item
    {
      $unwind: '$cartItems'
    },
    // again unwind on the basis of product
    {
      $unwind: '$cartItems.product'
    },
    // populate the product by product id
    {
      $lookup: {
        from: 'products',
        localField: 'cartItems.product',
        foreignField: '_id',
        as: 'prod'
      }
    },
    // now again unwind on basis of each product item
    {
      $unwind: '$prod'
    },
    // use projection to eliminate unwanted data and create new properties
    {
      $project: {
        _id: 1,
        name: '$prod.name',
        retail_price: '$prod.retail_price',
        discounted_price: '$prod.discounted_price',
        image: { $arrayElemAt: ['$prod.image', 0] },
        quantity: '$cartItems.quantity',
        cartItemId: '$cartItems._id',
        id: '$prod._id'
      }
    },
    // now group each item by id
    {
      $group: {
        _id: '$_id',
        cartList: {
          $push: {
            name: '$name',
            retail_price: '$retail_price',
            discounted_price: '$discounted_price',
            image: '$image',
            quantity: '$quantity',
            productId: '$id',
            cartItemId: '$cartItemId'
          }
        }
      }
    }
  ]);

  res.status(200).json({
    status: 'success',
    cart: cart
  });
});

// toggle quantity of cart items
module.exports.toggleQuantity = catchAsync(async (req, res, next) => {
  const { operation, productId, cartItemId, quantity } = req.query;
  const { user } = req;

  // return;

  let cart;

  // check for operation whether its increment or decrement
  if (operation === 'increment') {
    // look for item and increment the quantity
    cart = await Cart.updateOne(
      {
        user: user._id,
        cartItems: {
          $elemMatch: {
            quantity: quantity,
            product: productId,
            _id: cartItemId
          }
        }
      },
      {
        $inc: {
          'cartItems.$.quantity': 1
        }
      }
    );
  } else if (operation === 'decrement') {
    // if quantity is equals to one than don't decrement
    if (parseInt(quantity, 10) === 1) {
      return res.status(400).json({
        status: 'fail',
        message: 'quantity is 1'
      });
    }

    // look for cart Item and decrement its quantity
    cart = await Cart.updateOne(
      {
        user: user._id,
        cartItems: {
          $elemMatch: {
            quantity: quantity,
            product: productId,
            _id: cartItemId
          }
        }
      },
      {
        $inc: {
          'cartItems.$.quantity': -1
        }
      }
    );
  }

  console.log(cart);

  res.status(200).json({
    status: 'success',
    cart
  });
});

// remove cart Item
module.exports.removeFromCart = catchAsync(async (req, res, next) => {
  const { cartItemId } = req.query;

  // look for cartItem and remove product by cartItemId
  const result = await Cart.updateOne(
    {
      user: req.user._id
    },
    {
      $pull: {
        cartItems: { _id: cartItemId }
      }
    }
  );

  return res.status(200).json({
    status: 'success',
    result
  });
});
