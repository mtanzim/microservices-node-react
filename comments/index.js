const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");

const app = express();
app.use(bodyParser.json());

const comments = {};
app
  .get("/posts/:id/comments", (req, res) => {
    return res.json(comments[req.params.id] || []);
  })
  .post("/posts/:id/comments", (req, res) => {
    const commentId = randomBytes(4).toString("hex");
    const { content } = req.body;
    const curComments = comments[req.params.id] || [];

    curComments.push({
      id: commentId,
      content,
    });
    comments[req.params.id] = curComments;
    return res.status(201).json(curComments);
  });

app.listen(4001, () => {
  console.log("comments listening on :4001");
});
