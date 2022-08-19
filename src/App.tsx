import { Fragment, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { GlobalStyle } from "./GlobalStyle";
import HomePage from "./HomePage";
import LogInPage from "./LogInPage";
import StatisticPage from "./StatisticPage";
import TeamPage from "./TeamPage";
import SessionPage from "./SessionPage";

import apiMethods from "./API";
const App = () => {
  const [loggedIn, setLoggedIn] = useState(false as string | false);

  apiMethods.hasUserAlreadyLoggedIn().then((userName) => setLoggedIn(userName));

  return (
    <Fragment>
      {loggedIn !== false ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
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
