const register = require("./auth-service/register");
const isUserExistByEmail = require("./auth-service/isUserExistByEmail");
const login = require("./auth-service/login");
const isTokenExistbyUserId = require("./auth-service/isTokenExistByUserId");
const deleteRefreshToken = require("./auth-service/deleteRefreshToken");
const createRefreshToken = require("./auth-service/createRefreshToken");
const isTokenExistbyToken = require("./auth-service/isTokenExistByToken");

module.exports = {
  register,
  isUserExistByEmail,
  login,
  isTokenExistbyUserId,
  deleteRefreshToken,
  createRefreshToken,
  isTokenExistbyToken,
};
