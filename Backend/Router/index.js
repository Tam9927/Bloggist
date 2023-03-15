const express = require('express');
const router = express.Router();
const userRouter = require('./user.router');
const authRouter = require('./auth.router');
const authMiddleware = require('../Middleware/auth.middleware')

router.use('/users',authMiddleware, userRouter);
router.use('/auth',authRouter);

module.exports = router;