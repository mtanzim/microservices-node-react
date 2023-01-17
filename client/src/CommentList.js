import React, { useState } from "react";

const CommentList = ({ comments }) => {
  const [curComments] = useState(comments);

  const renderedComments = curComments.map((comment) => {
    return <li key={comment.id}>{comment.content} - {comment.status}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
