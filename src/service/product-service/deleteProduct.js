const prismaClient = require("../../application/database");

const deleteProduct = async (product_id) => {
  try {
    return await prismaClient.product.delete({
      where: {
        product_id,
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = deleteProduct;
