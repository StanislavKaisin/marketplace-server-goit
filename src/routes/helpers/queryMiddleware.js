const getProductsWithIds = require("../products/getProductsWithIds/getProductsWithIds");
const getProductWithCategory = require("../products/getProductWithCategory/getProductWithCategory");
const pageNotFound = require("../pageNotFound/pageNotFound");

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
};

module.exports = findIfQueryMiddleware;
