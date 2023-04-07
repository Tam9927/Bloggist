const userController = require("../../controller/user.controller");
const userService = require("../../services/user.service");
const { userDB } = require("../testDB");
const contentNegotiation = require("../../utils/content-negotiation");
const paginator = require("../../utils/pagination");

const req = { body: {}, query: {} };
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const expectedResponse = [
  {
    username: "testuser",
    email: "testuser@example.com",
    password: "password",
    createdAt: "2023-03-22T10:30:55.000Z",
    updateAt: "2023-03-28T10:57:10.000Z",
  },
  {
    username: "testuser2",
    email: "testuser2@example.com",
    password: "password2",
    createdAt: "2023-03-23T10:30:55.000Z",
    updateAt: "2023-03-29T10:57:10.000Z",
  },
];

describe("Testing User Controller", () => {
  describe("Testing getAllUsers Function: ", () => {
    it("getAllUsers: Return all users in response", async () => {
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

      const next = jest.fn();
      const expectedResponse = userDB;

      jest
        .spyOn(userService, "findAllUsers")
        .mockResolvedValue(expectedResponse);

      jest
        .spyOn(contentNegotiation, "sendResponse")
        .mockResolvedValue(expectedResponse);

      const response = await userController.getAllUsers(req, res);

      expect(userService.findAllUsers).toHaveBeenCalledTimes(1);
      expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
      contentNegotiation.sendResponse.mockClear();
    });

    it("Should return an error", async () => {
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

      const next = jest.fn();
      const expectedError = err;

      jest.spyOn(userService, "findAllUsers").mockResolvedValue(expectedError);

      const response = await userController.getAllUsers(req, res);

      expect(userService.findAllUsers).toHaveBeenCalledTimes(1);
      contentNegotiation.sendResponse.mockClear();
    });
  });

  describe("Testing getUserByUsername Function: ", () => {
    it("getUserByUsername: Return a user response by username", async () => {
      const username = "test";
      const req = {
        params: {
          username: username,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const expectedResponse = {
        user: {
          Id: "11af8088-2fd6-449b-9b57-7cc36e757ab1",
          username: "test",
          email: "test@cefalo.com",
          createdAt: "2023-04-03T02:12:16.000Z",
          updatedAt: "2023-04-03T03:18:09.000Z",
        },

        status: 200,
      };

      jest
        .spyOn(userService, "findUserByUserName")
        .mockResolvedValue(expectedResponse);

      jest
        .spyOn(contentNegotiation, "sendResponse")
        .mockResolvedValue(expectedResponse);

      const response = await userController.getUserByUsername(req, res);

      expect(userService.findUserByUserName).toHaveBeenCalledTimes(1);
      expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
      contentNegotiation.sendResponse.mockClear();
    });

    it("Should return an error if userService call fails", async () => {
      const username = "test";
      const req = {
        params: {
          username: username,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const err = { message: "Internal Server Error" };

      const expectedError = err;

      jest
        .spyOn(userService, "findUserByUserName")
        .mockResolvedValue(expectedError);

      const response = await userController.getUserByUsername(req, res);

      expect(userService.findUserByUserName).toHaveBeenCalledTimes(1);
      contentNegotiation.sendResponse.mockClear();
    });

    
  });

  describe("Testing update User", () => {
    it("should update the blog if exists and return success", async () => {
      const req = {
        body: {
          password: "123456",
        },
        params: {
          username: "tahmid",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const expectedResponse = { message: "User Updated" };

      jest.spyOn(userService, "updateUser").mockResolvedValue(expectedResponse);

      jest
        .spyOn(contentNegotiation, "sendResponse")
        .mockResolvedValue(expectedResponse);

      const response = await userController.updateUser(req, res);

      expect(userService.updateUser).toHaveBeenCalledTimes(1);
      expect(userService.updateUser).toHaveBeenCalledWith(
        req.params.username,
        req.body
      );
      expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
      contentNegotiation.sendResponse.mockClear();
    });

    it("Should return an error if userService call fails", async () => {
      const req = {
        body: {
          password: "123456",
        },
        params: {
          username: "tahmid",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const err = { message: "Internal Server Error" };

      const expectedError = err;

      jest.spyOn(userService, "updateUser").mockResolvedValue(expectedError);

      const response = await userController.updateUser(req, res);

      expect(userService.updateUser).toHaveBeenCalledTimes(1);
      contentNegotiation.sendResponse.mockClear();
    });
  });

  describe("Testing delete User", () => {
    it("should delete the blog if exists and return success", async () => {
      const req = {
        params: {
          username: "tahmid",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const expectedResponse = { message: "User Deleted" };

      jest.spyOn(userService, "deleteUser").mockResolvedValue(expectedResponse);

      jest
        .spyOn(contentNegotiation, "sendResponse")
        .mockResolvedValue(expectedResponse);

      const response = await userController.deleteUser(req, res);

      expect(userService.deleteUser).toHaveBeenCalledTimes(1);
      expect(userService.deleteUser).toHaveBeenCalledWith(req.params.username);
      expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);
      contentNegotiation.sendResponse.mockClear();
    });

    it("Should return an error if userService call fails", async () => {
      const req = {
        params: {
          username: "tahmid",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const err = { message: "Internal Server Error" };

      const expectedError = err;

      jest.spyOn(userService, "deleteUser").mockResolvedValue(expectedError);

      const response = await userController.deleteUser(req, res);

      expect(userService.deleteUser).toHaveBeenCalledTimes(1);
      contentNegotiation.sendResponse.mockClear();
    });
  });
});
