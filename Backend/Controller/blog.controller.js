const express = require("express");
const BlogService = require("../services/blog.service");
const contentNegotiation = require("../utils/content-negotiation");
require("dotenv").config();

async function getAllBlogs(req, res) {
  try {
    const blogs = await BlogService.getAllBlogs();
    if (!blogs) {
      res.status(200).send("Blog list empty!");
    }
    const status = 200;

    contentNegotiation.sendResponse(req, res, 200, blogs);
  } catch (err) {
    res.status(401).send(err.message);
  }
}

async function createBlog(req, res) {
  try {
    const createdBlog = await BlogService.createBlog(req.body, req.username);
    contentNegotiation.sendResponse(req, res, 201, createdBlog);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function getBlogByBlogId(req, res) {
  try {
    const blog = await BlogService.getBlogByBlogId(req.params.blogId);
    contentNegotiation.sendResponse(req, res, 200, blog);
  } catch (err) {
    res.status(401).send(err.message);
  }
}

async function updateBlog(req, res) {
  try {
    const data = await BlogService.updateBlog(req.params.blogId, req.body);
    if (data.message[0] == 1) {
      contentNegotiation.sendResponse(
        req,
        res,
        200,
        "Blog edited successfully"
      );
    } else {
      res.status(400).json("Blog could not be edited. Please try again");
    }
  } catch (err) {
    res.status(401).send(err.message);
  }
}

async function deleteBlog(req, res) {
  try {
    const deleteBlog = await BlogService.deleteBlog(
      req.params.blogId,
      req.username
    );
    if (deleteBlog) {
      sendResponse(req, res, 200, "Blog deleted");
    } else {
      res.status(404).send("Blog not found");
    }
  } catch (err) {
    res.status(401).json(err.message);
  }
}

module.exports = {
  getAllBlogs,
  createBlog,
  getBlogByBlogId,
  updateBlog,
  deleteBlog,
};
