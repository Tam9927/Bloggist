function paginate(req) {
  let pageNumber = 1;
  let pageSize = 5;

  pageNumber = parseInt(req.query.page);
  pageSize = parseInt(req.query.size);

  pageNumber = Number.isNaN(pageNumber) || pageNumber < 0 ? 1 : pageNumber;
  pageSize = Number.isNaN(pageSize) || pageSize < 0 ? 10 : pageSize;

  return [pageNumber, pageSize]; 
}

module.exports = paginate;
