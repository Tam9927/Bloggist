
const UserRepository = require("../repository/user.repository");
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



async function FindAllUsers () {


return await UserRepository.getAll();

}

const FindUser = async(username) => {

     username = String(req.params.username).toLowerCase();

return await UserRepository.getUser(username);

}


createUser = async(username, email, password)=> {
    username = username.toLowerCase();
    
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        return await { status: 400, message: 'Username can only contain English alphabets and digits'};
    }


module.exports =
{

    FindAllUsers,
    FindUser
    
}



}