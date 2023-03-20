const express = require("express");
const BlogController = require("../Controller/Blog.controller");
const authMiddleware = require('../Middleware/auth.middleware')
const router = express.Router();

router
  .route("/")
  .get(BlogController.getAllBlogs)
  .post(authMiddleware,BlogController.createBlog);

router
  .route("/:blogId")
  .get(BlogController.getBlogById)
  .put(authMiddleware,BlogController.updateBlog)
  .delete(authMiddleware,BlogController.deleteBlog);

module.exports = router;