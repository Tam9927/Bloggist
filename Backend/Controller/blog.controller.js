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

    contentNegotiation.sendResponse(req, res, status, blogs.message);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
}

async function createBlog(req, res) {
  try {
    if (userUtils.checkEmptyBody) {
      throw Object.assign(new Error("Please Enter All the fields"), {
        status: 400,
      });}
    const createdBlog = await BlogService.createBlog(req.body, req.username);
    contentNegotiation.sendResponse(req, res, 201, createdBlog.message);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
}

async function getBlogByBlogId(req, res) {
  try {
    const blog = await BlogService.getBlogByBlogId(req.params.blogId);
    contentNegotiation.sendResponse(req, res, 200, blog.message);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
}

async function updateBlog(req, res) {
  try {
    const updatedBlog = await BlogService.updateBlog(req.params.blogId, req.body);
    if (updatedBlog.message[0]) {
      contentNegotiation.sendResponse(req, res, 200, updatedBlog.message);
    } 
      
  } catch (err) {
    res.status(err.status).send(err.message);
  }
}

async function deleteBlog(req, res) {
  try {
    const deletedBlog = await BlogService.deleteBlog(
      req.params.blogId,
    );
    if (deletedBlog) {
      contentNegotiation.sendResponse(req, res, 200, deletedBlog.message);
    } 
  } catch (err) {
    res.status(err.status).json(err.message); 
  }
}

module.exports = {
  getAllBlogs,
  createBlog,
  getBlogByBlogId,
  updateBlog,
  deleteBlog,
};
