function paginate(req) {
    let pageNumber = 1;
    let pageSize = 5;

    pageNumber = parseInt(req.query.page, 10);
    pageSize = parseInt(req.query.size, 10);

    pageNumber = Number.isNaN(pageNumber) || pageNumber < 0 ? 1 : pageNumber;
    pageSize = Number.isNaN(pageSize) || pageSize < 0 ? 5 : pageSize;

    return [pageNumber, pageSize];
}

module.exports = paginate;
