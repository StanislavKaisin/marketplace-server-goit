const takeProductsToResponseWithCategory = (category, products) => {
  const filteredWithCategory = products.filter((item) => {
    return item.categories.includes(category)
  });
  return filteredWithCategory;
}

module.exports = takeProductsToResponseWithCategory;
