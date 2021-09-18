import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { NotFoundError, errorHandler, currentUser } from "@rdticketing/common";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes";

const app = express();
app.set("trust proxy", true); //for ngingx
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" })); // signed: false for not encrypting the JWT, secure for https site only
app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
