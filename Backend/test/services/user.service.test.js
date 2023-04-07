const userService = require("../../services/user.service");
const userRepository = require("../../repository/user.repository");
const { userDB } = require("../testDB");
const paginator = require("../../utils/pagination");
const userDTO = require("../../dto/user.dto");
const { hashPasswordGenerator } = require("../../utils/HashingUtil");

const req = { body: {}, query: {} };
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

jest.mock("../../utils/user.validation");
jest.mock("../../utils/content-negotiation");
jest.mock("../../services/auth.service");
jest.mock("../../utils/user.validation");
jest.mock("../../utils/HashingUtil.js");

const users = [
  {
    user: {
      Id: "001",
      username: "testuser",
      email: "testuser@example.com",
      createdAt: "2023-03-22T10:30:55.000Z",
      updateAt: "2023-03-28T10:57:10.000Z",
    },
    user: {
      Id: "001",
      username: "testuser2",
      email: "testuser2@example.com",
      createdAt: "2023-03-23T10:30:55.000Z",
      updateAt: "2023-03-29T10:57:10.000Z",
    },

    user: {
      Id: "001",
      username: "testuser2",
      email: "testuser2@example.com",
      createdAt: "2023-03-23T10:30:55.000Z",
      updateAt: "2023-03-29T10:57:10.000Z",
    },

    user: {
      Id: "001",
      username: "testuser2",
      email: "testuser2@example.com",
      createdAt: "2023-03-23T10:30:55.000Z",
      updateAt: "2023-03-29T10:57:10.000Z",
    },
  },
];

