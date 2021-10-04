import mongoose, { mongo } from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  if (!process.env.jwt) throw new Error("jwt env variable must be defined");
  if (!process.env.NATS_CLIENT_ID) throw new Error("NATS_CLIENT_ID must be defined");
  if (!process.env.NATS_URL) throw new Error("NATS_URL must be defined");
  if (!process.env.NATS_CLUSTER_ID) throw new Error("NATS_CLUSTER_ID must be defined");
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI must be defined");
  try {
    await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL);
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });
    process.on("SIGNINT", () => natsWrapper.client.close()); // interupt signal
    process.on("SIGTERM", () => natsWrapper.client.close()); // termination signal

    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("Connected to DB");
  } catch (error) {
    console.error(error);
  }
};

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

start();
