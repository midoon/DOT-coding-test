const supertest = require("supertest");
const app = require("../src/application/web");
const {
  removeTestUser,
  createTestUser,
  createTestProduct,
} = require("./test-util");

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
      email: "test-jest@gmail.com",
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
      email: "test-jest@gmail.com",
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

//GET ALL PRODUCT UNIT TETS
describe("GET /api/product/", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestProduct();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can get all product", async () => {
    const result = await supertest(app).get("/api/product/");

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.status_code).toBe(200);
    expect(result.body.message).toBe("Success get all product");
    expect(result.body.data).toBeDefined();
  });
});

//GET PRODUCT BY ID
describe("GET /api/product/:product_id", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestProduct();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can get product by id", async () => {
    const result = await supertest(app).get("/api/product/id-product-test-1");

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.status_code).toBe(200);
    expect(result.body.message).toBe("Success get product");
    expect(result.body.data).toBeDefined();
  });

  it("should reject get product if product_id not found", async () => {
    const result = await supertest(app).get("/api/product/id-product-test-x");

    expect(result.status).toBe(404);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(404);
    expect(result.body.message).toBe("Product not found");
  });
});

//UPDATE PRODUCT
describe("PUT /api/product/:product_id", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestProduct();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can update product by id", async () => {
    const logedUser = await supertest(app).post("/api/auth/login").send({
      password: "12345678",
      email: "test-jest@gmail.com",
    });

    const access_token = logedUser.body.data.access_token;

    const result = await supertest(app)
      .put("/api/product/id-product-test-1")
      .send({
        name: "testProduct",
        price: "1000005",
      })
      .set("Authorization", `Bearer ${access_token}`);

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.status_code).toBe(200);
    expect(result.body.message).toBe("Success update product");
    expect(result.body.data.name).toBe("testProduct");
    expect(result.body.data.price).toBe("1000005");
  });

  it("should reject  update product by id if wrong token", async () => {
    const result = await supertest(app)
      .put("/api/product/id-product-test-1")
      .send({
        name: "testProduct",
        price: "1000005",
      })
      .set("Authorization", `Bearer token salah`);

    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Forbidden");
  });

  it("should reject  update product by id if without token", async () => {
    const result = await supertest(app)
      .put("/api/product/id-product-test-1")
      .send({
        name: "testProduct",
        price: "1000005",
      });

    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Forbidden");
  });

  it("should reject update product by id if user is not have the product", async () => {
    const logedUser = await supertest(app).post("/api/auth/login").send({
      password: "12345678",
      email: "test-jest2@gmail.com",
    });

    const access_token = logedUser.body.data.access_token;

    const result = await supertest(app)
      .put("/api/product/id-product-test-1")
      .send({
        name: "testProduct",
        price: "1000005",
      })
      .set("Authorization", `Bearer ${access_token}`);

    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Forbidden");
  });
});
