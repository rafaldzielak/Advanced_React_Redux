import React from "react";

const LandingPage = ({ color }) => {
  console.log("I am in the component", color);
  return <div>LandingPage</div>;
};

LandingPage.getInitialProps = () => {
  console.log("I am on the server");
  return { color: "red" };
}; // specific to next.js - if we implement it - next.js will call this function while rendering the app on the server, any data returned from the function will be available as a prop

export default LandingPage;
