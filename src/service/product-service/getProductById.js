const prismaClient = require("../../application/database");

const getProductById = async (product_id) => {
  try {
    return await prismaClient.product.findUnique({
      where: {
        product_id,
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = getProductById;
