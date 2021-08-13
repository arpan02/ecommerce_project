const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  cartItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      }
    }
  ]
});

module.exports = mongoose.model('Cart', cartSchema);
