import { mount } from "enzyme";
import React from "react";
import Root from "../../Root";
import CommentList from "../CommentList";

let wrapped;
beforeEach(() => {
  const initialState = { comments: ["Comment 1", "Comment 2"] };
  wrapped = mount(
    <Root initialState={initialState}>
      <CommentList />
    </Root>
  );
});

test("shows one li per component", () => {
  expect(wrapped.find("li")).toHaveLength(2);
});

test("shows the text for each comment", async () => {
  expect(wrapped.render().text()).toContain("Comment 1");
  expect(wrapped.render().text()).toContain("Comment 2");
});
