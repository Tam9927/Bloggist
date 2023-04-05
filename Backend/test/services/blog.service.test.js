const blogService = require("../../services/blog.service");
const blogRepository = require("../../repository/user.repository");
const { blogDB } = require("../testDB");
const paginator = require("../../utils/pagination");
const blogDTO = require("../../dto/user.dto");


describe("Testing User Service", () => {
    describe("Testing getAllUsers Function: ", () => {
  
      it("getAllUsers: Return all blogs in response", async () => {
        const pageNumber = 1;
        const pageSize = 5;
  
        const offset = (pageNumber - 1) * pageSize;
        const limit = pageSize;
  
        const initialResponse = users ;
        const dtoUsers = []
        
        users.forEach((user) => {
          const dtoUser = new userDTO(user);
          dtoUsers.push(dtoUser);
        });
  
        const expectedResponse = {message: dtoUsers}
  
       jest
          .spyOn(userRepository, "getAllUsers")
          .mockResolvedValue(initialResponse);
          
  
  
        const response = await userService.findAllUsers(pageNumber, pageSize);
  
  
        expect(userRepository.getAllUsers).toHaveBeenCalledTimes(1);
        expect(userRepository.getAllUsers).toHaveBeenCalledWith(offset, limit);
  
        expect(response).toStrictEqual(expectedResponse);
      });
    });
  