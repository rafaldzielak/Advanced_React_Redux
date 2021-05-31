import { SAVE_COMMENT } from "../../actions/types";
import commentsReducer from "../commentsReducer";

test("handles actions of the SAVE_COMMENT", () => {
  const action = { type: SAVE_COMMENT, payload: "comment" };
  const newState = commentsReducer([], action);
  expect(newState).toEqual(["comment"]);
});

test("handles action with unknown type", () => {
  const newState = commentsReducer([], { type: "Unknown_Action" });
  expect(newState).toEqual([]);
});
