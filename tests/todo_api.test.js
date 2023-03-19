const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../App.js");
const api = supertest(app);

test("todos are returned as json", async () => {
  await api
    .get("/api/todos")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);
afterAll(async () => {
  await mongoose.connection.close();
});

test("amount of todos", async () => {
  const get = await api.get("/api/todos");
  console.log("get!!!!!!!!!!!!!!!!!!!!!!!!!", get.body);
  // expect(get.body).toHaveLength(0);
});
