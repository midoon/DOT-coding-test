const productService = require("../../service/product.service");
const productValidation = require("../../validation/product.validation");

const updateProduct = async (req, res) => {
  const { error, value } = productValidation.updateProductValidation(req.body);
  if (error) {
    return res.status(403).send({
      status: false,
      status_code: 403,
      message: "Validation error",
    });
  }
  const dataProduct = value;
  try {
    const isExistProduct = await productService.getProductById(
      req.params.product_id
    );

    if (isExistProduct === null) {
      return res.status(404).send({
        status: false,
        status_code: 404,
        message: "Product not found",
      });
    }

    //pencegahan IDOR
    if (req.user.user_id !== isExistProduct.user_id) {
      return res.status(403).send({
        status: false,
        status_code: 403,
        message: "Forbidden",
      });
    }

    dataProduct.updated_at = new Date();

    const productUpdated = await productService.updateProduct(
      req.params.product_id,
      dataProduct
    );
    return res.status(200).send({
      status: true,
      status_code: 200,
      message: "Success update product",
      data: productUpdated,
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      nessage: "Get product error",
    });
  }
};

module.exports = updateProduct;
