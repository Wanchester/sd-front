import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalStyle } from "./GlobalStyle";
import HomePage from "./HomePage";
import LogInPage from "./LogInPage";
const App = () => {
  return (
    <Fragment>
      <HomePage />
      {/* <LogInPage /> */}
      <GlobalStyle />
    </Fragment>
  );
};

export default App;
