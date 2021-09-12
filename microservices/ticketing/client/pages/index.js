import axios from "axios";
import React from "react";

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return <div>LandingPage</div>;
};

// specific to next.js - if we implement it - next.js will call this function while rendering the app on the server, any data returned from the function will be available as a prop
LandingPage.getInitialProps = async () => {
  console.log(typeof window);
  if (typeof window === "undefined") {
    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      { headers: { Host: "ticketing.dev" } }
    );
    return data;
  } else {
    const { data } = await axios.get("/api/users/currentuser");
    return data;
  }
};

export default LandingPage;
