const authController = require("../../controller/auth.controller");
const authService = require("../../services/auth.service");
const userService = require("../../services/user.service");
const bcrypt = require('bcrypt')

const { userValidator } = require("../../utils/user.validation");
const { userDB } = require("../testDB");
const contentNegotiation = require("../../utils/content-negotiation");
const { hashPasswordGenerator } = require("../../utils/HashingUtil");

jest.mock("../../utils/user.validation.js");
jest.mock("../../utils/content-negotiation");
jest.mock("../../utils/user.validation");
jest.mock("../../utils/HashingUtil.js");

const expectedResponse = {
  username: "testuser",
  email: "testuser@example.com",
  password: "password",
  createdAt: "2023-03-22T10:30:55.000Z",
  updateAt: "2023-03-28T10:57:10.000Z",
};

describe("Testing register function", () => {
  it("should work and call user service to register a user", async () => {
    const hashedPassword = "35q3eqydaqudawdiaud";

    const user = {
      username: "newUser",
      email: "new@gmail.com",
      password: "thisisnew",
    };

    const newUser = {
      Id: "2d805d2b-c234-4c3b-b574-291e82f48c5a",
      username: "newUser",
      email: "new@gmail.com",
      password: "35q3eqydaqudawdiaud",
      updatedAt: "2023-00-00T00:00:00.000Z",
      createdAt: "2023-00-00T00:00:00.000Z",
    };

    const expectedResponse = newUser;

    userValidator.mockReturnValue({
      valid: true,
      message: "Credentials are valid",
    });

    jest.spyOn(userService, "findDuplicateUsername").mockReturnValue(false);
    jest.spyOn(userService, "findDuplicateEmail").mockReturnValue(false);
    hashPasswordGenerator.mockReturnValue(hashedPassword);

    jest.spyOn(userService, "registerUser").mockReturnValue(expectedResponse);

    const response = await authService.register(user);

    expect(userValidator).toHaveBeenCalledTimes(1);
    expect(userService.registerUser).toHaveBeenCalledWith(user);
    expect(response).toEqual({ message: expectedResponse });
  });
});

describe("Testing login function", () => {
    it("should work and call user service to register a user", async () => {
      const hashedPassword = "35q3eqydaqudawdiaud";
  
      const user = {
        username: "newUser",
        password: "thisisnew",
      };
  
      const newUser = {
        message:{Id: "2d805d2b-c234-4c3b-b574-291e82f48c5a",
        username: "newUser",
        email: "new@gmail.com",
        password: "35q3eqydaqudawdiaud",
        updatedAt: "2023-00-00T00:00:00.000Z",
        createdAt: "2023-00-00T00:00:00.000Z",}
      };
  
      const expectedResponse = newUser;
  
  
      jest.spyOn(userService, "loginUser").mockReturnValue(newUser);
      jest.spyOn(bcrypt,"compare").mockResolvedValue(true);
  
      const response = await authService.loginUser(user);
  
      expect(userService.loginUser).toHaveBeenCalledWith(user.username.toLowerCase());
      expect(response).toEqual({ message: expectedResponse });
    });
  });
  