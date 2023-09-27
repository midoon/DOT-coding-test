const supertest = require("supertest");
const app = require("../src/application/web");
const { removeTestUser, createTestUser } = require("./test-util");

//CREATE PRODUCT
describe("POST /api/product/create", () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can create new prodcut", async () => {
    const logedUser = await supertest(app).post("/api/auth/login").send({
      password: "12345678",
      email: "test@gmail.com",
    });

    const access_token = logedUser.body.data.access_token;

    const result = await supertest(app)
      .post("/api/product/create")
      .send({
        name: "testProduct",
        price: "100000",
      })
      .set("Authorization", `Bearer ${access_token}`);

    expect(result.status).toBe(201);
    expect(result.body.status).toBe(true);
    expect(result.body.status_code).toBe(201);
    expect(result.body.message).toBe("Success create product");
  });

  it("should reject create new prodcut if field null", async () => {
    const logedUser = await supertest(app).post("/api/auth/login").send({
      password: "12345678",
      email: "test@gmail.com",
    });

    const access_token = logedUser.body.data.access_token;

    const result = await supertest(app)
      .post("/api/product/create")
      .send({
        name: "",
        price: "",
      })
      .set("Authorization", `Bearer ${access_token}`);

    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Validation error");
  });

  it("should reject if user unauthorized (without access token) ", async () => {
    const result = await supertest(app).post("/api/product/create").send({
      name: "testProduct",
      price: "100000",
    });
    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Forbidden");
  });

  it("should reject if user wrong token ", async () => {
    const result = await supertest(app)
      .post("/api/product/create")
      .send({
        name: "testProduct",
        price: "100000",
      })
      .set("Authorization", `Bearer tokenSalah`);
    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Forbidden");
  });
});