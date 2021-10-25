import { natsWrapper } from "../../../nats-wrapper";
import { OrderStatus, ExpirationCompleteEvent } from "@rdticketing/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";
import { ExpirationCompleteListener } from "../expiration-complete-listener";
import { Order } from "../../../models/order";

const setup = async () => {
  const listener = new ExpirationCompleteListener(natsWrapper.client);
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
    id: new mongoose.Types.ObjectId().toHexString(),
  });
  await ticket.save();
  const order = Order.build({
    expiresAt: new Date(),
    status: OrderStatus.Created,
    userId: "akisjda",
    ticket,
  });
  console.log(order);
  await order.save();
  const data: ExpirationCompleteEvent["data"] = { orderId: order.id };
  // @ts-ignore
  const msg: Message = { ack: jest.fn() };
  return { listener, msg, order, ticket, data };
};

it("updates the order status to cancelled", async () => {
  const { listener, data, msg, order } = await setup();
  await listener.onMessage(data, msg);
  const updatedOrder = await Order.findById(order.id);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it("emit OrderCancelled event", async () => {
  const { listener, data, msg, order } = await setup();
  await listener.onMessage(data, msg);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
  const eventData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);
  expect(eventData.id).toEqual(order.id);
});

it("acks the message", async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});
