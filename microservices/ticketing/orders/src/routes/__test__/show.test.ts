import request from "supertest";
import { app } from "../../app";
import { signin } from "../../test/setup";
import { Ticket } from "../../models/ticket";

it("fetches the order", async () => {
  const ticket = Ticket.build({ title: "concert", price: 20 });
  await ticket.save();

  const userCookie = signin();
  const { body: order } = await request(app)
    .post("/api/orders/")
    .set("Cookie", userCookie)
    .send({ ticketId: ticket.id })
    .expect(201);
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", userCookie)
    .send()
    .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
});

it("returns error if user tries to fetch another user's order", async () => {
  const ticket = Ticket.build({ title: "concert", price: 20 });
  await ticket.save();

  const userOneCookie = signin();
  const userTwoCookie = signin();

  const { body: order } = await request(app)
    .post("/api/orders/")
    .set("Cookie", userOneCookie)
    .send({ ticketId: ticket.id })
    .expect(201);
  await request(app).get(`/api/orders/${order.id}`).set("Cookie", userTwoCookie).send().expect(401);
});
