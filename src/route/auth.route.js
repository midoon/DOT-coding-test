const express = require("express");
const authController = require("../controller/auth.controller");

const authRouter = new express.Router();

authRouter.post("/api/auth/register", authController.register);

module.exports = authRouter;
