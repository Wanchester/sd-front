import React, { Fragment } from "react";
import { GlobalStyle } from "./GlobalStyle";
import HelloWorld from "./HelloWorld";
const App = () => {
  return (
    <Fragment>
      <HelloWorld />
      <GlobalStyle />
    </Fragment>
  );
};

export default App;
