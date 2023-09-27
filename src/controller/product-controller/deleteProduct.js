const productService = require("../../service/product.service");

const deleteProduct = async (req, res) => {
  try {
    const selectedProduct = await productService.getProductById(
      req.params.product_id
    );
    if (selectedProduct === null) {
      return res.status(404).send({
        status: false,
        status_code: 404,
        message: "Product not found",
      });
    }

    //pencegahan IDOR
    if (req.user.user_id !== selectedProduct.user_id) {
      return res.status(403).send({
        status: false,
        status_code: 403,
        message: "Forbidden",
      });
    }

    await productService.deleteProduct(req.params.product_id);
    return res.status(200).send({
      status: true,
      status_code: 200,
      message: "Success delete product",
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      nessage: "Get product error",
    });
  }
};

module.exports = deleteProduct;
