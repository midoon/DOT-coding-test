const express = require("express");
const authController = require("../controller/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

const authRouter = new express.Router();

authRouter.post("/api/auth/register", authController.register);
authRouter.post("/api/auth/login", authController.login);
authRouter.post("/api/auth/refresh", authController.refresh);
authRouter.post("/api/auth/logout", authMiddleware, authController.logout);

module.exports = authRouter;
