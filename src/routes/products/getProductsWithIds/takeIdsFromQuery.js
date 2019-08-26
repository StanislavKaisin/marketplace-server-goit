const takeIdsFromQuery = request => {
  const idsForSearch = request.query.ids;
  const idsForSearchAsArray = idsForSearch
    .slice(1, idsForSearch.length - 1)
    .split(",");
  return idsForSearchAsArray;
};
module.exports = takeIdsFromQuery;
