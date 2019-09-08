const mongoose = require("mongoose");
const {
  Schema
} = mongoose;

const timestamp = require('../middleware/timestamp');

const orderShcema = new Schema({
  creator: String,
  productsList: [{
    product: Number,
    type: {
      type: String,
      default: 'XL',
      enum: ['M', 'XL', 'XXL']
    },
    itemsCount: {
      type: Number,
      default: 1,
    }
  }],
  deliveryType: {
    type: String,
    default: 'delivery',
    enum: ['delivery', 'office']
  },
  deliveryAdress: String,
  sumToPay: Number,
  status: {
    type: String,
    default: 'inProgress',
    enum: ['inProgress', 'declined', 'finished', 'failed']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

orderShcema.plugin(timestamp);

const Order = mongoose.model('Order', orderShcema);

module.exports = Order;
