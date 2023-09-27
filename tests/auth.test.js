const supertest = require("supertest");
const app = require("../src/application/web");
const { removeTestUser, createTestUser } = require("./test-util");

//REGISTRATION TEST
describe("POST /api/auth/register", () => {
  afterEach(async () => {
    await removeTestUser();
  });

  it("should can register new user", async () => {
    const result = await supertest(app).post("/api/auth/register").send({
      username: "usernameTestJest",
      password: "12345678",
      email: "test-jest@gmail.com",
    });

    expect(result.status).toBe(201);
    expect(result.body.status).toBe(true);
    expect(result.body.status_code).toBe(201);
    expect(result.body.message).toBe("Success registration");
  });

  it("should reject if length of password lessthan 8 char", async () => {
    const result = await supertest(app).post("/api/auth/register").send({
      username: "usernameTestJest",
      password: "1234",
      email: "test-jest@gmail.com",
    });

    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Validation error");
  });

  it("should reject if request null", async () => {
    const result = await supertest(app).post("/api/auth/register").send({
      username: "",
      password: "",
      email: "",
    });

    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Validation error");
  });

  it("should reject if request duplicate user", async () => {
    await supertest(app).post("/api/auth/register").send({
      username: "usernameTestJest",
      password: "12345678",
      email: "test-jest@gmail.com",
    });

    const result = await supertest(app).post("/api/auth/register").send({
      username: "usernameTestJest",
      password: "12345678",
      email: "test-jest@gmail.com",
    });

    expect(result.status).toBe(409);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(409);
    expect(result.body.message).toBe("User already exists");
  });
});

//LOGIN UNIT TESTING
describe("POST /api/auth/login", () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can login with email and password", async () => {
    const result = await supertest(app).post("/api/auth/login").send({
      password: "12345678",
      email: "test-jest@gmail.com",
    });

    expect(result.status).toBe(201);
    expect(result.body.status).toBe(true);
    expect(result.body.status_code).toBe(201);
    expect(result.body.message).toBe("Success login");
    expect(result.body.data.access_token).toBeDefined();
    expect(result.body.data.refresh_token).toBeDefined();
    expect(result.body.data.user_id).toBeDefined();
  });

  it("should reject login if password null", async () => {
    const result = await supertest(app).post("/api/auth/login").send({
      password: "",
      email: "test@gmail.com",
    });

    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Validation error");
  });

  it("should reject login if email null", async () => {
    const result = await supertest(app).post("/api/auth/login").send({
      password: "12345678",
      email: "",
    });

    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Validation error");
  });

  it("should reject login if wrong email", async () => {
    const result = await supertest(app).post("/api/auth/login").send({
      password: "12345678",
      email: "testX@gmail.com",
    });

    expect(result.status).toBe(404);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(404);
    expect(result.body.message).toBe("Wrong email or password");
  });

  it("should reject login if wrong password", async () => {
    const result = await supertest(app).post("/api/auth/login").send({
      password: "12345678x",
      email: "test@gmail.com",
    });

    expect(result.status).toBe(404);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(404);
    expect(result.body.message).toBe("Wrong email or password");
  });
});

//REFRESH TOKEN TEST
describe("POST /api/auth/refresh", () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can get access token", async () => {
    const logedUser = await supertest(app).post("/api/auth/login").send({
      password: "12345678",
      email: "test-jest@gmail.com",
    });

    const refresh_token = logedUser.body.data.refresh_token;

    const result = await supertest(app).post("/api/auth/refresh").send({
      refresh_token: refresh_token,
    });

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.status_code).toBe(200);
    expect(result.body.message).toBe("Success refresh token");
    expect(result.body.data.access_token).toBeDefined();
  });

  it("should reject if refresh token wrong", async () => {
    const result = await supertest(app).post("/api/auth/refresh").send({
      refresh_token: "token salah",
    });

    expect(result.status).toBe(401);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(401);
    expect(result.body.message).toBe("Unauthorized");
  });

  it("should reject if refresh token null", async () => {
    const result = await supertest(app).post("/api/auth/refresh").send({});

    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Validation error");
  });
});

//LOGOUT UNIT TEST
describe("POST /api/auth/logout", () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can logout", async () => {
    const logedUser = await supertest(app).post("/api/auth/login").send({
      password: "12345678",
      email: "test-jest@gmail.com",
    });

    const access_token = logedUser.body.data.access_token;

    const result = await supertest(app)
      .post("/api/auth/logout")
      .set("Authorization", `Bearer ${access_token}`);

    expect(result.status).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.status_code).toBe(200);
    expect(result.body.message).toBe("Success logout");
  });

  it("should reject logout if without Authorization header", async () => {
    const result = await supertest(app).post("/api/auth/logout");

    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Forbidden");
  });

  it("should reject logout if wrong Authorization header", async () => {
    const result = await supertest(app)
      .post("/api/auth/logout")
      .set("Authorization", `Bearer tokenSalah`);

    expect(result.status).toBe(403);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(403);
    expect(result.body.message).toBe("Forbidden");
  });
});
