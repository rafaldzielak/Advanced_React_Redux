import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

// This will be available only in test environment
export const signin = (id?: string) => {
  // Build a JWT payload
  const payload = { id: id || new mongoose.Types.ObjectId().toHexString(), email: "sjdak@gmail.com" };
  // Create the JWT
  const token = jwt.sign(payload, process.env.jwt!);
  // Build session object
  const session = { jwt: token };
  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);
  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");
  // Return a string - cookie with encoded data
  return [`express:sess=${base64}`];
};

jest.mock("../nats-wrapper.ts");

process.env.STRIPE_KEY =
  "sk_test_51HxskkJe6gNNlKVJ0rEgSEOX06R4YW2W40i6oSiG5lHISzele0oBlNjndz4sveCCMIuahWYX8w6UVjtdVY3Fs5he00z4tZl5wU";

let mongo: any;
beforeAll(async () => {
  process.env.jwt = "lajshdaksj";
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) await collection.deleteMany({});
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
