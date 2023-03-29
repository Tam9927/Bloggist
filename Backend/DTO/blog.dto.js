class BlogDTO {
    constructor(blog) {
        
        this.authorName= blog.author.username
        this.Id = blog.blogId;
        this.title = blog.title;
        this.description = blog.description;
        this.createdAt = blog.createdAt;
        this.updatedAt = blog.updatedAt;
        this.authorName= blog.author.username
    }
  }
  
  module.exports = BlogDTO; 