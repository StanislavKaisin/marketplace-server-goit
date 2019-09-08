const takeIdsFromQuery = request => {
  const idsForSearch = request.query.ids;
  const idsForSearchAsArray = idsForSearch
    .slice(1, idsForSearch.length - 1)
    .split(",");
  const onlyNumberIds = idsForSearchAsArray.filter((elem) => !Number.isNaN(Number(elem)));
  return onlyNumberIds;
};
module.exports = takeIdsFromQuery;
