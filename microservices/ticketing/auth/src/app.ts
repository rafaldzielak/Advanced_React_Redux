import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
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
app.use(cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" })); // signed: false for not encrypting the JWT, secure for https site only

app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(singOutRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
