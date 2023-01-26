const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const EVENT_BUS_URI = "http://event-bus-srv:4005";
const app = express();
app.use(bodyParser.json());
app.use(cors());
const posts = {};
app
  .post("/events/", (req, res) => {
    console.log(req.body);
    res.send("OK");
  })
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

    axios
      .post(`${EVENT_BUS_URI}/events`, {
        type: "PostCreated",
        data: {
          id,
          title,
        },
      })
      .then(() => console.log("post sent event"))
      .catch(console.error);

    return res.status(201).json(posts);
  });

app.listen(4000, () => {
  console.log("v0.0.4");
  console.log("Posts listening on :4000");
});
