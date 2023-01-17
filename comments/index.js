const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const comments = {};
app
  .get("/posts/:id/comments", (req, res) => {
    return res.json(comments[req.params.id] || []);
  })
  .post("/events/", (req, res) => {
    const body = req.body;

    if (body?.type === "CommentModerated") {
      let curComment = comments[body.data.id];
      curComment = req.body.data;
      axios
        .post("http://localhost:4005/events", {
          type: "CommentUpdated",
          data: curComment,
        })
        .then(() => console.log("updated comment"))
        .catch(console.error);
    }

    console.log(req.body);
    res.send("OK");
  })
  .post("/posts/:id/comments", (req, res) => {
    const commentId = randomBytes(4).toString("hex");
    const postId = req.params.id;
    const { content } = req.body;
    const curComments = comments[postId] || [];

    curComments.push({
      id: commentId,
      content,
    });
    comments[postId] = curComments;

    axios
      .post("http://localhost:4005/events", {
        type: "CommentCreated",
        data: {
          id: commentId,
          content,
          status: "pending",
          postId,
        },
      })
      .then(() => console.log("comments sent event"))
      .catch(console.error);

    return res.status(201).json(curComments);
  });

app.listen(4001, () => {
  console.log("comments listening on :4001");
});
