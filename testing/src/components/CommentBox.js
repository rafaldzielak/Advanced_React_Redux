import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchComments, saveComment } from "../actions";

const CommentBox = () => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    setComment("");
    dispatch(saveComment(comment));
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <h4>Add a comment</h4>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
        <div>
          <button type='submit'>Submit Comment</button>
        </div>
        <button onClick={() => dispatch(fetchComments())}>Fetch Comments</button>
      </form>
    </>
  );
};

export default CommentBox;
