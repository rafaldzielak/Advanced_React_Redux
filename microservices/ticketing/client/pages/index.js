import React from "react";

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return currentUser ? <h1>You are signed in</h1> : <h1>You are NOT signed in</h1>;
};

// specific to next.js - if we implement it - next.js will call this function while rendering the app on the server, any data returned from the function will be available as a prop
LandingPage.getInitialProps = async (context, client, currentUser) => {
  return {};
};

export default LandingPage;
