const prismaClient = require("../../application/database");

const createRefreshToken = async (payload) => {
  try {
    const token = await prismaClient.token.create({
      data: payload,
      select: {
        refresh_token: true,
      },
    });
    return token;
  } catch (error) {
    throw error;
  }
};

module.exports = createRefreshToken;
