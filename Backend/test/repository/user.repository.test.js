const userRepository = require("../../repository/user.repository");
const User = require("../../model/user.model");
const { userDB } = require("../testDB");
const UserRegisterDTO = require('../../dto/user.register.dto')

class TestUser {
  constructor(user) {
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.createdAt = "12-12-12";
    this.updatedAt = "12-12-12";
    this.id = "12345";
  }
}

describe("Testing User Repository", () => {
  describe('Testing get all users', () => {
    it('should return array of all users', async () => {
 
        const limit = 3;
        const offset = 0;
        jest
            .spyOn(User, 'findAll')
            .mockImplementation(({offset,limit}) => {
                return userDB.slice(offset,offset+limit)
            });

        const response = await userRepository.getAllUsers(offset,limit);

        expect(User.findAll).toHaveBeenCalledWith(
            expect.objectContaining({
                offset,limit
            })
        );
         console.log(response)
        expect(response.length).toBe(limit);
        expect(response).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    username: expect.any(String),
                    email: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    Id: expect.any(String),
                }),
            ])
        );
    }),

      it("should throw an error if database query fails", async () => {
        const limit = 3;
        const offset = 1;
        const error = new Error("Error in getting all users");
        jest.spyOn(User, "findAll").mockRejectedValueOnce(error);

        await expect(userRepository.getAllUsers(offset, limit)).rejects.toThrow(
          error
        );
      });
  });

  describe("Testing findByUsername function", () => {
    it("should return a user by username", async () => {
      const username = "testuser";
      const expectedData = { ...userDB[0] };
      jest.spyOn(User, "findOne").mockResolvedValueOnce(expectedData);

      const response = await userRepository.getUserByUserName(username);

      expect(User.findOne).toHaveBeenCalledWith({
        where: { username: username.toLowerCase() },
      });
      expect(response).toEqual(expectedData);
    });

    it("should throw an error if there is an error in the database query", async () => {
      const username = "testuser";
      const expectedError = new Error("Database error");
      jest.spyOn(User, "findOne").mockRejectedValueOnce(expectedError);

      await expect(userRepository.getUserByUserName(username)).rejects.toThrow(
        expectedError
      );
    });
  });

  describe("Testing findByEmail function", () => {
    it("should return a user by email", async () => {
      const email = "testuser@gmail.com";
      const expectedData = { ...userDB[0] };
      jest.spyOn(User, "findOne").mockResolvedValueOnce(expectedData);

      const response = await userRepository.getUserByEmail(email);

      expect(User.findOne).toHaveBeenCalledWith({
        where: { email },
      });
      expect(response).toEqual(expectedData);
    });

    it("should throw an error if there is an error in the database query", async () => {
      const email = "testuser@gmail.com";
      const expectedError = new Error("Database error");
      jest.spyOn(User, "findOne").mockRejectedValueOnce(expectedError);

      await expect(userRepository.getUserByEmail(email)).rejects.toThrow(
        expectedError
      );
    });
  });

  it("should create an user and return a user body: ", async () => {
    const username = "test";
    const email = "test@cefalo.com";
    const password = "test";

    const body = {
      username: username.toLowerCase(),
      email: email,
      password: password,
    };
    const expectedUser = new UserRegisterDTO(body);
    jest.spyOn(User, "create").mockImplementation((user) => new TestUser(user));
    
    const response = await userRepository.register(body);
    expect(User.create).toHaveBeenCalledTimes(1);
    expect(User.create).toHaveBeenCalledWith(
      body
    );
    expect(response).toEqual(expect.objectContaining(expectedUser));
  });

  it("should throw an error if there is an error in the database query", async () => {
    const id = "16514651474";
    const username = "test";
    const email = "test@cefalo.com";

    const password = "test";
    const createdAt = "2023-04-01 09:59:20";
    const updatedAt = "2023-04-01 09:59:20";

    const body = {
      id: id,
      username: username,
      email: email,
      password: password,
      createdAt: createdAt,
      updatedAt: updatedAt,
    };

    const expectedError = new Error("Database error");
    jest.spyOn(User, "create").mockRejectedValueOnce(expectedError);

    await expect(userRepository.register(body)).rejects.toThrow(expectedError);
  });

  describe("Testing updateUser function: ", () => {
    it("should update a user by username and return 1", async () => {
      const username = "testuser";
      const password = "testpassword";

      jest.spyOn(User, "update").mockResolvedValueOnce([1]);

      const user = await userRepository.updateUser(username, password);

      expect(User.update).toHaveBeenCalledWith(
        { password },
        { where: { username: username.toLowerCase() } }
      );
      expect(user[0]).toBe(1);
    });

    it("should return 0 if the user does not exist", async () => {
      const username = "nonexistentuser";
      const password = "testpassword";
      jest.spyOn(User, "update").mockResolvedValueOnce([0]);

      const user = await userRepository.updateUser(username, password);

      expect(User.update).toHaveBeenCalledWith(
        { password },
        { where: { username: username.toLowerCase() } }
      );
      expect(user[0]).toBe(0);
    });

    it("should throw an error if there is an error in the database query", async () => {
      const username = "testuser";
      const password = "newpassword";
      const expectedError = new Error("Database error");
      jest.spyOn(User, "update").mockRejectedValueOnce(expectedError);

      await expect(
        userRepository.updateUser(username, password)
      ).rejects.toThrow(expectedError);
    });
  });

  describe("Testing deleteUser function: ", () => {
    it("should delete a user by username", async () => {
      const username = "testuser";
      jest.spyOn(User, "destroy").mockResolvedValueOnce(1);

      const user = await userRepository.deleteUser(username);

      expect(User.destroy).toHaveBeenCalledWith({
        where: { username: username.toLowerCase() },
      });
      expect(user).toBe(1);
    });

    it("should return 0 if the user does not exist", async () => {
      const username = "nonexistentuser";
      jest.spyOn(User, "destroy").mockResolvedValueOnce(0);

      const user = await userRepository.deleteUser(username);

      expect(User.destroy).toHaveBeenCalledWith({
        where: { username: username.toLowerCase() },
      });
      expect(user).toBe(0);
    });

    it("should throw an error if there is an error in the database query", async () => {
      const username = "testuser";
      const expectedError = new Error("Database error");
      jest.spyOn(User, "destroy").mockRejectedValueOnce(expectedError);

      await expect(userRepository.deleteUser(username)).rejects.toThrow(
        expectedError
      );
    });
  });
});
