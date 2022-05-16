import React, { Fragment } from "react";
import { GlobalStyle } from "./GlobalStyle";
import HelloWorld from "./HelloWorld";
import HomePage from "./HomePage"
const App = () => {
  return (
    <Fragment>
      <HomePage />
      <HelloWorld />
      <GlobalStyle />
    </Fragment>
  );
};

export default App;
