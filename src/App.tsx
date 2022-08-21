import { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { GlobalStyle } from "./GlobalStyle";
import HomePage from "./HomePage";
import LogInPage from "./LogInPage";
import StatisticPage from "./StatisticPage";
import TeamPage from "./TeamPage";
import SessionPage from "./SessionPage";

import apiMethods, { ProfileResponse } from "./API";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(
    null as null | ProfileResponse | false
  );
  useEffect(() => {
    apiMethods.hasUserAlreadyLoggedIn().then(async (userName) => {
      if (userName) {
        setLoggedIn(await apiMethods.getCurrentPlayer());
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  return (
    <Fragment>
      {loggedIn === null ? (
        <p>Loading...</p>
      ) : loggedIn ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage player={loggedIn} />} />
            {/* <Route path="/player/:userName" /> */}
            <Route path="/team/:teamName" element={<TeamPage />} />
            <Route path="/session/:sessionName" element={<SessionPage />} />
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
