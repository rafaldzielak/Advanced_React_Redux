import request from "supertest";
import { app } from "../../app";

it("fails when an email that does not exist is supplies", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({ email: "rafa.dyrektorek@gmail.com", password: "asodjas" })
    .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "rafa.dyrektorek@gmail.com", password: "password" })
    .expect(201);
  return request(app)
    .post("/api/users/signin")
    .send({ email: "rafa.dyrektorek@gmail.com", password: "asodjas" })
    .expect(400);
});

it("responds with a cookie for valid credentials", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "rafa.dyrektorek@gmail.com", password: "password" })
    .expect(201);
  const response = await request(app)
    .post("/api/users/signin")
    .send({ email: "rafa.dyrektorek@gmail.com", password: "password" })
    .expect(200);
  expect(response.get("Set-Cookie")).toBeDefined();
});
