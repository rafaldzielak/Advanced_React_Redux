import { combineReducers } from "redux";
import authReducer from "./auth";
import commentReducer from "./commentsReducer";

export default combineReducers({ comments: commentReducer, auth: authReducer });
