const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        const accessToken = req.cookies.jwt;
        if (!accessToken) {
            return res.status(403).send('Cannot access this route');
        }
        const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.username = decode.username;
        next();
    } catch (err) {
        return res.status(401).send('Invalid JWT token');
    }
    return 0;
};

module.exports = authMiddleware;
