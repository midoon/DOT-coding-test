const prismaClient = require("../../application/database");

const updateProduct = async (product_id, data_update) => {
  try {
    return await prismaClient.product.update({
      where: {
        product_id,
      },
      data: data_update,
      select: {
        product_id: true,
        user_id: true,
        name: true,
        price: true,
        created_at: true,
        updated_at: true,
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = updateProduct;
