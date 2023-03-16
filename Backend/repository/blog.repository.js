const Blog = require('../Model/blog.model');

async function getAllBlogs(){
  try {
    const result = await Blog.findAll();
    return result;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};

async function getBlogById(){
  try {
    const result = await Blog.findOne({ where: { id: blogId } });
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

async function deleteBlog() {
  try {
    const result = Blog.destroy({ where: { id: blogId } });
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
    deleteBlog




};