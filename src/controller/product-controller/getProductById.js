const productService = require("../../service/product.service");

const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.product_id);
    if (product === null) {
      return res.status(404).send({
        status: false,
        status_code: 404,
        message: "Product not found",
      });
    }
    return res.status(200).send({
      status: true,
      status_code: 200,
      message: "Success get product",
      data: product,
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      nessage: "Get product error",
    });
  }
};

module.exports = getProductById;
