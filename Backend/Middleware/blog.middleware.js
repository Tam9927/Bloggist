const blogService = require("../services/blog.service");
const userService = require("../services/user.service");

async function blogMiddleware(req, res, next) {
  try {
    const blogExists = await blogService.getBlogByBlogId(req.params.blogId);
    const authorExists = await userService.findUserByUserName(req.username);
    // console.log(authorExists.message.Id)
    // console.log(blogExists.message.authorId)

    if (!blogExists) {
      return res.status(404).send("Blog not found");
    }
    if (!authorExists) {
      return res.status(404).send("Author not found");
    }
    if (blogExists.message.authorId != authorExists.message.Id) {
      return res.status(403).send("Permission denied");
    }
    next();

  } catch (err) {
    next(err);
  }
}

module.exports = blogMiddleware;
