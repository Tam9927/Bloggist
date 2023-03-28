"use strict";
const express = require("express");
const BlogService = require("../services/blog.service");
const contentNegotiation = require("../utils/content-negotiation");
const paginator = require("../utils/pagination");
require("dotenv").config(); 

async function getAllBlogs(req, res) {
  try {
    const [pageNumber, pageSize] = paginator(req);

    const blogs = await BlogService.getAllBlogs(pageNumber, pageSize);

    const status = 200;

    contentNegotiation.sendResponse(
      req,
      res,
      status,
      blogs.message
    );
  } catch (err) {
    res.status(401).send(err.message);
  }
}

async function createBlog(req, res) {
  try {
    const createdBlog = await BlogService.createBlog(req.body, req.username);
    contentNegotiation.sendResponse(req, res, 201, createdBlog.message);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function getBlogByBlogId(req, res) {
  try {
    const blog = await BlogService.getBlogByBlogId(req.params.blogId);
    contentNegotiation.sendResponse(req, res, 200, blog.message);
  } catch (err) {
    res.status(401).send(err.message);
  }
}

async function updateBlog(req, res) {
  try {
    const data = await BlogService.updateBlog(req.params.blogId, req.body);
    if (data.message[0]) {
      contentNegotiation.sendResponse(req, res, 200, data.message);
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
      contentNegotiation.sendResponse(req, res, 200, deleteBlog.message);
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
