const authService = require("../../service/auth.service");
const authValidation = require("../../validation/auth.validation");
const hash = require("../../util/hashing");
const jwt = require("../../util/jwt");
const { v4 } = require("uuid");

const login = async (req, res) => {
  const { error, value } = authValidation.loginUserValidation(req.body);
  if (error) {
    return res.status(403).send({
      status: false,
      status_code: 403,
      message: "Validation error",
    });
  }

  const userData = value;
  try {
    //login dengan mencari email di DB
    const logedUser = await authService.login(userData.email);
    if (logedUser === null) {
      return res.status(404).send({
        status: false,
        status_code: 404,
        message: "Wrong email or password",
      });
    }

    const validPassword = hash.decode(userData.password, logedUser.password);
    if (!validPassword) {
      return res.status(404).send({
        status: false,
        status_code: 404,
        message: "Wrong email or password",
      });
    }

    //check us exxist token in DB based on user_id
    const countToken = await authService.isTokenExistbyUserId(
      logedUser.user_id
    );

    if (countToken === 1) {
      await authService.deleteRefreshToken(logedUser.user_id);
    }

    //data user yang akan di tanam dalam token
    const dataToken = {
      user_id: logedUser.user_id,
      username: logedUser.username,
      email: logedUser.email,
    };

    const refreshToken = jwt.signJwt(dataToken, "3d");
    // data recoed refresh token di DB
    const dataRecordToken = {
      token_id: v4().toString(),
      refresh_token: refreshToken,
      user_id: logedUser.user_id,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const { refresh_token } = await authService.createRefreshToken(
      dataRecordToken
    );

    const accessToken = jwt.signJwt(dataToken, "1d");

    return res.status(201).send({
      status: true,
      status_code: 201,
      message: "Success login",
      data: {
        access_token: accessToken,
        refresh_token: refresh_token,
      },
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "Login error",
    });
  }
};

module.exports = login;
