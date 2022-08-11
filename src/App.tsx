import React, { Fragment, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalStyle } from "./GlobalStyle";
import HomePage from "./HomePage";
import LogInPage from "./LogInPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import apiMethods from "./API";
const App = () => {
  const [loggedIn, setLoggedIn] = useState(false as string | false);
  apiMethods.hasUserAlreadyLoggedIn().then((userName) => setLoggedIn(userName));

  return (
    <Fragment>
      {loggedIn !== false ? <HomePage userName={loggedIn} /> : <LogInPage />}
      <GlobalStyle />
    </Fragment>
  );
};

export default App;
