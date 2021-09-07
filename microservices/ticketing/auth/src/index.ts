import mongoose, { mongo } from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.jwt) throw new Error("jwt env variable must be defined");
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {});
    console.log("Connected to DB");
  } catch (error) {
    console.error(error);
  }
};

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

start();
