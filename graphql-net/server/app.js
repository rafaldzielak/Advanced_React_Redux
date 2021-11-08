import express from "express";
import { graphqlHTTP } from "express-graphql";
import { bookSchema } from "./schema/schema.js";

const app = express();

app.use("/graphql", graphqlHTTP({ schema: bookSchema }));

app.listen(5000, () => console.log("Server is running "));
