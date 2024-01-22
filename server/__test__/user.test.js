const request = require(`supertest`);
const app = require(`../app`);
const { User, Meal, Order } = require(`../models/index`);
const { signToken } = require("../helpers/jwt");

let adminToken;
let budiToken;
let cindyToken;

beforeAll(async () => {
  const admin = await User.create({
    email: "admin@mail.com",
    password: "123123",
    name: "The Admin",
    address: "Jl. Klengkeng no 8, 65116",
    phoneNumber: "081111111111",
    role: "admin",
  });

  const budi = await User.create({
    email: "budi@mail.com",
    password: "123123",
    name: "Budi Keren",
    address: "Jl. Klengkeng no 9, 65116",
    phoneNumber: "082222222222",
    role: "user",
  });

  const cindy = await User.create({
    email: "cindy@mail.com",
    password: "123123",
    name: "Cindy Kece",
    address: "Jl. Klengkeng no 10, 65116",
    phoneNumber: "083333333333",
    role: "user",
  });

  await Meal.bulkCreate(require(`../data/mealTest.json`));
  await Order.bulkCreate(require(`../data/orders.json`));

  adminToken = signToken(admin);
  budiToken = signToken(budi);
  cindyToken = signToken(cindy);
});

describe("POST /login", () => {
  it("should return access_code using email & password", async () => {
    const userData = {
      email: "budi@mail.com",
      password: "123123",
    };
    const response = await request(app).post(`/login`).send(userData);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
  });

  it("should be fail if using null email", async () => {
    const userData = {
      password: "123123",
    };
    const response = await request(app).post(`/login`).send(userData);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Email is required");
  });

  it("should be fail if using empty email", async () => {
    const userData = {
      email: "",
      password: "123123",
    };
    const response = await request(app).post(`/login`).send(userData);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Email is required");
  });

  it("should be fail if using empty password", async () => {
    const userData = {
      email: "budi@mail.com",
    };
    const response = await request(app).post(`/login`).send(userData);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Password is required");
  });

  it("should be fail if using null password", async () => {
    const userData = {
      email: "budi@mail.com",
      password: "",
    };
    const response = await request(app).post(`/login`).send(userData);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Password is required");
  });

  it("should be fail if using unregistered email", async () => {
    const userData = {
      email: "bodyman@mail.com",
      password: "123123",
    };
    const response = await request(app).post(`/login`).send(userData);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Email or Password is invalid"
    );
  });

  it("should be fail if using wrong password", async () => {
    const userData = {
      email: "budi@mail.com",
      password: "321321",
    };
    const response = await request(app).post(`/login`).send(userData);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Email or Password is invalid"
    );
  });
});

describe("POST /register", () => {
  it("should return new user id and email using email and password", async () => {
    const newUserData = {
      email: "test@mail.com",
      password: "123123",
    };
    const response = await request(app).post(`/register`).send(newUserData);

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("email", expect.any(String));
  });

  it("should be fail if using null email", async () => {
    const newUserData = {
      password: "123123",
    };
    const response = await request(app).post(`/register`).send(newUserData);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Email is required");
  });

  it("should be fail if using empty email", async () => {
    const newUserData = {
      email: "",
      password: "123123",
    };
    const response = await request(app).post(`/register`).send(newUserData);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Email is required");
  });

  it("should be fail if using already registered email", async () => {
    const newUserData = {
      email: "budi@mail.com",
      password: "123123",
    };
    const response = await request(app).post(`/register`).send(newUserData);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Email already registered");
  });

  it("should be fail if using email with not email format", async () => {
    const newUserData = {
      email: "testStaff1mailcom",
      password: "123123",
    };
    const response = await request(app).post(`/register`).send(newUserData);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Must be in Email format");
  });

  it("should be fail if using null password", async () => {
    const newUserData = {
      email: "test@mail.com",
    };
    const response = await request(app).post(`/register`).send(newUserData);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Password is required");
  });

  it("should be fail if using empty password", async () => {
    const newUserData = {
      email: "test@mail.com",
      password: "",
    };
    const response = await request(app).post(`/register`).send(newUserData);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Password is required");
  });
});

