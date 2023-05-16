"use strict";
const BlogRepository = require("../repositories/blog.repository");
const UserService = require("./user.service");
const BlogDTO = require("../dto's/blog.dto"); 

async function getAllBlogs(pageNumber, pageSize) { 
  const offset = (pageNumber - 1) * pageSize; 
  const limit = pageSize;

  const allBlogs = await BlogRepository.getAllBlogs(offset, limit);
  if (!allBlogs.rows.length) {
    throw Object.assign(new Error("No blogs in this table!"), {
      status: 404,
    });
  }

  return { message: allBlogs };
}

async function createBlog(blog, username) {       
  if (!blog.title || !blog.description) {
    throw Object.assign(new Error("Title And Description Needed"), {
      status: 400,
    });
  }
  const authorExists = await UserService.findUserByUserName(username);
  if (authorExists) {
    blog.authorId = authorExists.message.Id;
    const createdBlog = await BlogRepository.createBlog(blog);
    return { message: createdBlog };
  }
  throw Object.assign(new Error("Author Does Not Exist"), {
    status: 404,
  });
}

async function getBlogByBlogId(blogId) {
  const blog = await BlogRepository.getBlogByBlogId(blogId);
  if (!blog) {
    throw Object.assign(new Error("Blog Not Found"), {
      status: 404,
    });
  }

  const Blog = new BlogDTO(blog);

  return { message: Blog };
}

async function getBlogByAuthorId(authorId) {
  const blog = await BlogRepository.getBlogByAuthorId(authorId);
  if (!blog) {
    throw Object.assign(new Error("Blogs Not Found"), {
      status: 404,
    });
  }

  //const Blog = new BlogDTO(blog);

  return { message: blog };
}



async function updateBlog(blogId, blog) {
  const updatedBlog = await BlogRepository.updateBlog(blogId, blog);

  if (!updatedBlog) {
    throw Object.assign(new Error("No blog with this ID in the table!"), {
      status: 404,
    });
  }
  return { message: "Blog Updated Successfully" };
}

async function deleteBlog(blogId) {
  const deletedBlog = await BlogRepository.deleteBlog(blogId);

  if (!deletedBlog) {
    throw Object.assign(new Error("Blog Could Not Be Deleted"), {
      status: 404,
    });
  }

  return { message: "Blog deleted" };
}

module.exports = {
  getAllBlogs,
  createBlog,
  getBlogByBlogId,
  updateBlog,
  deleteBlog,
  getBlogByAuthorId
};
