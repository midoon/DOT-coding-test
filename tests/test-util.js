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

const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      user_id: "id-test-1",
      username: "usernameTestJest",
      password: await bcrypt.hash("12345678", 10),
      email: "test@gmail.com",
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
};

module.exports = {
  removeTestUser,
  createTestUser,
};
