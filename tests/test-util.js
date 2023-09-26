const prismaClient = require("../src/application/database");
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");

const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: {
        contains: "usernameTestJest",
      },
    },
  });
};

module.exports = {
  removeTestUser,
};
