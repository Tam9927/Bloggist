function paginate(req) {
  
  let pageNumber = parseInt(req.query.page);
  let pageSize = parseInt(req.query.size);

  let limit=10;

  if (!Number.isNaN(pageSize)&& pageSize > 0 && pageSize <= 10) {
     limit=pageSize;
  } 

  if ( !Number.isNaN(pageNumber) && pageNumber < 0) {
    pageNumber = 1;
  }

return [pageNumber,limit];

}

module.exports = paginate;
