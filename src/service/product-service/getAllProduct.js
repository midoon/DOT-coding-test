const prismaClient = require("../../application/database");

const getAllProduct = async () => {
  try {
    return await prismaClient.product.findMany();
  } catch (error) {
    throw error;
  }
};

module.exports = getAllProduct;
