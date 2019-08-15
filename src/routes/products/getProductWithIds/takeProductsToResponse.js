let takeProductsToResponse = (idsForSearchAsArray, products) => {
  let productsToResponse = [];
  for (let index = 0; index < idsForSearchAsArray.length; index++) {
    const element = idsForSearchAsArray[index];
    for (let index = 0; index < products.length; index++) {
      const subElement = products[index];
      if (subElement.id == element) {
        productsToResponse = productsToResponse.concat(subElement);
      }
    }
  }
  return productsToResponse;
}

module.exports = takeProductsToResponse;
