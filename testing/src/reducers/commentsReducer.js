import { FETCH_COMMENTS, SAVE_COMMENT } from "../actions/types";

const reducer = (state = [], action) => {
  switch (action.type) {
    case SAVE_COMMENT:
      return [...state, action.payload];
    case FETCH_COMMENTS:
      console.log(action);
      const comments = action.payload.map((comment) => comment.name);
      console.log(comments);
      return [...state, ...comments];
    default:
      return state;
  }
};

export default reducer;
