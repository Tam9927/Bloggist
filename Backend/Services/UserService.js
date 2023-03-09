
const UserRepository = require("../repository/user.repository");

require("email-validator");
require("bcrypt"); 
require('uuid');


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

const data = await UserRepository.getAllUsers();
console.log(data);
return data;

}

async function FindUser(username) {

const result = await UserRepository.getUser(username.toLowerCase());
return result;

}


async function CreateUser (username, email, password) {
    username = username.toLowerCase();
    
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        return await { status: 400, message: 'Username can only contain English alphabets and digits'};
    }


  }

  async function updateUser(username, password) {
    
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT));
    const {rowCount} = await UsersRepository.updateUser(username.toLowerCase(), hashedPassword);
    if (rowCount === 0) {
        return {status: 404, message: 'User not found'};
    }
    return {status: 200, message: 'User updated!'};
  }

async function deleteUser(username){

  try{
    const result = await UserRepository.deleteUser(username.toLowerCase());
    
    if(result.affectedRows === 0){
      return {status:404, message:'User not found'};
    }

    return {status:200, message:'User removed'};
  }
  catch{
    return {status:404, message:'User not found'};
  }



}



module.exports =
{

    FindAllUsers,
    FindUser,
    deleteUser,
    CreateUser
    
}



