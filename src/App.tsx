import React, { Fragment } from "react";
import { GlobalStyle } from "./GlobalStyle";
import HomePage from "./HomePage";
const App = () => {
  return (
    <Fragment>
      <HomePage />
      <GlobalStyle />
    </Fragment>
  );
};

export default App;
