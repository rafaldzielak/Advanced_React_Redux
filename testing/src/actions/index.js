import { SAVE_COMMENT } from "./types";

export const saveComment = (comment) => {
  return { type: SAVE_COMMENT, payloaad: comment };
};
