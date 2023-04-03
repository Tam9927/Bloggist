const BlogRepository = require("../../repository/blog.repository");
const { blogDB } = require("../testDB");
const Blog = require("../../model/blog.model");

class TestBlog {
  constructor(Blog) {
    this.title = Blog.title;
    this.description = Blog.description;
    this.createdAt = Blog.createdAt;
    this.updatedAt = Blog.updatedAt;
    this.authorId = Blog.authorId;
    this.blogId = Blog.blogId;
  }
}

describe("Testing Stories Repository: ", () => {
  describe("Testing findAllStories function: ", () => {
    it("should return a list of stories: ", async () => {
      // Arrange
      const size = 3;
      const skip = 0;
      jest
        .spyOn(Blog, "findAll")
        .mockImplementation(({ limit, offset }) =>
          blogDB.slice(offset, offset + limit)
        );

      // Act
      const response = await BlogRepository.getAllBlogs(size, skip);

      // Assert
      expect(Blog.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          limit: size,
          offset: skip,
        })
      );
      expect(response.length).toBe(size);
      expect(response).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: expect.any(String),
            description: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            authorId: expect.any(String),
            blogId: expect.any(String),
          }),
        ])
      );
    });
  });

  it("should throw an error if there is an error in the database query", async () => {
    // Arrange
    const limit = 3;
    const offset = 0;
    const expectedError = new Error("Database error!");
    jest.spyOn(Blog, "findAll").mockRejectedValueOnce(expectedError);

    // Act & Assert
    await expect(BlogRepository.getAllBlogs(limit, offset)).rejects.toThrow(
      expectedError
    );
  });

  describe("Testing findById function: ", () => {
    it("should return a Story by id: ", async () => {
      const blogId = "1";
      const expectedData = { ...blogDB[0] };
      jest.spyOn(Blog, "findOne").mockResolvedValueOnce(expectedData);

      const response = await BlogRepository.getBlogByBlogId(blogId);

      expect(Blog.findOne).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { blogId },
        })
      );
      expect(response).toEqual(expectedData);
    });
  });

  it("should throw an error if there is an error in the database query", async () => {
    const blogId = "1";
    const expectedError = new Error("Database error");
    jest.spyOn(Blog, "findOne").mockRejectedValueOnce(expectedError);

    await expect(BlogRepository.getBlogByBlogId(blogId)).rejects.toThrow(
      expectedError
    );
  });

  describe("Testing Create Story function: ", () => {
    it("should create an Story and return a Story body: ", async () => {
      const title = "Test 1";
      const description = "Hello world 1!";
      const createdAt = "12-12-12";
      const updatedAt = "12-12-12";
      const authorId = "1";
      const blogId = "1";

      const blog = {
        title,
        description,
        authorId,
        createdAt,
        updatedAt,

      };
      const expectedStory = {
        title,
        description,
        authorId,
        createdAt,
        updatedAt,
      };
      jest
        .spyOn(Blog, "create")
        .mockImplementation((blog) => new TestBlog(blog));
      const response = await BlogRepository.createBlog(blog);
      expect(Blog.create).toHaveBeenCalledTimes(1);
      expect(Blog.create).toHaveBeenCalledWith(blog);
      expect(response).toEqual(expect.objectContaining(expectedStory));
    });

    it("should throw an error if there is an error in the database query", async () => {
      const title = "Test 1";
      const description = "Hello world 1!";
      const createdAt = "12-12-12";
      const updatedAt = "12-12-12";
      const authorId = "1";
      const blogId = "1";

      const blog = {
        title,
        description,
        authorId,
        createdAt,
        updatedAt,
        blogId

      };

      const expectedError = new Error("Database error");

      jest.spyOn(Blog, "create").mockRejectedValueOnce(expectedError);

      await expect(BlogRepository.createBlog(blog)).rejects.toThrow(
        expectedError
      );
    });
  });

  describe("Testing Update Story function: ", () => {
    it("should update a Story and return a Story body: ", async () => {
      const title = "Test";
      const description = "Hello World!";
      const blogId = "1234";

      const blog = {
        title,
        description,
      };

      const expectedStory = new TestBlog(blog);
      jest
        .spyOn(Blog, "update")
        .mockImplementation((blog) => new TestBlog(blog));
      const response = await BlogRepository.updateBlog(blogId,blog);
      expect(Blog.update).toHaveBeenCalledTimes(1);
      expect(Blog.update).toHaveBeenCalledWith(
       blog,
        { where: { blogId } }
      );
      expect(response).toEqual(expect.objectContaining(expectedStory));
    });

    it("should throw an error if there is an error in the database query", async () => {
      const title = "Test";
      const description = "Hello World!";
      const blogId = "1234";

      const blog = {
        title,
        description,
        blogId,
      };

      const expectedError = new Error();

      jest.spyOn(Blog, "update").mockRejectedValueOnce(expectedError);

      await expect(BlogRepository.updateBlog(blogId, blog)).rejects.toThrow(
        expectedError
      );
    });
  });

  describe("Testing Delete Story function: ", () => {
    it("should delete a Story ", async () => {
      const blogId = "12345";

      jest.spyOn(Blog, "destroy").mockResolvedValueOnce(1);
      const response = await BlogRepository.deleteBlog(blogId);
      expect(Blog.destroy).toHaveBeenCalledTimes(1);
      expect(Blog.destroy).toHaveBeenCalledWith({
        where: { blogId },
      });
      expect(response).toBe(1);
    });
  });
});
