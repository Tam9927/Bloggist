'use strict'
const express = require("express");
const router = express.Router();
const userRouter = require("./user.router");
const authRouter = require("./auth.router");
const blogRouter = require("./blog.router");

router.use("/users",userRouter);

router.use("/auth", authRouter);

router.use("/blogs", blogRouter); 

module.exports = router;
