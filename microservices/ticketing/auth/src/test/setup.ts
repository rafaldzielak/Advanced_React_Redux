import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";

// This will be available only in test environment
export const signin = async () => {
  const email = "rafa.dyrektorek@gmail.com";
  const password = "password";
  const response = await request(app).post("/api/users/signup").send({ email, password }).expect(201);
  const cookie = response.get("Set-Cookie");
  return cookie;
};
let mongo: any;
beforeAll(async () => {
  process.env.jwt = "lajshdaksj";
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) await collection.deleteMany({});
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
