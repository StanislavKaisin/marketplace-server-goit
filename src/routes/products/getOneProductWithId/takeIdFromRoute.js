const url = require("url");

const takeIdsFromQuery = request => {
  const parsedUrl = url.parse(request.url);

  const idForSearchAsArray = parsedUrl.pathname
    .slice(1, parsedUrl.pathname.length)
    .split("/");
  return idForSearchAsArray[1];
};
module.exports = takeIdsFromQuery;
