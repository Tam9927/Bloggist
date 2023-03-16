const express = require("express");
const BlogController = require("../Controller/Blog.controller");

const router = express.Router();

router
  .route("/")
  .get(BlogController.getAllBlogs)
  .post(BlogController.createBlog);

router
  .route("/:blogname")
  .get(BlogController.getBlogById)
  .put(BlogController.updateBlog)
  .delete(BlogController.deleteBlog);

module.exports = router;