const blogService = require("../../services/blog.service");
const userService = require("../../services/user.service");
const blogRepository = require("../../repository/blog.repository");
const { blogDB, userDB } = require("../testDB");
const paginator = require("../../utils/pagination");
const blogDTO = require("../../dto/blog.dto");

describe("Testing User Service", () => {
  describe("Testing getAllUsers Function: ", () => {
    it("getAllUsers: Return all blogs in response", async () => {
      const pageNumber = 1;
      const pageSize = 5;

      const offset = (pageNumber - 1) * pageSize;
      const limit = pageSize;

      const expectedResponse = blogDB;

      jest
        .spyOn(blogRepository, "getAllBlogs")
        .mockResolvedValue(expectedResponse);

      const response = await blogService.getAllBlogs(pageNumber, pageSize);

      expect(blogRepository.getAllBlogs).toHaveBeenCalledTimes(1);
      expect(blogRepository.getAllBlogs).toHaveBeenCalledWith(offset, limit);

      expect(response).toStrictEqual({ message: expectedResponse });
    });
  });

  describe("Testing getBlogByBlogId Function: ", () => {
    it("getAllUsers: Return all blogs in response", async () => {
      const blogId = "1";
      const pageSize = 5;

      const initialResponse = blogDB[0];

      const blogDTOResponse = new blogDTO(blogDB[0]);

      jest
        .spyOn(blogRepository, "getBlogByBlogId")
        .mockResolvedValue(initialResponse);

      const response = await blogService.getBlogByBlogId(blogId);

      expect(blogRepository.getBlogByBlogId).toHaveBeenCalledTimes(1);
      expect(blogRepository.getBlogByBlogId).toHaveBeenCalledWith(blogId);

      expect(response).toStrictEqual({ message: blogDTOResponse });
    });
  });

  describe("Testing getBlogByBlogId Function: ", () => {
    it("getAllUsers: Return all blogs in response", async () => {
      const blogId = "1";
      const pageSize = 5;

      const initialResponse = blogDB[0];

      const blogDTOResponse = new blogDTO(blogDB[0]);

      jest
        .spyOn(blogRepository, "getBlogByBlogId")
        .mockResolvedValue(initialResponse);

      const response = await blogService.getBlogByBlogId(blogId);

      expect(blogRepository.getBlogByBlogId).toHaveBeenCalledTimes(1);
      expect(blogRepository.getBlogByBlogId).toHaveBeenCalledWith(blogId);

      expect(response).toStrictEqual({ message: blogDTOResponse });
    });
  });

  describe("Testing createBlog Function: ", () => {
    it("should create the blog return success", async () => {
      const username = "tahmid";

      const blog = {
        title: "new blog",
        description: "this is a new blog",
      };

      const newBlog = {
        blogId: "7",
        title: "new blog",
        description: "this is a new blog",
        createdAt: "2023-03-30T04:45:00.000Z",
        updatedAt: "2023-03-30T04:45:00.000Z",
        authorId: "003",
      };

      const expectedUser = {
        username: "tahmid",
        email: "mik858692@gmail.com",
        createdAt: "12-12-12",
        updatedAt: "12-12-12",
        Id: "12345",
      };

      const expectedResponse = newBlog;

      jest
        .spyOn(blogRepository, "createBlog")
        .mockResolvedValue(expectedResponse);

      jest
        .spyOn(userService, "findUserByUserName")
        .mockReturnValue({ message: userDB[0] });

      blog.authorId = expectedUser.Id;

      const response = await blogService.createBlog(blog, username);

      expect(blogRepository.createBlog).toHaveBeenCalledTimes(1);
      expect(blogRepository.createBlog).toHaveBeenCalledWith(blog);

      expect(response).toStrictEqual({ message: expectedResponse });
    });
  });

  describe("Testing updateBlog Function: ", () => {
    it("getAllUsers: Return all blogs in response", async () => {
      const blogId = "1";

      const blog = {
        title: "new blog",
        description: "this is a new blog",
      };

      const expectedResponse = { message: "Blog Updated Successfully" };

      jest
        .spyOn(blogRepository, "updateBlog")
        .mockResolvedValue(expectedResponse);

      const response = await blogService.updateBlog(blogId, blog);

      expect(blogRepository.updateBlog).toHaveBeenCalledTimes(1);
      expect(blogRepository.updateBlog).toHaveBeenCalledWith(blogId, blog);

      expect(response).toStrictEqual(expectedResponse);
    });
  });
});
