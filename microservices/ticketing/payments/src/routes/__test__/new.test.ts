import request from "supertest";
import { app } from "../../app";
import { signin } from "../../test/setup";
import mongoose from "mongoose";
import { Order } from "../../models/order";
import { OrderStatus } from "@rdticketing/common";

it("returns a 404 when purchasing an order that does not exist", async () => {
  await request(app)
    .post("/api/payments")
    .set("Cookie", signin())
    .send({ token: "asdjas", orderId: new mongoose.Types.ObjectId().toHexString() })
    .expect(404);
});

it("returns a 401 when purchasing an order that does not belong to the user", async () => {
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    price: 20,
    status: OrderStatus.Created,
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
  });
  await order.save();
  await request(app)
    .post("/api/payments")
    .set("Cookie", signin())
    .send({ token: "asdjas", orderId: order.id })
    .expect(401);
});

it("returns a 400 when purchasing a cancelled order", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    price: 20,
    status: OrderStatus.Cancelled,
    userId: userId,
    version: 0,
  });
  await order.save();
  await request(app)
    .post("/api/payments")
    .set("Cookie", signin(userId))
    .send({ token: "asdjas", orderId: order.id })
    .expect(400);
});