describe("Testing User Service", () => {
  describe("Testing getAllUsers Function: ", () => {
    it("getAllUsers: Return all users in response", async () => {
      const pageNumber = 1;
      const pageSize = 5;

      const offset = (pageNumber - 1) * pageSize;
      const limit = pageSize;

      const initialResponse = users;
      const dtoUsers = [];

      users.forEach((user) => {
        const dtoUser = new userDTO(user);
        dtoUsers.push(dtoUser);
      });

      const expectedResponse = { message: dtoUsers };

      jest
        .spyOn(userRepository, "getAllUsers")
        .mockResolvedValue(initialResponse);

      const response = await userService.findAllUsers(pageNumber, pageSize);

      expect(userRepository.getAllUsers).toHaveBeenCalledTimes(1);
      expect(userRepository.getAllUsers).toHaveBeenCalledWith(offset, limit);

      expect(response).toStrictEqual(expectedResponse);
    });

    it("Should Fail because users table found empty", async () => {
      const pageNumber = 1;
      const pageSize = 5;

      jest.spyOn(userRepository, "getAllUsers").mockResolvedValue([]);

      await expect(
        userService.findAllUsers(pageNumber, pageSize)
      ).rejects.toThrow(
        Object.assign(new Error("No user in users table!", { status: 400 }))
      );
    });
  });

  describe("Testing getUserByUsername Function: ", () => {
    it("getAllUsers: Return a user in response", async () => {
      const username = "Tahmid";

      const initialResponse = userDB[0];
      const dtoUser = new userDTO(initialResponse);

      const expectedResponse = { message: dtoUser };

      jest
        .spyOn(userRepository, "getUserByUserName")
        .mockResolvedValue(initialResponse);

      const response = await userService.findUserByUserName(username);

      expect(userRepository.getUserByUserName).toHaveBeenCalledTimes(1);
      expect(userRepository.getUserByUserName).toHaveBeenCalledWith(
        username.toLowerCase()
      );

      expect(response).toStrictEqual(expectedResponse);
    });

    it("Should fail because no user found", async () => {
      const username = "Tahmid";

      jest.spyOn(userRepository, "getUserByUserName").mockResolvedValue(false);

      await expect(userService.findUserByUserName(username)).rejects.toThrow(
        Object.assign(new Error("Username doesn't exist!", { status: 400 }))
      );
    });
  });

  describe("Testing findDuplicateEmail Function: ", () => {
    it("Return a user in response", async () => {
      const email = "mik858692@gmail.com";

      const expectedResponse = userDB[0];

      jest
        .spyOn(userRepository, "getUserByEmail")
        .mockResolvedValue(expectedResponse);

      const response = await userService.findDuplicateEmail(email);

      expect(userRepository.getUserByEmail).toHaveBeenCalledTimes(1);
      expect(userRepository.getUserByEmail).toHaveBeenCalledWith(email);

      expect(response).toStrictEqual(expectedResponse);
    });
  });

  describe("Testing findDuplicateUserNmae Function: ", () => {
    it("Return a user in response", async () => {
      const username = "Tahmid";

      const expectedResponse = userDB[0];

      jest
        .spyOn(userRepository, "getUserByUserName")
        .mockResolvedValue(expectedResponse);

      const response = await userService.findDuplicateUsername(username);

      expect(userRepository.getUserByUserName).toHaveBeenCalledTimes(1);
      expect(userRepository.getUserByUserName).toHaveBeenCalledWith(
        username.toLowerCase()
      );

      expect(response).toStrictEqual(expectedResponse);
    });
  });

  describe("Testing Register Function: ", () => {
    it(" Register a user in response", async () => {
      const user = {
        username: "newUser",
        email: "new@gmail.com",
        password: "thisisnew",
      };

      const expectedResponse = {
        Id: "2d805d2b-c234-4c3b-b574-291e82f48c5a",
        username: "newUser",
        email: "new@gmail.com",
        password: "thisisnew",
        updatedAt: "2023-00-00T00:00:00.000Z",
        createdAt: "2023-00-00T00:00:00.000Z",
      };

      jest
        .spyOn(userRepository, "register")
        .mockResolvedValue(expectedResponse);

      const response = await userService.registerUser(user);

      expect(userRepository.register).toHaveBeenCalledTimes(1);
      expect(userRepository.register).toHaveBeenCalledWith(user);

      expect(response).toStrictEqual(expectedResponse);
    });
  });

  describe("Testing Update Function: ", () => {
    it(" Update a user in response", async () => {
      const username = "tahmid";
      const user = { password: "1234567" };

      const hashedPassword = "wq13423423eqe";

      hashPasswordGenerator.mockReturnValue(hashedPassword);

      const initialResponse = 1;
      const expectedResponse = { message: "User updated" };

      jest
        .spyOn(userRepository, "updateUser")
        .mockResolvedValueOnce(initialResponse);

      const response = await userService.updateUser(username, user.password);

      expect(userRepository.updateUser).toHaveBeenCalledTimes(1);
      expect(userRepository.updateUser).toHaveBeenCalledWith(
        username.toLowerCase(),
        hashedPassword
      );

      expect(response).toStrictEqual(expectedResponse);
    });

    it("Should fail to update user", async () => {
      const username = "tahmid";
      const user = { password: "1234567" };

      const hashedPassword = "wq13423423eqe";

      hashPasswordGenerator.mockReturnValue(hashedPassword);

      jest.spyOn(userRepository, "updateUser").mockResolvedValueOnce(0);

      await expect(
        userService.updateUser(username, user.password)
      ).rejects.toThrow(
        Object.assign(new Error("User not found!", { status: 400 }))
      );
    });
  });

  describe("Testing Delete Function: ", () => {
    it(" delete a user in response", async () => {
      const username = "tahmid";

      const initialResponse = 1;
      const expectedResponse = { message: "User removed" };

      jest
        .spyOn(userRepository, "deleteUser")
        .mockResolvedValueOnce(initialResponse);

      const response = await userService.deleteUser(username);

      expect(userRepository.deleteUser).toHaveBeenCalledTimes(1);
      expect(userRepository.deleteUser).toHaveBeenCalledWith(
        username.toLowerCase()
      );

      expect(response).toStrictEqual(expectedResponse);
    });

    it(" Should fail to delete", async () => {
      const username = "tahmid";

      const initialResponse = 1;

      jest.spyOn(userRepository, "deleteUser").mockResolvedValueOnce(0);

      await expect(userService.deleteUser(username)).rejects.toThrow(
        Object.assign(new Error("User not found!", { status: 400 }))
      );
    });
  });

  describe("Testing Login Function: ", () => {
    it("finds a user in response", async () => {
      const username = "tahmid";

      const expectedResponse = {
        Id: "2d805d2b-c234-4c3b-b574-291e82f48c5a",
        username: "tahmid",
        email: "new@gmail.com",
        password: "thisisnew",
        updatedAt: "2023-00-00T00:00:00.000Z",
        createdAt: "2023-00-00T00:00:00.000Z",
      };

      jest
        .spyOn(userRepository, "getUserByUserName")
        .mockResolvedValueOnce(expectedResponse);

      const response = await userService.loginUser(username);

      expect(userRepository.getUserByUserName).toHaveBeenCalledTimes(1);
      expect(userRepository.getUserByUserName).toHaveBeenCalledWith(
        username.toLowerCase()
      );

      expect(response).toStrictEqual({ message: expectedResponse });
    });

    it("Should fail to fina a login user", async () => {
      const username = "tahmid";

      jest
        .spyOn(userRepository, "getUserByUserName")
        .mockResolvedValueOnce(false);

      await expect(userService.loginUser(username)).rejects.toThrow(
        Object.assign(
          new Error("No User Found with this username!", { status: 400 })
        )
      );
    });
  });
});
