const userUtils = require('../utils/validation');
const authRepository = require('../repository/auth.repository');
const bcrypt = require('bcrypt');

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
    if (userExists) {
      const validPass = await bcrypt.compare(
        user.password,
        userExists.password
      );
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
