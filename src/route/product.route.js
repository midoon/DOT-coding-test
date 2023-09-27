const express = require("express");
const productController = require("../controller/product.controller");
const authMiddleware = require("../middleware/auth.middleware");

const productRouter = new express.Router();

//private route
productRouter.post(
  "/api/product/create",
  authMiddleware,
  productController.createProduct
);
productRouter.put(
  "/api/product/:product_id",
  authMiddleware,
  productController.updateProduct
);

productRouter.delete(
  "/api/product/:product_id",
  authMiddleware,
  productController.deleteProduct
);

//public route
productRouter.get("/api/product/", productController.getAllProduct);
productRouter.get("/api/product/:product_id", productController.getProductById);

module.exports = productRouter;
