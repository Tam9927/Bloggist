
const userRepository = require("../repository/user.repository");
const  { genSaltSync, hashSync } = require("bcrypt");
const { v4: uuidv4 } = require('uuid');

function isAlphaNumeric(str) {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    return alphanumericRegex.test(str);
  }
  
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function checkPassword(password) {
    if (password.length >= 6) {
      return true;
    } else {
      return false;
    }
  }



FindAllUsers = (req) => {


return userRepository.getAllUsers(req);

}

const FindUser = () => {

    const username = String(req.params.username).toLowerCase();

return userRepository.GetUser(username);

}





module.exports =
{

    FindAllUsers,
    FindUser
    
}



 