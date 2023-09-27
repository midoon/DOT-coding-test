const register = require("./auth-controller/register");
const login = require("./auth-controller/login");
const refresh = require("./auth-controller/refresh");

module.exports = {
  register,
  login,
  refresh,
};
