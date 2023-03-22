function paginate(req) {
  
  let pageNumber = parseInt(req.query.page);
  let pageSize = parseInt(req.query.size);


  if (!Number.isNaN(pageSize)&& pageSize > 0 && pageSize <= 5) {
     pageSize=pageSize;
  } 

  if ( !Number.isNaN(pageNumber) && pageNumber < 0) {
    pageNumber = 1;
  }

return [pageNumber,pageSize];

}

module.exports = paginate;