describe("GET /users", () => {
  it("should return user data using only identification from token", async () => {
    const response = await request(app)
      .get(`/users`)
      .set(`authorization`, `Bearer ${budiToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("email", expect.any(String));
    expect(response.body).toHaveProperty("name", expect.any(String));
    expect(response.body).toHaveProperty("address", expect.any(String));
    expect(response.body).toHaveProperty("phoneNumber", expect.any(String));
    expect(response.body).toHaveProperty("role", expect.any(String));
    expect(response.body).toHaveProperty("createdAt", expect.any(String));
    expect(response.body).toHaveProperty("updatedAt", expect.any(String));
  });

  it("should be fail if not using token", async () => {
    const response = await request(app)
      .get(`/users`)
      .set(`authorization`, `Bearer `);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", `Invalid Token`);
  });

  it("should be fail if not using Bearer token", async () => {
    const response = await request(app)
      .get(`/users`)
      .set(`authorization`, `Fisher ${budiToken} `);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", `Invalid Token`);
  });

  it("should be fail if using unsigned token", async () => {
    const response = await request(app)
      .get(`/users`)
      .set(`authorization`, `Bearer aksdmlkasmdkasmdmasm.asdaksdm.asmd `);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", `Invalid Token`);
  });
});

describe("PUT /users", () => {
  it("should success using identification from token and email", async () => {
    const userData = {
      email: "budi@mail.com",
      name: "Bodyman",
      address: "JL Baru Dibuka No 1",
      phoneNumber: "088888888888",
    };
    const response = await request(app)
      .put(`/users`)
      .set(`authorization`, `Bearer ${budiToken}`)
      .send(userData);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", `Profile updated`);
  });

  it("should be fail if not using token", async () => {
    const userData = {
      email: "budi@mail.com",
      name: "Bodyman",
      address: "JL Baru Dibuka No 1",
      phoneNumber: "088888888888",
    };
    const response = await request(app).put(`/users`).send(userData);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", `Invalid Token`);
  });

  it("should be fail if not using Bearer token", async () => {
    const userData = {
      email: "budi@mail.com",
      name: "Bodyman",
      address: "JL Baru Dibuka No 1",
      phoneNumber: "088888888888",
    };
    const response = await request(app)
      .put(`/users`)
      .set(`authorization`, `Fisher ${budiToken} `)
      .send(userData);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", `Invalid Token`);
  });

  it("should be fail if using unsigned token", async () => {
    const userData = {
      email: "budi@mail.com",
      name: "Bodyman",
      address: "JL Baru Dibuka No 1",
      phoneNumber: "088888888888",
    };
    const response = await request(app)
      .put(`/users`)
      .set(`authorization`, `Bearer aksdmlkasmdkasmdmasm.asdaksdm.asmd `);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", `Invalid Token`);
  });

  it("should be fail if using null email", async () => {
    const userData = {
      email: "",
      name: "Bodyman",
      address: "JL Baru Dibuka No 1",
      phoneNumber: "088888888888",
    };
    const response = await request(app)
      .put(`/users`)
      .set(`authorization`, `Bearer ${budiToken}`)
      .send(userData);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", `Email is required`);
  });

  it("should be fail if using already registered email", async () => {
    const userData = {
      email: "admin@mail.com",
      name: "Bodyman",
      address: "JL Baru Dibuka No 1",
      phoneNumber: "088888888888",
    };
    const response = await request(app)
      .put(`/users`)
      .set(`authorization`, `Bearer ${budiToken}`)
      .send(userData);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", `Email already registered`);
  });

  it("should be fail if not using email format", async () => {
    const userData = {
      email: "asdasdasd",
      name: "Bodyman",
      address: "JL Baru Dibuka No 1",
      phoneNumber: "088888888888",
    };
    const response = await request(app)
      .put(`/users`)
      .set(`authorization`, `Bearer ${budiToken}`)
      .send(userData);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", `Must be in Email format`);
  });
});

afterAll(async () => {
  await Order.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await Meal.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
