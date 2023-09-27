const express = require("express");
const productController = require("../controller/product.controller");
const authMiddleware = require("../middleware/auth.middleware");

const productRouter = new express.Router();

productRouter.post(
  "/api/product/create",
  authMiddleware,
  productController.createProduct
);

module.exports = productRouter;
