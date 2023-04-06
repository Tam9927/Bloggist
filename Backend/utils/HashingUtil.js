const bcrypt = require("bcrypt");

async function hashPasswordGenerator(password){

    const saltRounds = parseInt(process.env.SALTROUND);
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;

}

module.exports = {hashPasswordGenerator};