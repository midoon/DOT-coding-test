const authService = require("../../service/auth.service");

const logout = async (req, res) => {
  try {
    await authService.deleteRefreshToken(req.user.user_id);
    return res.status(200).send({
      status: true,
      status_code: 200,
      message: "Success logout",
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "Logout error",
    });
  }
};

module.exports = logout;
