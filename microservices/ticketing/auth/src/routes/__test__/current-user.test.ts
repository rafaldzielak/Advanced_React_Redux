import request from "supertest";
import { app } from "../../app";

it("cresponds with details about the current user", async () => {
  const signupResponse = await request(app)
    .post("/api/users/signup")
    .send({ email: "rafa.dyrektorek@gmail.com", password: "password" })
    .expect(201);
  const cookie = signupResponse.get("Set-Cookie");
  const response = request(app).get("/api/users/currentuser").set("Cookie", cookie).send().expect(200);
  expect((await response).body.currentUser.email).toEqual("rafa.dyrektorek@gmail.com");
});
