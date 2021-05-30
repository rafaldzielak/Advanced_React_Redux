import { mount } from "enzyme";
import React from "react";
import CommentBox from "../CommentBox";
import userEvent from "@testing-library/user-event";

let wrapped;
beforeEach(() => {
  wrapped = mount(<CommentBox />);
});
afterEach(() => {
  wrapped.unmount();
});

test("has a text area and a button", () => {
  expect(wrapped.find("textarea")).toHaveLength(1);
  expect(wrapped.find("button")).toHaveLength(1);
});
