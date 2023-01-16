const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());
let posts = {};
app
  .post("/events/", (req, res) => {
    const body = req.body;
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
    console.log(posts);
    res.send("OK");
  })
  .get("/posts", (req, res) => {
    return res.json(posts);
  });

app.listen(4002, () => {
  console.log("Posts listening on :4002");
});
