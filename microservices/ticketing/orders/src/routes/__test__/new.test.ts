import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { signin } from "../../test/setup";
import { Order, OrderStatus } from "../../models/order";
import { Ticket } from "../../models/ticket";

it("returns an error if the ticket does not exist", async () => {
  const ticketId = new mongoose.Types.ObjectId();
  await request(app).post("/api/orders").set("Cookie", signin()).send({ ticketId }).expect(404);
});

it("returns an error if the ticket is reserved", async () => {
  const ticket = Ticket.build({ price: 10, title: "concert" });
  await ticket.save();
  const order = Order.build({
    expiresAt: new Date(),
    status: OrderStatus.Created,
    userId: "aslkjdas",
    ticket,
  });
  await order.save();
  await request(app).post("/api/orders").set("Cookie", signin()).send({ ticketId: ticket.id }).expect(400);
});

it("reserves a ticket", async () => {
  const ticket = Ticket.build({ price: 10, title: "concert" });
  await ticket.save();
  await request(app).post("/api/orders").set("Cookie", signin()).send({ ticketId: ticket.id }).expect(201);
});

it.todo("emits an order created event");
