import request from "supertest";
import { app } from "../../app";
import { signin } from "../../test/setup";
import { Ticket } from "../../models/ticket";
import { OrderStatus } from "@rdticketing/common";
import { Order } from "../../models/order";

it("marks an order as cancelled", async () => {
  const ticket = Ticket.build({ title: "concert", price: 20 });
  await ticket.save();
  const userCookie = signin();
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", userCookie)
    .send({ ticketId: ticket.id })
    .expect(201);
  await request(app).delete(`/api/orders/${order.id}`).set("Cookie", userCookie).send().expect(200);
  const updatedOrder = await Order.findById(order.id);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it.todo("emits an event after cancelling event");
