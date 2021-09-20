import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";
import { sign } from "node:crypto";
console.clear();

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), { url: "http://localhost:4222" }); // stan is client

stan.on("connect", () => {
  console.log("Listener connected to nats");

  const options = stan.subscriptionOptions().setManualAckMode(true); //setManualAckMode - we set the ack manually, if not ack - it will send the event to another listener

  const substription = stan.subscribe("ticket:created", "order-service-queue-group", options); //second argument is name of queue group
  substription.on("message", (msg: Message) => {
    const data = msg.getData();
    if (typeof data === "string") console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    msg.ack();
  });
});
