const Joi = require("joi");
const registerUserValidation = (payload) => {
  const schema = Joi.object({
    username: Joi.string().max(255).required(),
    email: Joi.string().max(255).email().required(),
    password: Joi.string().max(255).min(8).required(),
  });

  //biar dilakukan validasii ke semua meskipun terjadi error di awal
  return schema.validate(payload, { abortEarly: false });
};

module.exports = {
  registerUserValidation,
};
