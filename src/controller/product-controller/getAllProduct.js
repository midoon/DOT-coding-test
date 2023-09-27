const productService = require("../../service/product.service");

const getAllProduct = async (req, res) => {
  try {
    const allProduct = await productService.getAllProduct();
    return res.status(200).send({
      status: true,
      status_code: 200,
      message: "Success get all product",
      data: allProduct,
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      nessage: "Get all product error",
    });
  }
};

module.exports = getAllProduct;
