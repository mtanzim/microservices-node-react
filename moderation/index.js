const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events/", (req, res) => {
  const body = req.body;
  const isRejected = body?.data?.content?.includes("duck");
  if (body?.type === "CommentCreated") {
    const moderatedData = {
      ...body.data,
      status: isRejected ? "rejected" : "approved",
    };
    console.log(moderatedData);
    axios
      .post("http://event-bus-srv:4005/events", {
        type: "CommentModerated",
        data: moderatedData,
      })
      .then(() => console.log("moderated comment"))
      .catch(console.error);
  }
  res.send("OK");
});

app.listen(4003, () => {
  console.log("moderation listening on :4003");
});
