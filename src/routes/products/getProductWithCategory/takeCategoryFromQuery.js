const url = require("url");

const takeCategoryFromQuery = request => {
  const myUrl = new URL("http://localhost:3000" + request.url);
  let categoryForSearch = myUrl.searchParams.get("category");
  categoryForSearch = categoryForSearch
    .slice(1, categoryForSearch.length - 1)
  return categoryForSearch;
};
module.exports = takeCategoryFromQuery;
