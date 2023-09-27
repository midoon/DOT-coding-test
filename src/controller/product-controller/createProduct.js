const productService = require("../../service/product.service");
const productValidation = require("../../validation/product.validation");
const { v4 } = require("uuid");

const createProduct = async (req, res) => {
  const { error, value } = productValidation.createProductValidation(req.body);
  if (error) {
    return res.status(403).send({
      status: false,
      status_code: 403,
      message: "Validation error",
    });
  }
  const dataProduct = value;
  try {
    dataProduct.product_id = v4().toString();
    dataProduct.user_id = req.user.user_id;
    dataProduct.created_at = new Date();
    dataProduct.updated_at = dataProduct.created_at;

    await productService.createProduct(dataProduct);
    return res.status(201).send({
      status: true,
      status_code: 201,
      message: "Success create product",
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      nessage: "Create product error",
    });
  }
};

module.exports = createProduct;
