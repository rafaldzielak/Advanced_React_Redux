import mongoose, { mongo } from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.jwt) throw new Error("jwt env variable must be defined");
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI must be defined");
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
