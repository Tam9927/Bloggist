'use strict'
const express = require("express");
const BlogController = require("../controllers/blog.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const blogMiddleware = require("../middlewares/blog.middleware"); 
const router = express.Router();

router
  .route("/")
  .get(BlogController.getAllBlogs)
  .post(authMiddleware,BlogController.createBlog);

router
  .route("/:blogId")
  .get(BlogController.getBlogByBlogId)
  .put(authMiddleware, blogMiddleware, BlogController.updateBlog) 
  .delete(authMiddleware, blogMiddleware, BlogController.deleteBlog);

  router
  .route("/author/:authorId")
  .get(BlogController.getBlogByAuthorId)

module.exports = router;
