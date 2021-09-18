import request = require("supertest");
import { app } from "../../app";
import { signin } from "../../test/setup";
import mongoose from "mongoose";

it("returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  return request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", signin())
    .send({ title: "asdasd", price: 10 })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  return request(app).put(`/api/tickets/${id}`).send({ title: "asdasd", price: 10 }).expect(401);
});

it("returns a 404 if the user does not own the ticket", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({ title: "Asdasdas", price: 20 });
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", signin())
    .send({ title: "ASDAS", price: 298 })
    .expect(401);
});

it("returns a 400 if the user provides invalid title or price", async () => {
  const cookie = signin();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "Asdasdas", price: 20 });
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "", price: 10 })
    .expect(400);
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "asdasdas", price: -10 })
    .expect(400);
});

it("updated the ticket provided valid inputs", async () => {
  const cookie = signin();
  const title = "askdjas";
  const price = 20;
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title, price })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "ASDjas", price: 50 })
    .expect(200);
  const ticketResponse = await request(app).get(`/api/tickets/${response.body.id}`).send().expect(200);
  expect(ticketResponse.body.title).toEqual("ASDjas");
});
