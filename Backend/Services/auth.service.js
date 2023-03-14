const userUtils = require("../utils/user.utils");
const authRepository = require("../repository/auth.repository");
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

  try {
    //const id = crypto.randomUUID();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

    const result = await authRepository.register(user);
    return result;
  } catch (err) {
    throw err;
  }
}

async function login(user) {
  try {
    const userExists = await authRepository.checkUserExists(
      user.username.toLowerCase()
    );

    // console.log(user.password);
    // console.log(userExists.password);

    if (userExists) {
      const validPass = await bcrypt.compare(
        user.password,
        userExists.password
      );
      console.log(user.password);
      console.log(userExists.password);

      console.log(validPass);
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

module.exports = { register, login };
