const register = require("./auth-service/register");
const isUserExistByEmail = require("./auth-service/isUserExistByEmail");

module.exports = {
  register,
  isUserExistByEmail,
};
