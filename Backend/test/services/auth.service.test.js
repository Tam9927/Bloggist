const authController = require("../../controller/auth.controller");
const authService = require("../../services/auth.service");
const userService = require("../../services/user.service");
const bcrypt = require("bcrypt");

const { userValidator } = require("../../utils/user.validation");
const { hashPasswordGenerator } = require("../../utils/HashingUtil");

jest.mock("../../utils/user.validation.js");
jest.mock("../../utils/content-negotiation");
jest.mock("../../utils/user.validation");
jest.mock("../../utils/HashingUtil.js");

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
    expect(userService.registerUser).toHaveBeenCalledTimes(1);
    expect(userService.registerUser).toHaveBeenCalledWith(user);
    expect(response).toEqual({ message: expectedResponse });
  });

  test("should throw an error while trying to signup a user without any username", async () => {
    const user = {
      username: "",
      email: "testuser@example.com",
      password: "password",
    };

    userValidator.mockReturnValue({
      valid: false,
      message: "Please enter all the fields",
    });

    await expect(authService.register(user)).rejects.toThrow(
      Object.assign(new Error("Please enter all the fields", { status: 400 }))
    );
  });

  test("should throw an error because of duplicate username", async () => {
    const user = {
      username: "tahmid",
      email: "testuser@example.com",
      password: "password",
    };
    const username = "tahmid";

    userValidator.mockReturnValue({
      valid: true,
      message: "Credentials are valid",
    });

    userService.findDuplicateUsername.mockReturnValue(username);

    await expect(authService.register(user)).rejects.toThrow(
      Object.assign(new Error("Username is already in use!", { status: 400 }))
    );
  });

  test("should throw an error because of duplicate email", async () => {
    const user = {
      username: "tahmid",
      email: "testuser@example.com",
      password: "password",
    };
    const email = "testuser@example.com";

    userValidator.mockReturnValue({
      valid: true,
      message: "Credentials are valid",
    });

    userService.findDuplicateUsername.mockReturnValue(false);

    userService.findDuplicateEmail.mockReturnValue(email);

    await expect(authService.register(user)).rejects.toThrow(
      Object.assign(new Error("Email is already in use!", { status: 400 }))
    );
  });
});

describe("Testing login function", () => {
  it("should work and call user service to register a user", async () => {

    const user = {
      username: "newUser",
      password: "thisisnew",
    };

    const newUser = {
      message: {
        Id: "2d805d2b-c234-4c3b-b574-291e82f48c5a",
        username: "newUser",
        email: "new@gmail.com",
        password: "35q3eqydaqudawdiaud",
        updatedAt: "2023-00-00T00:00:00.000Z",
        createdAt: "2023-00-00T00:00:00.000Z",
      },
    };

    const expectedResponse = newUser;

    jest.spyOn(userService, "loginUser").mockReturnValue(newUser);
    jest.spyOn(bcrypt, "compare").mockResolvedValue(true);

    const response = await authService.loginUser(user);

    expect(userService.loginUser).toHaveBeenCalledWith(
      user.username.toLowerCase()
    );
    expect(userService.loginUser).toHaveBeenCalledTimes(1);
    expect(response).toEqual({ message: expectedResponse });
  });

  test("should throw an error because of incorrect password", async () => {
    const user = {
      username: "tahmid",
      email: "testuser@example.com",
      password: "password",
    };

    const newUser = {
      message: {
        Id: "2d805d2b-c234-4c3b-b574-291e82f48c5a",
        username: "newUser",
        email: "new@gmail.com",
        password: "35q3eqydaqudawdiaud",
        updatedAt: "2023-00-00T00:00:00.000Z",
        createdAt: "2023-00-00T00:00:00.000Z",
      },
    };

    const expectedResponse = newUser;

    jest.spyOn(userService, "loginUser").mockReturnValue(expectedResponse);

    const password = "notsamepassword";

    jest.spyOn(userService, "loginUser").mockReturnValue(newUser);
    jest.spyOn(bcrypt, "compare").mockResolvedValue(false);

    await expect(authService.loginUser(user)).rejects.toThrow(
      Object.assign(new Error("Incorrect Password Entered!", { status: 400 }))
    );
  });
});
