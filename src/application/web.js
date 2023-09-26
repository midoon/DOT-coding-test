const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const healthRouter = require("../route/health.route");
const authRouter = require("../route/auth.route");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsConfiig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfiig));

app.use(healthRouter);
app.use(authRouter);

module.exports = app;
