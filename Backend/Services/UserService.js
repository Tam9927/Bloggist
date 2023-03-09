
const UserRepository = require("../repository/user.repository");
const userUtils = require('../utils/Validation')

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


async function createUser (body) {
    
    const userValid = userUtils.userValidator(body.username,body.email,body.password);
    
    if(!userValid.valid){
      return userValid;
    }
  
    const userDuplicate = userUtils.userDuplicate(body.username, body.email);
    if((await userDuplicate).duplicate){
      return {status:422, message: (await userDuplicate).message};
    }
  
    try{
      //const id = crypto.randomUUID();
      const hashedPassword = await hashPassword(user.password);
  
      const data = await userRepository.createUser(body.name,body.email,body.password,body.username);
      return {status:201, message:'User created successfully'};
    }
    catch{
      return {status:400, message:'Please check your credentials again'};
    }

}

  async function updateUser(username, user) {
    
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

async function updateUser (username,user) {

  try{
    const hashedPassword = await hashPassword(user.password);
    const result = await userRepository.updateUser( username,hashedPassword);
    
    //console.log(result);
    if(result.affectedRows == 0){
      return {status:404, message:'User not found'};
    }
    return {status:200, message:'User updated'};
  }
  catch{
    return {status:400, message:'User update failed'};
  }




}





module.exports =
{

    FindAllUsers,
    FindUser,
    deleteUser,
    createUser,
    updateUser
    
}



