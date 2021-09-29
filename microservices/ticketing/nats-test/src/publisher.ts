import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";
console.clear();

const stan = nats.connect("ticketing", "abc", { url: "http://localhost:4222" }); // stan is client

stan.on("connect", () => {
  console.log("Publisher connected to nats");
  const publisher = new TicketCreatedPublisher(stan);
  publisher.publish({ id: "123", title: "concert", price: 20 });
});
