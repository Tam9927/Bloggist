const bcrypt = require('bcrypt');
const userUtils = require('../utils/user.utils');
const UserService = require('./user.service');
require('dotenv').config();

async function register(user) {
    const userValid = userUtils.userValidator(user.username, user.email, user.password);

    if (!userValid.valid) {
        return { status: 400, message: userValid.message };
    }

    const usernameDuplicate = await UserService.findUserByUserName(user.username);
    if (usernameDuplicate.status === 200) {
        return { status: 400, message: 'Username already used' };
    }

    const emailDuplicate = await UserService.findUserByEmail(user.email);
    if (emailDuplicate.status === 200) {
        return { status: 400, message: 'Email is already in use!' };
    }

    // eslint-disable-next-line no-useless-catch
    try {
        const saltRounds = parseInt(process.env.SALTROUND, 10);
        const salt = await bcrypt.genSalt(saltRounds);

        const hashedPassword = await bcrypt.hash(user.password, salt);
        // eslint-disable-next-line no-param-reassign
        user.password = hashedPassword;

        const result = await UserService.registerUser(user);
        return { status: 200, message: result.message };
    } catch (err) {
        throw err;
    }
}

async function loginUser(user) {
    // eslint-disable-next-line no-useless-catch
    try {
        const name = user.username.toLowerCase();
        const userExists = await UserService.loginUser(name);
        const { password } = userExists.message;

        if (password) {
            const validPass = await bcrypt.compare(user.password, password);

            if (!validPass) {
                return { status: userExists.status, message: userExists.message };
            }
            return { status: 200, message: userExists.message };
        }
        return { status: userExists.status, message: userExists.message };
    } catch (err) {
        throw err;
    }
}

module.exports = { register, loginUser };
