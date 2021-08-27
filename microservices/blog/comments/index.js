import express from "express";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content, status: "pending" });
  await axios.post("http://event-bus-srv:4005/events", {
    type: "CommentCreated",
    data: { id: commentId, content, postId: req.params.id, status: "pending" },
  });
  commentsByPostId[req.params.id] = comments;
  return res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("Received Event: ", req.body.type);
  const { type, data } = req.body;
  if (type === "CommentModerated") {
    const comments = commentsByPostId[data.postId];
    const comment = comments.find((comment) => comment.id === data.id);
    comment.status = data.status;
    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentUpdated",
      data: { ...comment, postId: data.postId },
    });
  }

  res.send({});
});

app.listen(4001, () => console.log("Listening on 4001"));
