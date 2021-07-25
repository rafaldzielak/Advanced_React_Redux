import { CHANGE_AUTH, FETCH_COMMENTS, SAVE_COMMENT } from "./types";
import axios from "axios";

export const saveComment = (comment) => {
  return { type: SAVE_COMMENT, payload: comment };
};

export const fetchComments = () => async (dispatch) => {
  const { data } = await axios.get("http://jsonplaceholder.typicode.com/comments");
  dispatch({ type: FETCH_COMMENTS, payload: data });
};

export const changeAuth = (isLoggedIn) => {
  return { type: CHANGE_AUTH, payload: isLoggedIn };
};
