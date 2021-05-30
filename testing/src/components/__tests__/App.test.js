import React from "react";
import { shallow } from "enzyme";
import App from "../App";
import CommentBox from "../CommentBox";
import CommentList from "../CommentList";

test("shows a comment box", () => {
  const wrapped = shallow(<App />);
  expect(wrapped.find(CommentBox)).toHaveLength(1);
});

test("shows comment list", () => {
  const wrapped = shallow(<App />);
  expect(wrapped.find(CommentList)).toHaveLength(1);
});
