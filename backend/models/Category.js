const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  ancestors: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
      },
      name: {
        type: String
      }
    }
  ]
});

module.exports = mongoose.model('Category', categorySchema);
