const mongoose = require("mongoose");
const {
  Schema
} = mongoose;

const timestamp = require('../middleware/timestamp');

const productShcema = new Schema({
  id: Number,
  sku: Number,
  name: String,
  description: String,
  price: String,
  currency: String,
  creatorId: Number,
  created: Date,
  modified: Date,
  categories: Array,
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

productShcema.plugin(timestamp);

const Product = mongoose.model('Product', productShcema);

module.exports = Product;
