import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import CommentCreate from "./CommentCreate";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const { data } = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
    setComments(data);
  };

  const renderedComments = Object.values(comments).map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  useEffect(() => {
    fetchComments();
  }, []);
  return <ul>{renderedComments}</ul>;
};

export default CommentList;
