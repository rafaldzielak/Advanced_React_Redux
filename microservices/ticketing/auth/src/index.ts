import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import mongoose, { mongo } from "mongoose";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signUpRouter } from "./routes/signup";
import { singOutRouter } from "./routes/singout";

const app = express();
app.set("trust proxy", true); //for ngingx
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ signed: false, secure: true })); // signed: false for not encrypting the JWT, secure for https site only

app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(singOutRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

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
