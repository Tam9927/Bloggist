const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    let accessToken = req.cookies.jwt;
    console.log(accessToken);
    if (!accessToken) {
      return res.status(403).send("Cannot access this route");
    }
    const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (err) {
    console.log(err.message);
    return res.status(401).send("Invalid JWT token");
  }
};

module.exports = authMiddleware;