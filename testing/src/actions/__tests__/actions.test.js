import { saveComment } from "..";
import { SAVE_COMMENT } from "../types";

describe("saveComment", () => {
  test("has the correct type", () => {
    const action = saveComment();
    expect(action.type).toEqual(SAVE_COMMENT);
  });
  test("has the correct payload", () => {
    const action = saveComment("comment");
    expect(action.payload).toEqual("comment");
  });
});
