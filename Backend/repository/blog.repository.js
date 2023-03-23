"use strict"
const Blog = require("../model/blog.model");
const express = require("express");
const database = require("../configs/db.config");

async function getAllBlogs() {
  try {
    const result = await Blog.findAll();
    return result;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
}

async function getBlogByBlogId(blogId) {
  try {
    const result = await Blog.findOne({ where: { blogId } });
    return result;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
}

async function getBlogbyAuthorId() {
  try {
    const result = await Blog.findByPk(authorId);
    return result;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
}

async function updateBlog(blogId, BlogToUpdate) {
  try {
    const result = await Blog.update(
      { title: BlogToUpdate.title, description: BlogToUpdate.description },
      { where: { blogId: blogId } }
    );
    return result;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
}

async function deleteBlog(blogId) {
  try {
    const result = Blog.destroy({ where: { blogId } });
    return result;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
}

async function createBlog(blog) {
  try {
    const result = await Blog.create(blog);
    console.log("Blog created successfully");
    return result;
  } catch (err) {
    throw console.error(err);
  }
}

module.exports = {
  getAllBlogs,
  createBlog,
  getBlogByBlogId,
  updateBlog,
  deleteBlog,
  getBlogbyAuthorId,
};