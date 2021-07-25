import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import { changeAuth } from "../actions";
import CommentBox from "./CommentBox";
import CommentList from "./CommentList";

const App = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const renderButton = () =>
    auth ? (
      <button onClick={() => dispatch(changeAuth(false))}>Sign Out</button>
    ) : (
      <button onClick={() => dispatch(changeAuth(true))}>Sign In</button>
    );

  const renderHeader = () => (
    <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/post'>Post A Comment</Link>
      </li>
      <li>{renderButton()}</li>
    </ul>
  );

  return (
    <div>
      {renderHeader()}
      <Route path='/post' component={CommentBox} />
      <Route exact path='/' component={CommentList} />
    </div>
  );
};

export default App;
