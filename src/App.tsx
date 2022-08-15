import React, { Fragment, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalStyle } from "./GlobalStyle";
import HomePage from "./HomePage";
import LogInPage from "./LogInPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import apiMethods from "./API";
import StatisticPage from "./StatisticPage";
import TeamPage from "./TeamPage";
const App = () => {
  const [loggedIn, setLoggedIn] = useState(true as string | false);
  apiMethods.hasUserAlreadyLoggedIn().then((userName) => setLoggedIn(userName));

  return (
    <Fragment>
      {loggedIn !== false ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage userName={loggedIn} />} />
            <Route path="/team/:teamName" element={<TeamPage />} />
            <Route path="/statistic" element={<StatisticPage />} />
            <Route path="*" />
          </Routes>
        </BrowserRouter>
      ) : (
        <LogInPage />
      )}

      <GlobalStyle />
    </Fragment>
  );
};

export default App;
