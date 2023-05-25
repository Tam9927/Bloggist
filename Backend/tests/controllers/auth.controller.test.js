const authController = require("../../controller/auth.controller");
const authService = require("../../services/auth.service");
const {
  generateToken,
  removeToken,
  checkEmptyBody,
} = require("../../utils/user.validation");
const userUtils = require("../../utils/user.validation");
const contentNegotiation = require("../../utils/content-negotiation"); 

jest.mock("../../utils/user.validation.js");
jest.mock("../../utils/content-negotiation");
jest.mock("../../services/auth.service");

describe("Testing Auth Controller", () => {
  describe("Testing logOut Function: ", () => {
    it("logOut: Should Log Out A user if successful", async () => {
      const req = {
        body: {},
      };

      const res = {
        status: jest.fn().mockReturnThis(), //http header mock standard
        json: jest.fn(),
      };

      removeToken.mockReturnValue();

      await authController.logoutUser(res);

      expect(removeToken).toHaveBeenCalledTimes(1);
    });
  });

  describe("Testing register function", () => {
    it("should call authService.register then return a new user", async () => {
      const req = {
        body: {
          username: "newUser",
          email: "new@gmail.com",
          password: "thisisnew",
        },
      };

      const newUser = {
        message: "hello",
        Id: "2d805d2b-c234-4c3b-b574-291e82f48c5a",
        username: "newUser",
        email: "new@gmail.com",
        password: "thisisnew",
        updatedAt: "2023-00-00T00:00:00.000Z",
        createdAt: "2023-00-00T00:00:00.000Z",
      };

      const accesstoken = "testaccess";

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),

        cookie: jest.fn(),
      };

      const contentNegotiateResponse = "Registration is successful";

      authService.register.mockReturnValue(newUser);

      checkEmptyBody.mockReturnValueOnce(false);
      generateToken.mockReturnValue(accesstoken);
      const spyMethod = jest
        .spyOn(contentNegotiation, "sendResponse")
        .mockResolvedValue(contentNegotiateResponse);

      await authController.registerUser(req, res);

      expect(spyMethod).toHaveBeenCalledTimes(1);

      expect(authService.register).toHaveBeenCalledTimes(1);
      expect(authService.register).toHaveBeenCalledWith(req.body);
      expect(res.cookie).toHaveBeenCalledTimes(1);
      expect(res.cookie).toHaveBeenCalledWith("jwt", accesstoken, {
        httpOnly: true,
      });
    });

    it("should not be called because of empty body ", async () => {
      const req = {
        body: {},
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        cookie: jest.fn(),
      };

      userUtils.checkEmptyBody.mockReturnValueOnce(true);

      await authController.registerUser(req, res);
      expect(authService.register).toHaveBeenCalledTimes(0);
      expect(userUtils.checkEmptyBody).toHaveBeenCalledWith(req.body)
      
    });

    it("Should be an error", async () => {
      const req = {
        body: {
          username: "newUser",
          email: "new@gmail.com",
          password: "thisisnew",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        cookie: jest.fn(),
      };

      const err = { message: "Internal Server Error" };


      jest.spyOn(authService, "register").mockResolvedValue(err);

      await authController.registerUser(req, res);

      expect(authService.register).toHaveBeenCalledTimes(1);
    });
  });

  describe("Testing login function", () => {
    it("should call authService.login then return a new user", async () => {
      const req = {
        body: {
          username: "newUser",
          password: "thisisnew",
        },
      };

      const newUser = {
        message: "hello",
        Id: "2d805d2b-c234-4c3b-b574-291e82f48c5a",
        username: "newUser",
        email: "new@gmail.com",
        password: "thisisnew",
        updatedAt: "2023-00-00T00:00:00.000Z",
        createdAt: "2023-00-00T00:00:00.000Z",
      };

      const accesstoken = "testaccess";

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),

        cookie: jest.fn(),
      };

      const contentNegotiateResponse = "Login is successful";

      authService.loginUser.mockReturnValue(newUser);

      checkEmptyBody.mockReturnValueOnce(false);
      generateToken.mockReturnValue(accesstoken);
      jest
        .spyOn(contentNegotiation, "sendResponse")
        .mockResolvedValue(contentNegotiateResponse);

      await authController.loginUser(req, res);

      expect(contentNegotiation.sendResponse).toHaveBeenCalledTimes(1);

      expect(authService.loginUser).toHaveBeenCalledTimes(1);
      expect(authService.loginUser).toHaveBeenCalledWith(req.body);
      expect(res.cookie).toHaveBeenCalledTimes(1);
      expect(res.cookie).toHaveBeenCalledWith("jwt", accesstoken, {
        httpOnly: true,
      });
    });

    it("should not be called because of empty body ", async () => {
      const req = {
        body: {},
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        cookie: jest.fn(),
      };

      userUtils.checkEmptyBody.mockReturnValueOnce(true);

      await authController.loginUser(req, res);
      expect(authService.loginUser).toHaveBeenCalledTimes(0);
      expect(userUtils.checkEmptyBody).toHaveBeenCalledWith(req.body)
    });

    it("Should return an error", async () => {
      const req = {
        body: {
          username: "newUser",
          email: "new@gmail.com",
          password: "thisisnew",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        cookie: jest.fn(),
      };

      const err = { message: "Internal Server Error" };


      jest.spyOn(authService, "loginUser").mockResolvedValue(err);

      await authController.loginUser(req, res);

      expect(authService.loginUser).toHaveBeenCalledTimes(1);
    });
  });
});
