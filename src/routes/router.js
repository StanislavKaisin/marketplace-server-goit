const express = require("express");
const path = require('path');
const multer = require('multer');

const TEMPORARY_IMAGE_FOLDER = path.join(__dirname);
const upload = multer({
    dest: TEMPORARY_IMAGE_FOLDER
  })
  .single('file');

const mainRoute = require("./main/main");
const getAllProducts = require("./products/getAllProducts");
const getOneProductWithId = require("./products/getOneProductWithId/getOneProductWithId");
const getProductsWithIds = require("./products/getProductsWithIds/getProductsWithIds");
const getProductWithCategory = require("./products/getProductWithCategory/getProductWithCategory");
const getUserWithId = require("./users/getUserWithId/getUserWithId");
const createUser = require("./users/createUser");
const images = require("./images/images");
const createOrder = require("./orders/createOrder");
const pageNotFound = require("./pageNotFound/pageNotFound");

const router = express.Router();

const ifQueryIsEmpty = (request) => Object.entries(request.query).length && request.query.constructor === Object;

const findIfQueryMiddleware = (request, response, next) => {

  if (ifQueryIsEmpty(request)) {
    if (request.query.hasOwnProperty('ids')) {
      getProductsWithIds(request, response);
      return;
    };
    if (request.query.hasOwnProperty('category')) {
      getProductWithCategory(request, response);
      return;
    };
    pageNotFound(request, response);
  } else {
    return next();
  }
}

router
  .use(express.json())
  .get('/', mainRoute)
  .get('/products/', findIfQueryMiddleware)
  .get('/products/:id', getOneProductWithId)
  .get('/products', getAllProducts)
  .post('/users', createUser)
  .get('/users/:id', getUserWithId)
  .post('/orders/', createOrder)
  .post('/images',
    function (request, response) {
      upload(request, response, function (error) {
        if (!error) images(request, response);
        if (error) {
          response.removeHeader('Transfer-Encoding');
          response.removeHeader('X-Powered-By');
          response
            .status(500)
            .format({
              'application/json': function () {
                response.send(JSON.stringify(error))
              },
            })
            .end();
        }
      })
    })
  .get('/*', pageNotFound);

module.exports = router;
