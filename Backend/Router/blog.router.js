"use strict"
const express = require("express");
const BlogController = require("../controller/blog.controller");
const authMiddleware = require("../Middleware/auth.middleware");
const blogMiddleware = require("../Middleware/blog.middleware");
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

module.exports = router;
