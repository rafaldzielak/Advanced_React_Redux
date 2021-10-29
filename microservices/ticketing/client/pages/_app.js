import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Header from "../components/header";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <>
      <Header currentUser={currentUser} />
      <Component {...pageProps} currentUser={currentUser} />
    </>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  // specific to next.js - if we implement it - next.js will call this function while rendering the app on the server, any data returned from the function will be available as a prop
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");
  // now we execute getInitialProps of the component and app.js
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);
  }
  return { pageProps, ...data };
};

export default AppComponent;
