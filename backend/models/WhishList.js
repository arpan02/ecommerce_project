const mongoose = require('mongoose');

const WishListSchema = new mongoose.Schema({
  user: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  wishListItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    }
  ]
});

module.exports = mongoose.model('WishList', WishListSchema);
