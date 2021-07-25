import React from "react";
import { useSelector } from "react-redux";

const CommentList = () => {
  const comments = useSelector((state) => state.comments);
  const renderComments = (comments) => {
    return comments?.map((comment) => <li key={comment}>{comment}</li>);
  };
  return (
    <div>
      <h4>Comment list</h4>
      <ul>{renderComments(comments)}</ul>
    </div>
  );
};

export default CommentList;
