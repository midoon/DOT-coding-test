const createProduct = require("./product-controller/createProduct");
const getAllProduct = require("./product-controller/getAllProduct");
const getProductById = require("./product-controller/getProductById");
const updateProduct = require("./product-controller/updateProduct");
const deleteProduct = require("./product-controller/deleteProduct");

module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
