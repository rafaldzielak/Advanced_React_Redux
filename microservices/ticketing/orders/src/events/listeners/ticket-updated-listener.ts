import { Listener, Subjects, TicketUpdatedEvent } from "@rdticketing/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = queueGroupName; // makes sure the event will be sent to one of the instances

  // msg has ack method (which is importatnt for us)
  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const { id, title, price } = data;
    const ticket = await Ticket.findByEvent(data);
    if (!ticket) throw new Error("Ticket not found");
    ticket.set({ title, price });
    await ticket.save();
    msg.ack();
  }
}
