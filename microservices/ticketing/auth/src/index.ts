import express from "express";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signUpRouter } from "./routes/signup";
import { singOutRouter } from "./routes/singout";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(singOutRouter);

app.listen(3000, () => console.log("Listening on port 3000"));
