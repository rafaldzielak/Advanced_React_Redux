import { Publisher, Subjects, OrderCancelledEvent } from "@rdticketing/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
