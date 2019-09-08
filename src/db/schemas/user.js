const mongoose = require("mongoose");
const {
  Schema
} = mongoose;

const timestamp = require('../middleware/timestamp');

const userSchema = new Schema({
  username: String,
  telephone: String,
  password: String,
  email: String,
  favoriteProducts: {
    type: Array,
    default: [],
  },
  viewedProducts: {
    type: Array,
    default: [],
  },
  orders: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

userSchema.plugin(timestamp);

const User = mongoose.model('User', userSchema);

module.exports = User;
