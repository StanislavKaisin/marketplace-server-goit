const url = require("url");

const takeIdsFromQuery = request => {
  const myUrl = new URL("http://localhost:3000" + request.url);
  const idsForSearch = myUrl.searchParams.get("ids");
  const idsForSearchAsArray = idsForSearch
    .slice(1, idsForSearch.length - 1)
    .split(",");
  return idsForSearchAsArray;
};
module.exports = takeIdsFromQuery;
