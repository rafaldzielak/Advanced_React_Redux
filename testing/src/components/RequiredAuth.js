import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const requireAuth = (ChildComponent) => {
  const RequireAuthComponent = () => {
    const auth = useSelector((state) => state.auth);
    const history = useHistory();

    useEffect(() => {
      if (!auth) history.push("/");
    }, [auth, history]);

    return <ChildComponent />;
  };
  return RequireAuthComponent;
};
export default requireAuth;
