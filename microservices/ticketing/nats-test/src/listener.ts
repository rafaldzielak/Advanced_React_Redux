import nats, { Message, Stan } from "node-nats-streaming";
import { randomBytes } from "crypto";
console.clear();

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), { url: "http://localhost:4222" }); // stan is client

stan.on("connect", () => {
  console.log("Listener connected to nats");

  stan.on("close", () => {
    console.log("NATS connection closed!");
    process.exit();
  });

  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName("accounting-service"); //setManualAckMode - we set the ack manually, if not ack - it will send the event to another listener

  const substription = stan.subscribe("ticket:created", "order-service-queue-group", options); //second argument is name of queue group
  substription.on("message", (msg: Message) => {
    const data = msg.getData();
    if (typeof data === "string") console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    msg.ack();
  });
});

process.on("SIGNINT", () => stan.close()); // interupt signal
process.on("SIGTERM", () => stan.close()); // termination signal

abstract class Listener {
  abstract subject: string;
  abstract queueGroupName: string;
  abstract onMessage(data: any, msg: Message): void;
  protected ackWait = 5000;
  private client: Stan;
  constructor(client: Stan) {
    this.client = client;
  }
  subscriptonOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }
  listen() {
    const subscription = this.client.subscribe(this.subject, this.queueGroupName, this.subscriptonOptions());
    subscription.on("message", (msg: Message) => {
      console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);
      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }
  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === "string" ? JSON.parse(data) : JSON.parse(data.toString("utf8"));
  }
}
