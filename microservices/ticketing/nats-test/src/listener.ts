import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedListener } from "./events/ticket-created-listener";
console.clear();

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), { url: "http://localhost:4222" }); // stan is client

stan.on("connect", () => {
  console.log("Listener connected to nats");
  new TicketCreatedListener(stan).listen();

  stan.on("close", () => {
    console.log("NATS connection closed!");
    process.exit();
  });
});

process.on("SIGNINT", () => stan.close()); // interupt signal
process.on("SIGTERM", () => stan.close()); // termination signal
