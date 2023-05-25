"use strict";
const express = require("express");
const BlogDTO = require("../dto's/blog.dto")
const {Blog,User} = require("../models/index");

async function getAllBlogs(offset , limit) {
  const result = await Blog.findAndCountAll({ include: ["author"],offset,limit,order: [['createdAt', 'DESC']] });
  const allBlog = { count: result.count, rows: [] };
    result.rows.forEach((element) => {
      allBlog.rows.push( new BlogDTO(element));
    });
    console.log(allBlog)
    return allBlog;
}

async function getBlogByBlogId(blogId) {
  const result = await Blog.findOne({ include: ["author"], where: { blogId } });      
  return result;
}

async function getBlogByAuthorId(authorId) {     
  const result = await Blog.findAll({ include: ["author"],where: { authorId } });   
  const allBlog = [];
  result.forEach((element) => {
    allBlog.push( new BlogDTO(element));
  });
  return allBlog;
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
    console.log(result)  
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
  getBlogByAuthorId
};
