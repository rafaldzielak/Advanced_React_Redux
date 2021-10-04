import request = require("supertest");
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";
import { signin } from "../../test/setup";

it("has a route handler listening to /api/tickets for post request", async () => {
  const response = await request(app).post("/api/tickets").send({});
  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});

it("returns a status other than 401 for signed in user", async () => {
  const response = await request(app).post("/api/tickets").set("Cookie", signin()).send({});
  expect(response.status).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {
  await request(app).post("/api/tickets").set("Cookie", signin()).send({ title: "", price: 10 }).expect(400);
  await request(app).post("/api/tickets").set("Cookie", signin()).send({ price: 10 }).expect(400);
});

it("returns an error if invalid price is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({ title: "asdasd", price: -10 })
    .expect(400);
  await request(app).post("/api/tickets").set("Cookie", signin()).send({ title: "asdasd" }).expect(400);
});

it("creates a ticket with valid inputs", async () => {
  // Add in a check to make sure a ticket was saved
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);
  const title = "ajsdkas";
  const price = 10;
  await request(app).post("/api/tickets").set("Cookie", signin()).send({ title, price }).expect(201);
  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].title).toEqual(title);
  expect(tickets[0].price).toEqual(price);
});

it("publishes an event", async () => {
  // Add in a check to make sure a ticket was saved
  const title = "ajsdkas";
  const price = 10;
  await request(app).post("/api/tickets").set("Cookie", signin()).send({ title, price }).expect(201);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
