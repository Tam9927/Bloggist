'use strict'
const authMiddleware = require("../Middleware/auth.middleware");
const BlogRepository = require("../repository/blog.repository");
const UserService = require("./user.service");

async function getAllBlogs(pageNumber,pageSize) {
  try {
    const offset = (pageNumber-1)*pageSize;
    const limit = pageSize;

    const data = await BlogRepository.getAllBlogs(offset,limit);
    if (!data.length) {
      return { status: 200, message: data };
    }
    return data;
  } catch(err) {
    return { status: 500, message: console.error(err) };
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

    return { status: 404, message: "Author Does not exist" };
  } catch(err) {
    return { status: 500, message: console.error(err) };
  }
}

async function getBlogByBlogId(blogId, title, description) {
  try {
    const result = await BlogRepository.getBlogByBlogId(
      blogId,
      title,
      description
    );
    

    if (!result) {
      return { status: 404, message: "Blog not found" };
    }

    return { status: 200, message: result };
  } catch(err) {
    return { status: 500, message: console.error(err) };
  }
}

async function updateBlog(blogId, blog) {
  try {
    
      const result = await BlogRepository.updateBlog(blogId,blog);

    if (!result) {
      return { status: 404, message: "Blog not found" };
    }
    return { status: 200, message: result };
  } catch(err) {
    return { status: 500, message: console.error(err) };
  }
}

async function deleteBlog(blogId) {
  try {
    const result = await BlogRepository.deleteBlog(blogId);

    if (!result) {
      return { status: 404, message: "User not found" };
    }

    return { status: 200, message: "Blog removed" };
  } catch(err) {
    return { status: 500, message: console.error(err) };
  }
}

module.exports = {
  getAllBlogs,
  createBlog,
  getBlogByBlogId,
  updateBlog,
  deleteBlog,
};
