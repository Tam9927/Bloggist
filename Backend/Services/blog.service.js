"use strict"
const authMiddleware = require("../Middleware/auth.middleware");
const BlogRepository = require("../repository/blog.repository");
const UserService = require("./user.service");

async function getAllBlogs() {
  try {
    const data = await BlogRepository.getAllBlogs();
    if (!data.length) {
      return { status: 200, message: "Blogs table is empty!" };
    }
    return data;
  } catch {
    return { status: 500, message: "Internal server error!" };
  }
}

async function createBlog(blog,username) {
  if (!blog.title || !blog.description) {
    return { status: 400, message: "Title and Description needed" };
  }

  try {
    const authorExists = await UserService.findUserByUserName(username);
    if (authorExists) {
      blog.authorId = authorExists.message.Id;
      const result = await BlogRepository.createBlog(blog);
      return result;
    }

    return { status: 400, message: "Bad Request: Author Does not exist" };
  } catch {
    return { status: 500, message: "Internal Error" };
  }
}

async function getBlogByBlogId(blogId) {
  try {
    const result = await BlogRepository.getBlogByBlogId(
      blogId
    );

    if (!result.length) {
      return { status: 404, message: "Blog not found" };
    }

    return { status: 200, message: result };
  } catch {
    return { status: 400, message: "Internal Error" };
  }
}

async function updateBlog(blogId, blog) {
  try {
    
      const result = await BlogRepository.updateBlog(blogId,blog);

    if (!result) {
      return { status: 404, message: "Blog not found" };
    }
    return { status: 200, message: result };
  } catch {
    return { status: 500, message: console.error };
  }
}

async function deleteBlog(blogId) {
  try {
    const result = await BlogRepository.deleteBlog(blogId);

    if (!result) {
      return { status: 404, message: "Could Not Delete Blog" };
    }

    return { status: 200, message: "Blog removed" };
  } catch {
    return { status: 500, message: console.error };
  }
}

module.exports = {
  getAllBlogs,
  createBlog,
  getBlogByBlogId,
  updateBlog,
  deleteBlog,
};
