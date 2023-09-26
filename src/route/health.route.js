const express = require("express");
const healthController = require("../controller/health.controller");

const healthRouter = new express.Router();

healthRouter.get("/", healthController);

module.exports = healthRouter;
