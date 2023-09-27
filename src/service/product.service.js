const createProduct = require("./product-service/createProduct");
const getAllProduct = require("./product-service/getAllProduct");
const getProductById = require("./product-service/getProductById");
const updateProduct = require("./product-service/updateProduct");
const deleteProduct = require("./product-service/deleteProduct");

module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
