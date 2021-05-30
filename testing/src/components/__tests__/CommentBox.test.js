import { mount } from "enzyme";
import React from "react";
import CommentBox from "../CommentBox";

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

describe("the text area", () => {
  beforeEach(() => {
    wrapped.find("textarea").simulate("change", { target: { value: "new comment" } }); // it basically replaces the 'event' object in handleChange in CommentBox
    wrapped.update(); //because setState is async
  });
  test("has a text area that users can type in", () => {
    expect(wrapped.find("textarea").prop("value")).toEqual("new comment"); //we need a new textarea component
  });

  test("text area gets emptied when the input is submitted", () => {
    wrapped.find("form").simulate("submit");
    wrapped.update();
    expect(wrapped.find("textarea").prop("value")).toEqual("");
  });
});
