const productService = require("../../service/product.service");

const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.product_id);
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
