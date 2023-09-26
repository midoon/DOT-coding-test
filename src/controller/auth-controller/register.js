const authService = require("../../service/auth.service");
const authValidation = require("../../validation/auth.validation");
const hash = require("../../util/hashing");
const { v4 } = require("uuid");

const register = async (req, res) => {
  const { error, value } = authValidation.registerUserValidation(req.body);
  if (error) {
    return res.status(403).send({
      status: false,
      status_code: 403,
      message: "Validation error",
    });
  }
  const userData = value;
  try {
    const countUser = await authService.isUserExistByEmail(userData.email);
    if (countUser === 1) {
      return res.status(409).send({
        status: false,
        status_code: 409,
        message: "User already exists",
      });
    }

    userData.user_id = v4().toString();
    userData.password = await hash.encode(userData.password, 10);
    userData.created_at = new Date();
    userData.updated_at = userData.created_at;

    const userRegistered = await authService.register(userData);

    return res.status(201).json({
      status: true,
      status_code: 201,
      message: "Success registration",
      data: { userRegistered },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "Registration error",
    });
  }
};

module.exports = register;
