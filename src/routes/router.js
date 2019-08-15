const mainRoute = require("./main/main");

const getAllProducts = require("./products/getAllProducts");
const getOneProductWithId = require("./products/getOneProductWithId/getOneProductWithId");
const getProductWithIds = require("./products/getProductWithIds/getProductWithIds");
const getProductWithCategory = require("./products/getProductWithCategory/getProductWithCategory");

const signUpRoute = require("./users/sign-up-route");

const pageNotFound = require("./pageNotFound/pageNotFound");

const router = {
  default: mainRoute,

  getOneProductWithId: getOneProductWithId,
  getProductWithIds: getProductWithIds,
  getProductWithCategory: getProductWithCategory,
  "/products": getAllProducts,

  "/signup": signUpRoute,

  pageNotFound: pageNotFound,
};

module.exports = router;
