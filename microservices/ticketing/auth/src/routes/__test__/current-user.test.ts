import request from "supertest";
import { app } from "../../app";
import { signin } from "../../test/setup";

it("cresponds with details about the current user", async () => {
  const cookie = await signin();
  const response = request(app).get("/api/users/currentuser").set("Cookie", cookie).send().expect(200);
  expect((await response).body.currentUser.email).toEqual("rafa.dyrektorek@gmail.com");
});

it("responds with null if not authenticated", async () => {
  const response = await request(app).get("/api/users/currentuser").send({}).expect(200);
  expect(response.body.currentUser).toEqual(null);
});
