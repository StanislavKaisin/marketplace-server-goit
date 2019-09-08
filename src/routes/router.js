const express = require("express");

const mainRoute = require("./main/main");

const queryMiddleware = require("./helpers/queryMiddleware");
const getAllProducts = require("./products/getAllProducts");
const getOneProductWithId = require("./products/getOneProductWithId");
const createProduct = require("./products/createProduct");
const updateProduct = require("./products/updateProduct");

const getUserWithId = require("./users/getUserWithId");
const createUser = require("./users/createUser");
const updateUser = require("./users/updateUser");

const createOrder = require("./orders/createOrder");
const getOrderWithId = require("./orders/getOrderWithId");

const uploadImage = require('./images/uploadImage');

const pageNotFound = require("./pageNotFound/pageNotFound");

const router = express.Router();

router
  .get('/', mainRoute)
  .get('/products/', queryMiddleware)
  .get('/products/:id', getOneProductWithId)
  .get('/products', getAllProducts)
  .post('/products', createProduct)
  .put('/products/:id', updateProduct)

  .get('/users/:id', getUserWithId)
  .post('/users', createUser)
  .put('/users/:id', updateUser)

  .post('/orders/', createOrder)
  .get('/orders/:id', getOrderWithId)

  .post('/images', uploadImage)
  .get('/*', pageNotFound);

module.exports = router;
