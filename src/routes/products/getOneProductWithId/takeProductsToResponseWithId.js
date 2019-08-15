const takeProductsToResponseWithId = (id, products) => {
  const findWithId = products.find((item) => {
    return item.id == id;
  });
  if (findWithId) return findWithId
  else return [];
}

module.exports = takeProductsToResponseWithId;
