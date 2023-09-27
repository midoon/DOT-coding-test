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
      email: "test-jest@gmail.com",
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  await prismaClient.user.create({
    data: {
      user_id: "id-test-2",
      username: "usernameTestJest2",
      password: await bcrypt.hash("12345678", 10),
      email: "test-jest2@gmail.com",
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
};

createTestProduct = async () => {
  await prismaClient.product.create({
    data: {
      product_id: "id-product-test-1",
      user_id: "id-test-1",
      name: "name-test-1",
      price: "10000",
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  await prismaClient.product.create({
    data: {
      product_id: "id-product-test-2",
      user_id: "id-test-1",
      name: "name-test-2",
      price: "20000",
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
};

module.exports = {
  removeTestUser,
  createTestUser,
  createTestProduct,
};
