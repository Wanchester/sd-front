import { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { GlobalStyle } from "./GlobalStyle";
import HomePage from "./HomePage";
import LogInPage from "./LogInPage";
import StatisticPage from "./StatisticPage";
import TeamPage from "./TeamPage";
import SessionPage from "./SessionPage";
import PlayerPage from "./PlayerPage";
import apiMethods, { ProfileResponse } from "./API";
// import ErrorPage from "./ErrorPage";

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
            <Route
              path="/player/:playerName"
              element={<PlayerPage user={loggedIn} />}
            />

            <Route
              path="/team/:teamName"
              element={<TeamPage player={loggedIn} />}
            />

            <Route
              path="/session/:sessionName"
              element={<SessionPage user={loggedIn} />}
            />
            <Route
              path="/statistics/:playerName"
              element={<StatisticPage user={loggedIn} />}
            />
            <Route path="*" element={<HomePage player={loggedIn} />} />
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
