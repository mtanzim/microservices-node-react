const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());
let posts = {};

const handleEvent = (body) => {
  if (body?.type === "PostCreated") {
    posts = {
      ...posts,
      [body.data.id]: {
        ...body.data,
        comments: [],
      },
    };
  }
  if (body?.type === "CommentCreated") {
    const curPost = posts[body.data.postId];
    posts = {
      ...posts,
      [body.data.postId]: {
        ...curPost,
        comments: curPost.comments.concat(body.data),
      },
    };
  }
  if (body?.type === "CommentUpdated") {
    console.log("updating");
    console.log(body);
    const curPost = posts[body.data.postId];
    console.log(curPost);

    const curCommentIdx = curPost.comments.findIndex(
      (c) => c.id === body.data.id
    );
    console.log(curPost?.comments?.[curCommentIdx]);
    posts = {
      ...posts,
      [body.data.postId]: {
        ...curPost,
        comments: curPost.comments
          .slice(0, curCommentIdx)
          .concat(body.data)
          .concat(curPost.comments.slice(curCommentIdx + 1)),
      },
    };
  }
};

app
  .post("/events/", (req, res) => {
    handleEvent(req.body);
    console.log(posts);
    res.send("OK");
  })
  .get("/posts", (req, res) => {
    return res.json(posts);
  });

app.listen(4002, async () => {
  const events = await axios.get("http://localhost:4005/events/");
  // console.log(events.data);
  events.data.forEach((event) => {
    handleEvent(event);
  });
  console.log("Posts listening on :4002");

});
