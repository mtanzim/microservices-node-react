const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events/", (req, res) => {
  const event = req.body;
  axios
    .post("http://localhost:4000", event)
    .then(() => console.log("events sent event"))
    .catch(console.error);
  axios
    .post("http://localhost:4001", event)
    .then(() => console.log("events sent event"))
    .catch(console.error);
  axios
    .post("http://localhost:4002", event)
    .then(() => console.log("events sent event"))
    .catch(console.error);
  res.json({ status: "OK" });
});

app.listen(4005, () => {
  console.log("events listening on :4005");
});
