const Blog = require('../Model/blog.model');
const express = require("express");
const database = require("../Configs/db.config");

async function getAllBlogs(){
  try {
    const result = await Blog.findAll();
    return result;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};

async function getBlogById(blogId){
  try {
    const result = await Blog.findOne({ where: {blogId} });
    return result;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};


async function getBlogbyAuthorId (){
    try {
      const result = await Blog.findOne({ where: { authorId: authorId } });
      return result;
    } catch (err) {
      console.log(err.stack);
      throw err;
    }
  };

async function updateBlog() {
  try {
    const result = await Blog.update(
      { title: updatedTitle, description: updatedDescription },
      { where: { id: Id } }
    );
    console.log(result);
    return result;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};

async function deleteBlog(blogId) {
  try {
    const result = Blog.destroy({ where: {blogId } });
    return result;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};



async function createBlog(blog){
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
    getBlogById,
    updateBlog,
    deleteBlog,
    getBlogbyAuthorId

};