const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events = [];

app
  .post("/events/", (req, res) => {
    const event = req.body;
    events.push(event);
    axios
      .post("http://posts-clusterip-srv:4000/events/", event)
      .then(() => console.log("events sent event to posts"))
      .catch(() => {
        console.log("Failed to send to post");
      });
    // axios
    //   .post("http://localhost:4001/events/", event)
    //   .then(() => console.log("events sent event to comments"))
    //   .catch(() => {
    //     console.log("Failed to send to comments");
    //   });
    // axios
    //   .post("http://localhost:4002/events/", event)
    //   .then(() => console.log("events sent event to query"))
    //   .catch(() => {
    //     console.log("Failed to send to query");
    //   });
    // axios
    //   .post("http://localhost:4003/events/", event)
    //   .then(() => console.log("events sent event to moderation"))
    //   .catch(() => {
    //     console.log("Failed to send to query");
    //   });
    res.json({ status: "OK" });
  })
  .get("/events", (req, res) => {
    res.json(events);
  });

app.listen(4005, () => {
  console.log("events listening on :4005");
});
