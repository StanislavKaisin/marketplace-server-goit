const fs = require("fs");
const path = require("path");
const uuidv4 = require("uuid/v4");

const operationTypes = require("./operationTypes");

const ifFolderExists = require("./helpers/ifFolderExists");
const createFolder = require("./helpers/createFolder");
const takeProductsFromDb = require("./helpers/takeProductsFromDb");
const writeOrder = require("./helpers/writeOrder");

const takeProductsWithIds = require("../products/helpers/takeProductsToResponse");

const createOrder = (request, response) => {
  const userId = request.body.user;
  const productsIds = request.body.products;
  const userFolderName = `${userId}-user`;
  const folderPath = path.join(
    __dirname,
    "../../",
    "db",
    "users",
    userFolderName
  );
  let {
    actionFolder,
    payloadFolder
  } = ifFolderExists(folderPath);
  if (actionFolder === operationTypes.ERROR) {
    response.removeHeader("Transfer-Encoding");
    response.removeHeader("X-Powered-By");
    response
      .status(500)
      .format({
        "application/json": function () {
          response.send(JSON.stringify(payloadFolder));
        }
      })
      .end();
    return;
  }
  let pathToUserFolder;
  if (actionFolder === operationTypes.SUCCESS) {
    pathToUserFolder = payloadFolder;
  }
  if (actionFolder === operationTypes.FOLDER_IS_NOT_EXISTS) {
    let {
      actionCreateFolder,
      payloadCreateFolder
    } = createFolder(
      payloadFolder
    );
    if (actionCreateFolder === operationTypes.ERROR) {
      response.removeHeader("Transfer-Encoding");
      response.removeHeader("X-Powered-By");
      response
        .status(500)
        .format({
          "application/json": function () {
            response.send(JSON.stringify(payloadFolder));
          }
        })
        .end();
      return;
    }
    pathToUserFolder = payloadCreateFolder;
  }
  let pathToUserOrders = path.join(pathToUserFolder, "/orders");
  let checkOrderFolder = ifFolderExists(pathToUserOrders);
  if (checkOrderFolder.actionFolder === operationTypes.ERROR) {
    response.removeHeader("Transfer-Encoding");
    response.removeHeader("X-Powered-By");
    response
      .status(500)
      .format({
        "application/json": function () {
          response.send(JSON.stringify(payloadFolder));
        }
      })
      .end();
    return;
  }
  if (checkOrderFolder.actionFolder === operationTypes.SUCCESS) {
    pathToUserOrders = checkOrderFolder.payloadFolder;
  }
  if (checkOrderFolder.actionFolder === operationTypes.FOLDER_IS_NOT_EXISTS) {
    let createOrderFolder = createFolder(pathToUserOrders);
    if (createOrderFolder.actionCreateFolder === operationTypes.ERROR) {
      response.removeHeader("Transfer-Encoding");
      response.removeHeader("X-Powered-By");
      response
        .status(500)
        .format({
          "application/json": function () {
            response.send(JSON.stringify(createOrderFolder.payloadFolder));
          }
        })
        .end();
      return;
    }
    pathToUserOrders = createOrderFolder.payloadCreateFolder;
  }
  let productsToResponse = [];
  let productsFromDb = takeProductsFromDb();
  if (productsFromDb.action === operationTypes.ERROR) {
    response.removeHeader("Transfer-Encoding");
    response.removeHeader("X-Powered-By");
    response
      .status(500)
      .format({
        "application/json": function () {
          response.send(JSON.stringify(productsFromDb.payload));
        }
      })
      .end();
    return;
  }
  productsToResponse = takeProductsWithIds(productsIds, productsFromDb.payload);
  const productsIdsToResponse = productsToResponse.reduce((acc, product) => {
    acc.push(product.id);
    return acc;
  }, [])
  const resultBody = {};
  let status = null;
  let order = null;
  const orderId = uuidv4();
  if (productsToResponse.length) {
    status = 'success';
    order = {
      id: orderId,
      ...request.body,
      products: productsIdsToResponse,
    }
  } else {
    status = 'failed';
    resultBody.status = status;
    resultBody.order = order;
    JSON.stringify(resultBody);
    response.removeHeader('Transfer-Encoding');
    response.removeHeader('X-Powered-By');
    response
      .status(205)
      .format({
        'application/json': function () {
          response.send(JSON.stringify(resultBody))
        },
      })
      .end();
    return;
  };
  resultBody.status = status;
  resultBody.order = order;
  const orderFileName = `${orderId}-order.json`
  const pathToSaveOrder = path.join(pathToUserOrders, orderFileName);
  let writeOrderResult = writeOrder(pathToSaveOrder, resultBody);
  writeOrderResult.then(
      (data) => {
        response.removeHeader('Transfer-Encoding');
        response.removeHeader('X-Powered-By');
        response
          .status(201)
          .format({
            'application/json': function () {
              response.send(JSON.stringify(data.payload))
            },
          })
          .end();
        return;
      }

    )
    .catch((error) => {
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
    });
};

module.exports = createOrder;
