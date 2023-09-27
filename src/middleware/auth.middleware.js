const authService = require("../service/auth.service");
const jwt = require("../util/jwt");

const authMiddleware = async (req, res, next) => {
  try {
    const access_token = req.headers.authorization?.replace(/^Bearer\s/, "");
    if (!access_token) throw error;
    const token = jwt.verifyJwt(access_token);
    if (!token.valid) throw error;
    if (token.expired) throw error;
    if (token.decoded) req.user = token.decoded.payload;
    const countRefreshToken = await authService.isTokenExistbyUserId(
      token.decoded.payload.user_id
    );
    if (countRefreshToken !== 1) throw error;
    return next();
  } catch (error) {
    return res.status(403).send({
      status: false,
      status_code: 403,
      message: "Forbidden",
    });
  }
};

module.exports = authMiddleware;
