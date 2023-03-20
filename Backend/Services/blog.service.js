const BlogRepository = require("../repository/blog.repository");

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

async function createBlog(blog) {
  if (!blog.title || !blog.description) {
    return { status: 400, message: "Title and Description needed" };
  }

  try {
    const result = await BlogRepository.createBlog(blog);
    return result;
  } catch {
    return { status: 404, message: "Please check your credentials again" };
  }
}


async function getBlogByBlogId(blogId,title,description) {
  try {
    const result = await BlogRepository.getBlogByBlogId(blogId,title,description);
    
    if (result.length == 0) {
      return { status: 404, message: "Blog not found" };
    }

    return { status: 200, message: result };
  } catch {
    return { status: 400, message: "Internal Error" };
  }
}

async function updateBlog(blogId,authorname) {
  try {
    const result = await BlogRepository.updateBlog(
      blogId,blog
    );

    if (result == 0) {
      return { status: 404, message: "Blog not found" };
    }
    return { status: 200, message: "Blog updated" };
  } catch {
    return { status: 400, message: "Update failed" };
  }
}

async function deleteBlog(blogId) {
  
    try {
        const result = await BlogRepository.deleteBlog(blogId);
    
        if (!result) {
          return { status: 404, message: "User not found" };
        }

    
        return { status: 200, message: "Blog removed"};
      } catch {
        return { status: 400, message: "An Error Occured" };
      }
 
  
}

module.exports = {
  getAllBlogs,
  createBlog,
  getBlogByBlogId,
  updateBlog,
  deleteBlog,
};
