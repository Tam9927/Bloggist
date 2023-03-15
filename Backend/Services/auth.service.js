const userUtils = require("../utils/user.utils");
const UserRepository = require("../repository/user.repository");
const UserService = require("../Services/user.service");
const bcrypt = require("bcrypt");

async function register(user) {
  const userValid = userUtils.userValidator(
    user.username,
    user.email,
    user.password
  );

  if (!userValid.valid) {
    return { status: 400, message: userValid.message };
  }

  const usernameDuplicate = await UserService.findUserByName(user.username);
  if (usernameDuplicate.status == 200) {
    return { status: 400, message: "Username already used!" };
  }

  const emailDuplicate = await UserService.findByEmail(user.email);
  if (emailDuplicate.status == 200) {
    return { status: 400, message: "Email is already in use!" };
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

    const result = await UserService.registerUser(user);
    return result;
  } catch (err) {
    throw err;
  }
}

async function loginUser(user) {
  try {
    const name = user.username.toLowerCase();
    const userExists = await UserService.loginUser(name);
    const password = userExists.message.password;

    if (password) {
      const validPass = await bcrypt.compare(user.password, password);

      if (!validPass) {
        return false;
      }
      return userExists;
    } else {
      return false;
    }
  } catch (err) {
    throw err;
  }
}

module.exports = { register, loginUser };
