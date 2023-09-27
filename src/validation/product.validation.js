const Joi = require("joi");

const createProductValidation = (payload) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.string().required(),
  });

  return schema.validate(payload, { abortEarly: false });
};

const updateProductValidation = (payload) => {
  const schema = Joi.object({
    name: Joi.string().optional(),
    price: Joi.string().optional(),
  });

  return schema.validate(payload, { abortEarly: false });
};
module.exports = { createProductValidation, updateProductValidation };
