import React, { useState } from "react";

const CommentBox = () => {
  const [comment, setComment] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    setComment("");
    // Call action creator and save the comment
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
