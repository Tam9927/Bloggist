const blogController = require("../../controller/blog.controller");
const blogService = require("../../services/blog.service");
const { blogDB } = require("../testDB");
const contentNegotiation = require("../../utils/content-negotiation");
const paginator = require("../../utils/pagination");
const { response } = require("../../app");

describe("Testing Blog Controller", () => {
  describe("Testing getAllBlogs Function: ", () => {
    it("getAllUsers: Return all blogs in response", async () => {
      const req = {
        query: {
          page: 1,
          limit: 5,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const expectedResponse = blogDB;

      jest
        .spyOn(blogService, "getAllBlogs")
        .mockResolvedValue(expectedResponse);

      jest
        .spyOn(contentNegotiation, "sendResponse")
        .mockResolvedValue(expectedResponse);

      const response = await blogController.getAllBlogs(req, res);

      expect(blogService.getAllBlogs).toHaveBeenCalledTimes(1);
      expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
      contentNegotiation.sendResponse.mockClear();
    });

    it("Should return an error if service call fails", async () => {
      const req = {
        query: {
          page: 1,
          limit: 5,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const err = { message: "Internal Server Error" };

      const expectedError = err;

      jest.spyOn(blogService, "getAllBlogs").mockResolvedValue(expectedError);

      const response = await blogController.getAllBlogs(req, res);

      expect(blogService.getAllBlogs).toHaveBeenCalledTimes(1);
      contentNegotiation.sendResponse.mockClear();
    });
  });

  describe("Testing getBlogByBlogId Function: ", () => {
    it("getAllUsers: Return ablog in response", async () => {
      const req = {
        params: {
          blogId: "1",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const expectedResponse = blogDB[0];

      jest
        .spyOn(blogService, "getBlogByBlogId")
        .mockResolvedValue(expectedResponse);

      jest
        .spyOn(contentNegotiation, "sendResponse")
        .mockResolvedValue(expectedResponse);

      const response = await blogController.getBlogByBlogId(req, res);

      expect(blogService.getBlogByBlogId).toHaveBeenCalledTimes(1);
      expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
      contentNegotiation.sendResponse.mockClear();
    });

    it("Should return an error if service call fails", async () => {
      const req = {
        params: {
          blogId: "1",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const err = { message: "Internal Server Error" };

      const expectedError = err;

      jest.spyOn(blogService, "getAllBlogs").mockResolvedValue(expectedError);

      await blogController.getBlogByBlogId(req, res);

      expect(blogService.getBlogByBlogId).toHaveBeenCalledTimes(1);
      contentNegotiation.sendResponse.mockClear();
    });
  });

  describe("Testing create Blog", () => {
    it("should create the blog return success", async () => {
      const req = {
        username: "tahmid",
        body: {
          title: "new blog",
          description: "this is a new blog",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const newBlog = {
        blogId: "7",
        title: "new blog",
        description: "this is a new blog",
        createdAt: "2023-03-30T04:45:00.000Z",
        updatedAt: "2023-03-30T04:45:00.000Z",
        authorId: "003",
      };

      const expectedResponse = { message: newBlog };

      jest.spyOn(blogService, "createBlog").mockResolvedValue(expectedResponse);

      jest
        .spyOn(contentNegotiation, "sendResponse")
        .mockResolvedValue(expectedResponse);

      const response = await blogController.createBlog(req, res);

      expect(blogService.createBlog).toHaveBeenCalledTimes(1);
      expect(blogService.createBlog).toHaveBeenCalledWith(
        req.body,
        req.username
      );
      expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
      contentNegotiation.sendResponse.mockClear();
    });

    it("Should return an error if service call fails", async () => {
      const req = {
        username: "tahmid",
        body: {
          title: "new blog",
          description: "this is a new blog",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const err = { message: "Internal Server Error" };

      const expectedError = err;

      jest.spyOn(blogService, "createBlog").mockResolvedValue(expectedError);

      await blogController.createBlog(req, res);

      expect(blogService.createBlog).toHaveBeenCalledTimes(1);
      contentNegotiation.sendResponse.mockClear();
    });
  });

  describe("Testing update Blog by BlogId", () => {
    it("should update the blog if exists and return success", async () => {
      const req = {
        body: {
          title: "new blog",
          description: "this is a new blog",
        },
        params: {
          blogId: "1",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const expectedResponse = { message: "Blog edited successfully" };

      jest.spyOn(blogService, "updateBlog").mockResolvedValue(expectedResponse);

      jest
        .spyOn(contentNegotiation, "sendResponse")
        .mockResolvedValue(expectedResponse);

      const response = await blogController.updateBlog(req, res);

      expect(blogService.updateBlog).toHaveBeenCalledTimes(1);
      expect(blogService.updateBlog).toHaveBeenCalledWith(
        req.params.blogId,
        req.body
      );
      expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
      contentNegotiation.sendResponse.mockClear();
    });

    it("Should return an error if service call fails", async () => {
      const req = {
        body: {
          title: "new blog",
          description: "this is a new blog",
        },
        params: {
          blogId: "1",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const err = { message: "Internal Server Error" };

      const expectedError = err;

      jest.spyOn(blogService, "updateBlog").mockResolvedValue(expectedError);

      await blogController.updateBlog(req, res);

      expect(blogService.updateBlog).toHaveBeenCalledTimes(1);
      contentNegotiation.sendResponse.mockClear();
    });
  });

  describe("Testing Delete Blog by BlogId", () => {
    it("should update the blog if exists and return success", async () => {
      const req = {
        params: {
          blogId: "1",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const expectedResponse = { message: "Blog deleted" };

      jest.spyOn(blogService, "deleteBlog").mockResolvedValue(expectedResponse);

      jest
        .spyOn(contentNegotiation, "sendResponse")
        .mockResolvedValue(expectedResponse);

      const response = await blogController.deleteBlog(req, res);

      expect(blogService.deleteBlog).toHaveBeenCalledTimes(1);
      expect(blogService.deleteBlog).toHaveBeenCalledWith(req.params.blogId);
      expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
      contentNegotiation.sendResponse.mockClear();
    });

    it("Should return an error if service call fails", async () => {
      const req = {
        params: {
          blogId: "1",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const err = { message: "Internal Server Error" };

      const expectedError = err;

      jest.spyOn(blogService, "deleteBlog").mockResolvedValue(expectedError);

      await blogController.deleteBlog(req, res);

      expect(blogService.deleteBlog).toHaveBeenCalledTimes(1);
      contentNegotiation.sendResponse.mockClear();
    });
  });
});
