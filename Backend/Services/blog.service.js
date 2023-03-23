<<<<<<< Updated upstream
'use strict'
const authMiddleware = require("../Middleware/auth.middleware");
const BlogRepository = require("../repository/blog.repository");
const UserService = require("./user.service");

async function getAllBlogs(pageNumber,pageSize) {
  try {
    const data = await BlogRepository.getAllBlogs(pageNumber,pageSize);
    if (!data) {
      return { status: 200, message: "Blogs table is empty!" };
=======
const authMiddleware = require('../Middleware/auth.middleware');
const BlogRepository = require('../repository/blog.repository');
const UserService = require('./user.service');

async function getAllBlogs() {
    try {
        const data = await BlogRepository.getAllBlogs();
        if (data.length == 0) {
            return { status: 200, message: 'Blogs table is empty!' };
        }
        return data;
    } catch {
        return { status: 500, message: 'Internal server error!' };
>>>>>>> Stashed changes
    }
}

async function createBlog(blog, username) {
    if (!blog.title || !blog.description) {
        return { status: 400, message: 'Title and Description needed' };
    }

    try {
        const authorExists = await UserService.findUserByUserName(username);
        if (authorExists) {
            blog.authorId = authorExists.message.Id;
            const result = await BlogRepository.createBlog(blog);
            return result;
        }

        return { status: 404, message: 'Author Does not exist' };
    } catch {
        return { status: 404, message: 'Please check your credentials again' };
    }
}

async function getBlogByBlogId(blogId, title, description) {
<<<<<<< Updated upstream
  try {
    const result = await BlogRepository.getBlogByBlogId(
      blogId,
      title,
      description
    );
    

    if (!result) {
      return { status: 404, message: "Blog not found" };
=======
    try {
        const result = await BlogRepository.getBlogByBlogId(blogId, title, description);

        if (result.length == 0) {
            return { status: 404, message: 'Blog not found' };
        }

        return { status: 200, message: result };
    } catch {
        return { status: 400, message: 'Internal Error' };
>>>>>>> Stashed changes
    }
}

async function updateBlog(blogId, blog) {
    try {
        const result = await BlogRepository.updateBlog(blogId, blog);

<<<<<<< Updated upstream
    if (!result) {
      return { status: 404, message: "Blog not found" };
=======
        if (result == 0) {
            return { status: 404, message: 'Blog not found' };
        }
        return { status: 200, message: result };
    } catch {
        return { status: 400, message: 'Update failed' };
>>>>>>> Stashed changes
    }
}

async function deleteBlog(blogId) {
    try {
        const result = await BlogRepository.deleteBlog(blogId);

<<<<<<< Updated upstream
    if (!result) {
      return { status: 404, message: "User not found" };
=======
        if (result == 0) {
            return { status: 404, message: 'User not found' };
        }

        return { status: 200, message: 'Blog removed' };
    } catch {
        return { status: 400, message: 'An Error Occured' };
>>>>>>> Stashed changes
    }
}

module.exports = {
    getAllBlogs,
    createBlog,
    getBlogByBlogId,
    updateBlog,
    deleteBlog,
};
