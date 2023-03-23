function paginate(req) {
<<<<<<< Updated upstream
  
  let pageNumber = 1;
  let pageSize = 5;

  pageNumber = parseInt(req.query.page);
  pageSize = parseInt(req.query.size);

  pageNumber = (isNaN(pageNumber)||pageNumber<0) ? 1 : pageNumber;
  pageSize = (isNaN(pageSize)||pageSize<0) ? 5 : pageSize;

  return [pageNumber, pageSize];

=======
    let pageNumber = 1;
    let pageSize = 5;

    pageNumber = parseInt(req.query.page);
    pageSize = parseInt(req.query.size);

    pageNumber = isNaN(pageNumber) || pageNumber < 0 ? 1 : pageNumber;
    pageSize = isNaN(pageSize) || pageSize < 0 ? 5 : pageSize;

    return [pageNumber, pageSize];
>>>>>>> Stashed changes
}

module.exports = paginate;
