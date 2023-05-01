"use strict";
const blogService = require("../services/blog.service");
const userService = require("../services/user.service");

async function blogMiddleware(req,res,next) {
  try {
    const blogExists = await blogService.getBlogByBlogId(req.params.blogId);
    const authorExists = await userService.findUserByUserName(req.username);

    if (!blogExists.message) {
      throw Object.assign(new Error("Blog Not Found"), {
        status: 404,
      });
    }
    if (!authorExists.message) {
      throw Object.assign(new Error("Author Not Found"), {
        status: 404,
      });
    }
    if (blogExists.message.authorId != authorExists.message.Id) {
      throw Object.assign(new Error("Permission Denied"), { 
        status: 403,
      }); 
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = blogMiddleware;
