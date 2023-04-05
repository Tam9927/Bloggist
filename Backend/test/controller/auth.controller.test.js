const authController = require("../../controller/auth.controller");
const authService = require("../../services/auth.service");
const { generateToken, removeToken, checkEmptyBody } = require("../../utils/user.validation");
const { userDB } = require("../testDB");
const contentNegotiation = require("../../utils/content-negotiation");

jest.mock("../../utils/user.validation");
jest.mock("../../utils/content-negotiation");
jest.mock("../../services/auth.service");
jest.mock("../../utils/user.validation");

const expectedResponse = {
  username: "testuser",
  email: "testuser@example.com",
  password: "password",
  createdAt: "2023-03-22T10:30:55.000Z",
  updateAt: "2023-03-28T10:57:10.000Z",
};

describe("Testing Auth Controller", () => {

  describe("Testing logOut Function: ", () => {
    it("logOut: Should Log Out A user", async () => {
      const req = {
        body: {},
      };

      const res = {
        status: jest.fn().mockReturnThis(), //http header mock standard
        send: jest.fn(),
      };

      //removeToken.mockReturnValue

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
        message: 'hello',
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
        message: 'hello',
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

      const contentNegotiateResponse = "Login is successful";

      
    authService.loginUser.mockReturnValue(newUser);

    checkEmptyBody.mockReturnValueOnce(false);  
    generateToken.mockReturnValue(accesstoken);
    const spyMethod = jest
        .spyOn(contentNegotiation, "sendResponse")
        .mockResolvedValue(contentNegotiateResponse);

    await authController.loginUser(req, res);

    expect(spyMethod).toHaveBeenCalledTimes(1);

    expect(authService.loginUser).toHaveBeenCalledTimes(1);
    expect(authService.loginUser).toHaveBeenCalledWith(req.body);
    expect(res.cookie).toHaveBeenCalledTimes(1);
    expect(res.cookie).toHaveBeenCalledWith("jwt", accesstoken, {
        httpOnly: true,
      });
    });
});






});
