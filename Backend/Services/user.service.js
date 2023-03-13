const UserRepository = require("../repository/user.repository");
const userUtils = require("../utils/validation");
const hashPassword = require("../utils/hashing");
const validator = require("email-validator");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const uuid = require("uuid");


async function findAllUsers() {
  try {
    const data = await UserRepository.getAllUsers();
    if (data.length == 0) {
      return { status: 200, message: "Users table is empty!" };
    }
    return { status: 200, message: data };
  } catch {
    return { status: 500, message: "Internal server error!" };
  }
}

async function findUserName(username) {
  try {
    const result = await UserRepository.getUserName(username.toLowerCase());
    if (result.length == 0) {
      return { status: 404, message: "User not found" };
    }
    return { status: 200, message: result };
  } catch {
    return { status: 400, message: "Internal Error" };
  }
}

async function findByEmail(email) {
  const Email = await UserRepository.getUserByEmail(email);
  if (Email.length > 0) {
    return { status: 200, message: "User Found" };
  }

  return { status: 404, message: "User not found" };
}

async function createUser(user) {
  const userValid = userUtils.userValidator(
    user.username,
    user.email,
    user.password
  );
  if (!userValid.valid) {
    return { status: 400, message: userValid.message };
  }

  const usernameDuplicate = await findUserName(user.username);
  if (usernameDuplicate.status == 200) {
    return { status: 400, message: "Username already used!" };
  }

  const emailDuplicate = await findByEmail(user.email);
  if (emailDuplicate.status == 200) {
    return { status: 400, message: "Email is already in use!" };
  }

  try {
    const id = crypto.randomUUID();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const data = await UserRepository.createUser(
      id,
      user.email,
      hashedPassword,
      user.username.toLowerCase()
    );
    console.log(data);
    return { status: 201, message: "User created successfully" };
  } catch {
    return { status: 400, message: "Please check your credentials again" };
  }
}

async function deleteUser(username) {
  try {
    const result = await UserRepository.deleteUser(username.toLowerCase());

    if (!result) {
      return { status: 404, message: "User not found" };
    }

    return { status: 200, message: "User removed" };
  } catch {
    return { status: 400, message: "An Error Occured" };
  }
}

async function updateUser(username, user) {
  try {
    
    const hashedPassword = await hashPassword.hashingPassword(user.password)

    const result = await UserRepository.updateUser(
      username.toLowerCase(),
      hashedPassword
    );

    if (result == 0) {
      return { status: 404, message: "User not found" };
    }
    return { status: 200, message: "User updated" };
  } catch {
    return { status: 400, message: "Update failed" };
  }
}

module.exports = {
  findAllUsers,
  findUserName,
  findByEmail,
  deleteUser,
  createUser,
  updateUser,
};
