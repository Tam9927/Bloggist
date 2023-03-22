function paginate() {
  const { page, size } = req.query;

  if (size < 0 && size >= 3) {
    size = 3;
  }

  if (page < 0) {
    page = 1;
  }

  const startIndex = parseInt((page - 1) * size);

  const endIndex = parseInt(page * size);

  const results = {};

  if (endIndex < 3) {
    results.next = {
      page: page + 1,
      size: size,
    };
  }
}

module.exports = paginate;
