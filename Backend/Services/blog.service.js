"use strict";
const authMiddleware = require("../middleware/auth.middleware");
const BlogRepository = require("../repository/blog.repository");
const UserService = require("./user.service");
const BlogDTO = require("../dto/blog.dto")

async function getAllBlogs(pageNumber, pageSize) {
    const offset = (pageNumber - 1) * pageSize;
    const limit = pageSize;

    const allBlogs = await BlogRepository.getAllBlogs(offset, limit);
    if (!allBlogs.length) {
      return { status: 200, message: "Blogs table is empty!" };
    }


    return { status: 200, message: allBlogs };
}

async function createBlog(blog, username) {
  if (!blog.title || !blog.description) {
    return { status: 400, message: "Title and Description needed" };
  }
    const authorExists = await UserService.findUserByUserName(username);
    if (authorExists) {
      blog.authorId = authorExists.message.Id;
      const createdBlog = await BlogRepository.createBlog(blog);
      return { status: 201, message: createdBlog };
    }

    return { status: 400, message: "Bad Request : Author Does not exist" };
}

async function getBlogByBlogId(blogId) {
    const blog = await BlogRepository.getBlogByBlogId(blogId);
    if (!blog) {
      return { status: 404, message: "Blog not found" };
    }
    
    const Blog = new BlogDTO(blog)

    return { status: 200, message: Blog };
}

async function updateBlog(blogId, blog) {
    const updatedBlog = await BlogRepository.updateBlog(blogId, blog);

    if (!updatedBlog) {
      return { status: 404, message: "Blog not found" };
    }
    return { status: 200, message: "Blog Updated Successfully" };
  
}

async function deleteBlog(blogId) {
    const deletedBlog = await BlogRepository.deleteBlog(blogId);

    if (!deletedBlog) {
      return { status: 404, message: "Could Not Delete Blog" };
    }

    return { status: 200, message: "Blog deleted" };
}

module.exports = {
  getAllBlogs,
  createBlog,
  getBlogByBlogId,
  updateBlog,
  deleteBlog,
};
