const express = require("express");
const authController = require("../controller/auth.controller");

const authRouter = new express.Router();

authRouter.post("/api/auth/register", authController.register);
authRouter.post("/api/auth/login", authController.login);
authRouter.post("/api/auth/refresh", authController.refresh);

module.exports = authRouter;
