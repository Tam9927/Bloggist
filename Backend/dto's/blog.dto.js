class BlogDTO {
    constructor(blog) {
        this.username=blog.author.username;
        this.authorId = blog.authorId;
        this.blogId = blog.blogId;
        this.title = blog.title;
        this.description = blog.description;
        this.createdAt = blog.createdAt;
        this.updatedAt = blog.updatedAt; 
        
    }
  }
  
  module.exports = BlogDTO; 