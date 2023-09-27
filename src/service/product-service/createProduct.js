const prismaClient = require("../../application/database");

const createProduct = async (payload) => {
  try {
    return await prismaClient.product.create({
      data: payload,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = createProduct;
