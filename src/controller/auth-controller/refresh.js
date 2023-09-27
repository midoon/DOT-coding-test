const authService = require("../../service/auth.service");
const authValidation = require("../../validation/auth.validation");
const jwt = require("../../util/jwt");

const refresh = async (req, res) => {
  const { error, value } = authValidation.refreshTokenValidation(req.body);
  if (error) {
    return res.status(403).send({
      status: false,
      status_code: 403,
      message: "Validation error",
    });
  }
  const tokenDataReq = value;
  try {
    const countToken = await authService.isTokenExistbyToken(
      tokenDataReq.refresh_token
    );
    if (countToken !== 1) {
      return res.status(403).send({
        status: false,
        status_code: 403,
        message: "Unauthorized",
      });
    }

    const { decoded } = jwt.verifyJwt(tokenDataReq.refresh_token);
    const email = decoded.payload.email;
    const user_id = decoded.payload.user_id;
    const username = decoded.payload.username;

    const dataToken = {
      email,
      user_id,
      username,
    };

    const accessToken = jwt.signJwt(dataToken, "1d");
    return res.status(200).send({
      status: true,
      status_code: 200,
      message: "Success refresh token",
      data: {
        access_token: accessToken,
      },
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "Refresh token error",
    });
  }
};

module.exports = refresh;
