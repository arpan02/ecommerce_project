const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    image: [
      {
        type: String
      }
    ],
    description: {
      type: String,
      required: true
    },
    retail_price: {
      type: Number,
      required: true
    },
    discounted_price: {
      type: Number,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    specification: [
      {
        type: String,
        required: true
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Product', productSchema);
