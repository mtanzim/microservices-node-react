const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");

const app = express();
app.use(bodyParser.json());

const posts = {};
app
  .get("/posts", (req, res) => {
    return res.json(posts);
  })
  .post("/posts", (req, res) => {
    const id = randomBytes(4).toString("hex");
    const { title } = req.body;
    posts[id] = {
      id,
      title,
    };
    return res.status(201).json(posts);
  });

app.listen(4000, () => {
  console.log("Posts listening on :4000");
});