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

describe("POST /orders/:MealId", () => {
  it("should return new orders using params and authentication", async () => {
    const response = await request(app)
      .post(`/orders/1`)
      .set(`authorization`, `Bearer ${budiToken}`);

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("orderId");
    expect(response.body).toHaveProperty("status", expect.any(String));
    expect(response.body).toHaveProperty("UserId", expect.any(Number));
    expect(response.body).toHaveProperty("MealId", expect.any(Number));
    expect(response.body).toHaveProperty("createdAt", expect.any(String));
    expect(response.body).toHaveProperty("updatedAt", expect.any(String));
  });

  it("should fail without authentication", async () => {
    const response = await request(app).post(`/orders`);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", `Invalid Token`);
  });

  it("should fail if the meal is not registered", async () => {
    const response = await request(app)
      .post(`/orders/100000`)
      .set(`authorization`, `Bearer ${budiToken}`);
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", `Data not Found`);
  });
});

describe("GET /orders", () => {
  it("should return list of current users orders using authentication", async () => {
    const response = await request(app)
      .get(`/orders`)
      .set(`authorization`, `Bearer ${budiToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body[0]).toHaveProperty("orderId", expect.any(String));
    expect(response.body[0]).toHaveProperty("status", expect.any(String));
    expect(response.body[0]).toHaveProperty("UserId", expect.any(Number));
    expect(response.body[0]).toHaveProperty("MealId", expect.any(Number));
    expect(response.body[0]).toHaveProperty("createdAt", expect.any(String));
    expect(response.body[0]).toHaveProperty("updatedAt", expect.any(String));
  });

  it("should fail without authentication", async () => {
    const response = await request(app).get(`/orders`);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", `Invalid Token`);
  });
});

describe("DELETE /orders/:id", () => {
  it("should return delete orders using authentication", async () => {
    const response = await request(app)
      .delete(`/orders/4`)
      .set(`authorization`, `Bearer ${budiToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", `Order canceled`);
  });

  it("should return delete orders using admin authentication", async () => {
    const response = await request(app)
      .delete(`/orders/5`)
      .set(`authorization`, `Bearer ${adminToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", `Order canceled`);
  });

  it("should fail if try to delete orders from different user", async () => {
    const response = await request(app)
      .delete(`/orders/1`)
      .set(`authorization`, `Bearer ${budiToken}`);
    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", `Forbidden Access`);
  });

  it("should fail if try to delete unregistered orders", async () => {
    const response = await request(app)
      .delete(`/orders/10000`)
      .set(`authorization`, `Bearer ${budiToken}`);
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", `Data not Found`);
  });

  it("should fail without authentication", async () => {
    const response = await request(app).delete(`/orders/4`);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", `Invalid Token`);
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
