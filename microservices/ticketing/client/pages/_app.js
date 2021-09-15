import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";

const AppComponent = ({ Component, pageProps }) => {
  return (
    <>
      <h1>Header!</h1>
      <Component {...pageProps} />
    </>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  // specific to next.js - if we implement it - next.js will call this function while rendering the app on the server, any data returned from the function will be available as a prop
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");
  console.log(data);
  return data;
};

export default AppComponent;
