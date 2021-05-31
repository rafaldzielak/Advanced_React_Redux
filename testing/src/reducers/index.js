import { combineReducers } from "redux";
import commentReducer from "./commentsReducer";

export default combineReducers({ comments: commentReducer });
