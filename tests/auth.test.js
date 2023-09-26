const supertest = require("supertest");
const app = require("../src/application/web");
const { removeTestUser } = require("./test-util");

//REGISTRATION TEST
describe("POST /api/auth/register", () => {
  afterEach(async () => {
    await removeTestUser();
  });

  it("should can register new user", async () => {
    const result = await supertest(app).post("/api/auth/register").send({
      username: "usernameTestJest",
      password: "12345678",
      email: "test@gmail.com",
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
      email: "test@gmail.com",
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
      email: "test@gmail.com",
    });

    const result = await supertest(app).post("/api/auth/register").send({
      username: "usernameTestJest",
      password: "12345678",
      email: "test@gmail.com",
    });

    expect(result.status).toBe(409);
    expect(result.body.status).toBe(false);
    expect(result.body.status_code).toBe(409);
    expect(result.body.message).toBe("User already exists");
  });
});
