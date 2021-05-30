import React from "react";
import { shallow } from "enzyme";
import App from "../App";
import CommentBox from "../CommentBox";
import CommentList from "../CommentList";

let wrapped;
beforeEach(() => {
  wrapped = shallow(<App />);
});

test("shows a comment box", () => {
  expect(wrapped.find(CommentBox)).toHaveLength(1);
});

test("shows comment list", () => {
  expect(wrapped.find(CommentList)).toHaveLength(1);
});
