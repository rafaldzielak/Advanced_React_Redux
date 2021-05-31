import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveComment } from "../actions";

const CommentBox = () => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    setComment("");
    dispatch(saveComment(comment));
  };
  return (
    <form onSubmit={submitHandler}>
      <h4>Add a comment</h4>
      <textarea value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
      <div>
        <button>Submit Comment</button>
      </div>
    </form>
  );
};

export default CommentBox;
