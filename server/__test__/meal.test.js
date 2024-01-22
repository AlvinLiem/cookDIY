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

describe("GET /meals", () => {
  it("should return list of meals", async () => {
    const response = await request(app)
      .get(`/meals`)
      .set(`authorization`, `Bearer ${budiToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body[0]).toHaveProperty("idMeal", expect.any(String));
    expect(response.body[0]).toHaveProperty("strMeal", expect.any(String));
    expect(response.body[0]).toHaveProperty("strCategory", expect.any(String));
    expect(response.body[0]).toHaveProperty("strArea", expect.any(String));
    expect(response.body[0]).toHaveProperty(
      "strInstructions",
      expect.any(String)
    );
    expect(response.body[0]).toHaveProperty("strMealThumb", expect.any(String));
    expect(response.body[0]).toHaveProperty("strYoutube", expect.any(String));
    expect(response.body[0]).toHaveProperty("ingredient", expect.any(String));
    expect(response.body[0]).toHaveProperty("createdAt", expect.any(String));
    expect(response.body[0]).toHaveProperty("updatedAt", expect.any(String));
  });
});

describe("GET /meals/:id", () => {
  it(`should return meals detail using params`, async () => {
    const response = await request(app).get(`/meals/1`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("idMeal", expect.any(String));
    expect(response.body).toHaveProperty("strMeal", expect.any(String));
    expect(response.body).toHaveProperty("strCategory", expect.any(String));
    expect(response.body).toHaveProperty("strArea", expect.any(String));
    expect(response.body).toHaveProperty("strInstructions", expect.any(String));
    expect(response.body).toHaveProperty("strMealThumb", expect.any(String));
    expect(response.body).toHaveProperty("strYoutube", expect.any(String));
    expect(response.body).toHaveProperty("ingredient", expect.any(String));
    expect(response.body).toHaveProperty("createdAt", expect.any(String));
    expect(response.body).toHaveProperty("updatedAt", expect.any(String));
  });

  it(`should return be fail if meals is not registered`, async () => {
    const response = await request(app).get(`/meals/10000`);

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", `Data not Found`);
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
