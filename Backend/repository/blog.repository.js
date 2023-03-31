"use strict";
const express = require("express");
const {Blog} = require("../model/index");

async function getAllBlogs(offset, limit) {
  const result = await Blog.findAll({ include: ["author"],offset, limit });
  return result;
}

async function getBlogByBlogId(blogId) {
  const result = await Blog.findOne({ include: ["author"], where: { blogId } });
  return result;
}

async function getBlogbyAuthorId() {
  const result = await Blog.findByPk(authorId);
  return result;
}

async function updateBlog(blogId, BlogToUpdate) {
  const result = await Blog.update(
    { title: BlogToUpdate.title, description: BlogToUpdate.description },
    { where: { blogId: blogId } }
  );
  return result;
}

async function deleteBlog(blogId) {
  const result = Blog.destroy({ where: { blogId } });
  return result;
}

async function createBlog(blog) {
  try {
    const result = await Blog.create(blog);
    return result;
  } catch (err) {
    console.log(err.stack);
    throw err;
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
