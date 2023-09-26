const prismaClient = require("../../application/database");

const isUserExistByEmail = async (email) => {
  try {
    const countUser = await prismaClient.user.count({
      where: {
        email: email,
      },
    });
    return countUser;
  } catch (error) {
    throw error;
  }
};

module.exports = isUserExistByEmail;
