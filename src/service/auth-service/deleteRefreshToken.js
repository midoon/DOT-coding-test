const prismaClient = require("../../application/database");

const deleteRefreshToken = async (user_id) => {
  try {
    return await prismaClient.token.delete({
      where: {
        user_id: user_id,
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = deleteRefreshToken;
