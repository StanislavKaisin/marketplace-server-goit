const takeIdFromRoute = request => {
  const idForSearch = request.params.id
  return idForSearch;
};
module.exports = takeIdFromRoute;
